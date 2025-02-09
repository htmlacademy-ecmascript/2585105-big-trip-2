import dayjs from 'dayjs';
import { getRandomPositiveInteger } from '../utils/common.js';
import { duration } from '../const.js';

let date = dayjs().subtract(getRandomPositiveInteger(0, duration.DAY), 'day').toDate();

function getDate({ next }) {
  const minsGap = getRandomPositiveInteger(0, duration.MIN);
  const hoursGap = getRandomPositiveInteger(0, duration.HOUR);
  const daysGap = getRandomPositiveInteger(0, duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
}

export { getDate };
