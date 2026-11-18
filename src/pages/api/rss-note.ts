import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	const RSS_URL = 'https://note.com/umi_sign_project/rss';

	try {
		const res = await fetch(RSS_URL, {
			headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
		});
		if (!res.ok) throw new Error('Fetch failed');
		return new Response(await res.text(), {
			status: 200,
			headers: { 'Content-Type': 'application/xml; charset=utf-8' }
		});
	} catch {
		return new Response('Error fetching note RSS', { status: 500 });
	}
};
