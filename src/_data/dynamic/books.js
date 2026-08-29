import Fetch from '@11ty/eleventy-fetch';

const HARDCOVER_API_URL = 'https://api.hardcover.app/v1/graphql';
const HARDCOVER_API_KEY = process.env.HARDCOVER_API_KEY;
const HARDCOVER_USER_ID = process.env.HARDCOVER_USER_ID;
const HARDCOVER_BOOK_URL = 'https://hardcover.app/books';

const GRAPHQL_QUERY = `
# Book Object
fragment BookInfo on books {
	slug
  title
  image {
    url
  }
  contributions {
    author {
      name
    }
  }
}

# Request User Stats by ID
query ReadingList($userId: Int!) {
  currentlyReading: user_books(
    where: {user_id: {_eq: $userId}, status_id: {_eq: 2}}
    order_by: {updated_at: desc}
  ) {
    status_id
    rating
    book {
      ...BookInfo
    }
  }
  recentlyRead: user_books(
    where: {user_id: {_eq: $userId}, status_id: {_eq: 3}}
    order_by: {last_read_date: desc}
    limit: 8
  ) {
    status_id
    rating
    last_read_date
    book {
      ...BookInfo
    }
  }
}
`;

export default async function () {
	try {
		const response = await Fetch(HARDCOVER_API_URL, {
			duration: '4h',
			type: 'json',
			fetchOptions: {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${HARDCOVER_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					operationName: 'ReadingList',
					query: GRAPHQL_QUERY,
					variables: { userId: HARDCOVER_USER_ID },
				}),
			},
		});

		const { currentlyReading, recentlyRead } = response.data;

		const entries = [...currentlyReading, ...recentlyRead];

		return entries
			.map((entry) => {
				const title = entry.book.title;
				const author = entry.book.contributions[0].author.name;
				const image = entry.book.image.url;
				const link = `${HARDCOVER_BOOK_URL}/${entry.book.slug}`;
				const label = `${title} by ${author}`;

				return {
					title,
					author,
					image,
					label,
					link,
				};
			})
			.slice(0, 8);
	} catch (error) {
		console.log('Error: Failed to parse Hardcover', error);
		return [];
	}
}
