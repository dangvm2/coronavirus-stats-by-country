const url = process.env.REACT_APP_API;

export const actions = {
  SUMMARY: {
    type: "SUMMARY",
    linkApi: `${url}summary`,
  },
};
