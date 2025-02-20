import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.session || !locals.session.userId) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = locals.session.userId;

	try {
		const weightEntries = await prisma.dailyLog.findMany({
			where: { userId: userId },
			select: { weight: true, createdAt: true },
			orderBy: { createdAt: 'asc' } // Oldest to newest
		});

		return json({ weights: weightEntries });
	} catch (error) {
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
