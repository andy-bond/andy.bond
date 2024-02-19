import { browserslistToTargets, transform } from 'lightningcss';
import { getBrowsersList, isProduction } from '../utilities/index.js';

// LightningCSS
async function minifyCss(input) {
	const production = isProduction();
	let targets = browserslistToTargets(getBrowsersList());

	let { code } = await transform({
		code: Buffer.from(input),
		minify: production,
		sourceMap: !production,
		targets,
		drafts: {
			nesting: true,
		},
	});

	return code;
}

export async function transformCssBundle(content) {
	if (this.type !== 'css') {
		return content;
	}

	return await minifyCss(content);
}

export function lightningCssPlugin(eleventyConfig) {
	// Recognize CSS as a "template languages"
	eleventyConfig.addTemplateFormats('css');

	// Compile Sass and process with LightningCSS
	eleventyConfig.addExtension('css', {
		outputFileExtension: 'css',
		compile: async function (inputContent, inputPath) {
			return async () => {
				return await minifyCss(inputContent);
			};
		},
	});
}
