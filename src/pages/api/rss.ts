import type { APIRoute } from 'astro';

const RSS_URLS: Record<string, string> = {
	blog: 'https://umipos.com/koshien/repechage/author/%E6%B5%B7%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%B3%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88/feed/',
	note: 'https://note.com/umi_sign_project/rss',
	youtube: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCNMQaHzpu6nnxoiiGwo_OrA',
};

export const GET: APIRoute = async ({ url }) => {
	const type = url.searchParams.get('type') || 'blog';
	const targetUrl = RSS_URLS[type];

	if (!targetUrl) {
		return new Response('Invalid type parameter', { status: 400 });
	}

	try {
		const res = await fetch(targetUrl, {
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
