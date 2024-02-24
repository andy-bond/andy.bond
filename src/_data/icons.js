import {
	ArrowUp,
	BoxSelect,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Copyright,
	ExternalLink,
	FlaskConical,
	Globe,
	Home,
	Mail,
	Moon,
	Plane,
	Sun,
} from 'lucide-static';

import { Angular } from '../static/icons/angular.js';
import { CSharp } from '../static/icons/csharp.js';
import { CSS } from '../static/icons/css.js';
import { Cypress } from '../static/icons/cypress.js';
import { DotNetCore } from '../static/icons/dotnet-core.js';
import { Eleventy } from '../static/icons/eleventy.js';
import { GitHub } from '../static/icons/github.js';
import { HTML } from '../static/icons/html.js';
import { JavaScript } from '../static/icons/javascript.js';
import { Jest } from '../static/icons/jest.js';
import { LinkedIn } from '../static/icons/linkedin.js';
import { Mastodon } from '../static/icons/mastodon.js';
import { NgRx } from '../static/icons/ngrx.js';
import { RxJs } from '../static/icons/rxjs.js';
import { SQL } from '../static/icons/sql.js';
import { TypeScript } from '../static/icons/typescript.js';

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
		['home']: Home,
		['chevrons-left']: ChevronsLeft,
		['chevron-left']: ChevronLeft,
		['chevron-right']: ChevronRight,
		['chevrons-right']: ChevronsRight,
		['plane']: Plane,
		['box-select']: BoxSelect, // default icon
	};

	const custom = {
		['custom-angular']: Angular,
		['custom-mastodon']: Mastodon,
		['custom-linkedin']: LinkedIn,
		['custom-github']: GitHub,
		['custom-csharp']: CSharp,
		['custom-css']: CSS,
		['custom-dotnet-core']: DotNetCore,
		['custom-eleventy']: Eleventy,
		['custom-html']: HTML,
		['custom-javascript']: JavaScript,
		['custom-rxjs']: RxJs,
		['custom-sql']: SQL,
		['custom-typescript']: TypeScript,
		['custom-ngrx']: NgRx,
		['custom-jest']: Jest,
		['custom-cypress']: Cypress,
	};

	return {
		...custom,
		...icons,
	};
}
