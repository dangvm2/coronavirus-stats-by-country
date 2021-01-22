import axios from "axios";
import { actions } from "../constants";

export const getSummary = async () => {
  return await axios
    .get(actions.SUMMARY.linkApi)
    .then((res) => {
      return { type: actions.SUMMARY.type, data: res.data };
    })
    .catch((err) => {
      console.log(err);
    });
};
