import { prisma } from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { testPin } from '$lib/utils/pin/testPin';
import { verify } from '@node-rs/argon2';
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async () => {
	const users = await prisma.user.findMany();

	const formattedUsers = users.map((user) => ({
		...user,
		name: `${user.firstName} ${user.familyName}`
	}));

	return { users: formattedUsers };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const userId = formData.get('userId');
		const pin = formData.get('pin');

		if (!userId) {
			return fail(400);
		}

		if (!pin) {
			return fail(400, { pin, missing: true });
		}

		//test pin
		const pinString = pin.toString();
		const validation = testPin(pinString);

		if (!validation.valid && validation.error) {
			return fail(400, { pin, [validation.error]: true });
		}

		//fetch user and compare
		const results = await prisma.user.findMany({
			where: {
				id: userId.toString()
			}
		});

		const existingUser = results.at(0);

		if (!existingUser) {
			return fail(400);
		}

		const validPin = await verify(existingUser.pinHash, pin.toString(), {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPin) {
			return fail(400, { pin, wrong: true });
		}

		//create session
		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/dashboard');
	}
};
