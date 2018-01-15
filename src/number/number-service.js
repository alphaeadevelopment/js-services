import { round } from 'lodash';

const NumberService = {
  format: (d) => {
    // eslint-disable-next-line no-console
    console.log('deprecation warning: use formatNumber(n, d) or formatter(d)(n) instead');
    return n => (String(parseFloat(n).toFixed(d)));
  },
  formatNumber: (n, d) => String(parseFloat(n).toFixed(d)),
  formatter: d => n => String(parseFloat(n).toFixed(d)),
  round: (n, d) => round(n, d),
};

export default NumberService;
