// Storage

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

const STORAGE_PREFIX = 'andy.bond';
const LOCALSTORE_AVAILABLE = storageAvailable('localStorage');

// Utilities

function isNotNullOrUndefined(value) {
  return value !== null && value !== undefined;
}

// Constants & Elements

const DOCUMENT_ELEMENT = document.documentElement;
const THEME_KEY = `${STORAGE_PREFIX}-theme`;
const THEME_CLASS_DARK = 'dark';
const THEME_CLASS_LIGHT = 'light';

// Theme Functions

function setThemeKey(value) {
  if (LOCALSTORE_AVAILABLE) {
    localStorage.setItem(THEME_KEY, value);
  }
}

function getThemeFromStorage() {
  if (LOCALSTORE_AVAILABLE) {
    return localStorage.getItem(THEME_KEY);
  }
  return undefined;
}

// eslint-disable-next-line no-unused-vars
function toggleTheme() {
  DOCUMENT_ELEMENT.classList.toggle(THEME_CLASS_DARK);
  setThemeKey(
    getThemeFromStorage() === THEME_CLASS_DARK
      ? THEME_CLASS_LIGHT
      : THEME_CLASS_DARK
  );
}

// Initialization

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initalThemeFromStorage = getThemeFromStorage();
const initialThemeIsDark = isNotNullOrUndefined(initalThemeFromStorage) ? initalThemeFromStorage === 'dark' : systemTheme;

if (initialThemeIsDark) {
  DOCUMENT_ELEMENT.classList.add(THEME_CLASS_DARK);
} else {
  DOCUMENT_ELEMENT.classList.remove(THEME_CLASS_DARK);
}
setThemeKey(initialThemeIsDark ? THEME_CLASS_DARK : THEME_CLASS_LIGHT);
