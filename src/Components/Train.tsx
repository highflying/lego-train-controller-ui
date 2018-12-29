import React from "react";
import TrainStatus from "./TrainStatus";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import SetSpeedButton from "./SetSpeedButton";
import ActionButton from "./ActionButton";

interface IProps {
  uuid: string;
}

const Train = ({ uuid }: IProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">{uuid}</Typography>
        <TrainStatus uuid={uuid} />
      </CardContent>
      <CardActions>
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
      </CardActions>
    </Card>
  );
};

export default Train;
