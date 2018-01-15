import moment from 'moment';

const DateService = {
  currentDate() {
    return moment();
  },
  dateFromString(str, format) {
    return moment(str, format);
  },
  dateToString(date, format) {
    return moment(date).format(format);
  },
  daysSince(date, format) {
    return moment().diff(this.dateFromString(date, format), 'days');
  },
};

export default new DateService();
