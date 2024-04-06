import { minify } from 'html-minifier';
import { isProduction } from '../utilities/index.js';

export async function transformHtmlFile(content, outputPath) {
	if (!isProduction() || !outputPath.endsWith('.html')) {
		return content;
	}

	let minified = minify(content, {
		useShortDoctype: true,
		removeComments: true,
		collapseWhitespace: true,
		conservativeCollapse: true,
	});

	return minified;
}
