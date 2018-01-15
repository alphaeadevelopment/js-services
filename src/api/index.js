/* eslint-disable no-var */
import ApiService from './api-service';
import StubApiService from './stub/stub-api-service';

let service = new ApiService();
service = new StubApiService(
  service,
  null,
  { artificialDelay: 1000 },
);

export default service;
