import React, { useCallback } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { setSpeed } from "../api";

const useStyles = makeStyles({
  button: {
    margin: 5
  }
});

const useSetSpeed = (uuid: string, speed: number) =>
  useCallback(
    () => {
      setSpeed(uuid, speed);
    },
    [uuid, speed]
  );

const SetSpeedButton: React.SFC<{ uuid: string; speed: number }> = ({
  uuid,
  speed
}) => {
  const classes = useStyles();
  const onClick = useSetSpeed(uuid, speed);

  return (
    <Grid xs={4} md={3} item={true}>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        Set speed to {speed}
      </Button>
    </Grid>
  );
};

export default SetSpeedButton;
