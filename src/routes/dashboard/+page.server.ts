import { fail, redirect, type Actions } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { prisma } from '$lib/prisma';
import path from 'path';
import fs from 'fs/promises';

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/');
	},
	create: async ({ request, locals }) => {
		console.log('CREATE TRIGGERED');
		// Ensure user is authenticated
		if (!locals.session || !locals.session.userId) {
			return redirect(302, '/');
		}

		const userId = locals.session.userId;
		const data = await request.formData();
		const weight = data.get('weight');
		const bodyfat = data.get('bodyfat') || null;
		const picture = data.get('picture') || null;

		// Validate weight
		if (!weight) {
			return fail(400, { weight, missing: true });
		}

		const weightNumber = Number(weight);
		if (isNaN(weightNumber) || weightNumber < 10 || weightNumber > 999) {
			return fail(400, { weight, unrealistic: true });
		}

		// Validate bodyfat (optional)
		let bfNumber: number | null = null;
		if (bodyfat) {
			bfNumber = Number(bodyfat);
			if (isNaN(bfNumber) || bfNumber < 3 || bfNumber > 99) {
				return fail(400, { bodyfat, unrealisticbf: true });
			}
		}

		// Handle image upload (optional)
		let savedFilePath: string | null = null;
		if (picture instanceof File && picture.size > 0) {
			const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
			const mimeType = picture.type;
			const extension = path.extname(picture.name).toLowerCase();

			if (!allowedMimeTypes.includes(mimeType)) {
				return fail(400, { picture, invalidFormat: true });
			}

			// Generate a unique filename
			const fileName = `progress_${Date.now()}${extension}`;
			const uploadDir = './static/uploads';

			// Ensure the uploads directory exists
			await fs.mkdir(uploadDir, { recursive: true });

			// Save the file
			const filePath = path.join(uploadDir, fileName);
			const buffer = Buffer.from(await picture.arrayBuffer());
			await fs.writeFile(filePath, buffer);
			savedFilePath = `/uploads/${fileName}`;
		}

		// Create DailyLog entry in database
		try {
			await prisma.dailyLog.create({
				data: {
					weight: weightNumber,
					bodyFat: bfNumber,
					pic: savedFilePath || '',
					userId: userId
				}
			});

			console.log('Daily log submitted');
		} catch (error) {
			console.error('Error creating log:', error);
			return fail(500, { error: 'Internal Server Error' });
		}
	}
};
