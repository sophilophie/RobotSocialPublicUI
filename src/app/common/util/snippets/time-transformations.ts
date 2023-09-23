import * as moment from 'moment';

export function getPostTimeText(timeString: Date): string {
  timeString = new Date(timeString);
  return moment(timeString).format('dddd MMMM DD YYYY hh:mm a');
}
