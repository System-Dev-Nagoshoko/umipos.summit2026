import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	const RSS_URL = 'https://umipos.com/koshien/repechage/author/%E6%B5%B7%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%B3%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88/feed/';

	try {
		const res = await fetch(RSS_URL, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
			}
		});

		if (!res.ok) throw new Error('Fetch failed');
		const xmlText = await res.text();

		return new Response(xmlText, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'no-cache, no-store, must-revalidate'
			}
		});
	} catch (error) {
		return new Response('Error fetching RSS', { status: 500 });
	}
};
