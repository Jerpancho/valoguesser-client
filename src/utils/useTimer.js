import { useCallback, useRef, useEffect, useState } from 'react';

const useTimer = (onDone, timeInSeconds) => {
	const [timer, setTimer] = useState(timeInSeconds);
	const [play, setPlay] = useState(false);
	const interval = useRef(null);

	const countDown = useCallback(() => {
		interval.current = setInterval(() => {
			setTimer((prev) => {
				const newNumber = prev - 0.1;
				return newNumber <= 0 ? 0 : newNumber.toFixed(1);
			});
		}, 100);
		return null;
	}, []);

	const pause = () => {
		if (interval.current) {
			clearInterval(interval.current);
		}
		setPlay(false);
	};
	const start = useCallback(() => {
		setPlay(true);
	}, []);

	const restart = () => {
		if (interval.current) {
			clearInterval(interval);
		}
		setTimer(timeInSeconds);
		countDown();
		setPlay(true);
	};

	// once the timer reaches 0, pause and clear the countdown and perform your callback action
	useEffect(() => {
		if (interval.current && timer <= 0) {
			pause();
			interval.current = null;
			onDone();
		}
	}, [timer, onDone]);

	// when the hook is invoked starts the countdown,
	// pause when the play is false
	useEffect(() => {
		if (play === true) {
			countDown();
		}
		return () => {
			clearInterval(interval.current);
		};
	}, [countDown, play]);

	return {
		time: timer,
		pause,
		start,
		restart,
	};
};

export default useTimer;
