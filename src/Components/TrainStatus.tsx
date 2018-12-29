import React from "react";
import fetchHoc from "fetch-hoc";
import { compose, lifecycle, withProps } from "recompose";

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
    <div>
      <div key={uuid}>Name:{train.name}</div>
      <div>UUID: {uuid}</div>
      <div>Speed: {train.speed}</div>
      <div>Battery: {train.batteryLevel}%</div>
      <div>Current: {train.current}A</div>
      <div>RSSI: {train.rssi}</div>
      <div>Status: {train.status}</div>
      {loading && <h2>Loading</h2>}
    </div>
  );
};

const fetch = fetchHoc(
  ({ uuid }: Partial<IProps>) =>
    `http://rasp2.yottabrick.com:4000/v1/train/${uuid}`
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
      console.log("DidMount");
      this.launchRefresh();
    }

    componentWillUnmount() {
      console.log("WillMount");
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
      }
    }

    private launchRefresh = () => {
      if (this.state && this.state.timeout) {
        return;
      }

      console.log("Will launch");
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
