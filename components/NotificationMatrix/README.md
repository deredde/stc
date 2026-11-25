# NotificationMatrix

Preferenze di notifica: matrice evento × canale con interruttori piccoli; ogni evento dice quando arriva.

**Cosa passi:** `events` (`{id, title, description, locked}`: `locked` elenca i canali che non si possono spegnere), `channels` (`{id, label}`), `value` / `defaultValue` (`{evento: {canale: true}}`), `onChange`, `eventLabel`.

**Regole**
- Si salva da solo, con il toast.
- Sotto, la nota sui costi: «Gli SMS contano nel limite del piano».
