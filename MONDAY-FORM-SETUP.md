# Contact form → Monday.com: setup guide

Everything needed to make the contact form at **tlbcleaning.com.au/contact/**
create an item in a Monday.com board. Allow about 40 minutes end to end.

The website side is already built and deployed. **The form will not submit
until step 4 is done** — until then it renders normally but tells the reader
it is not connected, rather than showing a thank-you and quietly binning the
enquiry.

---

## How it fits together

```
Reader fills the form
        │  POST  (application/x-www-form-urlencoded)
        ▼
Make.com "Custom webhook"          ← the URL you create in step 2
        │
        ▼
Make.com "Monday.com → Create an item"
        │  (holds the Monday connection / API token)
        ▼
Monday.com board: "Website Enquiries"
```

The website is a **static site** — there is no server and no database in it.
That is why the submission goes to Make rather than to Monday directly: a
Monday API token in a static page would be readable by anyone who views
source, and could be used to read and modify every board in the account. The
token lives in the Make connection instead and never touches the website.

**Zapier works identically.** Use a *Catch Hook* trigger and a *monday.com →
Create Item* action; every field name and mapping below is the same. Make is
used in the instructions because its free tier (1,000 operations/month) is
more than enough for this volume.

---

## Step 1 — Build the Monday board

Create a board called **Website Enquiries**. Add these columns.

| Column name | Monday column type | Notes |
|---|---|---|
| *(item name)* | — | Every board has one. It will hold the enquirer's full name. |
| **Email** | Email | Not a text column — the Email type makes it clickable and de-duplicable. |
| **Phone** | Phone | Set the country to **Australia (+61)**. |
| **Type of Service** | Dropdown | Labels must match step 1a **exactly**. |
| **Service Area** | Dropdown | Labels must match step 1b **exactly**. |
| **Message** | Long Text | Free text from the reader. Can be empty. |
| **Status** | Status | Your pipeline — suggested labels in step 1c. |
| **Source Page** | Text | Which page the form was on. `/contact/` today. |
| **Submitted** | Date | Tick **"Show time"** when creating it. |

> ### ⚠️ The one thing that silently breaks this
> Monday **discards** a dropdown value whose label does not already exist on
> the column, unless "create labels if missing" is enabled. It does not error
> — the item is created with that cell simply blank. So if the labels below
> are not typed exactly as written, enquiries will arrive with no service and
> no area and nothing will look wrong until someone notices.
>
> Copy and paste them. Watch for `&` versus `and`, and the spaces around the
> `/` in `End of Lease / Bond Cleaning`.

### 1a. "Type of Service" — 9 labels, exactly

```
Regular Home Cleaning
Deep Cleaning
End of Lease / Bond Cleaning
Airbnb & Holiday Let Turnovers
Carpet, Upholstery & Floors
Outside Home & Exterior Washing
NDIS & Assisted Living
Commercial Cleaning
Something else
```

These are deliberately broad — one row per *group* of services, not one per
service page. The site's menu carries about 40 individual services; a dropdown
that long is one people abandon. The **Message** field is where the specific
job gets described.

`Something else` is not filler. Four services are advertised in the site's menu
with no page built yet (forensic and trauma, hoarder and squalor, deceased
estate, seniors) and those enquiries need somewhere to land.

### 1b. "Service Area" — 4 labels, exactly

```
Northern Rivers NSW
The Tweed
Southern Gold Coast QLD
Somewhere else
```

The first three are the site's own region names, character for character —
they come straight out of `src/data/locations.ts`, the same list that drives
the mega-menu and every "Where we clean" band. If a region is ever renamed on
the site, this column has to be renamed with it.

`Somewhere else` catches out-of-area enquiries. Worth having: it is better to
know an enquiry was outside the service area than to have someone pick the
nearest wrong region.

### 1c. "Status" — suggested pipeline

```
New            (set this as the default for new items)
Contacted
Quoted
Booked
Not proceeding
```

Nothing in the form sets this. Make will stamp every new item as **New**.

---

## Step 2 — Create the Make.com scenario

1. **Make.com → Create a new scenario.**
2. Add the module **Webhooks → Custom webhook**. Click **Add**, name it
   `TLB website contact form`, **Save**.
3. Copy the URL it gives you. It looks like
   `https://hook.eu2.make.com/abc123def456ghi789`. **Keep this tab open** —
   you need the webhook listening for step 3.
4. Add a second module: **monday.com → Create an Item**.
   - **Connection**: Add one. Make will ask for a Monday API token —
     in Monday, go to your avatar → **Developers** → **My access tokens**,
     and copy the personal API token. *(Consider creating the connection from
     an admin or service account rather than a personal one, so the
     integration does not break when someone leaves.)*
   - **Board**: `Website Enquiries`
   - **Group**: whichever group new leads should land in.
5. Leave the field mapping until step 3 — the mapping picker will not show the
   form's fields until Make has seen one real submission.

---

## Step 3 — Send a test submission, then map the fields

Make can only map fields it has seen, so the order matters: **run the webhook
first, map second.**

1. In Make, click **Run once** on the scenario. It now says "waiting for data".
2. Put the webhook URL into the site's environment **temporarily** so you can
   fire a real submission at it. Either:
   - set `PUBLIC_ENQUIRY_WEBHOOK_URL` in a local `.env`, run `npm run dev`,
     and submit the form at `localhost:4321/contact/`; **or**
   - set it on the **staging** Render service and submit on the staging URL.
3. Fill in the form on the site and send it. Make will receive the payload and
   fill in its field list.

### What arrives

Ten fields, all strings:

**Only four fields are required on the form**: first name, email, contact
number and type of service. Everything else can arrive empty, so build the
board and any downstream automations on that basis.

All ten keys are sent on **every** submission — an optional field that was
left blank arrives as an empty string rather than being omitted. That matters
for Make: a mapping never breaks with "field not found" because a field is
always there to map, it is just sometimes empty. Verified against a minimum
submission, not assumed.

| Field | Example | Always present? |
|---|---|---|
| `firstName` | `Teagan` | **yes** — required |
| `lastName` | `Brown` | may be empty |
| `email` | `teagan@example.com` | **yes** — required, format-validated |
| `phone` | `0400 000 000` | **yes** — required, **not** format-validated |
| `service` | `End of Lease / Bond Cleaning` | **yes** — required |
| `area` | `Northern Rivers NSW` | may be empty |
| `message` | `3 bed 2 bath, keys due back 14 Oct` | may be empty |
| `sourcePage` | `/contact/` | yes |
| `submittedAt` | `2026-09-21T04:12:33.481Z` | yes — ISO 8601, **UTC** |
| `elapsedMs` | `48210` | yes — see the spam section |

> **Two of those optional fields will cost you something, so decide now.**
>
> **`area` is the field that routes the job**, and it can come through empty.
> Those items land with a blank Service Area cell — nothing errors, they just
> cannot be filtered or grouped by region. The town is usually somewhere in
> the message, because the form and the page above it both ask for it, but it
> will not be in a column. Worth a board view filtered to `Service Area is
> empty` so those do not sit unnoticed.
>
> **`lastName` can be empty**, so mapping Item Name as
> `firstName + " " + lastName` produces `"Teagan "` with a trailing space.
> Harmless, but if it bothers you, map the item name to `firstName` plus
> `lastName` through Make's `trim()` function.

`phone` is accepted as typed, on purpose. Australian numbers get written a
dozen ways (`0400000000`, `0400 000 000`, `+61 400 000 000`, with and without
area codes) and a regex strict enough to be useful rejects real customers.
Monday's Phone column stores it as given.

### Mapping into the Monday module

| Monday field | Map to | Notes |
|---|---|---|
| **Item Name** | `firstName` + space + `lastName` | In Make: drag both fields in with a space between them. |
| **Email** → email | `email` | |
| **Email** → text | `email` | Monday's Email column has two parts; put the address in both, or the cell shows blank. |
| **Phone** → phone | `phone` | |
| **Phone** → country | `AU` | Type it as a constant. |
| **Type of Service** | `service` | Must match a label from 1a. |
| **Service Area** | `area` | Must match a label from 1b. |
| **Message** | `message` | |
| **Status** | `New` | A constant, not a mapped field. |
| **Source Page** | `sourcePage` | |
| **Submitted** | `submittedAt` | See the timezone note below. |

> **Timezone.** `submittedAt` is UTC. Eastern Australia is UTC+10, and NSW
> observes daylight saving (UTC+11, October to April) while Queensland does
> not — and this business works both sides of that border. Set the Make
> scenario's timezone (⚙️ → **Scheduling** → timezone) to **Australia/Sydney**
> and let Make convert. Left as UTC, a 9am enquiry files itself as 11pm the
> previous day, which makes the board's dates actively misleading rather than
> merely wrong.

Then **Run once** again, submit the form a second time, and confirm the item
lands in the board with every cell filled. Check the two dropdowns
specifically — those are the ones that fail silently.

Finally: **turn the scenario ON** (the toggle at bottom left). A scenario left
in "Run once" mode handles exactly one submission and then stops.

---

## Step 4 — Point the live site at the webhook

In **Render → the `tlb-cleaning-website` service → Environment**, add:

| Key | Value |
|---|---|
| `PUBLIC_ENQUIRY_WEBHOOK_URL` | the webhook URL from step 2 |

Save, and let Render redeploy. `render.yaml` already declares this variable
with `sync: false`, so Render will also prompt for it on the next Blueprint
sync.

**Verify it took.** The build log prints one line:

```
[FORM] contact form endpoint: CONFIGURED
```

If it instead says `NOT SET`, the variable did not reach the build and the
live form will refuse to submit. That line sits next to the existing
`[SEO] robots:` line — check both on any production deploy.

Then submit the form once on the live site and confirm the item appears.

> **Use a different webhook on staging.** The staging service has its own
> `PUBLIC_ENQUIRY_WEBHOOK_URL` slot. Point it at a second Make scenario
> writing to a test board, or leave it empty. Sharing one webhook means every
> staging test drops a fake lead into the real pipeline.

---

## Spam

Three things are already in place, and one is left to you.

**Honeypot (automatic).** The form carries a hidden `website` field that no
human ever sees or fills. If it comes back filled, the page shows the ordinary
thank-you and sends nothing — telling a bot it was caught only teaches it to
try again. You will never see those submissions.

**`elapsedMs` (a signal, not a block).** Milliseconds between the page loading
and the form being submitted. A human filling eight fields takes at least
15–20 seconds; a bot takes under two. The page deliberately does **not** block
on this, because a fast copy-paste is a real thing a real person does. If spam
becomes a problem, add a **Filter** in Make between the webhook and the Monday
module: `elapsedMs` *greater than* `4000`.

**Empty-field rejection (automatic).** Every required field is validated in
the browser before anything is sent.

**Left to you, if needed:** the webhook URL is visible in the page source. It
is unguessable and it only *receives* data, but a determined spammer who finds
it can POST to it directly, bypassing the honeypot entirely. If that ever
happens, the fix is a second Make filter requiring `sourcePage` to be
non-empty and `service` to be one of the nine valid labels — a direct POST
rarely bothers to fake those. Do this if and when it is needed, not before.

---

## Things that will bite you later

**A submission with `website` filled in, or with empty `sourcePage`.** That is
a reader with JavaScript disabled. The form still posts natively in that case
— the enquiry is real and should be processed — but the honeypot value is not
stripped and the hidden context fields are empty. Rare, but not zero.

**"It works locally but not on the live site."** Almost always CORS. Make's
custom webhooks return the right headers by default, so this normally just
works; if it ever does not, add a **Webhooks → Webhook response** module at
the end of the scenario with a custom header
`Access-Control-Allow-Origin: https://tlbcleaning.com.au`.

The request is sent as `application/x-www-form-urlencoded`, not JSON, and this
is deliberate: that content type makes it a CORS "simple request" so the
browser skips the preflight `OPTIONS` call entirely. Preflight failures are
the single most common way a static-site form to Make or Zapier works in
testing and fails in production. Both platforms parse urlencoded bodies into
named fields natively, so nothing is lost.

**A reader reports sending an enquiry that never arrived.** If the POST
succeeds but the scenario is off or out of operations, the reader sees a
thank-you and nothing reaches the board. Make emails you when a scenario
errors or is disabled — make sure that address is one somebody reads. This is
the only failure mode in the chain that is invisible from the website side.

**Adding or renaming a field** is a four-place change, in this order:

1. `src/components/sections/ContactForm.astro` — the markup
2. `src/data/contactForm.ts` — the `enquiryFields` list and any options
3. The Make scenario — re-run it once so it sees the new field, then map it
4. The Monday board — add the column; for a dropdown, add every label

Miss step 3 or 4 and the enquiry still arrives, just with that information
dropped on the floor.

---

## If you would rather skip Make entirely

Two other routes, both viable:

**Monday WorkForms.** Monday's own hosted form, embedded in an iframe. Zero
integration work and no webhook, but it carries Monday's styling, not the
site's, so it will not match the rest of the page.

**Monday's API direct.** Needs somewhere to run code that can hold the token —
a Cloudflare Worker is the usual choice, free, and about 60 lines. The
mutation it would send, for reference:

```graphql
mutation ($board: ID!, $name: String!, $vals: JSON!) {
  create_item(board_id: $board, item_name: $name, column_values: $vals) {
    id
  }
}
```

```jsonc
// column_values — the column IDs are the ones Monday generates, NOT the
// display names. Find them in the board's ⋯ menu → "Manage columns".
{
  "email":      { "email": "teagan@example.com", "text": "teagan@example.com" },
  "phone":      { "phone": "0400000000", "countryShortName": "AU" },
  "dropdown":   { "labels": ["End of Lease / Bond Cleaning"] },
  "dropdown_1": { "labels": ["Northern Rivers NSW"] },
  "long_text":  { "text": "3 bed 2 bath, keys due back 14 Oct" },
  "status":     { "label": "New" },
  "text":       "/contact/",
  "date4":      { "date": "2026-09-21", "time": "14:12:33" }
}
```

Send it to `https://api.monday.com/v2` with headers
`Authorization: <token>` and `API-Version: 2024-10`.

---

## Checklist

- [ ] Board **Website Enquiries** created with all 9 columns
- [ ] "Type of Service" has all 9 labels, pasted not retyped
- [ ] "Service Area" has all 4 labels, pasted not retyped
- [ ] Make scenario created, Monday connection authorised
- [ ] Test submission received and every field mapped
- [ ] Scenario timezone set to **Australia/Sydney**
- [ ] Scenario toggled **ON**
- [ ] `PUBLIC_ENQUIRY_WEBHOOK_URL` set on the Render **production** service
- [ ] Build log shows `[FORM] contact form endpoint: CONFIGURED`
- [ ] Live submission lands in the board with both dropdowns filled
- [ ] Staging points at a different webhook, or none
- [ ] Make's error notifications go to an address someone reads

---

## Still outstanding, and not fixable here

The contact page's phone number and email address are still `[TBC]` — they
come from `footerContact` in `src/data/navigation.ts` and appear on all 111
pages plus inside this form's own "that did not send" message. The form does
not depend on them, but the fallback it offers a reader whose submission fails
is currently two placeholders. That is the page's oldest open item and this
work does not close it.
