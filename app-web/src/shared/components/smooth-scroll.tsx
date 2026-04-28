import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from '@tanstack/react-router';

export function SmoothScroll() {
	const location = useLocation();

	useEffect(() => {
		const isDashboard =
			location.pathname.startsWith('/admin') ||
			location.pathname.startsWith('/student');

		if (isDashboard) {
			return;
		}

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1 - 2 ** (-10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			touchMultiplier: 2,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, [location.pathname]);

	return null;
}
