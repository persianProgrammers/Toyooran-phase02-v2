import { generateCatalogPdf, triggerBackgroundCatalogGeneration } from './server/catalog';
(async () => {
  console.time('gen1');
  const res1 = await generateCatalogPdf();
  console.timeEnd('gen1');
  console.time('gen2');
  const res2 = await generateCatalogPdf();
  console.timeEnd('gen2');
})();
