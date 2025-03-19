import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { prisma } from '$lib/prisma';

export const GET: RequestHandler = async ({ locals, url }) => {
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
			orderBy: { createdAt: 'desc' },
			take: 7
		});

		logs.reverse();

		return json({ logs, name: fullName });
	} catch (error) {
		console.error(error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
