// src/routes/dashboard/+page.server.ts
import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.session.userId) {
		return { logs: [] }; // Return empty logs if unauthorized
	}

	const userId = locals.session.userId;

	try {
		// Fetch all logs for the user, sorted by latest first
		const logs = await prisma.dailyLog.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' }
		});

		// Fetch the user's name
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { firstName: true, familyName: true }
		});

		return {
			logs,
			name: user ? `${user.firstName} ${user.familyName}` : 'User'
		};
	} catch (error) {
		console.error('Failed to fetch logs:', error);
		return { logs: [], name: 'User' }; // Return empty logs and default name on error
	}
};
