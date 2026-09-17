import { generateCatalogPdf } from './server/catalog';
console.time('fetchPDF');
generateCatalogPdf().then((res) => { console.timeEnd('fetchPDF'); console.log('Done, length:', res.pdf.length); }).catch(console.error);
