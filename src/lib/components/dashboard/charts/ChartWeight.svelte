<script lang="ts">
	$effect(() => {
		const ctx = document.getElementById('weight').getContext('2d');
		const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

		// Generate mock weight data (simulating small variations)
		const generateWeightData = () => {
			let weight = 72; // Starting weight in kg
			return Array.from({ length: 12 }, () => (weight += (Math.random() - 0.5) * 2).toFixed(1));
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
						label: 'Weight (kg)',
						data: generateWeightData(),
						borderColor: darkMode ? '#F3F4F6' : '#1F2937',
						backgroundColor: darkMode ? 'rgba(56, 189, 248, 0.2)' : 'rgba(37, 99, 235, 0.2)',
						borderWidth: 3,
						pointRadius: 0.5,
						pointBackgroundColor: darkMode ? '#38BDF8' : '#2563EB',
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
							callback: (value) => value + ' kg'
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
	<canvas id="weight" class="h-64 w-full"></canvas>
</div>
