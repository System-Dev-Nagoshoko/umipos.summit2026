import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
	const PROJECT_RSS = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIgVHeQ7JWG11Ld9ztQjyDw';
	const OFFICIAL_RSS = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCNMQaHzpu6nnxoiiGwo_OrA';
	const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' };

	try {
		const [projRes, offRes] = await Promise.allSettled([
			fetch(PROJECT_RSS, { headers }),
			fetch(OFFICIAL_RSS, { headers })
		]);

		const projXml = projRes.status === 'fulfilled' && projRes.value.ok ? await projRes.value.text() : '';
		const offXml = offRes.status === 'fulfilled' && offRes.value.ok ? await offRes.value.text() : '';

		const projEntries = (projXml.match(/<entry>[\s\S]*?<\/entry>/g) || []).map((entry) =>
			entry.replace('</title>', ' [海のサインプロジェクト]</title>')
		);
		const offEntries = offXml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

		const combinedXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
  <title>海のサインプロジェクト YouTubeフィード</title>
  ${[...projEntries, ...offEntries].join('\n  ')}
</feed>`;

		return new Response(combinedXml, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'no-store, max-age=0'
			}
		});
	} catch {
		return new Response('Error fetching YouTube RSS', { status: 500 });
	}
};
