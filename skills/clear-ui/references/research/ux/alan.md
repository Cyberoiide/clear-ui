# Alan (alan.com) — UX teardown: structure, flows, words

Research date: 2026-11-25. Scope: French marketing site, public quote funnel, login, public help centre, App Store / Google Play listings, Alan's own blog and Medium. Visual system (sizes, radii, colours, type) is deliberately excluded; it was covered in an earlier pass.

## Evidence labels

Every finding carries one of these tags.

- **[live]** — observed by driving a live page in a private headless Chromium (desktop 1366×900, and mobile emulation 390×844).
- **[doc]** — read in Alan's own published text: help centre, guides, blog, FAQ, store listing descriptions.
- **[shot]** — seen in an official screenshot: App Store / Google Play listing images, or the app mockup embedded in the alan.com homepage hero.
- **[3p]** — third-party source. Lower trust; stated where it conflicts with something observed.

What was not reachable: the logged-in member app and web space, and everything after the email gate of the quote funnel. No account was created and no email was submitted. See "Not verified" at the end.


---

## 1. Information architecture

### Marketing site (alan.com, French) [live]

Two stacked navigation rows on desktop.

- **Utility row (top, small):** Pourquoi Alan ? · Ressources · À propos d'Alan · Accessibilité · Me connecter.
- **Main row:** logo · **Entreprises · Indépendants · Particuliers · Secteur public** · one filled button "Mon devis en 2 min".

The main row is nothing but audiences. There is no "Products" or "Features" item at the top level. Product explanation lives one level down ("Pourquoi Alan ?" → "Découvrir l'app", "Découvrir les nouveautés").

Each audience opens a mega-menu grouped by a named criterion, and every link has a one-line plain description under it:

| Menu | Group headings | Example item → sub-label |
|---|---|---|
| Entreprises | "Pour vous, dirigeant" / "Pour votre équipe" / "Par secteur d'activité" / "À la une" | "1 à 9 salariés" → "TPE et petites structures"; "Première embauche" → "Votre premier salarié arrive ?" |
| Indépendants | "Par rôle" / "À la une" | "Travailleurs non salariés" → "Pour les freelances, auto-entrepreneurs, professions libérales" |
| Particuliers | "Par audience" / "À la une" | "Retraités", "Étudiants", "Agents de la fonction publique territoriale" |
| Secteur public | "Par audience" / "À la une" | "Établissements publics" → "Pour les structures du secteur public" |

