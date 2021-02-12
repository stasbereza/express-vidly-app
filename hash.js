const bcrypt = require('bcrypt');

async function run() {
  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash('1234', salt);
}

run();
