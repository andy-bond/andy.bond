import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginBundler from '@11ty/eleventy-plugin-bundle';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc';
import dotenvFlow from 'dotenv-flow';
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import fs from 'node:fs';
import path from 'node:path';
import {
	lightningCssPlugin,
	transformCssBundle,
} from './plugins/css-pipeline.plugin.js';
import { transformHtmlFile } from './plugins/html-pipeline.plugin.js';
import { transformJsBundle } from './plugins/js-pipeline.plugin.js';
import { PostsByCategory } from './src/_collections/posts-by-category.js';

// Load .env
dotenvFlow.config();

export default async function (eleventyConfig) {
	/* Collections */
	eleventyConfig.addCollection('postsByCategory', PostsByCategory);

	/* File Copy */
	eleventyConfig.addPassthroughCopy('./src/static/fonts');
	eleventyConfig.addPassthroughCopy('./src/static/favicon');

	/* Plugins */
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: ['src/_components/**/*.webc'],
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
		widths: [300, 600, 1200],
		defaultAttributes: {
			loading: 'lazy',
			decoding: 'async',
			sizes: '100vw',
		},
		filenameFormat: (id, src, width, format) => {
			const { name } = path.parse(src);
			return `${name}-${width}w.${format}`;
		},
	});
	eleventyConfig.addTransform('htmlmin', transformHtmlFile);

	eleventyConfig.addPlugin(EleventyPluginOgImage, {
		outputDir: '_site/static/img/social-preview',
		urlPath: '/static/img/social-preview',
		satoriOptions: {
			fonts: [
				{
					name: 'Poppins',
					data: fs.readFileSync('src/static/fonts/poppins-v19-latin-700.woff'),
					weight: 700,
					style: 'normal',
				},
				{
					name: 'Poppins',
					data: fs.readFileSync('src/static/fonts/poppins-v19-latin-500.woff'),
					weight: 500,
					style: 'normal',
				},
			],
		},
	});

	/* Dev Server */
	eleventyConfig.setServerOptions({
		domDiff: false,
	});

	return {
		dir: {
			input: 'src',
			includes: '_components',
			layouts: '_layouts',
		},
		htmlTemplateEngine: 'webc',
		markdownTemplateEngine: 'njk',
	};
}
