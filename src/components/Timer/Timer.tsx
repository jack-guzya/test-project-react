import { FormEvent, ChangeEvent, useState } from 'react';
import { useTimer } from '../../hooks/use-timer';
import { Section } from '../../common/Section';
import { Title } from '../../common/Title';
import style from './Timer.module.css';

export const Timer: React.FC = () => {
  const [time, setTime] = useState('');
  const [GMT, setGMT] = useState('3');
  const [videoID, setVideoID] = useState('G1IbRujko-A');
  const [remainingTime, updateRemainingTime] = useState<Array<number> | null>(null);

  const [start, stop, state] = useTimer(
    () => console.log('finish'),
    (remainingTime) => updateRemainingTime(remainingTime)
  );

  const handleTimerChange = (e: ChangeEvent<HTMLInputElement>) => setTime(e.currentTarget.value);
  const handleGMTChange = (e: ChangeEvent<HTMLInputElement>) => setGMT(e.currentTarget.value);
  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => setVideoID(e.currentTarget.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (time) {
      start({ time, GMT: +GMT });
    }
  };

  const stopTimer = () => {
    stop();
    updateRemainingTime(null);
  };

  const HOURS_INDEX = 0;
  const MINUTES_INDEX = 1;
  const SECONDS_INDEX = 2;

  return (
    <Section>
      <Title>Timer</Title>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Time:
          <input name="time" type="time" value={time} onChange={handleTimerChange} />
        </label>

        <label className={style.label}>
          GMT:
          <input
            name="gmt"
            type="number"
            value={GMT}
            min={-12}
            max={14}
            onChange={handleGMTChange}
          />
        </label>

        <label className={style.label}>
          Youtube Video ID:
          <input name="link" type="text" value={videoID} onChange={handleLinkChange} />
        </label>

        <button type="submit">Start</button>
        <button type="button" onClick={stopTimer}>
          Stop
        </button>
      </form>

      {state === 'start' && remainingTime && (
        <div className={style.timer}>
          <span>{remainingTime[HOURS_INDEX]}</span>:<span>{remainingTime[MINUTES_INDEX]}</span>:
          <span>{remainingTime[SECONDS_INDEX]}</span>
        </div>
      )}

      {state === 'finish' && (
        <iframe
          className={style.player}
          title="Youtube player"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src={`https://youtube.com/embed/${videoID}?autoplay=1&mute=1`}
        />
      )}
    </Section>
  );
};
