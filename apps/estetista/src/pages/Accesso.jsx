// Accesso al gestionale. Centro di prova: l'email del centro e la password «bellezza».
import { STC, useState } from '../stc.js';
import { useArchivio, entra } from '../data/store.js';

const { AuthScreen, Field, TextInput, PasswordInput, Alert } = STC;

// Impronta SHA-256 di «bellezza»: la password non sta scritta nel codice.
const IMPRONTA = '5266532d434b9002561a28061c07b958b57c19b877faccf203e5c4ec84299857';

async function impronta(testo) {
  // Fuori da https (o da localhost) il browser non dà crypto.subtle: confronto diretto, va bene per la prova.
  if (!window.crypto?.subtle) return testo === 'bellezza' ? IMPRONTA : '';
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(testo));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}

export function Accesso({ onEntra }) {
  const { db } = useArchivio();
  const emailCentro = db?.impostazioni.accesso.email || 'giulia@bellezzastudio.it';
  const [email, setEmail] = useState(emailCentro);
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState(null);
  const [attesa, setAttesa] = useState(false);

  const prova = async () => {
    if (!email.includes('@')) return setErrore({ campo: 'email', testo: 'Scrivi l\'email intera, con la @' });
    if (!password) return setErrore({ campo: 'password', testo: 'Scrivi la password' });
    setAttesa(true);
    const ok = email.trim().toLowerCase() === emailCentro && (await impronta(password)) === IMPRONTA;
    setAttesa(false);
    if (!ok) return setErrore({ campo: 'tutto', testo: 'Email o password non tornano. Controlla le maiuscole e riprova.' });
    onEntra(entra(email.trim().toLowerCase()));
  };

  return (
    <AuthScreen name={db?.impostazioni.centro.nome || 'Bellezza Studio'} title="Bentornata" text="Entra per vedere l'agenda di oggi."
        alert={errore?.campo === 'tutto'
          ? <Alert tone="danger" title="Non sei entrata">{errore.testo}</Alert>
          : <Alert tone="info" title="Centro di prova">Entra con {emailCentro} e la password «bellezza».</Alert>}
        action={{ label: 'Entra', onClick: prova, loading: attesa }}
        link={{ label: 'Prenota come cliente', onClick: () => { location.hash = '#/prenota'; } }}>
        <Field label="Email" error={errore?.campo === 'email' ? errore.testo : undefined}>
          <TextInput type="email" value={email} onValue={v => { setEmail(v); setErrore(null); }} autoComplete="username" invalid={errore?.campo === 'email'} />
        </Field>
        <Field label="Password" error={errore?.campo === 'password' ? errore.testo : undefined}>
          <PasswordInput value={password} onChange={v => { setPassword(v); setErrore(null); }} invalid={errore?.campo === 'password'} />
        </Field>
    </AuthScreen>
  );
}
