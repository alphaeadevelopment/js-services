/* eslint-disable no-var */
import ApiService from './api-service';
import StubApiService from './stub/stub-api-service';

const service = new ApiService();
const stubService = new StubApiService(
  service,
  null,
  { artificialDelay: 1000 },
);

export default stubService;
