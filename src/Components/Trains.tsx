import React from "react";
import fetchHoc from "fetch-hoc";
import Train from "./Train";
import { Grid, createStyles, WithStyles, withStyles } from "@material-ui/core";
import classes from "*.module.scss";

interface IProps extends WithStyles<typeof styles> {
  data: Array<{ uuid: string; name: string; speed: number }>;
}

const styles = createStyles({
  container: {
    margin: 10
  }
});

const Trains = ({ data, classes }: IProps) => {
  return (
    <Grid container={true} spacing={16} xs={12} className={classes.container}>
      {(data || []).map(train => (
        <Grid xs={11} md={6} item={true}>
          <Train key={train.uuid} uuid={train.uuid} name={train.name} />
        </Grid>
      ))}
    </Grid>
  );
};

export default fetchHoc("http://192.168.0.57:4000/v1/train")(
  withStyles(styles)(Trains)
);
