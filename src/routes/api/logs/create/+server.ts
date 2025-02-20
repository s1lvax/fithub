import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';
import path from 'path';
import fs from 'fs/promises';

export const POST: RequestHandler = async ({ request, locals }) => {
	console.log('CREATE TRIGGERED');

	// Ensure user is authenticated
	if (!locals.session || !locals.session.userId) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = locals.session.userId;
	const data = await request.formData();
	const weight = data.get('weight');
	const bodyfat = data.get('bodyfat') || null;
	const picture = data.get('picture') || null;

	// Validate weight
	if (!weight) {
		return json({ error: 'Missing weight' }, { status: 400 });
	}

	const weightNumber = Number(weight);
	if (isNaN(weightNumber) || weightNumber < 10 || weightNumber > 999) {
		return json({ error: 'Unrealistic weight' }, { status: 400 });
	}

	// Validate bodyfat (optional)
	let bfNumber: number | null = null;
	if (bodyfat) {
		bfNumber = Number(bodyfat);
		if (isNaN(bfNumber) || bfNumber < 3 || bfNumber > 99) {
			return json({ error: 'Unrealistic body fat percentage' }, { status: 400 });
		}
	}

	// Handle image upload (optional)
	let savedFilePath: string | null = null;
	if (picture instanceof File && picture.size > 0) {
		const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
		const mimeType = picture.type;
		const extension = path.extname(picture.name).toLowerCase();

		if (!allowedMimeTypes.includes(mimeType)) {
			return json({ error: 'Invalid image format' }, { status: 400 });
		}

		// Generate a unique filename
		const fileName = `progress_${Date.now()}${extension}`;
		const uploadDir = 'static/uploads';

		// Ensure the uploads directory exists
		await fs.mkdir(uploadDir, { recursive: true });

		// Save the file
		const filePath = path.join(uploadDir, fileName);
		const buffer = Buffer.from(await picture.arrayBuffer());
		await fs.writeFile(filePath, buffer);
		savedFilePath = `/uploads/${fileName}`;
	}

	// Create DailyLog entry in the database
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
		return json({ success: true });
	} catch (error) {
		console.error('Error creating log:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
