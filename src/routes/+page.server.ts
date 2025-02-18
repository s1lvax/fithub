import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await prisma.user.findMany();

	const formattedUsers = users.map((user) => ({
		...user,
		name: `${user.firstName} ${user.familyName}`
	}));

	return { users: formattedUsers };
};
