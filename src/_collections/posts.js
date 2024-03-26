import { displayDrafts } from '../../utilities/index.js';

export const Posts = (collection) => {
	const posts = collection
		.getFilteredByTag('blogpost')
		.filter((post) => {
			if (displayDrafts()) {
				return true;
			}

			return !post.data.draft;
		})
		.sort((a, b) => {
			const aDate = new Date(a.date);
			const bDate = new Date(b.date);
			return aDate.getTime() - bDate.getTime();
		});

	return posts;
};
