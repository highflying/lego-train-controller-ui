import React from "react";
import TrainStatus from "./TrainStatus";

const setSpeed = (uuid: string, speed: number = 0) =>
  fetch(`http://rasp2.yottabrick.com:4000/v1/train/${uuid}?speed=${speed}`, {
    method: "PUT"
  });

const action = (uuid: string, action: string) =>
  fetch(`http://rasp2.yottabrick.com:4000/v1/train/${uuid}?action=${action}`, {
    method: "PUT"
  });

interface IProps {
  uuid: string;
}

const Train = ({ uuid }: IProps) => {
  return (
    <div>
      <h2>Trains</h2>
      <button onClick={() => setSpeed(uuid, 40)}>Set speed to 40</button>
      <button onClick={() => setSpeed(uuid, 60)}>Set speed to 60</button>
      <button onClick={() => setSpeed(uuid, 80)}>Set speed to 80</button>
      <button onClick={() => setSpeed(uuid, 0)}>Set speed to 0</button>
      <button onClick={() => action(uuid, "stopPlatform1")}>
        Stop at Platform 1
      </button>
      <button onClick={() => action(uuid, "stopPlatform2")}>
        Stop at Platform 2
      </button>
      <TrainStatus uuid={uuid} />
    </div>
  );
};

export default Train;
