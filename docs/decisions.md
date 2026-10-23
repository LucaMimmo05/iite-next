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
