import React from "react";
import { useState, useEffect } from "react";
import { Box, Caption } from "@mashreq-digital/ui";

const Timer = (props: any) => {
  const { activeAfter } = props;
  let startDate = new Date(); // current date
  let endDate = new Date(activeAfter);
  let timeDiff = -1;
  if (startDate <= endDate) {
    timeDiff = Math.abs(endDate.getTime() - startDate.getTime()); // in miliseconds
  }
  let sec = Math.ceil(timeDiff / 1000);
  const [minutes, setMinutes] = useState(Math.ceil((timeDiff / 60000) % 60));
  const [seconds, setSeconds] = useState(Math.ceil((timeDiff / 1000) % 60));
  const [hours, setHours] = useState(Math.ceil((timeDiff / 3.6e6) % 60));

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    //   if (minutes > 0) {
    //     setMinutes(minutes - 1);
    //   }

      if (seconds === 0) {
        if (hours === 0 && minutes === 0) {
            clearInterval(myInterval);
        }else{
        setMinutes(minutes - 1);
        setSeconds(59);
        }
      }

      if (minutes === 0) {
        if (hours === 0) {
            setMinutes(59);
        } else {
          setHours(hours - 1);
          setMinutes(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
      <>
      { timeDiff <=0 || hours<=0 && minutes <= 0 && seconds <= 0 ? null : (
      <>  <span style={{color:"rgb(250, 100, 0)"}}> {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} </span>  <b>To Activation</b></>
      )}
      </>
  );
};

export default Timer;
