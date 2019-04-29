import React, { useCallback } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { setAction } from "../api";

const useStyles = makeStyles({
  button: {
    margin: 5
  }
});

const useAction = (uuid: string, action: string) =>
  useCallback(
    () => {
      setAction(uuid, action);
    },
    [uuid, action]
  );

const ActionButton: React.SFC<{
  uuid: string;
  name: string;
  action: string;
}> = ({ uuid, name, action }) => {
  const classes = useStyles();
  const onClick = useAction(uuid, action);

  return (
    <Grid xs={4} md={3} item={true}>
      <Button
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {name}
      </Button>
    </Grid>
  );
};

export default ActionButton;
