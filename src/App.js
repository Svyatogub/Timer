import React, {useState} from 'react'
import "./App.css"
import Timer from "./components/Timer";

import { interval } from "rxjs";
import { map } from "rxjs/operators";


function App() {
  
  const [timer, setTimer] = useState(0);
  const [diff, setDiff] = useState(0);

  const [subscription, setSubscription] = useState(null);
  const [prevent, setPrevent] = useState(true);

  const onStartHandler = () => {
    if (!subscription) {
      const timerSubscription = interval(1000)
        .pipe(map((v) => v + 1))
        .subscribe((v) => {
          setTimer(v + diff);
        });
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setDiff(0);
      setSubscription(null);
    }
  };

  const onWaitHandler = (event) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }

      setDiff(timer);
      setSubscription(null);
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }

    const timerSubscription = interval(1000).subscribe((v) => {
      setTimer(v);
    });
    setSubscription(timerSubscription);
  };

  return (
    <div className="Block">
      <div>
        <div>
          <Timer Countdown={timer ? timer : diff} />
        </div>
        <div className="Buttons">
          <button onClick={onStartHandler}>start/stop</button>
          <button onClick={onWaitHandler}>wait</button>
          <button onClick={onResetHandler}>reset</button>
        </div>
      </div>
    </div>
  );
}
export default App;
