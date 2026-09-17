const fetch = require('node-fetch');
async function test() {
  const start = Date.now();
  try {
    const res = await fetch('http://localhost:3000/api/catalog.pdf');
    const buff = await res.buffer();
    console.log(`Time: ${Date.now() - start}ms, Size: ${buff.length}`);
  } catch (e) {
    console.error(e);
  }
}
test();
