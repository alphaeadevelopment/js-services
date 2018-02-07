const toError = r => ({
  status: r.statusText,
  statusCode: r.status,
});
export default toError;
