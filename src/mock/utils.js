import dayjs from 'dayjs';
import { getRandomPositiveInteger } from '../utils';
import { DURATION } from '../const';

let date = dayjs().subtract(getRandomPositiveInteger(0, DURATION.DAY), 'day').toDate();

function getDate({ next }) {
  const minsGap = getRandomPositiveInteger(0, DURATION.MIN);
  const hoursGap = getRandomPositiveInteger(0, DURATION.HOUR);
  const daysGap = getRandomPositiveInteger(0, DURATION.DAY);

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
