import { generateCatalogPdf } from './server/catalog';
(async () => {
  console.time('gen');
  const { pdf } = await generateCatalogPdf();
  console.timeEnd('gen');
  console.log('PDF size:', pdf.length);
})();
