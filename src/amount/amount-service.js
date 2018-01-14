import numberService from '../number'

const amountFormatter = numberService.formatter(2)

const AmountService = {
  format: n => amountFormatter(n),
}

export default AmountService
