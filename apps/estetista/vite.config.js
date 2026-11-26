import { defineConfig } from 'vite';

// React e STC arrivano come globali (window.React, window.STC) da public/stc:
// il JSX usa quindi React.createElement del globale, come chiede bundle.js.
export default defineConfig({
  base: './',
  esbuild: { jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', jsxInject: `import { React } from '/src/stc.js'` },
  server: { port: 5173 },
});
