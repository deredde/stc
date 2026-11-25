# SettingsPage

Impostazioni: elenco delle sezioni a sinistra, la sezione a destra con titolo, una riga di spiegazione e i comandi.

**Cosa passi:** `header`, `nav` (props di `SettingsNav`), `title`, `subtitle`, `actions`, `children` (di solito `SettingRow` e card con campi).

**Regole:** si salva subito, senza «Salva»; un toast conferma. Le sezioni con qualcosa da sistemare hanno il pallino rosso.
