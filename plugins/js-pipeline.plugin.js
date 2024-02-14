import { minify } from 'uglify-js';
import { isProduction } from '../utilities/index.js';

export async function transformJsBundle(content) {
	if (!isProduction() || this.type !== 'js') {
		return content;
	}

	let minified = minify(content);
	if (minified.error) {
		console.log('UglifyJS error: ', minified.error);
		return content;
	}
	return minified.code;
}