Notes:
- Company size is expressed as a headcount the visitor knows ("1 à 9 salariés"), with the jargon term (TPE, PME) demoted to the sub-label.
- The same destination appears in several menus when a person could plausibly look in either place: the TNS page is linked from Entreprises ("Dirigeant indépendant"), Indépendants and Particuliers.
- "À propos" items carry a promise of simplicity in the sub-label: "Notre solidité financière — Nos finances, expliquées simplement".
- A floating "Aide" button sits bottom-right on every page. It leads to `/contact-membre`, which offers three routes: "Consultez le centre d'aide", "Contactez-nous", and for members "Connectez-vous pour une réponse immédiate et personnalisée".
- Mobile (390 px): the two rows collapse to logo + one hamburger; the "Aide" button stays bottom-right.
- An "Accessibilité" menu in the header exposes a "Contraste élevé" toggle. (The site's own footer declares "Accessibilité : non conforme".)

Alan itself judged this IA as flawed in March 2026 [doc]: "Our homepage serves 5 very different audiences… nearly half our paid campaign traffic bounced without taking action… The navigation felt like a labyrinth", with a "navigation restructure" on the roadmap. Source: https://alan.com/en/blog/discover-alan/a/behind-the-screens-website-audit-2026. The audience-first main row observed today may be the result of that work; this was not confirmed.

### Member app [shot]

Source: interactive app mockup in the alan.com homepage hero (clicking each tab label swaps the phone screen), plus store screenshots.

**Bottom bar: 4 labelled tabs + 1 mascot button**, in this order:

1. **Aujourd'hui** — daily home.
2. **Consulter** — care: AI assistant and medical team.
3. **Assurance** — card, documents, reimbursements, coverage.
4. **S'équiper** — shop (glasses, lenses, wellness).
5. A round mascot-face button, visually separate from the four tabs (unlabelled; most likely the "Mo" assistant — not confirmed).

Tab names are verbs or moments ("Consulter", "S'équiper", "Aujourd'hui"), not system nouns ("Clinique", "Shop", "Dashboard").

**Persistent top bar** on the tabs: initials avatar (profile) · a "Rechercher" search field · a berries (points) button · a card button. The tiers-payant card is therefore one tap away from anywhere, and so is search.

**What each tab shows first:**

- *Aujourd'hui*: mascot with a streak ring → "50 berries aujourd'hui / 6 539 pas" → a short list of today's actions, each with its reward ("Aller marcher 10–100", "Soigner mon mal de dos — Jour 4 / 12", "Quiz de la semaine 2–10") → "Ligues".
- *Consulter*: a two-way switch "Mo / Équipe médicale" → an input "Demandez n'importe quoi à Mo" with a mic → a 2×2 grid of intents: "Trouver un spécialiste", "Faire une téléconsultation", "Comprendre les résultats d'analyses", "Programmer un rappel" → "Agissez pour votre santé".
- *Assurance*: the tiers-payant card (name, "Couvert jusqu'au 31/12/2026", "Détails") → three shortcut tiles **"Envoyer un document" · "Voir mes garanties" · "Séjour à l'hôpital"** → tabs **Soins · Documents · Virements · Arrêts de travail** → a person filter (Mathilde · Antoine · Nicolas) → a list of care events grouped by month ("Dentiste • 3 nov. — 10 € de votre poche — Antoine").
- *S'équiper*: category tabs (Lunettes · Lentilles · Bien-être…) → three reassurance chips ("€0 à payer", "Retour gratuit", "Livré en 4 jours") → product grid with "Essayer" and "Filtrer".

An older home (App Store screenshot 1) shows a different first screen: "Bonjour, Ellen !" → one resume card with a single full-width button ("Jour 2 · Ciao le mal de dos — Essayer l'exercice de l'équerre — Commencer l'exercice") → "Outils & ressources" topic chips (Bébé, Mal de dos, Mental, Sommeil…) → "Professionnels de santé" with chat / video / map buttons. The store listing mixes two generations of the app; the hero mockup is the newer one.

Topic spaces (e.g. "Mental", "Mal de dos") share one template [shot]: icon + title + one-line benefit → one card with one question and one button ("Besoin de parler à quelqu'un ? … Parlez à un psychologue") → "Notre équipe" (faces, names, roles) → "Pour aller plus loin" with two filters (Sujets, Formats) → content list with type and duration ("Respiration · 3 min").

Per a 2020 designer case study [3p, former Alan designer]: the redesign paired "crucial health services … with your most relevant health events, like dental or gynaecological appointments". Source: https://www.majacerar.design/alan-app

---

## 2. Core flows, step by step

### 2a. Quote funnel — freelancer path [live]

Entry: every "Mon devis en 2 min" button → `/fr-company-discovery-dispatch` → brief three-dot loader → first question. Walked with fictional values (birth year 1990, postal code 75011). Stopped at the email step; nothing submitted.

| # | Screen title | Input | Options / helper text |
|---|---|---|---|
| 1 | "Quelle est votre situation ?" | 1 tap | 7 cards: "Une entreprise — Fondateur, dirigeant, RH ou comptable"; "Travailleur non-salarié — Indépendant, profession libérale ou freelance"; "Retraité — Du secteur privé"; "Agent de la fonction publique — Actif ou retraité"; then, under a divider, "Salarié d'une entreprise qui a rejoint Alan"; "Étudiant"; "Particulier — Sauf TNS, retraités et étudiants" |
| 2 | "Voulez-vous couvrir votre partenaire ?" | 1 tap | "Oui" / "Non, pas maintenant". Helper: "Vous pourrez ajouter à tout moment votre partenaire une fois votre contrat signé." |
| 3 | "Voulez-vous couvrir vos enfants ?" | 1 tap | "Oui, 1 enfant" / "Oui, 2 enfants ou plus" / "Non, pas maintenant". Helper repeats that children can be added later and states the rule ("Les enfants de plus de 25 ans doivent souscrire à leur propre contrat"). |
| 4 | "Quelle est votre année de naissance ?" | 1 field + "Continuer" | Helper: "On s'en sert pour calculer votre prix." Field label "Vous", placeholder "2002", numeric keyboard, max 4 characters. Year only, not a full date. |
| 5 | "Où habitez-vous ?" | 1 field + "Continuer" | Label "Votre code postal", placeholder "75001". |
| 6 | "Trouvons l'offre qui vous correspond" | 1 tap | Interstitial: "5 questions rapides sur vos besoins santé pour vous recommander la meilleure solution." Button "C'est parti". |
| 7 | "Pour la vue, que portez-vous ?" | 1 tap | "Rien du tout" / "Des lunettes ou lentilles simples" / "Des verres progressifs (ou je prévois une opération des yeux)" |
| 8 | "Et pour le dentaire ?" | 1 tap | "Juste l'entretien — Détartrage, plombages, contrôles" / "Des soins classiques — Couronnes, bridges, dévitalisation" / "Des traitements lourds — Implants, appareils dentaires" |
| 9 | "Les médecines douces, vous en utilisez ?" | 1 tap | Subtitle lists what counts (acupuncture, ostéopathie…). "Jamais ou presque" / "1 à 2 fois par an" / "Plus de 3 fois par an" |
| 10 | "En cas d'hospitalisation (on touche du bois !)" | 1 tap | "La chambre partagée me convient" / "Si possible, je préfère une chambre privée" / "La chambre privée, c'est indispensable ! — De 60 à 100€ /jour, dont 40 € (au moins) pris en charge par Alan" |
| 11 | "Côté médecins, vous consultez plutôt..." | 1 tap | "Des généralistes et parfois un spécialiste" / "Des spécialistes aux tarifs raisonnables" / "Des spécialistes, peu importe le tarif" |
| 12 | "On y est presque !" — "Dernière étape avant de vous montrer votre offre" | Email (required) + "Téléphone (optionnel)" | Button "Voir les offres". Consent sentence + privacy link under the fields. **Stopped here.** |

Counts: 12 screens before the offer. 11 answers, of which 9 are a single tap that advances automatically (no "Next" button on choice screens) and 2 are a short typed value. One question per screen, always. 2 to 7 options per question, 3 on most. No dropdown, no date picker, no free text. The first personal data is asked on screen 12.

How the coverage level is chosen: the visitor is never asked "which plan" or shown a guarantee table. They answer five questions about their own habits; the plan is derived. Each option is phrased as behaviour ("Des verres progressifs"), with the technical content in grey underneath ("Couronnes, bridges, dévitalisation").

Progress indication:
- Desktop: a header row "Retour · **Situation** · Offre · Devis · Souscription" — four named stages, current one highlighted.
- Mobile: the same four stages as a segmented bar with a partial fill inside the current segment.
- The stage names adapt to the path: the company path reads "Situation · Santé · Devis · Souscription".
- There is no "question 3 of 5" counter. The count is announced once, on the interstitial ("5 questions rapides").
- Weakness: the indicator still showed "Situation" on screen 12, after eleven answers. The stage labels are coarse and did not move during the whole walk.

Back behaviour:
- A "Retour" button top-left on every screen; each step has its own URL (`/age`, `/postal-code`, `/health-need`, `/contact-info`) except the five need questions, which share one URL.
- Typed values are kept when going back (birth year and postal code were still filled).
- Choice answers were not visibly marked when returning to a choice screen.
- From the email step, "Retour" lands on the "5 questions" interstitial, not on question 5; the five questions must be clicked through again.
- Re-opening the funnel entry URL later resumed at the last unanswered step of the path in progress rather than restarting.

Always-available escape: a card "Parler à un conseiller — On vous rappelle dans la journée" with advisor faces, fixed bottom-right on desktop; on mobile it becomes a chip "Une question ?" at the top right.

How results are presented: **not observed** (behind the email step).

### 2b. Quote funnel — company path [live, first 4 screens]

1. "Quelle est votre situation ?" → "Une entreprise".
2. "Qui voulez-vous couvrir ?" → "Fondateur ou dirigeant seulement" / "Salariés" / "Fondateur, dirigeant et salariés".
3. "Combien de salariés compte votre entreprise ?" → three buckets "1 - 5" / "6 - 100" / "Plus de 100". Helper answers the predictable doubt: "Vous pouvez inclure les temps partiels, apprentis et CDD, mais pas les stagiaires."
4. "Quel est le nom de votre entreprise ?" — one search field "Nom, SIREN ou SIRET" (placeholder "Institut Pasteur 75010"). Beside it (below it on mobile) a panel tagged "Confidentialité": **"Pourquoi demander cette information ? Il ne s'agit pas d'une curiosité mal placée, mais avec le nom de votre entreprise, nous pourrons connaitre directement votre convention collective, ce qui est indispensable pour vous proposer une offre compatible."**

The company is never asked for its "convention collective" (a term most founders cannot answer). Alan asks for something the person knows and derives the technical fact. Not walked further.

Mobile shortens the title of screen 4 to "Quelle est votre entreprise ?".

### 2c. Funnel dead end — employee of a client company [live]

Choosing "Salarié d'une entreprise qui a rejoint Alan" does not open a form. It shows:

> "Alan ne fonctionne que sur invitation de l'employeur. Retrouvez votre email d'invitation dans votre boite mail. Recherchez "contact@alan.com" ou "Alan pour votre complémentaire santé". Ouvrez ensuite cet email, cliquez sur le bouton et laissez-vous guider."
> "L'email est introuvable ? Avez-vous vérifié vos spams ? Votre employeur vous a-t-il bien invité ? Sinon on peut aussi vous le renvoyer !"

A person in the wrong funnel gets the exact next action (the string to search in their mailbox) and a fallback, instead of an error.

The demo-request page (`/fr-fr/contact`) uses the same first question and puts "Je suis déjà membre Alan" as its first option, to route misplaced members out before they fill a sales form.

### 2d. Login (web) [live]

Two steps, identifier first.

1. "Content de vous revoir !" — one field "Email" (hint "Exemple : marie.curie@nobel.fr") + "Continuer".
2. The email field locks and gains a "Changer d'email" link; a "Mot de passe" field appears with "J'ai oublié mon mot de passe"; button becomes "Me connecter".

Below the form, for people without an account: "Pas encore de compte ? Bienvenue chez Alan ! 2 possibilités s'offrent à vous : Mon employeur a choisi Alan : je suis salarié. / Indépendant, admin ? Découvrez nos offres."

Step 2 was reached with a reserved test address (`example.com`); the page did not reveal whether the account exists. No password was submitted.

App login [shot]: a welcome screen with the mascot, "Bonjour ! Prenez le contrôle de votre santé avec Alan", and two stacked full-width buttons: "Me connecter" (filled) above "M'inscrire" (outline). One [3p] source says the app uses an emailed magic link; this conflicts with the password step observed on the web and was not verified.

### 2e. Submitting a reimbursement [doc + shot]

From Alan's own guide (https://alan.com/fr-fr/assurance-sante/guides/a/demande-remboursement-mutuelle-modele-lettre):

1. Open the reimbursements section ("l'icône du petit parapluie" = the Assurance tab).
2. Tap "envoyer un document".
3. Choose the purpose: "pour obtenir un remboursement".
4. Either "choisir une photo" / "choisir un fichier", or take the photo on the spot.
5. End: "Ensuite, vous n'avez rien à faire ! Votre document est transmis et vous recevrez votre remboursement en moins d'une heure dans 70% des cas."

That is 4 taps and 2 decisions (why, and from where). No amount, date, practitioner or category is typed by the member according to this text; the document is read on Alan's side. The default case needs zero steps: with télétransmission, "vous n'avez aucune démarche à effectuer".

The same "Envoyer un document" entry also takes quotes: members "peuvent transférer leurs devis directement depuis leur compte. Nous leur envoyons une estimation de remboursement, par mail, sous quelques jours. Et si le devis n'est pas assez précis… on les prévient également par mail !" [doc] https://alan.com/fr-fr/blog/prendre-soin-vous/a/mieux-prevoir-vos-depenses-de-sante-zoom-sur-le-devis

Screen-level detail of steps 2–4 (sheet or page, confirmation screen) was not observed.

### 2f. Finding a doctor [shot + doc]

Three entry points are visible; the flow behind them was not observed.
- Consulter tab → tile "Trouver un spécialiste".
- Mo: "Mo peut vous aider à trouver des professionnels de santé près de chez vous"; location is used "uniquement si vous la partagez pour trouver des médecins" (Mo FAQ, https://alan.com/fr-fr/trust-center/mo-faq).
- Older home: "Professionnels de santé — Contactez nos médecins et psychologues sans frais, ou trouvez-en un bien remboursé", with a map-pin button.

### 2g. Chatting with a doctor / with support [shot + doc]

- Medical chat [shot]: a plain messaging screen. Header = back + photo + name + specialty ("Dr. Balas — Médecine générale"). Composer = attachment, "Votre message", mic. A "reçu ✓" receipt under the member's message. The practitioner's bubble is labelled with their name.
- Entry is by need, not by channel: "Besoin de parler à quelqu'un ? Réservez une séance ou envoyez un message à un thérapeute" → "Parlez à un psychologue".
- AI first, human reachable [doc]: Mo answers at once; "Mo peut vous rediriger vers un médecin généraliste de la Clinique Alan et lui partager un résumé de votre conversation, ou vous proposer une téléconsultation." Talking to Mo is optional ("Parler avec Mo est optionnel. 81% des patients décident de commencer avec Mo", https://alan.com/fr-fr/blog/tout-alan/a/mo-ia-etude). The interface keeps "différenciation claire entre l'IA et les médecins".
- Support [doc]: chat, email, or a callback. No inbound phone queue: the member requests a call from "Aide" → "Contactez-nous" and is called back at the slot they chose, by someone who has read the request first. Reasoning in §9.
- Support assistant [doc, /fr-fr/nouveautes]: "S'il ne connait pas la réponse, il passe la main à un expert" and "Un humain toujours à portée de main".

### 2h. Seeing what is covered [doc + shot]

Three mechanisms, none of them a guarantee table as the first view:
- **Search by the thing you need.** "Faire une simple recherche comme "kiné" pour consulter ses garanties" (store listing); "Fini les tableaux de garanties indéchiffrables, tapez par exemple "ophtalmo" et estimez votre remboursement avant même de prendre rendez-vous" (/pourquoi-alan/app-sante). The search field is in the top bar of every tab.
- **"Voir mes garanties"** tile on the Assurance tab.
- **"Forfait restant"** screen [shot]: one row per allowance, stated as remaining out of total in the natural unit — "50€ restants sur 50€", "5 séances restantes sur 5", "1 paire restante sur 1" — grouped by reset period ("Jusqu'au 1er janvier 2023", "Tous les 2 ans", "Tous les 4 ans").

### 2i. Adding a family member [live + shot, partial]

- At signup it is deferred on purpose: "Non, pas maintenant" is an explicit option and the helper promises "Vous pourrez ajouter à tout moment votre partenaire une fois votre contrat signé."
- In the app, covered people appear as a filter row on the care list (Mathilde · Antoine · Nicolas), and each care line names the person.
- The add-a-beneficiary flow itself was not found in any public official source. Not verified.

---

## 3. How they simplify a complex domain

**Answer in euros, for this person, for this act.** The care detail screen [shot] is the clearest example:

> 🤒 Consultation généraliste — Le 02/08/2020 pour Edouard
> **25 € remboursés en totalité**
> [one bar split in two colours]
> 17,50 € par la Sécu — Payés via la carte de Tiers-payant
> 7,50 € par Alan — Payés via la carte de Tiers-payant
> 0 € de votre poche
> + Ajouter un document — Facture, devis, ordonnance, imagerie…

The headline is the conclusion in one line. The breakdown is three rows that add up to the headline. "Reste à charge" is written "de votre poche". Each row has a chevron for more. Nothing about BRSS, percentages or codes appears at this level.

**Three numbers, always the same three.** Who paid what is always Sécu / Alan / you. The same split appears in the care list ("10 € de votre poche") and in the help text ("C'est donc ce dont vous êtes remboursé au total, Sécu + Alan").

**Plans are shown as four euro lines and a price** [live, /fr-fr/assurance-sante/tns]. Three cards (Essentiel · Confort · Plus). Each has a one-sentence promise in plain words ("Dentiste, ophtalmo, hôpital : fini les dépenses qui font mal."), the same four lines in the same order (glasses, dental consultations, hospital stay, alternative medicine), then "Dès 50 € par mois — Prix indicatif pour une personne de 35 ans". Above the cards: "Ces 3 offres sont des exemples. Obtenez votre devis en quelques questions pour découvrir celle qui vous correspond." Benefits common to all plans are stated once above the cards instead of repeated in each. The Canadian page does the same in English with three lines per plan and "All plans include…" once underneath [live, /en-ca/pricing].

**What is left out of the first view:** the full guarantee table, percentages of the Sécu base as the main unit, exclusions, legal terms. They exist one level down (help articles, "Détails", the comparison tool).

**Jargon is explained with one running example** [live, help article "Le petit guide des remboursements", https://alan.com/help/a_le-petit-guide-des-remboursements]. Each concept gets a one-sentence definition, then "Par exemple" with the same general-practitioner visit carried through:
- "la Sécu décide qu'une consultation chez un généraliste vaut 30 €"
- "la Sécu rembourse 70% … donc 70% de 30 €, soit 21 €"
- "au lieu de vous rembourser 21 €, la Sécu vous remboursera 19 €" (franchise)
- "pour une garantie de 300%, vous serez donc remboursé au maximum de 30 € × 300%, soit 90 €"
- then two worked cases: "Si votre consultation coûte 48 €…", "si votre consultation coûte 100 €…".
The article also announces how much is left: "Plus que 2 notions, pour bien comprendre vos remboursements !"

**Everyday analogies.** "Un devis… comme chez le garagiste ?"; BRSS glossed as "quel est le prix "juste" d'un soin selon la Sécurité sociale ?" [doc, devis article].

**Their own price model in one sentence with a number** [doc, /fr-fr/business-model]: "Par exemple, si nous remboursons 50 € par an par membre, nous établissons la cotisation à 50 €. Pas plus, pas moins."

**Tax deduction as a calculator, not a paragraph** [live, TNS page]: "Combien pouvez-vous déduire de vos impôts ? … Faites le calcul !" with a status selector and a worked example in the footnote ("plan Confort 600 €/an : jusqu'à 270 € d'économies…").

**Comparison done for the user** [doc, /fr-fr/ressources/outils/comparaison-garanties]: instead of publishing a comparison table to decode, the visitor uploads a photo or PDF of their current table; "Chaque garantie est mise en face de son équivalent… votre niveau et celui d'Alan sur la même ligne", including "où votre contrat actuel reste devant". Three numbered steps; preview on screen, full version by email.

**Long content is progressive.** Product pages end with an FAQ where the legal detail sits (Madelin ceilings, eligibility lists with ✅ / ❌), after the short version has already been given higher up.

---

## 4. Interaction model

- **One question per screen, tap to advance.** Choice screens have no submit button; the tap is the answer and the navigation. Only typed fields have "Continuer". [live]
- **Options are full-width cards with a bold answer and a grey gloss.** The gloss carries the definition or the examples, so no tooltip is needed. [live]
- **Ask for the least precise value that works.** Birth year instead of date of birth; postal code instead of address; headcount as three buckets; "1 enfant / 2 enfants ou plus". [live]
- **Ask for what the person knows, derive what they don't.** Company name → convention collective; five habits → plan. [live]
- **Say why, next to the field.** "On s'en sert pour calculer votre prix."; the "Pourquoi demander cette information ?" panel. [live]
- **Deferral is a first-class answer.** "Non, pas maintenant" with a promise that it can be done later. [live]
- **Placeholders are realistic examples** ("2002", "75001", "Institut Pasteur 75010", "marie.curie@nobel.fr", "0611223344"); labels stay visible above the field. Optional fields are marked in the label: "Téléphone (optionnel)". [live]
- **Announce the effort before a block.** "5 questions rapides…" → "C'est parti"; "On y est presque ! Dernière étape avant de vous montrer votre offre". [live]
- **Validation** [live]:
  - Empty required field, on submit: "Indiquez votre année de naissance"; "Un email est nécessaire"; login: "L'email est obligatoire".
  - Invalid value: "Indiquez une année de naissance valide" (on submit); "L'email n'est pas valide" (on leaving the field).
  - The message appears directly under the field, the field gets a tinted background, the input keeps its value, and `aria-invalid` + `aria-describedby` are set. No banner at the top, no modal, no disabled submit button.
  - Wording is inconsistent across the three forms (imperative in one, statement in the others).
- **Defaults and pre-fill.** No option is pre-selected on choice screens. Typed values persist on back. Returning to the funnel resumes it. Login keeps the email and offers "Changer d'email". [live]
- **Feedback after an action** [doc + shot]:
  - Reimbursement: a push notification titled "Nouveau remboursement" with the act and date as the body ("Consultation Ostéopathe du 04/06/2024"). The listing describes it as arriving "avant même celui de sa banque".
  - Document sent: "vous n'avez rien à faire".
  - Quote too vague to estimate: an email says so.
  - Chat: "reçu ✓".
- **One card, one action.** Cards that ask for something carry exactly one full-width button whose label names the act: "Commencer l'exercice", "Obtenir mon diagnostic", "Parlez à un psychologue", "Passer 100% digital". [shot]
- **Shortcuts for the most frequent needs.** Card and search in the top bar; long-press on the app icon opens "4 raccourcis" ("Votre carte Alan ? Elle est juste là."). [doc, /fr-fr/nouveautes]

---

## 5. States

**Loading** [live]: funnel entry shows three small centred dots on a blank page, then the first question. No skeleton, no text. Homepage counters animate from 0 to their value. In-app loading states were not observed.

**Errors**
- Field errors: see §4.
- 404 [live]: title "Erreur !", then "Cette page est introuvable... Votre requête s'est perdue dans le cyber-espace. Notre équipe est en route pour la retrouver !" Friendly, but it offers no link or search; this is a weak spot, not a pattern to copy.
- Wrong-audience dead end: handled as guidance (§2c).
- In-app errors: a Play review [3p] quotes a generic "something went wrong" on the callback request. Not observed directly.

**Empty / zero states** [shot]
- Allowances are never blank. An unused one reads "50€ restants sur 50€"; a used-up one reads "0€ restants sur 100€" and loses its accent colour.
- Zero is stated, not hidden: "0 € de votre poche".
- A true empty state (no care yet, no documents) was not observed.

**Success moments**
- The lock-screen notification "Nouveau remboursement" is the success screen for a claim [shot].
- The care detail headline "25 € remboursés en totalité" states the outcome in words before the numbers [shot].
- Exercise completed: a green check on the thumbnail [shot]. Daily streak: a ring and a campfire with the day count [shot + 3p UXSnaps].

**Status of a long-running process (a reimbursement)**
- The timeline is a list of care events grouped by month, each with type, date, person and the amount left to pay [shot].
- A detail page splits who paid what and how ("Payés via la carte de Tiers-payant") [shot].
- A separate "Virements" tab lists the money movements, distinct from the care events [shot].
- Expected duration is stated up front, as a share within a time, everywhere: "70% … en moins d'une heure", "90% sous 24h, 96% sous 72h" [doc].
- One [3p] source reports an intermediate status label "En attente de la Sécurité sociale", i.e. naming who the process is waiting on. Plausible, not verified.
- Behind the scenes, Alan prioritises work by time remaining before the promised delay, not first-come-first-served [doc, https://alan.com/fr-fr/blog/tout-alan/a/comment-nous-avons-accelere-nos-remboursements-par-le-suivi-en-temps-reel-et].

The published speed figures differ by surface: "90% des remboursements traités dans les 24h" (App Store image), "98 % … en moins de 24 h" and "75 % … en moins de 5 min" (homepage), "50% … under 5 minutes; 90% in under a day" (/en), "70% … moins de 5 minutes, 99% … moins d'un jour ouvré" (April 2025 blog). The pattern (share + delay) is constant; the numbers are not.

---

## 6. Words

**Address.** Formal "vous" in the product and site. The interface speaks as "on" / "nous" ("On s'en sert pour calculer votre prix", "On vous rappelle dans la journée", "On s'occupe de tout"). Buttons that commit the user are in the first person: "Mon devis en 2 min", "Me connecter", "M'inscrire", "Obtenir mon diagnostic", "Comparer mes garanties", "Voir mes garanties". In the medical chat screenshot the doctor uses "tu" and the first name.

**Jargon replaced or demoted** (where seen)

| Insurance term | What Alan writes | Where |
|---|---|---|
| reste à charge | "de votre poche" | care detail and care list [shot] |
| tableau de garanties | "Vos garanties, sans jargon"; search "kiné" / "ophtalmo" | homepage [live]; store listing [doc] |
| plafond / forfait consommé | "50€ restants sur 50€", "1 paire restante sur 1" | Forfait restant [shot] |
| convention collective | asks the company name instead | funnel [live] |
| niveau de garantie optique | "Pour la vue, que portez-vous ?" | funnel [live] |
| soins prothétiques | "Couronnes, bridges, dévitalisation" as a gloss | funnel [live] |
| TNS | "Indépendant, profession libérale ou freelance" | funnel, menus [live] |
| TPE / PME | "1 à 9 salariés", "10 à 100 salariés" | menu [live] |
| BRSS | "un prix pour chaque chose qu'elle rembourse" | help article [live] |
| délai de carence | "Couvert dès le premier jour, sans délai de carence" (plain version first) | TNS page [live] |
| loi Madelin | "Déduisez jusqu'à 40% de votre mutuelle — Tout sur la loi Madelin, sans le jargon." | menu [live] |
| assuré / ayant droit | "membre", "partenaire", "vos enfants", "vos proches" | funnel, listing [live/doc] |

When a technical term must appear, it comes second and in brackets or as a gloss: "La base de remboursement de la Sécurité sociale (ou BRSS)", "La "télétransmission" (NOEMIE) … (on s'occupe de l'activer)".

**Questions are asked the way a person would ask them.** "Où habitez-vous ?", "Et pour le dentaire ?", "Côté médecins, vous consultez plutôt...", "Besoin de parler à quelqu'un ?", "Besoin d'un coup de main avec Alan ?".

**Levity, in small doses, next to serious subjects.** "En cas d'hospitalisation (on touche du bois !)"; "Il ne s'agit pas d'une curiosité mal placée"; cookie banner: "Vous pouvez les accepter ou les refuser, c'est vous qui voyez."; "0€ à débourser. Rien. Nada."; "Prêt. Feu. Remboursé."; support card: "Oui, ça existe." The joke never replaces the information; it sits beside it.

**Button labels** (French): "Continuer", "C'est parti", "Voir les offres", "Mon devis en 2 min", "Demander une démo", "Me connecter", "Changer d'email", "J'ai oublié mon mot de passe", "Commencer l'exercice", "Parlez à un psychologue", "Passer 100% digital", "Ajouter un document", "Envoyer un document", "Faire une simulation", "Comparer mes garanties", "Retour". Verb first, object named, no "OK" / "Valider" / "Soumettre" seen. The primary marketing button states its cost in time.

**English** [live /en-ca/pricing; doc Play listing]: same construction. "Simple group benefits, with prices you can see"; steps "See your price / Sign online / Invite your team / Get care, fast"; FAQ answers that start with the answer: "Can I sign up online? — Yes. Teams of 3 or more sign up in minutes." Listing: "Upload a bill… Just take a picture of it." "Receive a notification of your reimbursement, even before your bank."

**Error copy** [live]: "Indiquez votre année de naissance" · "Indiquez une année de naissance valide" · "Un email est nécessaire" · "L'email n'est pas valide" · "L'email est obligatoire" · 404: "Votre requête s'est perdue dans le cyber-espace."

**Reassurance copy at decision points** [live]: "Vous pourrez ajouter à tout moment votre partenaire une fois votre contrat signé." · "100 % gratuit, sans engagement" · "Une démo personnalisée, sans engagement — Un conseiller vous contacte sous 48h".

**Support voice, as Alan describes it** [shot + live]: four words on the support card — "Efficace · Gentil 💕 · Pédagogue · Clair". Help-centre footer: "si vous ne trouvez pas votre réponse, un bouton "Nous contacter" se trouve en bas de chaque article."

**People are named.** Release notes credit the makers by first name ("Merci à Xavier et Bruno d'avoir implémenté ces actions rapides"); topic pages show "Notre équipe" with faces and roles; the advisor card shows faces. [live/shot]

---

## 7. Mobile-first choices

- **Bottom navigation with 4 labelled destinations** plus a distinct assistant button; icons always paired with a word. [shot, homepage hero]
- **Global actions at the top, small; the main action low and wide.** Profile, search, points and card are compact buttons in the top bar. The action a screen exists for is a full-width button inside a card in the lower-middle of the screen ("Commencer l'exercice", "Parlez à un psychologue", "Obtenir mon diagnostic"). [shot]
- **Two stacked full-width buttons for a binary choice**, filled first, outline second: "Me connecter" / "M'inscrire" in the app [shot]; "Mon devis en 2 min" / "Demander une démo" on the mobile homepage [live].
- **Pages, not sheets, for drill-down.** Every detail screen in the screenshots is a full page with a round back button top-left and, on list-like screens, a centred title ("Forfait restant", "Mal de dos"). A product photo view uses a close (×) button, i.e. modal. No bottom sheet appears in any official screenshot; whether sheets are used elsewhere is unknown.
- **Whole rows are the tap target**, with a chevron at the right edge (allowances, care lines, daily actions). [shot]
- **Horizontal chips for sub-navigation and filters**: person filter, "Soins · Documents · Virements · Arrêts de travail", "Programme · Clinique", "Tout · Haut du dos · Bas du dos · Cervicales". [shot]
- **Camera as the input device.** Claims and quotes are sent by photographing the paper. [doc]
- **Number keyboards for numeric fields** (`inputmode="numeric"`, `type="tel"`, `type="email"`). [live]
- **Funnel on a phone** [live]: progress becomes a labelled segmented bar; the "why we ask" panel moves under the field; the advisor card shrinks to a chip at the top so it never covers the answer area; titles are shortened.
- **One code base for web and app.** Alan's design system "Murray" moved to a universal React Native for Web implementation, "adopting mobile-first paradigms" for the web too. [doc, https://medium.com/alan/towards-a-universal-design-system-dc4a65e1e13d]
- **Outside the app:** card in Apple / Google wallet; long-press quick actions. [doc]

---

## 8. Marketing site UX

### Homepage, section by section [live]

| # | Section | Job |
|---|---|---|
| 1 | Hero: H1 "Le standard de l'Assurance Prévention"; sub "Assurance, soins et prévention réunis dans une app qui préfère agir plutôt que de vous faire patienter"; 2 buttons; an app mockup whose 4 tabs can be clicked | Say what it is; let the visitor try the product's structure before any form |
| 2 | Four counters: "1,1 million de membres couverts dans 6 pays" · "4,9/5 étoiles" · "1 million de remboursements traités tous les mois" · "1 000 Alaners" | Proof of scale |
| 3 | "Plus de 41 000 entreprises…" + logos | Social proof |
| 4 | Manifesto + ambassador quote (Kylian Mbappé) | Belief, emotion |
| 5 | "Pour les entreprises" — three blocks, each = headline + short paragraph + one figure + one button ("+1 000 pas par jour", "93 % de fidélité client", "Moins de 2 heures par an") | Buyer benefits |
| 6 | "La santé n'attend pas. Nous non plus." — support: "moins de 5 minutes par chat, le jour même par e-mail ou par téléphone" | Service promise |
| 7 | "Pour nos membres" — "98 % des remboursements en moins de 24 h", "Vos garanties, sans jargon", "Vos questions santé, 24h/24, 7j/7" | User benefits |
| 8 | Four product blocks: Alan Clinique (Mo) · Alan Play · Alan Precision · Alan Shop | Breadth |
| 9 | Testimonials (HR and finance leads, named, with role and company) | Proof from peers |
| 10 | Closing: "Rejoignez 1,1 million de personnes qui ont mieux à faire qu'attendre." + the two buttons | Last call |

Calls to action: only two destinations on the whole page — "Mon devis en 2 min" (5 occurrences plus the sticky header one) and "Demander une démo" (4 to 5). Text links ("Découvrir nos offres", "Découvrir le partenariat") are secondary. Both audiences (buyers and members) are addressed on one page under explicit labels "Pour les entreprises" / "Pour nos membres".

The first screen offers: one sentence of what it is, one of how it differs, a self-serve path with its duration, and a human path.

### A product page (/fr-fr/assurance-sante/tns) [live]

1. Audience named in their own words: "Fondateurs d'entreprise, freelances, auto-entrepreneurs, professions libérales : on vous simplifie la vie".
2. H1 + three one-line proofs ("Remboursements en 24h", "Couvert dès le premier jour, sans délai de carence", "Déduction fiscale jusqu'à 45%") + two buttons ("Mon devis en 2 min", "Souscrire en ligne").
3. "Pas expert ? On est là pour ça." — three question cards answered in two lines each.
4. Madelin calculator.
5. Three plan cards (see §3).
6. Proof: "25 000+ indépendants", store rating, three short named testimonials, a quote from the offer's owner.
7. FAQ "On répond à vos questions" — long, with ✅ / ❌ lists and worked examples.

### Pricing presentation
"Dès X € par mois" with the assumption stated beside it ("Prix indicatif pour une personne de 35 ans") and the rule for change in a footnote ("Nos prix évoluent avec l'âge et changent au 1er janvier de chaque année"). Exact prices need the funnel. The Canadian page promises visible prices in its H1 and shows "From $128.50 per month".

### Trust elements
Member count, store rating (4,9/5 on about 14 k iOS ratings; Google Play shows 4,4), speed percentages, client logos, named testimonials, advisor faces on the callback card, support response times, a public business-model page, a "solidité financière" page, a Trust Center, regulatory identity in the footer (ACPR), ISO 27001 post. Recent Play reviews [3p] complain about app size, login trouble and bot-like support; the 4,9 figure is the iOS one.

---

## 9. Principles Alan states itself

| Principle (quoted) | Where |
|---|---|
| "**Fight for Simplicity** — We eliminate unnecessary processes, stay concise and articulate, and maintain smart frugality while solving problems pragmatically." | https://alan.com/en/leadership-principles |
| "**Member & Customer-led** — We are obsessively focused on solving customer problems and creating delightful experiences while building trust." | same |
| "**Radically Transparent** — We make information accessible and written-first…" | same |
| "We called it **profound levity**: give people the answers they need with the warmth they deserve." Also: "What if seriousness and playfulness weren't enemies, but partners?" | https://alan.com/en/blog/discover-alan/a/how-our-mascot-came-to-life |
| "We work relentlessly to make our product as intuitive as possible; so that members can find answers to their questions without necessarily reaching out to us." | https://alan.com/en/blog/discover-alan/a/our-vision-of-customer-care-at-alan |
| Care experts "act as the ears and voice of our product team"; every employee does a "Member Day" answering member requests; "we see customer service as an investment, not a cost line". | same |
| On phone support: "il est hors de question de faire attendre nos membres plusieurs minutes… Notre expérience téléphonique doit être aussi rapide qu'un remboursement chez Alan." and "il n'y a rien de pire que de devoir expliquer sa situation par téléphone, pour finalement être « transféré vers le bon service »." Hence callback, by someone who already read the case. | https://alan.com/fr-fr/blog/tout-alan/a/au-dela-de-lecrit-comment-alan-optimise-lexperience-de-contact-avec-le |
| Why writing first: "L'écrit offre ainsi une trace de chaque échange… Il nous permet d'être précis, d'incorporer dans nos réponses des ressources qui simplifient les démarches de nos membres… et ceux-ci peuvent toujours s'y référer plus tard." | same |
| "It is how we hold ourselves accountable to delivering what matters most: **trust, clarity, and care**." Members value "the speed of reimbursements, the simplicity of the app, and the clarity of our guidance". Measured with CSAT at key moments plus an attachment question: "If Alan disappeared tomorrow, how much would you miss it?" | https://alan.com/en/blog/discover-alan/a/whats-better-than-satisfaction-attachment |
| "The best websites don't choose between beautiful and effective. They understand that **clarity, consistency, and quality are the performance levers**." Also: "A poorly chosen visual, a wall of text, an unpolished screen - these are conversion problems parading as design problems." and "When you try to speak to everyone, you speak to no one." | https://alan.com/en/blog/discover-alan/a/behind-the-screens-website-audit-2026 |
| On the AI assistant: "Lasting value comes from real-life usefulness, from helping members navigate health moments with clarity and confidence, not from the "wow effect" of AI." and "When a member moves from Mo to a doctor or customer support agent, a smooth handoff is critical… A wrong redirection can break the experience." | https://alan.com/en/blog/discover-alan/a/researching-ai-products-key-insights-from-mo |
| Design system "Murray": "Murray's primary aim is to ensure a consistent user experience across Alan's products, fostering a familiar environment for users while effectively conveying the brand." | https://medium.com/alan/towards-a-universal-design-system-dc4a65e1e13d |
| Design review in three stages (is it the right project → usability and visuals → UI and interaction detail); reviewers "prennent alors 15 minutes pour tester la démo en silence, en prenant des notes". | https://alan.com/fr-fr/blog/tout-alan/a/collaboration-entre-designers-alan |
| In-house research: "the possibility to conduct usability tests on the spot. It is a game changer." | https://medium.com/alan/alan-design-behind-the-screens-9263628dcbb1 |
| Gamification motto: "Taking care of your health should be rewarding and fun." | https://alan.com/en/blog/discover-alan/a/how-we-built-alan-walk-in-less-than-6-months-part-i |
| "We resisted the pressure to build immediately." A manual concierge service ran for two years before the feature was automated. | https://alan.com/en/blog/discover-alan/a/why-we-waited-2-years-to-build-our-most-requested-feature |
| Vision text: people "delay care because of forms, jargon, waiting lists, or stigma"; insurance should be "simple, transparent, and fast". | https://alan.com/en |

No public Alan document listing product-design principles or UX-writing guidelines as such was found. The table is assembled from culture, care, research and brand posts.

---

## Patterns worth copying

Each rule: what to do — what Alan does that shows it — source.

1. **Name top-level navigation by who the visitor is, and describe each link in one plain line.** — Main row is Entreprises / Indépendants / Particuliers / Secteur public; "1 à 9 salariés — TPE et petites structures". — [live] alan.com header.

2. **Name app tabs with verbs or moments, at most four, plus one obvious place for help.** — Aujourd'hui · Consulter · Assurance · S'équiper, and a separate assistant button. — [shot] homepage hero mockup.

3. **Put search and the most-used object in a persistent top bar.** — "Rechercher" and the card button on every tab; coverage is found by typing "kiné". — [shot] hero mockup; [doc] store listing.

4. **One question per screen; a tap on an answer is also "next".** — 9 of 11 funnel answers are one tap with no submit button. — [live] quote funnel.

5. **Write each option as an answer in the user's words, with the technical meaning in a grey line under it.** — "Des soins classiques — Couronnes, bridges, dévitalisation". — [live] funnel screen 8.

6. **Ask for what people know; derive what they don't.** — Company name instead of convention collective; five habit questions instead of "choose a plan". — [live] funnel.

7. **Ask for the least precise value that does the job.** — Birth year, postal code, headcount in three buckets. — [live] funnel screens 4, 5 and company step 3.

8. **Say why you ask, beside the field, in one sentence.** — "On s'en sert pour calculer votre prix."; "Pourquoi demander cette information ?" panel. — [live] funnel.

9. **Make "not now" a real answer and say it can be done later.** — "Non, pas maintenant" + "Vous pourrez ajouter à tout moment votre partenaire une fois votre contrat signé." — [live] funnel screens 2–3.

10. **Announce the size of a block of work before it starts, and say when the end is near.** — "5 questions rapides…" → "C'est parti"; "On y est presque ! Dernière étape…". — [live] funnel screens 6 and 12.

11. **Show progress as a few named stages, and keep a back button that preserves what was typed.** — Situation · Offre · Devis · Souscription; birth year and postal code survive "Retour"; the funnel resumes on return. Do better than Alan on one point: make the indicator actually move. — [live] funnel.

12. **Report a field error under the field, in one short sentence that says what to enter; keep the value.** — "Indiquez une année de naissance valide" under the input, input unchanged. — [live] funnel, login.

13. **Lead with the outcome in words and one number, then a breakdown that adds up to it.** — "25 € remboursés en totalité" → 17,50 € par la Sécu / 7,50 € par Alan / 0 € de votre poche. — [shot] App Store screenshot 4.

14. **State limits as "remaining out of total" in the natural unit, grouped by when they reset.** — "50€ restants sur 50€", "5 séances restantes sur 5", "1 paire restante sur 1", "Tous les 2 ans". — [shot] App Store screenshot 9.

15. **Show zero explicitly.** — "0 € de votre poche", "0€ restants sur 100€". — [shot] App Store screenshots 4 and 9.

16. **Explain a concept with one sentence and one worked example in real money, and reuse the same example throughout.** — The 30 € GP visit carried through base, 70%, franchise and ceiling. — [live] help article "Le petit guide des remboursements".

17. **Present plans as the same few lines in the same order, a one-sentence promise, and a "from" price with its assumption.** — Four euro lines per plan; "Dès 50 € par mois — Prix indicatif pour une personne de 35 ans"; shared benefits stated once. — [live] /fr-fr/assurance-sante/tns.

18. **Give every long process an expected duration up front and a notification at the end.** — "70% … en moins d'une heure, 90% sous 24h"; push "Nouveau remboursement — Consultation Ostéopathe du 04/06/2024". — [doc] reimbursement guide; [shot] App Store screenshot 3.

19. **One card, one full-width button, labelled with the act; first-person labels for commitments.** — "Commencer l'exercice", "Parlez à un psychologue", "Mon devis en 2 min", "Me connecter". — [shot] store screenshots; [live] site.

20. **Turn dead ends into directions, and keep a human one tap away.** — The employee path tells the person which email to search for and offers to resend it; "Parler à un conseiller — On vous rappelle dans la journée" on every funnel screen; "Un humain toujours à portée de main" for the assistant. — [live] funnel; [doc] /fr-fr/nouveautes.

---

## Not verified

- **Everything after the email step of the quote funnel**: how offers and prices are presented, comparison of plans, signup, payment, contract signature. An email address is required to proceed and none was submitted.
- **The company funnel beyond the company-name step.**
- **The logged-in member app and web space.** No direct observation of: the document-upload screens, the claim confirmation screen, reimbursement status labels, the find-a-doctor / map flow, the add-a-beneficiary flow, coverage search results, settings, onboarding after invitation.
- **Adding a family member**: only the signup-time deferral and the per-person filter were seen. No official public description of the flow was found.
- **App states**: empty states for a new member, loading, offline, in-app error messages. Only allowance and zero-amount states were seen in screenshots.
- **The bottom tab bar** is known only from the marketing mockup on the homepage, not from a store screenshot or a running app. The role of the fifth (mascot) button is inferred.
- **Sheets versus pages**: no bottom sheet appears in official screenshots; absence in the real app is not established.
- **App login method**: web login uses email then password (observed). A third-party article claims an emailed magic link in the app; unconfirmed.
- **Status wording "En attente de la Sécurité sociale"** comes from one third-party SEO article of low reliability.
- **Store screenshots are of mixed age** (dates from 2020 to 2024 appear in them, and two home-screen generations). Current screens may differ.
- **The public help centre** exposes only a small set of articles to logged-out visitors; searches for member how-tos (send a document, beneficiary, card) returned unrelated results. The member-facing help content was not read.
- **Design-system content and any internal writing guide** are not public; only the engineering post about "Murray" was read.
- **Whether today's audience-first navigation is the post-audit redesign** announced in March 2026 was not confirmed.
- **Speed figures** differ across Alan's own surfaces (see §5); none was independently checked.
- **English product copy** was sampled only from the Canadian pricing page, the /en corporate page and the Play listing; the English app UI was not seen.
- **Argus de l'assurance articles** on the app redesign could not be fetched (blocked), so they are not used.
