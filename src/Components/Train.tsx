import React from "react";
import TrainStatus from "./TrainStatus";
import { Card, Grid, CardContent, Typography } from "@material-ui/core";
import SetSpeedButton from "./SetSpeedButton";
import ActionButton from "./ActionButton";

interface IProps {
  uuid: string;
  name: string;
}

const Train = ({ uuid, name }: IProps) => {
  return (
    <Card raised={true}>
      <CardContent>
        <Typography variant="h2">{name}</Typography>
        <TrainStatus uuid={uuid} />
        <Grid container={true}>
          <ActionButton uuid={uuid} action="stopPlatform2" name="Run in loop" />
          <ActionButton
            uuid={uuid}
            action="stopPlatform3"
            name="Stop in Siding"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Train;
