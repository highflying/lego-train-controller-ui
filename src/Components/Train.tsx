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
          <SetSpeedButton uuid={uuid} speed={0} />
          <SetSpeedButton uuid={uuid} speed={40} />
          <SetSpeedButton uuid={uuid} speed={60} />
          <SetSpeedButton uuid={uuid} speed={80} />
          <ActionButton
            uuid={uuid}
            action="stopPlatform1"
            name="Stop at Platform 1"
          />
          <ActionButton
            uuid={uuid}
            action="stopPlatform2"
            name="Stop at Platform 2"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Train;
