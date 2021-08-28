module.exports = (name, thing) => {
  const fixed = `${name[0].toUpperCase()}${name.slice(1)}`;
  let icon = '';
  let subtitle = '';
  switch (name) {
    case 'book':
      icon = '📚';
      subtitle = 'Author';
      break;
    case 'movie':
      icon = '🎬';
      subtitle = 'Director';
      break;
    case 'television':
      icon = '📺';
      break;
    case 'game':
      icon = '🕹️';
      subtitle = 'Developer';
      break;
    case 'restaurant':
      icon = '🍴';
      subtitle = 'Location';
      break;
    case 'podcast':
      icon = '🎙️';
      break;
    case 'music':
      icon = '🎵';
      subtitle = 'Artist';
      break;
  }

  switch (thing) {
    case 'tag':
      return `${icon} ${fixed}`;
    case 'subtitle':
      return subtitle;
  }
}
