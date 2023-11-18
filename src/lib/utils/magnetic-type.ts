// Credit: https://youtu.be/qMyEjp3kqCg?si=ZZz1Co9XJsecRVbE

export const createMagneticType = () => {
	const magneticType = document.querySelectorAll('.magnetic-type');

	const easing = (x: number) => {
		const clampX = Math.max(0, Math.min(x, 1));
		return Math.sin((clampX * Math.PI) / 2);
	};

	magneticType.forEach((el) => {
		el.innerHTML = el.innerHTML
			.split('')
			.map((letter) => `<span class="magnetic-type__letter">${letter}</span>`)
			.join('');

		const children = el.querySelectorAll('.magnetic-type__letter');

		document.addEventListener('mousemove', (e) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			children.forEach((child) => {
				const bounds = child.getBoundingClientRect();
				const childX = bounds.left + bounds.width / 2;
				const childY = bounds.top + bounds.height / 2;

				const diffX = mouseX - childX;
				const diffY = mouseY - childY;

				const distance = Math.sqrt(diffX * diffX + diffY * diffY);

				const normalizedDistance = distance / 380;

				const weight = 900 - 500 * easing(normalizedDistance);

				(child as HTMLElement).style.fontVariationSettings = `'wght' ${weight}`;
			});
		});
	});
};
