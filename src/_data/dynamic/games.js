import EleventyFetch from '@11ty/eleventy-fetch';
import { JSDOM } from 'jsdom';

const appUrl = 'https://www.backloggd.com';
const gamesUrl = `${appUrl}/u/LordGennai/games/`;

function parseGameDom(gameNode) {
  const image = gameNode
    .querySelector('.overflow-wrapper > .card-img')
    .getAttribute('src');
  const link =
    appUrl + gameNode.querySelector('.cover-link').getAttribute('href');
  const label = gameNode.querySelector('.game-text-centered').textContent;

  return {
    label,
    link,
    image,
  };
}

function parseGamesPageDom(text, current) {
  const dom = new JSDOM(text);
  const body = dom.window.document.body;
  const games = [];

  const gameNodes = body.querySelectorAll('.game-cover[game_id]');

  gameNodes?.forEach((node) => {
    games.push({ ...parseGameDom(node), current });
  });

  return games.slice(0, 4);
}

export default async function () {
  try {
    const gamesText = await EleventyFetch(gamesUrl, {
      duration: '1d',
      type: 'text',
    });

    const games = parseGamesPageDom(gamesText);

    return games;
  } catch (error) {
    console.log('Error: Failed to parse Backloggd', error);
    return [];
  }
};
