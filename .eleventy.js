import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginBundler from '@11ty/eleventy-plugin-bundle';
import eleventyRssPlugin from '@11ty/eleventy-plugin-rss';
import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import eleventyWebcPlugin from '@11ty/eleventy-plugin-webc';
import pluginTOC from '@uncenter/eleventy-plugin-toc';
import dotenvFlow from 'dotenv-flow';
import EleventyPluginIcons from 'eleventy-plugin-icons';
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import markdownItAnchor from 'markdown-it-anchor';
import fs from 'node:fs';
import path from 'node:path';
import {
	lightningCssPlugin,
	transformCssBundle,
} from './plugins/css-pipeline.plugin.js';
import { transformHtmlFile } from './plugins/html-pipeline.plugin.js';
import { transformJsBundle } from './plugins/js-pipeline.plugin.js';
import { PostsByCategory } from './src/_collections/posts-by-category.js';
import { Posts } from './src/_collections/posts.js';

// Load .env
dotenvFlow.config();

export default async function (eleventyConfig) {
	/* Collections */
	eleventyConfig.addCollection('posts', Posts);
	eleventyConfig.addCollection('postsByCategory', PostsByCategory);

	/* File Copy */
	eleventyConfig.addPassthroughCopy('./src/static/fonts');
	eleventyConfig.addPassthroughCopy('./src/static/favicon');

	/* WebC */
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: ['src/_components/**/*.webc'],
	});

	/* Markdown */
	eleventyConfig.amendLibrary('md', (mdLib) => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: 'before',
				class: 'header-anchor',
				symbol: '#',
				ariaHidden: false,
			}),
			level: [2, 3, 4],
			slugify: eleventyConfig.getFilter('slugify'),
		});
	});

	eleventyConfig.addPlugin(pluginTOC, {
		ul: true,
		ignoredElements: ['a'],
	});

	/* RSS */
	eleventyConfig.addPlugin(eleventyRssPlugin);

	/* Syntax Highlighting */
	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	/* OpenGraph Images */
	eleventyConfig.addPlugin(EleventyPluginOgImage, {
		outputDir: 'static/img/social-preview',
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

	/* Icons */
	eleventyConfig.addPlugin(EleventyPluginIcons, {
		sources: [
			{
				name: 'lucide',
				path: 'node_modules/lucide-static/icons',
				default: true,
			},
			{
				name: 'simple-icons',
				path: 'node_modules/simple-icons/icons',
			},
		],
		icon: {
			class: (name, source) => `${source} icon icon-${name}`,
			id: (name, source) => `${source}-${name}-icon`,
		},
	});

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
