import React from "react";
import TrainStatus from "./TrainStatus";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import SetSpeedButton from "./SetSpeedButton";
import ActionButton from "./ActionButton";

const Train: React.SFC<{ uuid: string; name: string }> = ({ uuid, name }) => (
  <Card raised={true}>
    <CardContent>
      <Typography variant="h2">{name}</Typography>
      <TrainStatus uuid={uuid} />
      <Grid container={true}>
        <ActionButton
          uuid={uuid}
          action="reverseIntoLoopAndGo"
          name="Run in loop"
        />
        <ActionButton uuid={uuid} action="stopInSiding" name="Stop in Siding" />
        <SetSpeedButton uuid={uuid} speed={20} />
        <SetSpeedButton uuid={uuid} speed={-20} />
        <SetSpeedButton uuid={uuid} speed={0} />
      </Grid>
    </CardContent>
  </Card>
);

export default Train;
