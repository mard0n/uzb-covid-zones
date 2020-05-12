export type errorStateType = {
  error: string | null;
  errorCode?: string | null;
};

const initialState: errorStateType = {
  error: null,
  errorCode: null,
};

export default initialState;
