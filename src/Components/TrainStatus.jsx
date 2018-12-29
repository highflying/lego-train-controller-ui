import React from "react";
import fetchHoc from "fetch-hoc";
import { compose, lifecycle, withProps } from "recompose";

const TrainStatus = ({ error, loading, uuid, prevData, data }) => {
  if (error) {
    console.error(error);
    return <h2>Error: {`${error}`}</h2>;
  }

  const train = data ? data : prevData ? prevData : {};

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
  ({ uuid }) => `http://rasp2.yottabrick.com:4000/v1/train/${uuid}`
);
const cache = withProps(({ data }) => {
  if (data) {
    return { prevData: data };
  }

  return {};
});

const life = lifecycle({
  componentDidMount() {
    console.log("DidMount");
    this.launchRefresh();
  },
  componentWillUnmount() {
    console.log("WillMount");
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }
  },
  launchRefresh() {
    if (this.state && this.state.timeout) {
      return;
    }

    console.log("Will launch");
    this.setState({
      timeout: setTimeout(async () => {
        await this.setState({ timeout: null });
        await this.props.fetch();
        this.launchRefresh();
      }, 1000)
    });
  }
});

export default compose(
  fetch,
  cache,
  life
)(TrainStatus);
