import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";

const Timer = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let hours = Math.floor(props.Countdown / 3600);
    setHours(() => (hours.toString().length === 1 ? "0" : "") + hours);

    let minutes = Math.floor((props.Countdown % 3600) / 60);
    setMinutes(() => (minutes.toString().length === 1 ? "0" : "") + minutes);

    let seconds = props.Countdown % 60;
    setSeconds(() => (seconds.toString().length === 1 ? "0" : "") + seconds);
  }, [props.Countdown]);

  return (
    <>
      <h3>
        {hours}:{minutes}:{seconds}
      </h3>
    </>
  );
};

export default Timer;