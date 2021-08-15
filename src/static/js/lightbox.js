function openLightbox(event) {
  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');

  image.src = event.target.src;
  image.alt = event.target.alt;
  caption.innerHTML = event.target.alt;

  toggleLightbox();
}

function toggleLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.toggle('open');
}

function closeLightbox() {
  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');

  image.removeAttribute('src');
  image.alt = undefined;
  caption.innerHTML = undefined;

  toggleLightbox();
}
