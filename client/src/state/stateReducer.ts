import { appReducer } from "./reducers/appReducer";

const reduceReducers = (...reducers: any) => (
  prevState: any,
  value: any,
  ...args: any
) =>
  reducers.reduce(
    (newState: any, reducer: any) => reducer(newState, value, ...args),
    prevState
  );
export default reduceReducers(appReducer);
