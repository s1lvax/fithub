import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/prisma';
import { hashPin } from '$lib/utils/pin/hashPin';
import { testPin } from '$lib/utils/pin/testPin';

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
		const validation = testPin(pinString);

		if (!validation.valid && validation.error) {
			return fail(400, { pin, [validation.error]: true });
		}

		//hash pin
		const hashedPin = await hashPin(pinString);

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
