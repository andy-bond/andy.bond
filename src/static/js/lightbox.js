function openLightbox(event) {
  const area = document.getElementById('lightbox-image-area');
  const caption = document.getElementById('lightbox-caption');

  const camera = document.getElementById('metadata-camera');
  const fstop = document.getElementById('metadata-fstop');
  const exposure = document.getElementById('metadata-exposure');
  const focalLength = document.getElementById('metadata-focalLength');
  const iso = document.getElementById('metadata-iso');
  const location = document.getElementById('metadata-location');

  const target = event.target;

  area.innerHTML = target.parentElement.outerHTML;
  caption.innerHTML = target.alt;

  const cameraAttribute = target.getAttribute('camera');
  const fstopAttribute = target.getAttribute('fstop');
  const exposureAttribute = target.getAttribute('exposure');
  const focalLengthAttribute = target.getAttribute('focallength');
  const isoAttribute = target.getAttribute('iso');
  const locationAttribute = target.getAttribute('location');

  if (cameraAttribute !== 'undefined') {
    camera.innerHTML = cameraAttribute;
  }

  if (fstopAttribute !== 'undefined') {
    fstop.innerHTML = `ƒ/${fstopAttribute}`;
  }

  if (exposureAttribute !== 'undefined') {
    exposure.innerHTML = exposureAttribute;
  }

  if (focalLengthAttribute !== 'undefined') {
    focalLength.innerHTML = `${focalLengthAttribute}mm`;
  }

  if (isoAttribute !== 'undefined') {
    iso.innerHTML = `ISO${isoAttribute}`;
  }

  if (locationAttribute !== 'undefined') {
    location.innerHTML = locationAttribute;
  }

  toggleLightbox();
}

function toggleLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.toggle('open');
}

function closeLightbox() {
  const area = document.getElementById('lightbox-image-area');
  const caption = document.getElementById('lightbox-caption');

  const camera = document.getElementById('metadata-camera');
  const fstop = document.getElementById('metadata-fstop');
  const exposure = document.getElementById('metadata-exposure');
  const focalLength = document.getElementById('metadata-focalLength');
  const iso = document.getElementById('metadata-iso');
  const location = document.getElementById('metadata-location');

  area.innerHTML = '';
  caption.innerHTML = '';
  camera.innerHTML = '';
  fstop.innerHTML = '';
  exposure.innerHTML = '';
  focalLength.innerHTML = '';
  iso.innerHTML = '';
  location.innerHTML = '';

  toggleLightbox();
}
