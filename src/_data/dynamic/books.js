import Fetch from '@11ty/eleventy-fetch';
import { JSDOM } from 'jsdom';

const appUrl = 'https://app.thestorygraph.com';
const currentUrl = `${appUrl}/currently-reading/andy_bond`;
const finishedUrl = `${appUrl}/books-read/andy_bond`;

function parseBookDom(bookNode) {
	const cover = bookNode.querySelector('.book-cover > a');
	const title = bookNode.querySelector(
		'.book-title-author-and-series a[href^="/books/"]'
	).textContent;
	const author = bookNode.querySelector(
		'.book-title-author-and-series a[href^="/authors/"]'
	).textContent;
	const imageNode = cover.querySelector('img');

	const link = appUrl + cover.getAttribute('href');
	const image = imageNode.getAttribute('src');
	const label = imageNode.getAttribute('alt');

	return {
		label,
		link,
		image,
		title,
		author,
	};
}

function parseBookPageDom(text, current) {
	const dom = new JSDOM(text);
	const body = dom.window.document.body;
	const books = [];

	const bookNodes = body.querySelectorAll('.book-pane[data-book-id]');

	bookNodes?.forEach((node) => {
		books.push({ ...parseBookDom(node), current });
	});

	return books;
}

export default async function () {
	const storygraphSession = process.env.STORYGRAPH_SESSION;
	const storygraphUserToken = process.env.STORYGRAPH_USER_TOKEN;

	const fetchOptions = {
		headers: {
			'user-agent':
				'Mozilla/5.0 (X11; Linux x86_64; rv:145.0) Gecko/20100101 Firefox/145.0',
			_storygraph_session: storygraphSession,
			remember_user_token: storygraphUserToken,
		},
	};

	try {
		const currentlyReadingText = await Fetch(currentUrl, {
			duration: '4h',
			type: 'text',
			fetchOptions,
		});
		const finishedReadingText = await Fetch(finishedUrl, {
			duration: '4h',
			type: 'text',
			fetchOptions,
		});

		const currentBooks = parseBookPageDom(currentlyReadingText, true);
		const finishedBooks = parseBookPageDom(finishedReadingText, false);

		const allBooks = [...currentBooks, ...finishedBooks];

		return allBooks.slice(0, 8);
	} catch (error) {
		console.log('Error: Failed to parse TheStoryGraph', error);
		return [];
	}
}
