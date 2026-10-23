# Analisi del sito attuale (www.iite.eu)

Prima passata fatta con l'AI il 23/10/2026: lettura del DOM nel browser, controlli via script e richieste HTTP.
**Ogni punto va verificato a mano** prima di finire nel README (colonna "Verificato").

Contesto: il sito attuale è già un'app Next.js su Vercel (Tailwind + componenti shadcn/Radix).

Legenda priorità: **A** = blocca utenti o è un errore evidente · **M** = da correggere · **B** = rifinitura.

## 1. Link e contenuti

| # | Problema | Dove | Come verificarlo | Pri | Verificato |
|---|---|---|---|---|---|
| 1.1 | Il link "Conditions" nel footer apre `privacy-policy.pdf`, lo stesso file di "Privacy Policy" | footer, tutte le pagine | clic su "Conditions" | A | ☐ |
| 1.2 | Tutti i link delle sezioni portano a `/company`: "DISCOVER OUR WORK" (Progetti), "DISCOVER OUR IMPACT" (Mission, People). Non portano mai alla pagina del progetto | Home | passa il mouse sui link | M | ☐ |
| 1.3 | Il progetto **Terra** è in Home ma non ha una pagina (`/terra` dà 404) | Home, Progetti | apri `/terra` | M | ☐ |
| 1.4 | La pagina `/articles` esiste ed è nella sitemap, ma non è raggiungibile dal menu né dal footer | sitemap.xml | apri `/sitemap.xml` | M | ☐ |
| 1.5 | Refuso: "build climate resilience in **cites**" (vuol dire "cities") | Oxyleaf, "Today's challenge" | cerca "cites" nella pagina | B | ☐ |
| 1.6 | I numeri ("10% delle morti globali", "33% della popolazione", "+50% delle città", "oltre 7 miliardi") non citano una fonte. Il "+50% of cities show connected pollution patterns" è vago | Home "Today's panorama", Oxyleaf | controlla se c'è una nota o un link | M | ☐ |
| 1.7 | Testi dei link generici e ripetuti ("DISCOVER OUR IMPACT" ×3, "PARTNER WITH US" ×2): letti fuori contesto da un lettore di schermo non dicono dove portano | Home | elenco link di VoiceOver/NVDA | M | ☐ |
| 1.8 | "Privacy Policy" si apre in una nuova scheda (`_blank`) nel form, ma nella stessa scheda nel footer; anche "Image Disclaimer" nella stessa scheda. Comportamento incoerente e nessun avviso "apre in nuova scheda" | form, footer | clic sui link | B | ☐ |
| 1.9 | La pagina Company parla di tre sfide, tra cui la "food security", ma nessun progetto la tratta | Company | lettura | B | ☐ |
| 1.10 | Card della sezione "More from our news feed" apparentemente senza link agli articoli | Memoria | prova a cliccarle e a raggiungerle con Tab | M | ☐ |

## 2. Accessibilità

