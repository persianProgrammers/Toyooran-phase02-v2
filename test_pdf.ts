import { generateCatalogPdf } from './server/catalog';
generateCatalogPdf().then((res) => console.log('Done, length:', res.pdf.length)).catch(console.error);
