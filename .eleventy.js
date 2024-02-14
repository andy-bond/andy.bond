import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginBundler from '@11ty/eleventy-plugin-bundle';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc';
import dotenvFlow from 'dotenv-flow';
import {
	lightningCssPlugin,
	transformCssBundle,
} from './plugins/css-pipeline.plugin.js';
import { transformHtmlFile } from './plugins/html-pipeline.plugin.js';
import { transformJsBundle } from './plugins/js-pipeline.plugin.js';

// Load .env
dotenvFlow.config();

export default async function (eleventyConfig) {
	/* File Copy */
	eleventyConfig.addPassthroughCopy('./src/static/fonts');
	eleventyConfig.addPassthroughCopy('./src/static/favicon');

	/* Plugins */
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: [
			'src/_components/**/*.webc',
			'npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc',
		],
	});

	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	/* Asset Pipelines */
	eleventyConfig.addPlugin(lightningCssPlugin);
	eleventyConfig.addPlugin(pluginBundler, {
		transforms: [transformCssBundle, transformJsBundle],
	});
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		extensions: 'html',
		urlPath: '/static/img/',
		formats: ['webp', 'jpeg'],
		defaultAttributes: {
			loading: 'lazy',
			decoding: 'async',
		},
	});
	eleventyConfig.addTransform('htmlmin', transformHtmlFile);

	return {
		dir: {
			input: 'src',
			includes: '_components',
			layouts: '_layouts',
		},
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	};
}
