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

		const latestLogs = await prisma.dailyLog.findMany({
			where: { userId: userId },
			orderBy: { createdAt: 'desc' },
			take: 2
		});

		return json({ logs: latestLogs, name: fullName });
	} catch (error) {
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
