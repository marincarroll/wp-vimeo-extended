window.onload = () => {
	const videos = document.querySelectorAll('.wp-block-embed-vimeo');

	videos.forEach((video) => {
		const iframe = video.querySelector('iframe'),
			player = new Vimeo.Player(iframe);

		if (!video.hasAttribute('data-background')) {
			player.on('play', function () {
				video.setAttribute('data-playing', true);
			});

			player.on('pause', function () {
				video.removeAttribute('data-playing');
			});
		}

		if (video.hasAttribute('data-st')) {
			monitorPlayback(player, video);
		}
	});
};

function monitorPlayback(p, el) {
	const playing =
			p.currentTime > 0 &&
			!p.paused &&
			!p.ended &&
			p.readyState > p.HAVE_CURRENT_DATA,
		replay = el.hasAttribute('data-st-reverse') ? true : false;

	const options = {
		threshold: [0.25, 0.75],
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (!playing) {
					p.play();
				}
				if (!replay) {
					observer.unobserve(entry.target);
				}
			} else {
				p.pause();
				p.setCurrentTime(0);
			}
		});
	}, options);
	observer.observe(el);
}
