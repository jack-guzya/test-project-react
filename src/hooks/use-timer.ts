import { useState, useEffect } from 'react';

type TimerParams = { time: string; GMT: number };
type UseTimer = (
  cb: () => void,
  intervalCb?: (time: Array<number>) => void
) => [(params: TimerParams) => void, () => void, TimerState];
type TimerState = 'start' | 'stop' | 'finish';

const HOURS_PER_DAY = 23;
const MINUTES_PER_HOUR = 59;
const SECONDS_PER_MINUTE = 59;
const MILLISECONDS_PER_SECOND = 999;

const getTime = (GMT: number = 0) => {
  const date = new Date();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const GMTHours = hours + GMT >= HOURS_PER_DAY ? hours + GMT - HOURS_PER_DAY : hours + GMT;

  return [GMTHours, minutes, seconds];
};

const parseStringTime = (value: string) => value.split(':').map((item) => +item);

const checkTime = (time: string, GMT: number) => {
  const [hours, minutes] = getTime(GMT);
  const [timerHours, timerMinutes] = parseStringTime(time);

  return hours === timerHours && minutes === timerMinutes;
};

const getDate = ([hours, minutes, seconds = 0]: Array<number>) =>
  new Date(0, 0, 0, hours, minutes, seconds);

const getTimeDifferent = (finishTime: Array<number>, startTime: Array<number>) =>
  getDate(finishTime).getTime() - getDate(startTime).getTime();

const getTimeFromMilliseconds = (milliseconds: number) => {
  const SECOND = MILLISECONDS_PER_SECOND;
  const MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
  const HOUR = MINUTES_PER_HOUR * MINUTE;
  const DAY = HOURS_PER_DAY * HOUR;

  const hours = Math.floor((milliseconds % DAY) / HOUR);
  const minutes = Math.floor(((milliseconds % DAY) % HOUR) / MINUTE);
  const seconds = Math.floor((((milliseconds % DAY) % HOUR) % MINUTE) / SECOND);

  return [hours, minutes, seconds];
};

const getRemainTime = (startTime: Array<number>, finishTime: Array<number>) => {
  let timeDifferent = getTimeDifferent(finishTime, startTime);

  if (timeDifferent > 0) {
    return getTimeFromMilliseconds(timeDifferent);
  }

  timeDifferent = getTimeDifferent(startTime, finishTime);
  const [hours, minutes, seconds] = getTimeFromMilliseconds(Math.abs(timeDifferent));

  return [
    Math.floor(HOURS_PER_DAY - hours),
    Math.floor(MINUTES_PER_HOUR - minutes),
    Math.floor(SECONDS_PER_MINUTE - seconds),
  ];
};

export const useTimer: UseTimer = (cb, intervalCb) => {
  const [timerParams, setParams] = useState<TimerParams | null>(null);
  const [state, setState] = useState<TimerState>('stop');

  const start = (timerParams: TimerParams) => {
    if (state === 'start') {
      return;
    }

    setState('start');
    setParams(timerParams);
  };

  const stop = () => {
    setState('stop');
    setParams(null);
  };

  const finish = () => {
    setState('finish');
    setParams(null);
  };

  const handleInterval = () => {
    if (!timerParams) {
      return;
    }

    const { time, GMT } = timerParams;
    const isFinish = checkTime(time, GMT);

    if (isFinish) {
      finish();
      cb();
    }

    intervalCb && intervalCb(getRemainTime(getTime(GMT), parseStringTime(time)));
  };

  useEffect(() => {
    let timerId: number;

    if (state === 'start') {
      timerId = window.setInterval(handleInterval, 1000);
    }

    return () => clearInterval(timerId);
  });

  return [start, stop, state];
};
