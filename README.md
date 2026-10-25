# Institute Itech — nuova Home in Next.js

Rifacimento della Home di [www.iite.eu](https://www.iite.eu) in Next.js 16, TypeScript e Tailwind CSS.

## Avvio

Requisiti: Node.js 20 o superiore e pnpm.

```bash
pnpm install
pnpm dev
```

Il sito gira su http://localhost:3000. Altri comandi:

```bash
pnpm lint
pnpm build && pnpm start
```

Variabile facoltativa: `NEXT_PUBLIC_SITE_URL` è l'URL pubblico del sito, usato per i link assoluti di Open Graph. Su Vercel viene ricavato da solo; in locale vale `http://localhost:3000`.

### Provare il form contatti

L'invio è simulato: non parte nessuna email.

- **Errori nel browser:** invia il form vuoto.
- **Errore del server:** usa un'email che finisce con `@fail.test`, ad esempio `ada@fail.test`.
- **Invio riuscito:** qualsiasi altra email valida.

## Struttura

```
app/
  layout.tsx            layout comune: skip link, header, main, footer, metadata di base
  page.tsx              Home: compone le sezioni
  actions/contact.ts    Server Action del form (validazione server + invio simulato)
  opengraph-image.jpg   anteprima per i social (+ .alt.txt)
components/
  ui/                   componenti riutilizzabili: Button, Section, Card, StatList
  layout/               Header, MobileMenu, Footer, Logo
  home/                 una sezione per file: Hero, Mission, Projects, People, Numbers, Contact
  contact/              ContactForm (Client Component)
data/                   contenuti: projects, team, numbers, site (menu, sedi, social, link legali)
lib/                    schema Zod del form, helper dei metadata, URL del sito
docs/                   analisi del sito attuale, decisioni, registro dell'uso dell'AI
```

Per aggiungere una persona al team basta aggiungere un oggetto in `data/team.ts`; lo stesso vale per progetti (`data/projects.ts`) e numeri (`data/numbers.ts`).

## Scelte principali

Il dettaglio è in [docs/decisions.md](docs/decisions.md).

- **Solo Server Components, tranne due "isole" client:** il menu mobile e il form. Tutte le sezioni leggono i file di dati sul server e non mandano JavaScript al browser.
- **Nessuna libreria di componenti:** il sito attuale usa shadcn/Radix e ha comunque problemi di accessibilità. Qui markup e comportamento sono scritti a mano.
- **Menu mobile con `<dialog>` nativo** aperto con `showModal()`. Il browser gestisce Esc, il focus intrappolato e la pagina sotto inerte. Il codice aggiunge solo `aria-expanded`, la chiusura sul clic esterno e la chiusura quando si sceglie una voce.
- **`Button` tipato come unione discriminata:** con `href` diventa un link, senza diventa un `<button>`. Passare insieme `href` e `type` è un errore di compilazione.
- **Form contatti:**
  - un unico schema **Zod** (`lib/contact-schema.ts`) usato sia nel browser (`onSubmit`) sia sul server (Server Action), così le regole e i messaggi sono gli stessi in entrambi i posti;
  - stato tipato come unione `idle | error | success`, gestito con `useActionState`;
  - etichette vere, errori collegati ai campi con `aria-describedby` e `aria-invalid`, focus sul primo campo sbagliato e messaggio di stato in una regione `role="status"`;
  - durante l'invio il bottone è disabilitato e mostra "Sending…";
  - se il server risponde con un errore i valori restano nei campi;
  - funziona anche **senza JavaScript**: la validazione sul server copre questo caso;
  - honeypot anti-spam come sul sito attuale.
- **Persone in griglia e progetti in card sempre aperte:** niente carosello e niente accordion, quindi niente stato da gestire e nessun contenuto nascosto alla tastiera.
- **Card con un solo link**, sul titolo, allargato a tutta la card con `::after`: una sola fermata di Tab e un nome del link breve.
- **Header sticky** con `scroll-padding-top`, così le ancore e il focus da tastiera non finiscono sotto l'header.
- **Immagini con `next/image`** importate in modo statico: dimensioni note, anteprima sfocata e `sizes` in base alla griglia. L'immagine dell'hero ha `fetchPriority="high"`, perché in Next 16 `priority` è deprecato.
- **SEO:** titolo e descrizione, URL canonico, Open Graph e Twitter card generati da un unico helper (`lib/metadata.ts`). Next unisce i metadata di layout e pagina in modo *superficiale* (un `openGraph` nella pagina sostituisce quello del layout): è la causa probabile dell'immagine mancante sul sito attuale. Per questo ogni pagina costruisce il suo `openGraph` completo, e l'immagine arriva dal file `app/opengraph-image.jpg`.
- **Contenuti in inglese**, come il sito attuale.
- **Solo la Home:** il menu porta alle sezioni della Home, e le card di Oxyleaf e Memoria portano alle pagine del sito ufficiale.

## Problemi trovati nel sito attuale

L'analisi completa, con il metodo, è in [docs/current-site-audit.md](docs/current-site-audit.md). Ogni punto l'ho verificato a mano, e ho lanciato Lighthouse su desktop e mobile.

| # | Problema sul sito attuale | Nella nuova versione |
|---|---|---|
| 1.1 | Il link "Conditions" apre la privacy policy | Rimosso finché non esiste un documento delle condizioni |
| 1.2 | Terra non ha una pagina (`/terra` dà 404) | La card di Terra non ha link |
| 1.3 | `/articles` è nella sitemap ma non è collegata | Fuori scope (solo Home) |
| 2.1 | Menu mobile: niente `aria-expanded`, Esc non chiude, il focus esce dal menu | `<dialog>` modale + `aria-expanded` |
| 2.2 | Campi del form senza etichetta associata (solo placeholder) | `<label for>` su ogni campo |
| 2.3 | Consenso privacy non obbligatorio a livello di campo; il bottone resta disabilitato senza spiegazione | Checkbox nativa obbligatoria, con un messaggio d'errore che spiega cosa fare |
| 2.4 | Mission spezzata in uno `<span>` per parola senza spazi e con `opacity: 0.1` (41–45 errori di contrasto) | Paragrafo normale |
| 2.5 | Bottoni del carosello senza nome e senza focus visibile | Niente carosello; focus visibile su tutti gli elementi |
| 2.6 | Gerarchia dei titoli invertita (sezioni in H3, voci interne in H2) | Un h1, un h2 per sezione, un h3 per card |
| 2.7 | Logo letto "Logo Icon Logo Text" | Logo con nome "Institute Itech, home" |
| 2.8 | Alt come "CTA Background" su foto e immagini decorative | Alt descrittivi, `alt=""` per le immagini decorative |
| 2.9 | Stato degli accordion non annunciato | Niente accordion |
| 2.10 | Link "Privacy Policy" distinto solo per colore | Sottolineato, con avviso "(PDF, opens in a new tab)" |
| 2.11 | Niente `<header>` né `<footer>`; i `<nav>` senza nome | `header`, `main`, `footer`, `nav` con `aria-label`, più uno skip link |

Lighthouse sul sito attuale (Home, mobile): Performance 56, Accessibility 85, Best practices 92, SEO 100.

## Cosa manca e cosa migliorerei con più tempo

- **Pagine Memoria™ e Oxyleaf™** (facoltative): le farei riusando `Section`, `Card` e `StatList`, con i contenuti in `data/`. Le card porterebbero allora alle pagine interne invece che al sito ufficiale.
- **Invio reale delle email:** un servizio come Resend dentro la Server Action, con rate limiting (per esempio per IP) oltre all'honeypot.
- **Test automatici:**
  - unit test dello schema Zod e della Server Action;
  - un test end-to-end con Playwright per il form e il menu mobile;
  - un controllo automatico di accessibilità con axe.
- **Lighthouse sul sito nuovo**, per un confronto prima/dopo misurato.
- **Contenuti:**
  - fonti per i numeri di "Today's panorama";
  - foto per le persone del team che oggi ne sono senza;
  - un vero documento "Conditions".
- **Immagini:** gli originali sono pesanti (fino a 5644×3168 px). `next/image` le ridimensiona, ma ridurle prima alleggerirebbe il repository.
- **`aria-current`** sulla voce di menu della sezione visibile, e i font del brand (Aspekta) al posto di Geist.

## Uso di strumenti AI

Ho usato **Claude Code** (Claude Opus 5.5) come assistente, ma le decisioni le ho prese io. Il registro passo per passo, con cosa ha fatto l'AI e cosa ho fatto io, è in [docs/ai-log.md](docs/ai-log.md). In sintesi:

- **Pianificazione e analisi:** l'AI ha proposto un piano e fatto una prima passata automatica sul sito attuale. Io ho verificato a mano ogni punto, scartato quelli che non consideravo problemi e lanciato Lighthouse.
- **Decisioni:** ho scelto io stack, librerie, lingua, layout delle sezioni e limite alla sola Home. L'AI ha proposto alternative e conseguenze ([docs/decisions.md](docs/decisions.md)).
- **Dati:** ho scritto io i tipi dei progetti e del team. L'AI ha estratto i contenuti dal sito ufficiale, li ha inseriti negli array e ha scaricato le immagini.
- **Codice:** i componenti e il form li ha scritti l'AI su mia richiesta, seguendo le scelte fatte insieme. Io ho letto il codice mentre veniva scritto e ho chiesto modifiche, per esempio di togliere tutti i commenti.
- **Verifica:** l'AI ha controllato nel browser titoli, landmark, tastiera, 360 px, menu mobile e i tre esiti del form, oltre a lint, type-check e build.
- **Apprendimento:** non avevo mai usato TypeScript lato server. Ho usato l'AI anche per capire Server Components, Server Actions, la differenza tra tipi (che spariscono a runtime) e validazione a runtime con Zod, `satisfies` e le unioni discriminate.
