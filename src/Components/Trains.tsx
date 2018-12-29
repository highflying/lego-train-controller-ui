import React from "react";
import fetchHoc from "fetch-hoc";
import Train from "./Train";
import { Grid } from "@material-ui/core";

interface IProps {
  data: Array<{ uuid: string; name: string; speed: number }>;
}

const Trains = ({ data }: IProps) => {
  return (
    <Grid container={true}>
      {(data || []).map(train => (
        <Grid md={6}>
          <Train key={train.uuid} uuid={train.uuid} />
        </Grid>
      ))}
    </Grid>
  );
};

export default fetchHoc("http://192.168.0.57:4000/v1/train")(Trains);
