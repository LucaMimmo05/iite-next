# Analisi del sito attuale (www.iite.eu)

Prima passata fatta con l'AI il 23/10/2026 (lettura del DOM, controlli via script, richieste HTTP), poi **verifica manuale mia** e report Lighthouse desktop + mobile.
Qui restano **solo i problemi che ho confermato**; gli altri spunti li ho scartati o considerati trascurabili.

Contesto: il sito attuale è già un'app Next.js su Vercel (Tailwind + componenti shadcn/Radix).

Priorità: **A** = blocca utenti o è un errore evidente · **M** = da correggere · **B** = rifinitura.

## 1. Link e contenuti

| # | Problema | Dove | Pri |
|---|---|---|---|
| 1.1 | Il link **"Conditions"** nel footer apre `privacy-policy.pdf`, lo stesso file di "Privacy Policy": la pagina delle condizioni non esiste | footer, tutte le pagine | A |
| 1.2 | Il progetto **Terra** è in Home ma non ha una pagina (`/terra` dà 404) | Home, Progetti | M |
| 1.3 | La pagina **`/articles`** è nella sitemap ma non è raggiungibile dal menu né dal footer | sitemap.xml | M |

## 2. Accessibilità

| # | Problema | Dove | Pri |
|---|---|---|---|
| 2.1 | **Menu mobile**: il bottone non ha `aria-expanded` e resta "Toggle menu" anche da aperto; **Esc non chiude** il menu; con il menu aperto il focus va sui contenuti nascosti dietro (non sono `inert`) | header, < 768 px | A |
| 2.2 | **Campi del form senza etichetta associata**: le `<label>` non hanno `for` e i campi non hanno `id`; il nome accessibile arriva solo dal placeholder | form contatti | A |
| 2.3 | **Consenso privacy** non obbligatorio a livello di campo (checkbox nascosta non `required`): l'obbligo esiste solo perché "Send message" resta **disabilitato senza spiegazione** | form contatti | A |
| 2.4 | **Mission spezzata in uno `<span>` per parola senza spazi**: testo accessibile e copia-incolla diventano "Designanddevelopadvanced…". Le parole partono a `opacity: 0.1`, e per questo Lighthouse segnala **41–45 elementi con contrasto insufficiente** | Home, Mission e "Today's panorama" | A |
| 2.5 | **Bottoni senza nome** (puntini del carosello People) con `focus:outline-none`: il focus non si vede (Lighthouse: `button-name`) | Home, People | A |
| 2.6 | **Gerarchia dei titoli invertita**: titoli di sezione in H3 ("MISSION", "PROJECTS") e voci interne in H2 (Lighthouse: `heading-order`) | tutte | M |
| 2.7 | **Logo** letto "Logo Icon Logo Text" invece di "Institute Itech, home" | header | M |
| 2.8 | **Alt inutili su immagini decorative** ("CTA Background" ×4, "Card decoration", "Memoria separator", "Growth visualization"): andrebbero lasciati vuoti, `alt=""` | tutte | M |
| 2.9 | **Stato apri/chiudi non annunciato**: in Home gli accordion dei progetti hanno `aria-expanded` ma non `aria-controls`; su Oxyleaf le card "Today's challenge" sono `<button>` senza `aria-expanded` | Home, Oxyleaf | M |
| 2.10 | Link "Privacy Policy" nel consenso distinto dal testo **solo per il colore** (Lighthouse: `link-in-text-block`) | form contatti | M |
| 2.11 | **Landmark incompleti**: non c'è `<header>` né `<footer>` (il footer è una `<section>`); i `<nav>` del menu non hanno `aria-label` e i link social/legali del footer non sono in un `<nav>` | tutte | B |

## 3. Lighthouse (Home, 23/10/2026)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop | 93 | 85 | 92 | 100 |
| Mobile | **56** | 85 | 92 | 100 |

- Mobile: LCP **5,6 s**, TBT **630 ms**, CLS 0. L'elemento LCP è il **testo dell'H1**, che compare tardi per l'animazione d'ingresso.
- Due **errori 404** in console e un avviso sulla Content Security Policy.
- ⚠️ La performance è falsata dalle estensioni del browser: da rifare in incognito.

## Cosa replicare
- Il form ha già un **honeypot** anti-spam (`important_field`): ottima idea, da mantenere.

## Da fare a mano
- [x] Lighthouse (desktop e mobile) su Home
- [ ] Rifare Lighthouse mobile in incognito per avere numeri di performance puliti
- [ ] Nella console di DevTools, vedere quali sono le due risorse in 404
- [ ] Giro completo solo da tastiera della Home
- [ ] Controllo a 360 px: c'è scroll orizzontale?
