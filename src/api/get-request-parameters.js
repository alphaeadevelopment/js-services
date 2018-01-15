const getRequestParameters = params => ({
  ...params,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});
export default getRequestParameters;
