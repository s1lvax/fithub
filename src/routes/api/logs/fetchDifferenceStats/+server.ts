import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function GET({ url }) {
	try {
		const logId = url.searchParams.get('id');
		if (!logId) {
			return json({ error: 'Log ID is required' }, { status: 400 });
		}

		// Fetch the selected log
		const log = await prisma.dailyLog.findUnique({
			where: { id: logId }
		});

		if (!log) {
			return json({ error: 'Log not found' }, { status: 404 });
		}

		// Fetch the latest stats
		const latestStats = await prisma.dailyLog.findFirst({
			orderBy: { createdAt: 'desc' }
		});

		if (!latestStats) {
			return json({ error: 'No latest stats found' }, { status: 404 });
		}

		// Calculate percentage differences
		const weightDiff = ((latestStats.weight - log.weight) / log.weight) * 100;
		const bodyFatDiff =
			log.bodyFat && latestStats.bodyFat
				? ((latestStats.bodyFat - log.bodyFat) / log.bodyFat) * 100
				: null;

		return json({
			log,
			latestStats,
			weightDiff: weightDiff.toFixed(2),
			bodyFatDiff: bodyFatDiff ? bodyFatDiff.toFixed(2) : null
		});
	} catch (error) {
		console.error('Error fetching log difference:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
