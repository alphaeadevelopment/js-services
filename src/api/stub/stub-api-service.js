import defaultStubProvider from './default-stub-provider';
import replacePlaceholders from '../replace-placeholders';

const defaultOptions = {
  artificialDelay: 0,
};
const GET = 'GET';
const POST = 'POST';

const getRequest = (apiService, stubProvider, options = {}) => (uri, method, body) => {
  const stub = stubProvider.getStubData(uri);

  if (!stub) {
    return apiService.getRequest()(uri, method, body);
  }

  console.log(`Using stubbed data for ${uri}`, stub); // eslint-disable-line no-console
  return new Promise((res) => {
    setTimeout(() => res(stub), Math.random() * options.artificialDelay || 0);
  });
};

export default class StubApiService {
  constructor(realService, stubProvider, options) {
    this.realService = realService;
    this.stubProvider = stubProvider || defaultStubProvider;
    this.options = options || defaultOptions;
  }

  get(uri, params) {
    const requestFunc = getRequest(this.realService, this.stubProvider, this.options);
    return requestFunc(replacePlaceholders(uri, params), GET);
  }

  post(uri, body) {
    const requestFunc = getRequest(this.realService, this.stubProvider, this.options);
    return requestFunc(uri, POST, body);
  }
}
