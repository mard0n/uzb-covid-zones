const Zone = require("../models/zone.model");
// const ZoneCategories = require("../models/zoneCategory.model");
const Admin = require("../models/admin.model");

module.exports = function (socket, redis) {
  socket.on("initial_data", () => {
    console.log("initial_data called");
    Zone.find({})
      .then((data) => {
        console.log("zones found");
        // console.log("mongo type", typeof data);
        // redis.set("zones", JSON.stringify(data));
        socket.emit("push_zones", data);
      })
      .catch((err) => {
        console.log("Admin error", err);
        socket.emit("internal_error", "Internal error");
      });
  });
  socket.on("add_case_to_history", (data) => {
    const { zoneId, date, infectedNumber, recoveredNumber, deadNumber } =
      data || {};
    console.log("add_case_to_history data", data);
    // console.log("is valid _id", mongoose.Types.ObjectId.isValid(data.zoneId));
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
    // console.log("is valid _id", mongoose.Types.ObjectId.isValid(historyId));
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
};
