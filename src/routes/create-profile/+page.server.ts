import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/prisma';
import { hash } from 'bcryptjs';

export const actions: Actions = {
	default: async ({ request }) => {
		const allusers = await prisma.user.findMany();

		const data = await request.formData();
		const familyName = data.get('familyName');
		const firstName = data.get('firstName');
		const pin = data.get('pin');

		if (allusers.length >= 3) {
			return fail(400, { pin, toomany: true });
		}

		//test if values exist
		if (!familyName || !firstName || !pin) {
			return fail(400, { pin, missing: true });
		}

		//test pin
		const pinString = pin.toString();
		if (!/^\d+$/.test(pinString)) {
			return fail(400, { pin, invalid: true });
		}

		if (pinString.length < 4 || pinString.length > 6) {
			return fail(400, { pin, incorrect: true });
		}

		//hash pin
		const hashedPin = await hash(pinString, 10);

		//if all checks, try to create user.
		try {
			await prisma.user.create({
				data: {
					familyName: familyName.toString(),
					firstName: firstName.toString(),
					pinHash: hashedPin
				}
			});
			//send 200 if registration worked
			return { success: true };
		} catch (error) {
			console.log('Error registering user: ' + error);
		}
	}
};
