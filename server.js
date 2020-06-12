const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const api = require("./routes/api");

const Zone = require("./models/zone.model");
const ZoneCategories = require("./models/zoneCategory.model");
const Admin = require("./models/admin.model");

const app = express();

require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database started");
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api", api);

// const port = 4000;
// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

const server = require("http").Server(app);
const io = require("socket.io")(server);
io.use(function (socket, next) {
  console.log("socket.handshake.query.token", socket.handshake.query.token);
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET_KEY,
      function (err, decoded) {
        console.log("jwt error", err);

        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  console.log("socket connected");

  socket.on("initial_data", () => {
    console.log("initial_data called");
    Zone.find({})
      .then((data) => {
        console.log("zones found");
        socket.emit("push_zones", data);
      })
      .catch((err) => {
        console.log("Admin error", err);
        socket.emit("internal_error", "Internal error");
      });
    ZoneCategories.find({})
      .then((data) => {
        console.log("zoneCategories found");
        socket.emit("push_zone_status_desc", data);
      })
      .catch((err) => {
        console.log("ZoneCategories error", err);
        socket.emit("internal_error", "Internal error");
      });
  });
  socket.on("add_case_to_history", (data) => {
    const { zoneId, date, infectedNumber, recoveredNumber, deadNumber } =
      data || {};
    console.log("add_case_to_history data", data);
    console.log("is valid _id", mongoose.Types.ObjectId.isValid(data.zoneId));
    Zone.findByIdAndUpdate(
      zoneId,
      {
        $inc: {
          "properties.total.infectedNumber": infectedNumber,
          "properties.total.recoveredNumber": recoveredNumber,
          "properties.total.deadNumber": deadNumber,
        },
        $push: {
          "properties.history": {
            date: date,
            infectedNumber: infectedNumber,
            recoveredNumber: recoveredNumber,
            deadNumber: deadNumber,
          },
        },
      },
      { new: true },
      (err, res) => {
        if (err) {
          console.log("updated failed", err);
        } else {
          console.log("updated successfully", res);
          socket.emit("add_case_to_history_success");
        }
      }
    );
  });
  socket.on("edit_case_in_history", (data) => {
    const { historyId, date, infectedNumber, recoveredNumber, deadNumber } =
      data || {};
    console.log("edit_case_in_history data", data);
    console.log("is valid _id", mongoose.Types.ObjectId.isValid(historyId));
    Zone.findOneAndUpdate(
      { "properties.history": { $elemMatch: { _id: historyId } } },
      {
        $set: {
          "properties.history.$.date": date,
          "properties.history.$.infectedNumber": infectedNumber,
          "properties.history.$.recoveredNumber": recoveredNumber,
          "properties.history.$.deadNumber": deadNumber,
        },
      },
      { new: true },
      (err, res) => {
        if (err) {
          console.log("updated failed", err);
        } else {
          console.log("updated successfully", res);
          socket.emit("edit_case_in_history_success");
        }
      }
    );
  });
  socket.on("remove_case_from_history", (data) => {
    const { zoneId, historyId } = data || {};
    console.log("remove_case_from_history data", data);
    Zone.findOne(
      { "properties.history": { $elemMatch: { _id: historyId } } },
      { "properties.history.$": 1 },
      (err, res) => {
        console.log("found zone and history", res.properties.history[0]);
        if (err) {
        } else {
          const history = res.properties.history[0];
          Zone.findByIdAndUpdate(
            zoneId,
            {
              $inc: {
                "properties.total.infectedNumber": -Math.abs(
                  history.infectedNumber
                ),
                "properties.total.recoveredNumber": -Math.abs(
                  history.recoveredNumber
                ),
                "properties.total.deadNumber": -Math.abs(history.deadNumber),
              },
              $pull: {
                "properties.history": {
                  _id: historyId,
                },
              },
            },
            { new: true },
            (err, res) => {
              if (err) {
                console.log("removed failed", err);
              } else {
                console.log("removed successfully", res);
                socket.emit("remove_case_from_history_success");
              }
            }
          );
        }
      }
    );
  });
  socket.on("change_zone_status", (data) => {
    const { zoneId, status } = data || {};
    console.log("change_zone_status data", data);
    Zone.findByIdAndUpdate(
      zoneId,
      {
        $set: {
          "properties.status": status,
        },
      },
      { new: true },
      (err, res) => {
        if (err) {
          console.log("status changed failed", err);
        } else {
          console.log("status changed successfully", res);
          socket.emit("change_zone_status_success");
        }
      }
    );
  });
  socket.on("edit_restrictions", (data) => {
    const { zoneId, restrictions } = data || {};
    console.log("edit_restrictions data", data);
    Zone.findByIdAndUpdate(
      zoneId,
      {
        $set: {
          "properties.restrictions": restrictions,
        },
      },
      { new: true },
      (err, res) => {
        if (err) {
          console.log("status changed failed", err);
        } else {
          console.log("status changed successfully", res);
          socket.emit("edit_restrictions_success");
        }
      }
    );
  });
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

server.listen(4000);
