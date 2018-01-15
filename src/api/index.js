/* eslint-disable no-var */
import ApiService from './api-service';
import StubApiService from './stub/stub-api-service';

let service = new ApiService();
if (process.env.NODE_ENV !== 'production') {
  service = new StubApiService(
    service,
    null,
    { artificialDelay: 1000 },
  );
}
const theService = service;

export default theService;
