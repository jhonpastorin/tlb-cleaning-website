# Editing the TLB Cleaning website

This guide is for the TLB team. It covers how to change the words and photos on tlbcleaning.com.au yourself, using an editor called Pages CMS.

You can't break the live site from the editor. Everything you save goes to a **preview copy** of the site first (called "staging"). Your changes only go live after they've been checked and published.

---

## 1. Logging in

1. Open the invitation email from Pages CMS and follow the link. After the first time, go to **app.pagescms.org** and sign in with the same email address.
2. Choose the TLB Cleaning website.
3. **Check the branch.** The editor shows which branch you're on, near the top. It should say **staging**. If it says anything else (for example `main`), click it and choose `staging`. Always edit on staging.

---

## 2. Finding what you want to change

The list on the left is the whole site:

| I want to change... | Go to |
|---|---|
| The words or photos on a page | **Main pages**, **House cleaning**, **Commercial cleaning** or **Guides**, then the page |
| The phone number, email or footer details | **Site settings > Contact details** |
| The menu at the top of the site | **Site settings > Menus** |
| The "Get an instant quote" button on every page | **Site settings > Site-wide buttons** |
| The four proof points under each hero (the dark card) | **Site settings > Trust bar** |
| "Easy to book, instant pricing, cost effective" and the "How it works" steps | **Site settings > Brand lines** |
| The comparison table (us against a national brand and an independent cleaner) | **Site settings > Comparison table** |
| The contact form's wording or its "Type of service" options | **Site settings > Contact form** |
| Google reviews shown on the site | **Google reviews** |
| Which town pages are live | **Locations > Live towns and region photos** |
| A town page's photo or its "about this town" paragraph | **Locations > Town pages**, then the town |

Inside a page, the sections are listed **in the same order as on the page**, top to bottom. Each label says where on the page it is, for example "Intro (under the trust bar)". Click a section to open it.

**Read the grey notes under a field.** Many say something important, like "this claim still needs confirming" or "this appears on every page".

---

## 3. Changing words

- Click into a field and type. Headings, sentences and FAQ answers all work the same way.
- **Lists** (FAQs, cards, steps, table rows): use the add button under the list to add one, and the controls next to each item to remove it or move it up and down.
- **Body text** in some sections is a list of blocks. Each block is a **Paragraph**, a **Bullet list** or a **Subheading**. Add whichever you need.
- **Leaving a field empty** usually means "use the normal wording". For example, an empty button uses the site-wide quote button. The note under the field says so when that's the case.

### A few special words you'll see

| You see or type | What it does |
|---|---|
| `{{line.instant}}` or `{{line.fast}}` | Puts in the brand line ("Easy to book, instant pricing, cost effective." or the fast-quoting version). Leave these as they are. |
| `quote` or `book` as a link | Sends people wherever the site-wide quote or booking button goes. Use these instead of typing an address. |
| `{town}`, `{region}`, `{state}` | Only in the town and region page templates. The site fills in each town's or region's name. Spell them exactly as shown. |
| `yes` / `no` in a table cell | Shows a tick or a cross. To show the actual word, type it in quotation marks: `"No"`. |

---

## 4. Photos

- Click the photo field to **choose a photo already on the site**, or **upload** a new one.
- **Before uploading,** export the photo at about **2400 pixels on the long edge**. Photos straight off a phone are huge; the site shrinks them for visitors anyway.
- **Every photo needs a description** ("Describe the photo"). Write one plain sentence about what's in it, for example "A TLB cleaner wiping down a kitchen bench". Don't start with "image of". People using screen readers hear this, and Google reads it.
- **Use only real TLB photos or photos TLB has the rights to.** Never a stock photo presented as a TLB job.
- **Before and after photos** must be from real jobs, taken from the same spot, with the client's written permission and nothing identifying in frame: no house numbers, street signs, mail, people or names on doors.
- **Town photos** show a scene typical of the town, not a photo of the town itself, unless TLB actually took it there. So the description says what's in the frame and never names the town, a landmark or a street.
- The site crops each photo to fit its space. Check how it looks on the preview site after saving.

---

## 5. Saving and checking

1. Click **Save**. Your change is saved to the staging (preview) site.
2. Wait a few minutes, then open the staging site and look at the page.
3. **If your change doesn't appear** after ten minutes, the site probably couldn't use something in it, for example a required field left empty or a photo with no description. The previous version stays up and nothing breaks. Tell Jhon which page you changed: the site's checks record exactly which field it was, so it's quick to put right.

You can make lots of changes and check them all on staging before anything goes live.

---

## 6. Making it live

When you're happy with the changes on the staging site, **tell Jhon at MNO Ventures what you changed**. Jhon checks them and presses **Publish to live site**. Your login can't publish, which is deliberate: there's always a second look before the live site changes.

Before anything goes live, the site runs its checks automatically. If one fails, nothing is published and Jhon is told why.

---

## 7. Writing rules

These come from the TLB Brand Foundation. The site checks some of them automatically and will refuse to publish a change that breaks one, so it's quicker to get them right first time.

**Never write:**
- **Price words:** cheap, budget, affordable, "competitive rates" or premium. "Cost effective" is fine when you say why.
- **Headcounts:** how many cleaners TLB has, or that the team is employed full-time.
- **"Local mums" or "team of local mothers"** in sales copy. The founder story on the About page is the exception.
- **A bond-back or satisfaction guarantee.** Saying that TLB does *not* offer one is fine.
- **Exclamation marks.**
- **Em dashes** (the long dash, longer than a hyphen). Use a comma, a full stop or brackets instead.
- **"Sparkling", "spotless" or "transform your home".**
- **Words in [square brackets].** These are notes for us, not for customers. If a sentence has one, the fact in it still needs confirming.
- **Comparisons with other cleaning companies in ordinary sentences.** They belong in the comparison table only.

**Always:**
- Write in Australian English, in a plain, friendly voice. Contractions are good ("we'll", "you're").
- Put no comma before "and" at the end of a list ("homes, hosts and businesses").
- Write headings in sentence case: "What's included in every visit", not "What's Included In Every Visit".
- Only state numbers you can back up, such as "98% of our clients stay with us". If someone asked TLB to prove it, could we?

**Google reviews** are copied in **word for word** from Google: the reviewer's spelling, the name exactly as Google shows it, nothing shortened or tidied. Only reviews that are live on Google. Never show a star average or a review count.

---

## 8. What you can't change here

Ask Jhon for these. They need a developer, usually because changing them affects other things:

- The layout, colours, fonts or the order of sections on a page.
- Adding or removing a page, or changing a page's web address.
- Adding a new town (it also needs a photo and a place in the "nearby towns" groups).
- The region names, which the contact form sends to the Monday.com board word for word.
- The fields on the contact form.

---

## 9. Help

If something looks wrong, or you're not sure whether a change is OK, ask Jhon before saving. If you've already saved, that's fine: nothing goes live without being published, and every change can be undone.
