# Registro dell'uso dell'AI

Strumento: Claude Code (Claude Opus 5.5). Questo file serve a scrivere la sezione "Uso di strumenti AI" del README.
Per ogni voce: cosa ho chiesto, cosa ha fatto l'AI, cosa ho fatto/verificato io.

| Data | Fase | Cosa ha fatto l'AI | Cosa ho fatto io |
|---|---|---|---|
| 23/10 | Pianificazione | Ha letto la traccia e proposto un piano a blocchi di tempo, con la divisione tra le parti da fare da solo e quelle in cui farmi aiutare | Ho scelto io il piano e le priorità |
| 23/10 | Analisi del sito attuale | Prima passata automatica su iite.eu (DOM, link, meta tag, form, menu mobile a 375 px, sitemap) → `docs/current-site-audit.md`, con ogni punto marcato "da verificare" | Ho verificato a mano i punti dell'analisi |
| 23/10 | Setup + studio | Mi ha guidato in `create-next-app` (opzioni consigliate e perché) e mi ha spiegato TypeScript lato server: Server/Client Components, Server Actions, tipi solo a compile-time vs validazione a runtime con Zod | Ho lanciato io il setup e scelto le opzioni |
| 23/10 | Scelta librerie | Mi ha consigliato poche librerie: Tailwind e niente kit UI; menu mobile con `<dialog>` nativo invece di Radix/shadcn | Ho deciso io cosa usare |
| 23/10 | Verifica setup | Ha controllato lo scaffold: lint, `tsc`, build di produzione e `sharp` per `next/image` tutti ok; ha segnalato i flag di `next.config.ts` e che manca `zod` | _da fare: installare zod, decidere sui flag_ |
| 23/10 | Verifica analisi | Ha ricontrollato i punti che avevo messo in dubbio (2.11, 2.12, 2.13), ha estratto dai miei report Lighthouse i dati utili e ha avvisato che le estensioni del browser falsavano la performance | Ho verificato a mano tutti i punti, scartato quelli che non ritengo problemi e lanciato io Lighthouse |
| 23/10 | Struttura Home | Ha proposto la struttura delle sezioni, i componenti, la divisione server/client e le cartelle, lasciandomi le decisioni aperte; ha raccolto le scelte in `docs/decisions.md` con le conseguenze di ciascuna | Ho preso io le decisioni D4–D7 (lingua, griglia, card, header sticky) |
