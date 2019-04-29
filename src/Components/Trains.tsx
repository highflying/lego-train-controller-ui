import React, { useEffect, useState } from "react";
import Train from "./Train";
import { Grid } from "@material-ui/core";
import { getTrains, ITrain } from "../api";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    margin: 10
  }
});

const useTrains = (setTrains: (data: ITrain[]) => void) =>
  useEffect(
    () => {
      getTrains().then(setTrains);
    },
    [setTrains]
  );

const Trains: React.SFC = () => {
  const classes = useStyles();
  const [trains, setTrains] = useState<ITrain[]>([]);
  useTrains(setTrains);

  return (
    <Grid container={true} spacing={16} className={classes.container}>
      {trains.map(train => (
        <Grid xs={11} md={6} item={true} key={train.uuid}>
          <Train key={train.uuid} uuid={train.uuid} name={train.name} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Trains;
