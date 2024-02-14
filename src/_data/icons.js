import {
	ArrowUp,
	BoxSelect,
	Copyright,
	ExternalLink,
	FlaskConical,
	Globe,
	Mail,
	Moon,
	Sun,
} from 'lucide-static';

import { Angular } from '../static/icons/angular.js';
import { GitHub } from '../static/icons/github.js';
import { LinkedIn } from '../static/icons/linkedin.js';
import { Mastodon } from '../static/icons/mastodon.js';

export default async function () {
	const icons = {
		['sun']: Sun,
		['moon']: Moon,
		['arrow-up']: ArrowUp,
		['flask-conical']: FlaskConical,
		['copyright']: Copyright,
		['mail']: Mail,
		['external-link']: ExternalLink,
		['globe']: Globe,
		['box-select']: BoxSelect, // default icon
	};

	const custom = {
		['custom-angular']: Angular,
		['custom-mastodon']: Mastodon,
		['custom-linkedin']: LinkedIn,
		['custom-github']: GitHub,
	};

	return {
		...custom,
		...icons,
	};
}
