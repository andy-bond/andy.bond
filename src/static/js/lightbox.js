var lightboxElements = [
  {
    attribute: 'camera',
    container: 'metadata-camera',
    text: 'metadata-camera-text',
  },
  {
    attribute: 'fstop',
    container: 'metadata-fstop',
    text: 'metadata-fstop-text',
    prefix: 'ƒ/',
  },
  {
    attribute: 'exposure',
    container: 'metadata-exposure',
    text: 'metadata-exposure-text',
  },
  {
    attribute: 'focalLength',
    container: 'metadata-focalLength',
    text: 'metadata-focalLength-text',
    suffix: 'mm',
  },
  {
    attribute: 'iso',
    container: 'metadata-iso',
    text: 'metadata-iso-text',
    prefix: 'ISO',
  },
  {
    attribute: 'location',
    container: 'metadata-location',
    text: 'metadata-location-text',
  },
];

// eslint-disable-next-line no-unused-vars
function openLightbox(event) {
  const area = document.getElementById('lightbox-image-area');
  const caption = document.getElementById('lightbox-caption');
  const target = event.target;

  area.innerHTML = target.parentElement.outerHTML;
  caption.innerHTML = target.alt;

  lightboxElements.forEach((item) => {
    const attribute = target.getAttribute(item.attribute);
    if (attribute !== 'undefined') {
      const textElement = document.getElementById(item.text);
      const containerElement = document.getElementById(item.container);
      textElement.innerHTML = `${item?.prefix ?? ''}${attribute}${
        item?.suffix ?? ''
      }`;
      containerElement.classList.remove('hidden');
    }
  });

  toggleLightbox();
}

function toggleLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.toggle('open');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');

  if (lightbox?.classList?.contains('open')) {
    const area = document.getElementById('lightbox-image-area');
    const caption = document.getElementById('lightbox-caption');

    area.innerHTML = '';
    caption.innerHTML = '';

    lightboxElements.forEach((item) => {
      const textElement = document.getElementById(item.text);
      const containerElement = document.getElementById(item.container);
      textElement.innerHTML = '';
      containerElement.classList.add('hidden');
    });

    toggleLightbox();
  }
}

window.addEventListener(
  'click',
  (event) => {
    if (event.target === document.getElementById('lightbox')) {
      closeLightbox();
    }
  },
  false
);

window.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  },
  false
);
