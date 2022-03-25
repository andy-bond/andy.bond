const LIGHTBOX_ELEMENT = document.getElementById('lightbox');
const LIGHTBOX_IMAGE_AREA_ELEMENT = document.getElementById(
  'lightbox-image-area'
);
const LIGHTBOX_CAPTION_ELEMENT = document.getElementById('lightbox-caption');
const LIGHTBOX_METADATA_ELEMENTS = [
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

function openLightbox(event) {
  const target = event.target;

  LIGHTBOX_IMAGE_AREA_ELEMENT.innerHTML = target.parentElement.outerHTML;
  LIGHTBOX_CAPTION_ELEMENT.innerHTML = target.alt;

  LIGHTBOX_METADATA_ELEMENTS.forEach((item) => {
    const attribute = target.getAttribute(item.attribute);
    if (attribute) {
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
  LIGHTBOX_ELEMENT.classList.toggle('open');
}

function closeLightbox() {
  if (LIGHTBOX_ELEMENT?.classList?.contains('open')) {
    LIGHTBOX_IMAGE_AREA_ELEMENT.innerHTML = '';
    LIGHTBOX_CAPTION_ELEMENT.innerHTML = '';

    LIGHTBOX_METADATA_ELEMENTS.forEach((item) => {
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

const photoItems = document.getElementsByClassName('photo-item');
for (let i = 0; i < photoItems.length; i++) {
  photoItems[i].addEventListener('click', openLightbox, false);
}

const closeLightboxButton = document.getElementById('lightbox-close');
closeLightboxButton.addEventListener('click', closeLightbox, false);
