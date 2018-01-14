import { includes } from 'lodash'

const bespokeErrors = [301]

const isError = r => includes(bespokeErrors, r) || r >= 400

export default isError
