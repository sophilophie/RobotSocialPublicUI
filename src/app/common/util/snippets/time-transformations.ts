import * as moment from 'moment';

export function getPostTimeText(timeString: Date): string {
  return moment(new Date(timeString)).format('dddd MMMM DD YYYY hh:mm a');
}
