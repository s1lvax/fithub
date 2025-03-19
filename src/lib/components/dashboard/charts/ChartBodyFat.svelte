<script lang="ts">
	import Chart from 'chart.js/auto';

	let logs: { createdAt: Date; bodyFat: number }[] = [];
	let name: string = '';

	// Function to format the date
	const formatDate = (date: Date): string => {
		const currentYear = new Date().getFullYear();
		const logYear = date.getFullYear();

		if (logYear === currentYear) {
			return `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
		} else {
			return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
		}
	};

	$effect(() => {
		const fetchLogs = async () => {
			try {
				const response = await fetch('/api/logs/chart/bf');
				const data = await response.json();

				if (data.error) {
					console.error(data.error);
					return;
				}

				logs = data.logs;
				name = data.name;

				// Get the canvas element and check if it exists
				const canvas = document.getElementById('bodyfat');
				if (!canvas) {
					console.error('Canvas element not found');
					return;
				}

				const ctx = (canvas as HTMLCanvasElement).getContext('2d');
				if (!ctx) {
					console.error('Could not get canvas context');
					return;
				}

				const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

				new Chart(ctx, {
					type: 'line',
					data: {
						labels: logs.map((log) => formatDate(new Date(log.createdAt))),
						datasets: [
							{
								label: 'Body Fat (%)',
								data: logs.map((log) => log.bodyFat),
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
								grid: {
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
									callback: (value: number | string) => {
										if (typeof value === 'number') {
											return value + ' %';
										}
										return value;
									}
								},
								grid: {
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
			} catch (error) {
				console.error('Failed to fetch logs:', error);
			}
		};

		fetchLogs();
	});
</script>

<div class="rounded-lg bg-white p-4 shadow-lg dark:bg-black">
	<canvas id="bodyfat" class="h-64 w-full"></canvas>
</div>
