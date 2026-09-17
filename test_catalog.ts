import { generateCatalogPdf } from "./server/catalog";
generateCatalogPdf().then(() => console.log("Success")).catch(console.error);
