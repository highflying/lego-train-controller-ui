import React from "react";
import fetchHoc from "fetch-hoc";
import Train from "./Train";

const Trains = ({ data }) => {
  return (
    <div>
      <h1>Trains</h1>
      {(data || []).map(train => (
        <Train key={train.uuid} uuid={train.uuid} />
      ))}
    </div>
  );
};

export default fetchHoc("http://rasp2.yottabrick.com:4000/v1/train")(Trains);
