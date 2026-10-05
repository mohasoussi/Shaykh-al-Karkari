/* Biographies des maîtres de la chaîne de transmission et des ancêtres de la lignée (une page par personne).
   Les textes sont dans maitres-famille.mjs, maitres-chaine.mjs et maitres-lignee.mjs.
   « cle » = nom tel qu'il apparaît dans la chaîne (accents et ponctuation ignorés) ; « rubrique: "lignee" » pour les ancêtres.
   Pour ajouter une biographie : ajouter une entrée dans l'un de ces fichiers, puis node scripts/maitres.mjs (ou npm run actualites). */
import { FAMILLE } from "./maitres-famille.mjs";
import { CHAINE } from "./maitres-chaine.mjs";
import { LIGNEE } from "./maitres-lignee.mjs";

export const MAITRES = [...FAMILLE, ...CHAINE, ...LIGNEE];
