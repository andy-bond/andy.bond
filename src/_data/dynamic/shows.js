import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
	const TMDB_KEY = process.env.TMDB_KEY;
	const url = `https://api.themoviedb.org/3/account/20625628/rated/tv?api_key=${TMDB_KEY}&sort_by=created_at.desc`;

	try {
		const showsResponse = await EleventyFetch(url, {
			duration: '1d',
			type: 'json',
			fetchOptions: {
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${TMDB_KEY}`,
				},
			},
		});

		const shows = [];

		showsResponse.results?.forEach((show) => {
			const image = `https://image.tmdb.org/t/p/w500${show['poster_path']}`;
			const link = `https://www.themoviedb.org/tv/${show.id}`;

			shows.push({
				id: show.id,
				label: show.name,
				rating: show.rating,
				image,
				link,
			});
		});

		return shows.slice(0, 8);
	} catch (error) {
		console.log('Error: Failed to parse TMDB shows', error);
		return [];
	}
}
