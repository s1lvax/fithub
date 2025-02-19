import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/prisma';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	} else {
		const userData = await prisma.user.findUnique({
			where: { id: event.locals.user.id }
		});

		if (userData) {
			return {
				userData: {
					...userData,
					name: `${userData.firstName} ${userData.familyName}`
				}
			};
		}

		return { userData: null };
	}
};
