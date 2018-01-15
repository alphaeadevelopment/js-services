import { mapValues, values } from 'lodash';
import update from 'immutability-helper';

class CalculationService {
  weighted(weights) {
    return vv => (
      update(vv, mapValues(vv, (v, k) => ({
        $apply: () => v * (weights[k] || 1),
      })))
    );
  }

  bounds(v) {
    return Math.max(0, Math.min(1, v));
  }

  range(min, max) {
    return (v) => {
      if (min > max) return 1 - this.range(max, min)(v);
      return this.bounds((v - min) / (max - min));
    };
  }

  ragRanger(a, g) {
    return this.range(a - (g - a), g + (g - a));
  }

  sumValues(vv) {
    return values(vv).reduce((acc, v) => acc + v, 0);
  }

  weightedAverage(weights) {
    const weightedValues = this.weighted(weights);
    const denominator = this.sumValues(weights);
    return vv => this.sumValues(weightedValues(vv)) / denominator;
  }
}

export default new CalculationService();
