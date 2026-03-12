'use client';
import React from 'react';

export function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);
	const lastRef = React.useRef(false);

	const onScroll = React.useCallback(() => {
		const next = window.scrollY > threshold;
		if (lastRef.current !== next) {
			lastRef.current = next;
			setScrolled(next);
		}
	}, [threshold]);

	React.useEffect(() => {
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	return scrolled;
}
