// const apiUrl = 'http://192.168.0.57:4000';
const apiUrl = "http://localhost:4000";

export const urls = {
  listTrains: () => `${apiUrl}/v1/train`,
  getTrain: (uuid?: string) => `${apiUrl}/v1/train/${uuid}`,
  putTrain: (uuid: string, speed: number) =>
    `${apiUrl}/v1/train/${uuid}?speedStr=${speed}&action=setSpeed`,
  putTrain2: (uuid: string, action: string) =>
    `${apiUrl}/v1/train/${uuid}?action=${action}`
};

export const setSpeed = (uuid: string, speed: number) =>
  fetch(urls.putTrain(uuid, speed), {
    method: "PUT"
  });

export const setAction = (uuid: string, action: string) =>
  fetch(urls.putTrain2(uuid, action), {
    method: "PUT"
  });

export interface ITrain {
  uuid: string;
  name: string;
  speed: number;
}

export const getTrains = (): Promise<ITrain[]> =>
  fetch(urls.listTrains()).then(response => response.json());

export interface ITrainStatus {
  name: string;
  uuid: string;
  speed: number;
  batteryLevel: number;
  current: number;
  voltage: number;
  rssi: number;
  status: string;
}
export const getTrain = (uuid: string): Promise<ITrainStatus> =>
  fetch(urls.getTrain(uuid)).then(response => response.json());
