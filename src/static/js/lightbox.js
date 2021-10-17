function openLightbox(event) {
  const area = document.getElementById('lightbox-image-area');
  const caption = document.getElementById('lightbox-caption');

  area.innerHTML = event.target.parentElement.outerHTML;
  caption.innerHTML = event.target.alt;

  toggleLightbox();
}

function toggleLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.toggle('open');
}

function closeLightbox() {
  const area = document.getElementById('lightbox-image-area');
  const caption = document.getElementById('lightbox-caption');

  area.innerHTML = undefined;
  caption.innerHTML = undefined;

  toggleLightbox();
}
