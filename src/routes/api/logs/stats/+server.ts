import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.session || !locals.session.userId) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = locals.session.userId;

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { firstName: true, familyName: true }
		});

		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		const fullName = `${user.firstName} ${user.familyName}`;

		const logs = await prisma.dailyLog.findMany({
			where: { userId },
			select: { weight: true, bodyFat: true, createdAt: true },
			orderBy: { createdAt: 'asc' }
		});

		if (logs.length === 0) {
			return json({ fullName, avgWeight: null, avgBodyFat: null, currentStreak: 0 });
		}

		const avgWeight = logs.reduce((sum, log) => sum + (log.weight ?? 0), 0) / logs.length;
		const avgBodyFat = logs.reduce((sum, log) => sum + (log.bodyFat ?? 0), 0) / logs.length;

		let streak = 0;
		let maxStreak = 0;
		let prevDate = null;

		for (const log of logs) {
			const logDate = new Date(log.createdAt).toISOString().split('T')[0];

			if (prevDate) {
				const diff =
					(new Date(logDate).getTime() - new Date(prevDate).getTime()) / (1000 * 60 * 60 * 24);
				if (diff === 1) {
					streak++;
				} else if (diff > 1) {
					streak = 1;
				}
			} else {
				streak = 1;
			}

			prevDate = logDate;
			maxStreak = Math.max(maxStreak, streak);
		}

		return json({
			fullName,
			avgWeight: avgWeight.toFixed(1),
			avgBodyFat: avgBodyFat.toFixed(1),
			currentStreak: maxStreak
		});
	} catch (error) {
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
