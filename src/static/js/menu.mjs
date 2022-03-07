export function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
}

const openMenuButton = document.getElementById('menu-btn');
const closeMenuButton = document.getElementById('close-menu');
openMenuButton.addEventListener('click', toggleMenu, false);
closeMenuButton.addEventListener('click', toggleMenu, false);
