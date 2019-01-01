import React from "react";
import fetchHoc from "fetch-hoc";
import { compose, withProps } from "recompose";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress
} from "@material-ui/core";

interface ITrainStatus {
  name: string;
  uuid: string;
  speed: number;
  batteryLevel: number;
  current: number;
  rssi: number;
  status: string;
}

interface IProps {
  error?: string;
  loading: boolean;
  uuid: string;
  prevData: ITrainStatus;
  data: ITrainStatus;
}

const TrainStatus = ({ error, loading, uuid, prevData, data }: IProps) => {
  if (error) {
    console.error(error);
    return <h2>Error: {`${error}`}</h2>;
  }

  const train = data
    ? data
    : prevData
    ? prevData
    : { name: "", speed: 0, batteryLevel: 0, current: 0, rssi: 0, status: "" };

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
          <TableCell>{train.current}A</TableCell>
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
};

const fetch = fetchHoc(
  ({ uuid }: Partial<IProps>) => `http://192.168.0.57:4000/v1/train/${uuid}`
);
const cache = withProps(({ data }: Partial<IProps>) => {
  if (data) {
    return { prevData: data };
  }

  return {};
});

interface ILifecycle {
  launchRefresh: () => void;
}

interface IRefreshProps {
  fetch: () => void;
}
interface IRefreshState {
  timeout?: NodeJS.Timeout;
}
// const MyLifecycle = <P, S>(Component: React.ComponentClass<P, S> | React.StatelessComponent<P> ) =>
const MyLifecycle = <P extends {}>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
) =>
  class AutoRefresh extends React.Component<P & IRefreshProps, IRefreshState> {
    constructor(props: P & IRefreshProps, state: IRefreshState) {
      super(props, state);

      this.state = {
        timeout: undefined
      };
    }

    componentDidMount() {
      this.launchRefresh();
    }

    componentWillUnmount() {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }
    }

    private launchRefresh = () => {
      if (this.state && this.state.timeout) {
        return;
      }

      this.setState({
        timeout: setTimeout(async () => {
          await this.setState({ timeout: undefined });
          await this.props.fetch();
          this.launchRefresh();
        }, 1000)
      });
    };

    render() {
      return <Component {...this.props} />;
    }
  };

export default compose<IProps, { uuid: string }>(
  fetch,
  cache,
  MyLifecycle
)(TrainStatus);
