function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const themeKey = 'andy.bond-theme';
const available = storageAvailable('localStorage');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
let dark = system;

if (available) {
  dark = localStorage.getItem(themeKey) === 'dark';
}

if (dark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

if (available) {
  localStorage.setItem(themeKey, dark ? 'dark' : 'light');
}

// eslint-disable-next-line no-unused-vars
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  if (available) {
    const current = localStorage.getItem(themeKey);
    localStorage.setItem(themeKey, current === 'dark' ? 'light' : 'dark');
  }
}
