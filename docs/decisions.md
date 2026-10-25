# Decisioni di progetto

Base per la sezione "Scelte principali" del README.

| # | Decisione | Perché | Conseguenze |
|---|---|---|---|
| D1 | Next.js 16 App Router, TypeScript, Tailwind | richiesti / più veloce da scrivere in 4 ore | — |
| D2 | Nessuna libreria di componenti (niente shadcn/Radix/MUI) | il sito attuale le usa e ha comunque problemi di accessibilità; voglio controllare io markup e comportamento | componenti `Button`, `Section` e `Card` scritti a mano |
| D3 | Menu mobile con `<dialog>` nativo e `showModal()` | Esc, focus intrappolato e pagina sotto inerte gratis dal browser (risolve il problema 2.1 dell'analisi) | resta da gestire `aria-expanded`, il ritorno del focus e la chiusura al clic su un link |
| D4 | Contenuti in **inglese** | stessa lingua del sito attuale | `lang="en"`; messaggi di validazione del form in inglese |
| D5 | Persone in **griglia**, niente carosello | il carosello attuale ha bottoni senza nome e focus invisibile (2.5); una griglia non richiede JavaScript | 1 colonna su mobile, poi 2–3; aggiungere un membro = una riga in `data/team.ts` |
| D6 | Progetti come **card sempre aperte**, niente accordion | niente stato e niente JS, nessun `aria-expanded` da gestire (2.9) | Terra non ha una pagina → `href` facoltativo nel tipo, card senza link |
| D7 | Header **sticky** | menu sempre raggiungibile | serve `scroll-padding-top` su `html`, altrimenti i link `#contact` e il focus da tastiera finiscono sotto l'header |
| D8 | JavaScript solo in due "isole" client: `MobileMenu` e `ContactForm` | tutto il resto è Server Component → meno JS (il sito attuale ha Performance mobile 56) | — |
| D9 | Schema Zod in `lib/`, condiviso tra form e Server Action | un'unica fonte di verità per regole e tipi | un file `"use server"` può esportare solo funzioni asincrone, quindi lo schema non può stare lì |
| D10 | Solo la Home, niente pagine Memoria/Oxyleaf | le pagine sono facoltative nella traccia | menu con ancore alle sezioni; card di Oxyleaf e Memoria verso le pagine del sito ufficiale |
| D11 | `metadataBase` da variabile d'ambiente (`NEXT_PUBLIC_SITE_URL`, poi URL di Vercel, poi localhost) | l'immagine Open Graph deve puntare al dominio dove gira il sito, non a iite.eu | — |
| D12 | Un solo helper `pageMetadata` per i metadata delle pagine | Next unisce i metadata in modo superficiale: un `openGraph` parziale nella pagina cancellerebbe quello del layout | — |
| D13 | Palette: neutri del sito ufficiale + verde `#0de98a`, più una variante scura (`#067a48`) e una chiara (`#e6fcf2`) dello stesso verde | restare riconoscibili rispetto al brand; la Mission su una tinta chiara del verde (il verde pieno era troppo pesante) | Tailwind limitato a questi colori (`--color-*: initial`) |
| D14 | Font Instrument Sans, stretto (asse `wdth`) per i titoli | un solo carattere con due "voci", al posto di Geist del template | — |
| D15 | Animazioni solo CSS, tranne i contatori (piccolo Client Component) | le righe allo scroll usano `animation-timeline: view()`: zero JavaScript, e dove il browser non lo supporta le righe restano semplicemente visibili | tutto dentro `prefers-reduced-motion: no-preference`; il titolo dell'hero si muove ma non parte trasparente, così non ritarda l'LCP |
