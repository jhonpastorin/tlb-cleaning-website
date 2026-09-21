# Contact form → Monday.com: setup guide

Everything needed to make the contact form at **tlbcleaning.com.au/contact/**
create an item in a Monday.com board, using **Zapier**. Allow about 40 minutes
end to end.

The website side is already built and deployed. **The form will not submit
until step 4 is done** — until then it renders normally but tells the reader
it is not connected, rather than showing a thank-you and quietly binning the
enquiry.

> ### Before you start: check your Zapier plan
> **"Webhooks by Zapier" is a premium app.** It is not on the Free plan — you
> need **Starter or above** to use a Catch Hook trigger. If your account is on
> Free, the trigger will build but the Zap cannot be turned on.
>
> Worth knowing before you spend the 40 minutes. If that is a problem, the
> alternatives at the end of this document need no paid plan.

---

## How it fits together

```
Reader fills the form
        │  POST  (application/x-www-form-urlencoded)
        ▼
Zapier trigger: Webhooks by Zapier → Catch Hook     ← the URL you create in step 2
        │
        ▼
Zapier action: monday.com → Create Item
        │  (holds the monday.com connection / API token)
        ▼
Monday.com board: "Website Enquiries"
```

The website is a **static site** — there is no server and no database in it.
That is why the submission goes to Zapier rather than to Monday directly: a
Monday API token in a static page would be readable by anyone who views
source, and could be used to read and modify every board in the account. The
token lives in the Zapier connection instead and never touches the website.

Nothing in the website is Zapier-specific. It posts standard form-encoded data
to whatever URL it is given, so **Make.com works identically** — a *Custom
webhook* module and a *monday.com → Create an item* module, with the same
field names and the same mapping. Swapping later is a change of one
environment variable.

---

## Step 1 — Build the Monday board

Create a board called **Website Enquiries**. Add these columns.

| Column name | Monday column type | Notes |
|---|---|---|
| *(item name)* | — | Every board has one. It will hold the enquirer's name. |
| **Email** | Email | Not a text column — the Email type makes it clickable and de-duplicable. |
| **Phone** | Phone | Set the country to **Australia (+61)**. |
| **Type of Service** | Dropdown | Labels must match step 1a **exactly**. |
| **Service Area** | Dropdown | Labels must match step 1b **exactly**. |
| **Message** | Long Text | Free text from the reader. Often empty. |
| **Status** | Status | Your pipeline — suggested labels in step 1c. |
| **Source Page** | Text | Which page the form was on. `/contact/` today. |
| **Submitted** | Date | Tick **"Show time"** when creating it. |

> ### ⚠️ The one thing that silently breaks this
> Monday **discards** a dropdown value whose label does not already exist on
> the column. It does not error — the item is created with that cell simply
> blank. So if the labels below are not typed exactly as written, enquiries
> will arrive with no service and no area, and nothing will look wrong until
> someone notices.
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

Nothing in the form sets this. Zapier will stamp every new item as **New**.

---

## Step 2 — Create the Zap and get the webhook URL

1. **Zapier → Create → Zaps → New Zap.** Name it `TLB website contact form`.
2. **Trigger**: search for **Webhooks by Zapier**, choose the event
   **Catch Hook**. *(Catch Hook, not "Catch Raw Hook" — Catch Hook is what
   parses the form-encoded body into named fields. Raw Hook hands you one
   undifferentiated string and you would have to parse it yourself.)*
3. Leave **Pick off a Child Key** empty and continue.
4. Zapier shows **"Your webhook URL"**. Copy it. It looks like:

   ```
   https://hooks.zapier.com/hooks/catch/12345678/abcdefg/
   ```

5. **Stop here and do step 3** before clicking "Test trigger". Zapier builds
   its field list from a real request, and it has not seen one yet.

---

## Step 3 — Send a test submission, then map the fields

> ### ⚠️ Fill in EVERY field on your test submission, including the optional ones
> This is the Zapier-specific trap in this whole setup. **Zapier learns the
> field list from the sample request, and a field that was empty in the sample
> does not appear in the mapping picker at all.** Test with only the required
> fields and `lastName`, `area` and `message` will simply not be offered when
> you build the Monday action — and you will not find out until real enquiries
> start arriving with those columns permanently blank.
>
> So: fill in all seven fields on the test, even though only four are required.

1. Put the webhook URL into the site's environment **temporarily**, so you can
   fire a real submission at it. Either:
   - set `PUBLIC_ENQUIRY_WEBHOOK_URL` in a local `.env`, run `npm run dev`,
     and submit at `localhost:4321/contact/`; **or**
   - set it on the **staging** Render service and submit on the staging URL.
2. Fill in the form — **every field** — and send it.
3. Back in Zapier, click **Test trigger**. It should find the request and show
   the ten fields below. If it says no requests found, wait a few seconds and
   retest; Zapier stores requests sent to the hook, so nothing is lost.

### What arrives

Ten fields, all strings:

**Only four are required on the form**: first name, email, contact number and
type of service. Everything else can arrive empty, so build the board and any
downstream automations on that basis.

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

All ten keys are sent on **every** submission — an optional field left blank
arrives as an empty string rather than being omitted. Verified against a
minimum submission, not assumed. (That is about the *request*; it does not
save you from the sample-data trap above, which is about what Zapier chooses
to show you in the picker.)

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
> `firstName lastName` produces `"Teagan "` with a trailing space. Harmless,
> but if it bothers you, put a **Formatter by Zapier → Text → Trim** step
> between the trigger and the action.

`phone` is accepted as typed, on purpose. Australian numbers get written a
dozen ways (`0400000000`, `0400 000 000`, `+61 400 000 000`, with and without
area codes) and a regex strict enough to be useful rejects real customers.
Monday's Phone column stores it as given.

### Add the Monday action and map the fields

1. **Action**: search for **monday.com**, choose the event **Create Item**.
2. **Connection**: sign in to monday.com. Zapier authenticates with a
   monday.com API token — in Monday, go to your avatar → **Developers** →
   **My access tokens**. *(Consider using an admin or service account rather
   than a personal one, so the integration does not break when someone
   leaves.)*
3. **Board**: `Website Enquiries`. **Group**: wherever new leads should land.
4. Zapier then lists the board's columns as fields. Map them:

| Monday field | Map to | Notes |
|---|---|---|
| **Item Name** | `firstName` then `lastName` | Insert both fields with a space between them. |
| **Email** | `email` | If Zapier offers separate "email" and "text" sub-fields, put the address in both. |
| **Phone** | `phone` | |
| **Type of Service** | `service` | Must match a label from 1a. |
| **Service Area** | `area` | Must match a label from 1b. |
| **Message** | `message` | |
| **Status** | `New` | Type it as a constant, do not map a field. |
| **Source Page** | `sourcePage` | |
| **Submitted** | `submittedAt` | See the timezone note below. |

> **Timezone.** `submittedAt` is UTC. Eastern Australia is UTC+10, and NSW
> observes daylight saving (UTC+11, October to April) while Queensland does
> not — and this business works both sides of that border.
>
> Set your Zapier account timezone to **Australia/Sydney** first
> (**Settings → General → Timezone**), since that is what Zapier uses to
> interpret and render dates. If the Submitted column still shows UTC, insert
> a **Formatter by Zapier → Date / Time → Format** step: input `submittedAt`,
> **To Timezone** `Australia/Sydney`, and map the *formatter's* output into
> the column instead.
>
> Left as UTC, a 9am enquiry files itself as 11pm the previous day, which
> makes the board's dates actively misleading rather than merely wrong.

5. **Test the action.** Confirm the item appears in the board with every cell
   filled — check the two dropdowns specifically, since those are the ones
   that fail silently.
6. **Publish the Zap.** An unpublished Zap catches nothing.

---

## Step 4 — Point the live site at the webhook

In **Render → the `tlb-cleaning-website` service → Environment**, add:

| Key | Value |
|---|---|
| `PUBLIC_ENQUIRY_WEBHOOK_URL` | the Zapier hook URL from step 2 |

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

> **Use a different hook on staging.** The staging service has its own
> `PUBLIC_ENQUIRY_WEBHOOK_URL` slot. Point it at a second Zap (with its own
> catch hook) writing to a test board, or leave it empty. Sharing one URL
> means every staging test drops a fake lead into the real pipeline — and
> burns a task doing it.

---

## Spam

Three things are already in place, and one is left to you.

**Honeypot (automatic).** The form carries a hidden `website` field that no
human ever sees or fills. If it comes back filled, the page shows the ordinary
thank-you and sends nothing — telling a bot it was caught only teaches it to
try again. You will never see those submissions, and they never cost a task.

**`elapsedMs` (a signal, not a block).** Milliseconds between the page loading
and the form being submitted. A human filling the form takes at least 15–20
seconds; a bot takes under two. The page deliberately does **not** block on
this, because a fast copy-paste is a real thing a real person does. If spam
becomes a problem, add a **Filter by Zapier** step between the trigger and the
Monday action: `elapsedMs` — *(Number) greater than* — `4000`. Filtered-out
runs do not consume a task, so this also protects your monthly quota.

**Empty-field rejection (automatic).** Every required field is validated in
the browser before anything is sent.

**Left to you, if needed:** the webhook URL is visible in the page source. It
is unguessable and it only *receives* data, but a determined spammer who finds
it can POST to it directly, bypassing the honeypot entirely. If that ever
happens, extend the Filter to also require `sourcePage` to be exactly
`/contact/` and `service` to be one of the nine valid labels — a direct POST
rarely bothers to fake those. Do this if and when it is needed, not before.

---

## Things that will bite you later

**A field is missing from the Zapier picker.** You tested with it empty. Send
another test submission with every field filled and re-run **Test trigger** —
Zapier will then offer it. This is the single most common problem with this
setup; see the warning in step 3.

**A submission with `website` filled in, or with an empty `sourcePage`.** That
is a reader with JavaScript disabled. The form still posts natively in that
case — the enquiry is real and should be processed — but the honeypot value is
not stripped and the hidden context fields are empty. Rare, but not zero.
Those readers land on Zapier's raw JSON response
(`{"status": "success", ...}`) instead of the thank-you, which is ugly; an
ugly confirmation beats a dead form, and the enquiry is in the board either
way.

**"It works locally but not on the live site."** Almost always CORS. Zapier's
catch hooks return `Access-Control-Allow-Origin: *`, so this normally just
works.

The request is sent as `application/x-www-form-urlencoded`, not JSON, and this
is deliberate: that content type makes it a CORS "simple request" so the
browser skips the preflight `OPTIONS` call entirely. Preflight failures are
the most common way a static-site form to Zapier works in testing and fails in
production. Zapier parses urlencoded bodies into named fields natively, so
nothing is lost.

**A reader reports sending an enquiry that never arrived.** If the POST
succeeds but the Zap is off, paused or out of tasks, the reader sees a
thank-you and nothing reaches the board. Zapier emails the Zap owner when a
Zap errors, and **auto-pauses a Zap that keeps failing** — make sure that
address is one somebody reads. This is the only failure mode in the chain that
is invisible from the website side.

Worth considering: add a **second action** that emails the enquiry to the
office as well as creating the board item. It costs one extra task per
submission but means a Monday outage or a mis-mapped column never loses a
lead outright.

**Task usage.** One submission = one task for the Create Item action (plus one
per extra action, if you add the email). Filtered-out and honeypot submissions
cost nothing. Worth a glance at your plan's monthly allowance against expected
enquiry volume.

**Adding or renaming a field** is a four-place change, in this order:

1. `src/components/sections/ContactForm.astro` — the markup
2. `src/data/contactForm.ts` — the `enquiryFields` list and any options
3. The Zap — send a fresh test submission with the new field filled, re-run
   **Test trigger** so Zapier sees it, then map it
4. The Monday board — add the column; for a dropdown, add every label

Miss step 3 or 4 and the enquiry still arrives, just with that information
dropped on the floor.

---

## If you would rather not use Zapier

Three other routes, all viable:

**Make.com.** The same shape, and it has a free tier that includes webhooks
(1,000 operations/month), which Zapier's does not. A *Webhooks → Custom
webhook* trigger and a *monday.com → Create an item* module; every field name
and mapping above applies unchanged. Its own trap is the mirror of Zapier's:
Make will not show the fields until you click **Run once** and *then* send the
test submission, so the order is webhook-first, map-second. Switching is a
change of one environment variable.

**Monday WorkForms.** Monday's own hosted form, embedded in an iframe. Zero
integration work, no webhook, no plan needed — but it carries Monday's
styling, not the site's, so it will not match the rest of the page.

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

- [ ] Zapier plan includes **Webhooks by Zapier** (Starter or above)
- [ ] Board **Website Enquiries** created with all 9 columns
- [ ] "Type of Service" has all 9 labels, pasted not retyped
- [ ] "Service Area" has all 4 labels, pasted not retyped
- [ ] Zap created with a **Catch Hook** trigger (not Catch Raw Hook)
- [ ] Test submission sent with **every field filled**, including optional ones
- [ ] All ten fields visible in the Zapier picker and mapped
- [ ] monday.com connection authorised
- [ ] Zapier account timezone set to **Australia/Sydney**
- [ ] Zap **published**
- [ ] `PUBLIC_ENQUIRY_WEBHOOK_URL` set on the Render **production** service
- [ ] Build log shows `[FORM] contact form endpoint: CONFIGURED`
- [ ] Live submission lands in the board with both dropdowns filled
- [ ] Staging points at a different hook, or none
- [ ] Zapier's error notifications go to an address someone reads

---

## Still outstanding, and not fixable here

The contact page's phone number and email address are still `[TBC]` — they
come from `footerContact` in `src/data/navigation.ts` and appear in the footer
of all 111 pages, and inside this form's own "that did not send" message. The
form does not depend on them, but the fallback it offers a reader whose
submission fails is currently two placeholders. That is the page's oldest open
item and this work does not close it.

Note also that since the hero and the "How to reach us" block were removed
from `/contact/`, those details no longer appear in the page body at all —
only in the footer. Worth keeping in mind when they are finally filled in.
