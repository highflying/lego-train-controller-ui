import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { getTrain } from "../api";
import useAutoRefresh from "../hooks/useAutoRefresh";

const TrainStatus: React.SFC<{ uuid: string }> = React.memo(({ uuid }) => {
  const train = useAutoRefresh(
    () => getTrain(uuid),
    {
      name: "",
      speed: 0,
      batteryLevel: 0,
      current: 0,
      rssi: 0,
      status: "",
      voltage: 0
    },
    [uuid]
  );

  return (
    <Table key={uuid}>
      <TableBody>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>{train.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>UUID</TableCell>
          <TableCell>{uuid}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Speed</TableCell>
          <TableCell>{train.speed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Battery</TableCell>
          <TableCell>{train.batteryLevel}%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Current</TableCell>
          <TableCell>{train.current} mA</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Voltage</TableCell>
          <TableCell>{train.voltage} V</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>RSSI</TableCell>
          <TableCell>{train.rssi}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Status</TableCell>
          <TableCell>{train.status}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});

export default TrainStatus;
