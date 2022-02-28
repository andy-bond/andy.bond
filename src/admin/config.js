const { CMS } = window;

const WIDGET = (widget, label, name, rest) => ({
  widget,
  name,
  label,
  ...rest,
});

const TITLE_WIDGET = WIDGET('string', 'Title', 'title');
const DATE_WIDGET = WIDGET('datetime', 'Date', 'date', {
  time_format: false,
  picker_utc: true,
  format: 'YYYY-MM-DD',
  date_format: 'MM/DD/YYYY',
});
const IMAGE_WIDGET = WIDGET('image', 'Image', 'image', {
  choose_url: false,
  required: false,
});
const MARKDOWN_WIDGET = WIDGET('markdown', 'Body', 'body', { required: false });

const CATEGORIES_POST = [
  {
    label: 'Life',
    folder: 'life',
  },
  {
    label: 'Travel',
    folder: 'travel',
  },
  {
    label: 'Angular',
    folder: 'angular',
  },
  {
    label: 'Eleventy',
    folder: 'eleventy',
  },
];

const postCollections = () => {
  const collections = [];

  CATEGORIES_POST.forEach((category) => {
    const name = category.label.toLowerCase();
    collections.push({
      name: `${name}Posts`,
      label: `${category.label} Posts`,
      folder: `src/posts/${category.folder}`,
      create: true,
      fields: [
        TITLE_WIDGET,
        WIDGET('string', 'Description', 'description'),
        DATE_WIDGET,
        IMAGE_WIDGET,
        WIDGET('boolean', 'Contains Code Blocks (Enable Prism CSS)', 'prism', {
          required: false,
        }),
        MARKDOWN_WIDGET,
        WIDGET('hidden', 'Category', 'category', { default: name }),
      ],
    });
  });

  return collections;
};

const photos = {
  name: 'photos',
  label: 'Photos',
  files: [
    {
      name: 'gallery',
      label: 'Gallery',
      file: 'src/_data/gallery.json',
      fields: [
        WIDGET('string', 'Name', 'name'),
        WIDGET('image', 'Photo', 'photo'),
        WIDGET('relation', 'Category', 'category', {
          collection: 'categories',
          search_fields: ['photos.*.name'],
          value_field: 'photos.*.name',
          default: '',
        }),
        WIDGET('select', 'Size', 'size', {
          options: ['auto', 'tall', 'wide', 'both'],
          default: ['auto'],
        }),
        DATE_WIDGET,
        WIDGET('object', 'Metadata', 'metadata', {
          required: false,
          fields: [
            WIDGET('string', 'Camera', 'camera', { required: false }),
            WIDGET('string', 'F-Stop', 'fstop', { required: false }),
            WIDGET('string', 'Exposure Time', 'exposure', { required: false }),
            WIDGET('string', 'Focal Length', 'focalLength', {
              required: false,
            }),
            WIDGET('string', 'ISO', 'iso', { required: false }),
            WIDGET('string', 'Location', 'location', { required: false }),
          ],
        }),
      ],
    },
  ],
};

const CATEGORIES_REVIEW = [
  {
    label: 'Book',
    folder: 'books',
    subtitleLabel: 'Author(s)',
  },
  {
    label: 'Movie',
    folder: 'movies',
    subtitleLabel: 'Director(s)',
  },
  {
    label: 'Television',
    folder: 'television',
    subtitleLabel: 'Creator(s)',
  },
  {
    label: 'Podcast',
    folder: 'podcasts',
    subtitleLabel: 'Creator(s)',
  },
  {
    label: 'Music',
    folder: 'music',
    subtitleLabel: 'Artist(s)',
  },
  {
    label: 'Game',
    folder: 'games',
    subtitleLabel: 'Developer(s)',
  },
  {
    label: 'Restaurant',
    folder: 'restaurants',
    subtitleLabel: 'Location',
  },
];

const reviewCollections = () => {
  const collections = [];

  CATEGORIES_REVIEW.forEach((category) => {
    const name = category.label.toLowerCase();
    collections.push({
      name: `${name}Reviews`,
      label: `${category.label} Reviews`,
      folder: `src/reviews/${category.folder}`,
      create: true,
      fields: [
        TITLE_WIDGET,
        WIDGET('string', category.subtitleLabel, 'subtitle', {
          required: false,
        }),
        WIDGET('string', 'Series', 'series', { required: false }),
        WIDGET('number', 'Series Index', 'seriesIndex', {
          required: false,
          value_type: 'float',
        }),
        WIDGET('number', 'Rating', 'rating', {
          value_type: 'int',
          hint: '1 - Unbearable, 2 - Painful, 3 - Awful, 4 - Bad, 5 - Mediocre, 6 - Okay, 7 - Good, 8 - Great, 9 - Amazing, 10 - Masterpiece',
          min: 1,
          max: 10,
        }),
        DATE_WIDGET,
        WIDGET('image', 'Image', 'image'),
        WIDGET('relation', 'Series Review', 'seriesReview', {
          collection: `${name}Reviews`,
          search_fields: ['title', 'series'],
          display_fields: ['{{title}} - {{series}}'],
          value_field: '{{slug}}',
          default: '',
          required: false,
        }),
        MARKDOWN_WIDGET,
        WIDGET('hidden', 'Category', 'category', { default: name }),
      ],
    });
  });

  return collections;
};

