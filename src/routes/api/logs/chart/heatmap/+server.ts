import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.session || !locals.session.userId) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = locals.session.userId;

	try {
		// Calculate the start date (1 year ago)
		const startDate = new Date();
		startDate.setFullYear(startDate.getFullYear() - 1);

		// Fetch logs from the last year
		const logs = await prisma.dailyLog.findMany({
			where: {
				userId,
				createdAt: { gte: startDate }
			},
			select: {
				createdAt: true,
				weight: true,
				bodyFat: true
			},
			orderBy: { createdAt: 'asc' }
		});

		// Format the data for the heatmap
		const heatmapData = logs.map((log) => ({
			date: log.createdAt,
			value: log.weight ? (log.bodyFat ? 2 : 1) : 0 // 0 = no data, 1 = weight only, 2 = weight + body fat
		}));

		return json({ heatmapData });
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
