import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const { filename } = params;

	const cdnUrl = `http://cdn/${filename}`; // Internal Docker URL

	const res = await fetch(cdnUrl);
	if (!res.ok) {
		return new Response('Image not found', { status: 404 });
	}

	// Stream image to client
	const contentType = res.headers.get('content-type') || 'application/octet-stream';
	return new Response(res.body, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
};
