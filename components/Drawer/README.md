# Drawer

Pannello che entra da destra, staccato dai bordi: si lavora senza lasciare la pagina.

**Cosa passi:** `open`, `onClose`, `title`, `subtitle`, `children`, `footer` (totale e azione), `width` (520), `headerActions`, `dismissible`.

**Regole**
- Entra in 240 ms con un piccolo scivolamento; staccato 12 px dai bordi, angoli da 18.
- Su telefono occupa lo schermo.
- Il clic sul velo chiude: per moduli lunghi passa `dismissible={false}` e chiedi conferma se ci sono modifiche.
