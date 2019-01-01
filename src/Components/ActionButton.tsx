import React from "react";
import {
  Button,
  withStyles,
  createStyles,
  WithStyles,
  Grid
} from "@material-ui/core";

const setAction = (uuid: string, action: string) =>
  fetch(`http://192.168.0.57:4000/v1/train/${uuid}?action=${action}`, {
    method: "PUT"
  });

interface IProps extends WithStyles<typeof styles> {
  uuid: string;
  name: string;
  action: string;
}

const styles = createStyles({
  button: {
    margin: 5
  }
});

const ActionButton = ({ classes, uuid, name, action }: IProps) => {
  return (
    <Grid xs={4} md={3}>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        onClick={() => setAction(uuid, action)}
      >
        {name}
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(ActionButton);
