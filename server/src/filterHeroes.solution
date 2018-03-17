// Add this code in hero-router.js for first hands-on exercise.

router.get('/contains/:contains', wrap(filterHeroes));

export async function filterHeroes(req: express$Request): Promise<HeroType[]> {
  const {contains} = req.params;
  let sql = 'select * from hero';
  if (contains) sql += ` where name like "%${contains}%"`;
  const heroes = await conn.query(sql);
  return sortBy(heroes, ['name']);
}
