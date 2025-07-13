import Fetch from '@11ty/eleventy-fetch';
import Parser from 'rss-parser';

export default async function () {
	const url = 'https://pixelfed.social/users/andybond.atom';

	try {
		const text = await Fetch(url, {
			duration: '4h',
			type: 'text',
		});

		const parser = new Parser({
			customFields: {
				item: [['media:content', 'image']],
			},
		});

		const feed = await parser.parseString(text);

		const photos = [];

		feed.items?.forEach((item) => {
			photos.push({
				label: 'View image on Pixelfed',
				link: item.id,
				image: item.image['$']['url'],
			});
		});

		return {
			link: feed.link,
			gallery: photos.slice(0, 8),
		};
	} catch (error) {
		console.log('Error: Failed to parse Pixelfed', error);

		return {
			link: '',
			gallery: [],
		};
	}
}
