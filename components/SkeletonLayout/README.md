# SkeletonLayout

Scheletri composti che ricalcano le pagine tipo, con il riflesso ogni 1,4 s e una punta d'accento.

**Cosa passi:** `kind` (`table` · `kpi` · `detail` · `chart` · `calendar` · `list` · `panel`), `rows`, `count` (kpi), `bars` (chart), `today` (indice del giorno, calendar), `label` per lo screen reader.

**Regole**
- Per il primo caricamento di una pagina o di un pannello. Ricalca colonne, altezze e card vere, così niente salta quando arrivano i dati.
- Compare dopo 300 ms. Dopo 2 s aggiungi una `LoadingPill` che dice cosa arriva.
- `panel` va dentro `Drawer` e `Sheet`: il pannello entra subito e si riempie dopo.
- Per un blocco singolo usa `Skeleton`; per una riga di lista `SkeletonRow`.
