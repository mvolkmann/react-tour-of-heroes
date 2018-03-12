// @flow

import {
  deleteHero,
  filterHeroes,
  getAllHeroes,
  getHeroById,
  postHero,
  putHero,
  setConn
} from './hero-router';
import './database';

// These tests assume the database is the state
// produced by running "npm run dbsetup".
describe('hero-router', () => {
  beforeEach(setConn);

  test('getAllHeroes, deleteHero, and postHero', async () => {
    const heroes = await getAllHeroes();
    expect(heroes.length).toBeGreaterThan(0);

    // Delete the first hero.
    const [hero] = heroes;
    let req = (({params: {id: hero.id}}: any): express$Request);
    await deleteHero(req);

    // Verify that it is gone.
    const newHeroes = await getAllHeroes();
    expect(newHeroes.length).toBe(heroes.length - 1);
    const foundHero = newHeroes.find(h => h.id === hero.id);
    expect(foundHero).toBeUndefined();

    // Replace the first hero.
    req = (({body: {name: hero.name}}: any): express$Request);
    const id = await postHero(req);
    expect(typeof id).toBe('number');
    expect(id).toBeGreaterThan(0);
  });

  test('filterHeroes', async () => {
    const req = (({params: {contains: 'ag'}}: any): express$Request);
    const heroes = await filterHeroes(req);
    expect(heroes.length).toBe(2);
    expect(heroes[0].name).toBe('Magma');
    expect(heroes[1].name).toBe('Magneta');
  });

  test('putHero', async () => {
    const heroes = await getAllHeroes();
    expect(heroes.length).toBeGreaterThan(0);

    // Modify the first hero.
    let [hero] = heroes;
    const {id, name} = hero;
    const newName = name.toUpperCase();
    hero.name = newName;
    let req = (({body: hero, params: {id}}: any): express$Request);
    await putHero(req);

    req = (({params: {id}}: any): express$Request);
    hero = await getHeroById(req);
    expect(hero.name).toBe(newName);
  });
});