const resume = {
  name: 'resume',
  label: 'Résumé',
  files: [
    {
      name: 'resume',
      label: 'Résumé',
      file: 'src/_data/resume.json',
      fields: [
        WIDGET('string', 'Name', 'name'),
        WIDGET('string', 'Occupation', 'occupation'),
        WIDGET('string', 'Location', 'location'),
        WIDGET('string', 'Pronouns', 'pronouns'),
        WIDGET('string', 'Email', 'email'),
        WIDGET('string', 'Website', 'website'),
        WIDGET('object', 'GitHub', 'github', {
          fields: [
            WIDGET('string', 'Handle', 'handle'),
            WIDGET('string', 'Link', 'link'),
          ],
        }),
        WIDGET('object', 'LinkedIn', 'linkedin', {
          fields: [
            WIDGET('string', 'Handle', 'handle'),
            WIDGET('string', 'Link', 'link'),
          ],
        }),
        WIDGET('text', 'Summary', 'summary'),
        WIDGET('list', 'Experience', 'experience', {
          fields: [
            WIDGET('string', 'Position', 'position'),
            WIDGET('datetime', 'Start Date', 'start'),
            WIDGET('datetime', 'End Date', 'end', { required: false }),
            WIDGET('string', 'Organization', 'organization'),
            WIDGET('string', 'Location', 'location'),
            WIDGET('boolean', 'Display', 'display'),
            WIDGET('text', 'Summary', 'summary'),
          ],
        }),
        WIDGET('list', 'Education', 'education', {
          fields: [
            WIDGET('string', 'Degree Earned', 'degree'),
            WIDGET('datetime', 'Start Date', 'start'),
            WIDGET('datetime', 'End Date', 'end', { required: false }),
            WIDGET('string', 'Organization', 'organization'),
            WIDGET('string', 'Location', 'location'),
            WIDGET('boolean', 'Display', 'display'),
          ],
        }),
        WIDGET('list', 'Skills', 'skills', {
          fields: [WIDGET('string', 'Name', 'name')],
        }),
      ],
    },
  ],
};

const categories = {
  name: 'categories',
  label: 'Categories',
  files: [
    {
      name: 'categories',
      label: 'Categories',
      file: 'src/_data/categories.json',
      fields: [
        WIDGET('list', 'Review Categories', 'reviews', {
          fields: [
            WIDGET('string', 'Name', 'name'),
            WIDGET('string', 'Icon', 'icon'),
            WIDGET('string', 'Subtitle', 'subtitle'),
          ],
        }),
        WIDGET('list', 'Photo Categories', 'photos', {
          fields: [
            WIDGET('string', 'Name', 'name'),
            WIDGET('string', 'Icon', 'icon'),
          ],
        }),
        WIDGET('list', 'Post Categories', 'posts', {
          fields: [
            WIDGET('string', 'Name', 'name'),
            WIDGET('string', 'Icon', 'icon'),
          ],
        }),
      ],
    },
  ],
};

const settings = {
  name: 'settings',
  label: 'Settings',
  files: [
    {
      name: 'navigation',
      label: 'Navigation',
      file: 'src/_data/navigation.json',
      fields: [
        WIDGET('list', 'Navigation Items', 'items', {
          fields: [
            WIDGET('string', 'Title', 'text'),
            WIDGET('string', 'URL', 'url'),
          ],
        }),
      ],
    },
    {
      name: 'metadata',
      label: 'Metadata',
      file: 'src/_data/metadata.json',
      fields: [
        WIDGET('string', 'Name', 'name'),
        WIDGET('string', 'Author', 'author'),
        WIDGET('string', 'URL', 'url'),
        WIDGET('string', 'Repository', 'repository'),
        WIDGET('number', 'Copyright Year', 'copyright'),
      ],
    },
  ],
};

const collections = [
  photos,
  ...postCollections(),
  ...reviewCollections(),
  resume,
  categories,
  settings,
];

const config = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  local_backend: true,
  media_folder: 'src/static/img',
  public_folder: 'src/static/img',
  site_url: 'https://andy.bond',
  editor: {
    preview: false,
  },
  collections,
};

/**
 * Initialize Netlify CMS with custom configuration
 */
CMS.init({ config });
