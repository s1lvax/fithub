<script lang="ts">
	$effect(() => {
		const ctx = document.getElementById('bf').getContext('2d');
		const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

		// Generate mock body fat data with slight variations
		const generateBodyFatData = () => {
			let bf = 18; // Starting body fat % (example)
			return Array.from({ length: 12 }, () => (bf += (Math.random() - 0.5) * 0.8).toFixed(1));
		};

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: [
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec'
				],
				datasets: [
					{
						label: 'Body Fat (%)',
						data: generateBodyFatData(),
						borderColor: darkMode ? '#F3F4F6' : '#1F2937',
						backgroundColor: darkMode ? 'rgba(163, 230, 53, 0.2)' : 'rgba(22, 163, 74, 0.2)',
						borderWidth: 3,
						pointRadius: 0.5,
						pointBackgroundColor: darkMode ? '#A3E635' : '#16A34A',
						tension: 0.4,
						fill: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							color: darkMode ? '#F3F4F6' : '#1F2937',
							font: {
								size: 11,
								weight: 'bold'
							}
						}
					},
					tooltip: {
						mode: 'index',
						intersect: false
					}
				},
				scales: {
					x: {
						ticks: {
							color: darkMode ? '#F3F4F6' : '#1F2937',
							font: {
								size: 11
							}
						},
						gridLines: {
							color: darkMode ? '#374151' : '#E5E7EB'
						}
					},
					y: {
						beginAtZero: false,
						ticks: {
							color: darkMode ? '#F3F4F6' : '#1F2937',
							font: {
								size: 11
							},
							callback: (value) => value + ' %'
						},
						gridLines: {
							color: darkMode ? '#374151' : '#E5E7EB'
						}
					}
				},
				animation: {
					duration: 1200,
					easing: 'easeInOutQuad'
				}
			}
		});
	});
</script>

<div class="rounded-lg bg-white p-4 shadow-lg dark:bg-black">
	<canvas id="bf" class="h-64 w-full"></canvas>
</div>
