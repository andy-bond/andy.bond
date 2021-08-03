function handleScroll() {
  const scrollingElement = document.body;
  const scrollToTopBtn = document.getElementById('back-to-top-btn');
  const scrollTotal = scrollingElement.scrollHeight - scrollingElement.clientHeight;
  if ((scrollingElement.scrollTop / scrollTotal) > 0.50) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

function scrollToTop() {
  const scrollingElement = document.body;
  scrollingElement.scrollTo({ top: 0, behavior: 'smooth' });
}
