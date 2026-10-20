# Footer newsletter signup → Zapier: setup guide

The footer on every page has a one-field newsletter signup (email only). The
website side is built. **It will not submit until step 3 is done.** Until then
the field renders but tells the reader sign-ups are not switched on, rather
than thanking them for an email that went nowhere.

Same Zapier plan requirement as the contact form: **"Webhooks by Zapier" needs
Starter or above.** See MONDAY-FORM-SETUP.md.

## How it fits together

```
Reader enters an email in the footer
        │  POST  (application/x-www-form-urlencoded)
        ▼
Zapier trigger: Webhooks by Zapier → Catch Hook     ← its OWN hook, not the enquiry one
        │
        ▼
Zapier action: your mailing list (Mailchimp, Klaviyo, a Google Sheet, ...)
```

Use a **separate Zap** from the contact form's. If both forms shared one hook,
every subscriber would arrive in the Monday enquiries board as a blank lead.

## Fields Zapier receives

| Field | Example | Notes |
|---|---|---|
| `email` | `jo@example.com` | Checked by the browser as a valid address before it is sent. |
| `sourcePage` | `/house-cleaning/deep-cleaning/` | The page the reader signed up from. |
| `submittedAt` | `2026-10-20T03:14:00.000Z` | ISO 8601, UTC. |

The field list lives in `src/data/newsletter.ts` (`newsletterFields`). Rename
one there and the Zap's mapping breaks.

## Steps

1. **Create the Zap.** Trigger: *Webhooks by Zapier → Catch Hook*. Copy the
   hook URL it gives you.
2. **Teach Zapier the fields.** Put the URL in your local `.env` as
   `PUBLIC_NEWSLETTER_WEBHOOK_URL=...`, run `npm run dev`, and sign up once
   from the footer. In Zapier, *Test trigger* should show the three fields
   above.
3. **Set the URL on Render.** Static site → Environment →
   `PUBLIC_NEWSLETTER_WEBHOOK_URL`. Redeploy. The build log should say
   `[FORM] newsletter endpoint: CONFIGURED`. Use a separate test Zap (or leave
   it empty) on **staging** so test signups do not reach the real list.
4. **Add the action.** E.g. *Mailchimp → Add/Update Subscriber*, mapping
   `email` to the subscriber email. Map `sourcePage` to a tag or merge field if
   you want to know which page converts.
5. **Turn the Zap on**, then clear the local `.env` line (or point it at the
   test Zap) so local testing stops adding real subscribers.

## What the reader sees

| Outcome | Message (editable in Pages CMS → Site settings → Newsletter signup) |
|---|---|
| Sent, Zapier replied 2xx | "Thanks, you are on the list." The field and button disappear. |
| Sent, but it failed | "That did not go through. Please try again in a minute." |
| No webhook URL set | "Sign-ups are not switched on yet, so nothing was sent." |

On success the page also pushes `{ event: 'newsletter_signup', ctaLocation: 'footer' }`
to the GTM `dataLayer`, so GA4 can count signups with a Custom Event trigger.

A hidden honeypot field (`website`) catches simple bots. A filled one is
thanked and nothing is sent.