| # | Problema | Dove | Come verificarlo | Pri | Verificato |
|---|---|---|---|---|---|
| 2.1 | **Menu mobile**: il bottone non ha `aria-expanded` e la sua etichetta resta "Toggle menu" anche da aperto; **Esc non chiude** il menu; con il menu aperto il focus può andare sui contenuti nascosti dietro (non sono `inert`) | header, < 768 px | apri il menu a 375 px, premi Esc, poi Tab più volte | A | ☐ |
| 2.2 | **Campi del form senza etichetta associata**: le `<label>` non hanno `for` e i campi non hanno `id`. Il nome accessibile arriva solo dal placeholder ("Your First Name", "example@email.com") | form contatti | clic sul testo "Email": il campo non prende il focus | A | ☐ |
| 2.3 | **Consenso privacy**: è un `<button>` di Radix con una checkbox nascosta che **non è `required`**. L'obbligo esiste solo perché "Send message" resta **disabilitato** senza spiegazione | form contatti | scorri il form senza spuntare: il bottone è grigio e non dice perché | A | ☐ |
| 2.4 | **Nessuna regione `aria-live`** nella pagina: gli esiti dell'invio (attesa, errore, successo) probabilmente non vengono letti | form contatti | invia con un lettore di schermo attivo (solo in modo che non parta un messaggio vero) | M | ☐ |
| 2.5 | **Testo della mission spezzato in uno `<span>` per parola senza spazi**: il testo accessibile e il copia-incolla diventano "Designanddevelopadvanced…". Le parole partono anche a `opacity: 0.1` (animazione allo scroll) | Home, Mission e "Today's panorama" | seleziona e copia il paragrafo | A | ☐ |
| 2.6 | **Gerarchia dei titoli invertita**: un solo H1, poi i titoli di sezione sono H3 ("MISSION", "PROJECTS") e le voci interne sono H2. Succede su tutte le pagine | tutte | estensione HeadingsMap | M | ☐ |
| 2.7 | **Bottoni senza nome**: i puntini del carosello People e le frecce "›" non hanno `aria-label`. I puntini hanno anche `focus:outline-none`, quindi il focus non si vede | Home, People | Tab sul carosello | A | ☐ |
| 2.8 | Logo nell'header: il link alla home ha solo le immagini con alt "Logo Icon" / "Logo Text", quindi viene letto "Logo Icon Logo Text" invece di "Institute Itech, home" | header | lettore di schermo | M | ☐ |
| 2.9 | Alt poco utili o decorativi letti ad alta voce: "CTA Background" ×4, "Card decoration", "Memoria separator", "Growth visualization" (vanno lasciati vuoti, `alt=""`). Su Oxyleaf ci sono anche immagini con `alt=""` che però potrebbero avere contenuto | tutte | Lighthouse / axe | M | ☐ |
| 2.10 | Nessuno skip link "Vai al contenuto" | tutte | Tab appena caricata la pagina | M | ☐ |
| 2.11 | Il footer non è un `<footer>` ma una `<section>`; non c'è nemmeno un `<header>`: mancano i landmark | tutte | axe → landmark | B | ☐ |
| 2.12 | Due "Back to top" nel footer (probabilmente versioni mobile e desktop) | footer | Tab nel footer | B | ☐ |
| 2.13 | Gli accordion dei progetti hanno `aria-expanded` ma non `aria-controls` | Home, Progetti | ispeziona | B | ☐ |
| 2.14 | Contrasto da misurare: testo bianco sulle immagini dell'hero e i bottoni verde `#0de98a` con testo scuro/bianco | Home | Lighthouse / axe | M | ☐ |

## 3. SEO e condivisione

| # | Problema | Dove | Come verificarlo | Pri | Verificato |
|---|---|---|---|---|---|
| 3.1 | **Home e Company senza `og:image`**: c'è solo `twitter:image`, quindi su LinkedIn, WhatsApp e Facebook l'anteprima esce senza immagine. Il file `/og-image.jpg` esiste ed è usato solo da Oxyleaf. Causa tipica in Next.js: `openGraph` definito nella pagina **sostituisce** quello del layout invece di unirsi | Home, Company | opengraph.xyz o il Post Inspector di LinkedIn | A | ☐ |
| 3.2 | Oxyleaf ha `og:title` generico ("Institute Itech") mentre il `<title>` è "Oxyleaf \| Institute Itech" | Oxyleaf | view-source | B | ☐ |
| 3.3 | `twitter:title` / `twitter:description` diversi da `og:*` sulla Home; `twitter:creator` "@iite" da verificare (esiste?) | Home | view-source | B | ☐ |

## 4. Privacy e altro

| # | Problema | Dove | Come verificarlo | Pri | Verificato |
|---|---|---|---|---|---|
| 4.1 | Script esterno `pa.js` caricato da un dominio personale `*.workers.dev` (probabilmente un proxy per le analytics), senza banner cookie. Se usa cookie o identificatori serve il consenso; in ogni caso dipendere da un worker personale non è ideale | tutte | tab Network e Application → Cookies | M | ☐ |
| 4.2 | Mancano le pagine "Conditions" e "Cookie policy" (solo PDF, e "Conditions" punta alla privacy) | footer | vedi 1.1 | M | ☐ |
| 4.3 | Il form ha già un honeypot (`important_field`): **va bene**, da replicare | form | — | — | ☐ |

## Da fare a mano (non coperto dall'AI)
- [ ] Lighthouse (mobile) su Home: segnare i punteggi di Performance, Accessibilità, Best practices e SEO per il confronto prima/dopo nel README
- [ ] axe DevTools su tutte e 4 le pagine
- [ ] Giro completo solo da tastiera della Home: si arriva al form e lo si può compilare?
- [ ] Controllo a 360 px: c'è scroll orizzontale?
- [ ] Rileggere i testi in cerca di altri refusi
