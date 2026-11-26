// Copia STC (token, stili, componenti, React) dalla radice della repo in public/stc.
// Così l'app usa sempre la versione di STC che sta nella repo, senza copie a mano (M3).
import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const qui = dirname(fileURLToPath(import.meta.url));
const radice = join(qui, '..', '..', '..');
const dest = join(qui, '..', 'public', 'stc');

mkdirSync(join(dest, 'lib'), { recursive: true });
cpSync(join(radice, 'tokens.css'), join(dest, 'tokens.css'));
for (const f of ['bundle.css', 'bundle.js']) cpSync(join(radice, 'components', f), join(dest, f));
cpSync(join(radice, 'components', 'lib'), join(dest, 'lib'), { recursive: true });
console.log('STC copiato in public/stc');
