import browserslist from 'browserslist';
import fs from 'node:fs';
import path from 'node:path';

export function getBrowsersList() {
	// Set default transpiling targets
	let browserslistTargets = '> 0.2% and not dead';

	// Check for user's browserslist
	try {
		const pkg = path.resolve(__dirname, fs.realpathSync('package.json'));
		const userPkgBrowserslist = require(pkg);

		if (userPkgBrowserslist.browserslist) {
			browserslistTargets = userPkgBrowserslist.browserslist;
		} else {
			try {
				const browserslistrc = path.resolve(
					__dirname,
					fs.realpathSync('.browserslistrc')
				);

				fs.readFile(browserslistrc, 'utf8', (_err, data) => {
					if (data.length) {
						browserslistTargets = [];
					}

					data.split(/\r?\n/).forEach((line) => {
						if (line.length && !line.startsWith('#')) {
							browserslistTargets.push(line);
						}
					});
				});
			} catch (err) {
				// no .browserslistrc
			}
		}
	} catch (err) {
		// no package browserslist
	}

	return browserslist(browserslistTargets);
}

export function isProduction() {
	return process.env.SITE_ENV === 'production';
}

export function displayDrafts() {
	return process.env.BUILD_DRAFTS === 'true';
}

export function chunk(array, size) {
	return array.reduce((arr, item, index) => {
		return index % size === 0
			? [...arr, [item]]
			: [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
	}, []);
}
