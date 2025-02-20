import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ locals }) => {
	// Ensure user is authenticated
	if (!locals.session || !locals.session.userId) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = locals.session.userId;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	try {
		// Check if a log already exists for today
		const existingLog = await prisma.dailyLog.findFirst({
			where: {
				userId: userId,
				createdAt: {
					gte: today
				}
			}
		});

		if (existingLog) {
			return json({ submittedToday: true });
		}

		return json({ submittedToday: false });
	} catch (error) {
		console.error('Error checking daily log:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
