import React from "react";
import {
  Button,
  createStyles,
  WithStyles,
  withStyles,
  Grid
} from "@material-ui/core";

const setSpeed = (uuid: string, speed: number = 0) =>
  fetch(`http://192.168.0.57:4000/v1/train/${uuid}?speed=${speed}`, {
    method: "PUT"
  });

const styles = createStyles({
  button: {
    margin: 5
  }
});

interface IProps extends WithStyles<typeof styles> {
  uuid: string;
  speed: number;
}

const SetSpeedButton = ({ classes, uuid, speed }: IProps) => {
  return (
    <Grid xs={4} md={3}>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        onClick={() => setSpeed(uuid, speed)}
      >
        Set speed to {speed}
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(SetSpeedButton);
