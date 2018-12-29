import React from "react";
import {
  Button,
  withStyles,
  createStyles,
  WithStyles
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
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={() => setAction(uuid, action)}
    >
      {name}
    </Button>
  );
};

export default withStyles(styles)(ActionButton);
