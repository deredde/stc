// React e STC sono globali (caricati da public/stc in index.html): qui li prendiamo una volta sola.
export const React = window.React;
export const STC = window.STC;
export const { useState, useEffect, useMemo, useRef, useCallback, useSyncExternalStore, Fragment } = window.React;
