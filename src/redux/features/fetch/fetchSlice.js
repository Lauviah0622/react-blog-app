import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
  name: "fetchState",
  initialState: {
    response: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload.isLoading;
    },
    setResponse(state, { payload }) {
      console.log('setResponse: payload', payload);
      state.response = payload;
    },
    setErrorMessage(state, { payload }) {
      state.errorMessage = payload.errorMessage;
    },
    clearResponse(state) {
      state.response = null;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    },
  },
});

export const {
  setLoading,
  setResponse,
  setErrorMessage,
  clearResponse,
  clearErrorMessage,
} = fetchSlice.actions;

export const fetchData = (webApi) => async (dispatch) => {
  dispatch(clearResponse());
  dispatch(clearErrorMessage());
  dispatch(setLoading(true));
  try {
    console.log('fetch webAPI');
    
    const response = await webApi();
    console.log('fetch Data: response', response);
    if (!!response.ok) throw Error(response);
    dispatch(setResponse(response));
    return response;
  } catch (err) {
    dispatch(setErrorMessage(err.message));
    return err;
  } finally {
    dispatch(setLoading(false));
  }
};

export default fetchSlice.reducer;
