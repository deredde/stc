# DateRangePicker

Periodo: scorciatoie in alto, due clic sul calendario, «Applica». Il bottone mostra il periodo scelto.

**Cosa passi:** `value` / `defaultValue` (`{ from, to }` in ISO, o `null`), `onChange`, `presets` (`{ label, range }`: «Oggi», «Ultimi 7 giorni», «Questo mese»), `today`, `placeholder`, `size`, `label`.

**Regole:** quando il periodo coincide con una scorciatoia il bottone ne mostra il nome. Tra il primo e il secondo clic la banda segue il mouse.
