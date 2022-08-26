const { User } = require('../database/models');

async function xablau() {
  const bla = await User.findAll();
  return bla;
}

xablau().then((asd) => console.log(asd));