import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
	const TMDB_KEY = process.env.TMDB_KEY;
	const url = `https://api.themoviedb.org/3/account/20625628/rated/movies?api_key=${TMDB_KEY}&sort_by=created_at.desc`;

	try {
		const moviesResponse = await EleventyFetch(url, {
			duration: '1d',
			type: 'json',
			fetchOptions: {
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${TMDB_KEY}`,
				},
			},
		});

		const movies = [];

		moviesResponse.results?.forEach((movie) => {
			const image = `https://image.tmdb.org/t/p/w500${movie['poster_path']}`;
			const link = `https://www.themoviedb.org/movie/${movie.id}`;

			movies.push({
				id: movie.id,
				label: movie.title,
				rating: movie.rating,
				image,
				link,
			});
		});

		return movies.slice(0, 8);
	} catch (error) {
		console.log('Error: Failed to parse Trakt movies', error);
		return [];
	}
}
