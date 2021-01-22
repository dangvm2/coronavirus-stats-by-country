import { actions } from "../constants";

const initialState = {
  listCountrySummary: [],
  globalSummary: {},
  date: "",
};
export default (state = initialState, newState) => {
  switch (newState.type) {
    case actions.SUMMARY.type:
      return {
        ...state,
        listCountrySummary: newState.data.Countries,
        globalSummary: newState.data.Global,
        date: newState.data.Date,
      };
    default:
      return state;
  }
};
