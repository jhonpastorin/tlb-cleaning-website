# SEO setup: Search Console, sitemap and the ranking plan

For the TLB Cleaning website team. Written 12 Oct 2026.

This guide covers, in order:

1. How indexing and the sitemap work on this site (already built)
2. Google Search Console setup (do once)
3. Bing Webmaster Tools (do once, 10 minutes)
4. Google Business Profile (the biggest lever for local rankings)
5. Technical fixes still open in the code
6. Content: what actually makes pages rank
7. Local SEO and links
8. Measuring progress, and a realistic timeline
9. Mistakes to avoid

If you only have one afternoon, do sections 2, 3 and 4.

---

## 1. How indexing and the sitemap work on this site

**Sitemap URL:** https://tlbcleaning.com.au/sitemap.xml

The sitemap is generated automatically on every production build, which means
every time someone presses **Publish to live site** in Pages CMS. Nobody edits
it by hand. It lists every page Google is allowed to index, at that page's
canonical URL.

**Which pages Google may index** is decided by one rule
([src/data/indexing.ts](../src/data/indexing.ts)). A page is kept out of
Google (it gets `noindex, follow` and is left out of the sitemap) when nothing
in the menu links to it yet:

| Kept out of Google | Why | How to bring it live |
| --- | --- | --- |
| Town pages not in "Live town pages" (42 of 56 today) | They share one template and differ only by town name. Indexing 42 near-identical pages risks Google treating them as doorway pages, which can drag down the whole site. | Pages CMS > Locations > Live towns and region photos > add the town to **Live town pages** > Publish to live site |
| Menu rows ticked **Hidden** (18 service pages today, e.g. window, gutter, roof cleaning, most commercial premises) | TLB isn't promoting these services yet, and an indexed page with no internal links rarely ranks anyway. | Pages CMS > Site settings > Navigation > Main menu > untick **Hidden** on the row > Publish to live site |
| `/thank-you/` and the 404 page | Not useful in search results. | Never. |

Everything else is indexed: the homepage, House cleaning and its 8 visible
services, Commercial cleaning and its 5 visible services, Airbnb, the guides
hub and 9 guides, About, Why TLB, Reviews,
Contact, Work with us, How booking works, the locations hub, both region pages
and the 14 live towns. **That's 50 URLs today.**

Staging is never indexed. Every staging page is `noindex, nofollow`, its
robots.txt blocks everything, and it has no sitemap. Render also sends a
noindex header. See the "Search engine indexing" section of the
[README](../README.md).

**Check it any time:** the production build log prints
`[tlb-sitemap] wrote sitemap.xml with N URLs`. If you unhide a page and N
doesn't go up by one, something is wrong.

---

## 2. Google Search Console setup

Search Console is Google's free tool that shows which pages are indexed, what
people search to find you, your average position, and any problems Google
found. You can't see this data anywhere else.

### 2.1 Add the property (Domain property, verified by DNS)

Use a **Domain** property, not a URL-prefix property. It covers `https://`,
`http://`, `www.` and every subdomain in one place.

1. Go to https://search.google.com/search-console and sign in with the Google
   account that should **own** the data. Ideally that's TLB's own business
   Google account, with MNO added as a user, not the other way round.
2. **Add property** > choose **Domain** > enter `tlbcleaning.com.au` (no
   `https://`, no `www`).
3. Google shows a TXT record like
   `google-site-verification=AbC123...`. Copy it.
4. In the DNS provider for tlbcleaning.com.au, add a record:
   - **Type:** TXT
   - **Host / Name:** `@` (or leave blank, depending on the provider)
   - **Value:** the full `google-site-verification=...` string
   - **TTL:** default
5. Back in Search Console, click **Verify**. It usually works within minutes,
   but DNS can take a few hours. If it fails, wait and retry. Don't delete
   and re-add the record.
6. **Leave the TXT record in DNS forever.** Removing it un-verifies the
   property.

### 2.2 Submit the sitemap

1. Search Console > **Indexing > Sitemaps**.
2. Enter `sitemap.xml` and click **Submit**.
3. Status should say **Success** with about 50 discovered URLs. Submit it once
   only. Google re-reads it on its own, and robots.txt also points to it.

### 2.3 Request indexing for the key pages

Google will find everything through the sitemap, but you can speed up the
pages that matter most. Search Console > **URL inspection** (search bar at
the top) > paste the URL > **Request indexing**. There's a small daily limit,
so do these first:

1. `https://tlbcleaning.com.au/`
2. `https://tlbcleaning.com.au/house-cleaning/`
3. `https://tlbcleaning.com.au/house-cleaning/end-of-lease-cleaning/`
4. `https://tlbcleaning.com.au/house-cleaning/deep-cleaning/`
5. `https://tlbcleaning.com.au/airbnb-holiday-home-cleaning/`
6. `https://tlbcleaning.com.au/commercial-cleaning/`
7. `https://tlbcleaning.com.au/commercial-cleaning/office-cleaning/`
8. `https://tlbcleaning.com.au/locations/`
9. `https://tlbcleaning.com.au/locations/byron-bay/`
10. `https://tlbcleaning.com.au/locations/ballina/`

Also inspect **one hidden page**, e.g. `/house-cleaning/window-cleaning/`,
and click **Test live URL**. Under Page indexing it should say "Indexing
allowed? No: 'noindex' detected in 'robots' meta tag". That confirms the rule
is working.

The first screen of URL Inspection shows Google's **stored** copy from its last
crawl, not the live page. A hidden page Google crawled before it was hidden
will still show as indexed there. Click **Request indexing** on it: Google
recrawls, sees the noindex and drops the page, usually within a few days.
Pages you don't request drop out on their own next recrawl.

### 2.4 Add users

**Settings > Users and permissions > Add user.**

- TLB owner: **Owner** (if they didn't create the property)
- MNO team members: **Full**
- Anyone who only needs to read reports: **Restricted**

### 2.5 Link Search Console to Google Analytics 4

GA4 already runs through Google Tag Manager (container `GTM-KDMCQNN9`).
Linking the two puts search queries next to on-site behaviour and enquiries.

GA4 > **Admin > Product links > Search Console links > Link** > choose the
`tlbcleaning.com.au` property > choose the web data stream > **Submit**.

### 2.6 One-off checks on the domain

Open each of these in a private browser window. All of them should end up at
`https://tlbcleaning.com.au/` with one redirect:

- `http://tlbcleaning.com.au/`
- `https://www.tlbcleaning.com.au/`
- `http://www.tlbcleaning.com.au/`

If `www` doesn't redirect, add the `www` domain to the **tlbcleaning** service
in the Render dashboard (Settings > Custom Domains). Render redirects it to the
root domain.

**If TLB had an older website on this domain**, its old URLs need 301
redirects to the nearest new page, or the links and rankings they earned are
lost. Search Console > **Indexing > Pages** > "Not found (404)" lists them a
few weeks after launch. Add the redirects as `routes` in
[render.yaml](../render.yaml).

### 2.7 What "normal" looks like in the first weeks

- **Indexing > Pages** will show about 62 URLs as "Excluded by 'noindex' tag".
  **That's intentional** (42 towns, 18 hidden services, thank-you, 404). Don't
  "fix" it.
- "Discovered, currently not indexed" and "Crawled, currently not indexed" are
  common on a new site. They usually clear within a few weeks as Google trusts
  the site more. If a page stays there for months, the page usually needs more
  unique, useful content (section 6).
- "Duplicate without user-selected canonical" or "Alternate page with proper
  canonical tag": usually from URL variants (`?utm=...`, missing trailing
  slash). Harmless while every page sets its own canonical, which this site
  does.

---

## 3. Bing Webmaster Tools

Bing is small in Australia, but its index also feeds Microsoft Copilot and
DuckDuckGo, and several AI search tools rely on it. Setup takes 10 minutes
because it can copy everything from Google.

1. https://www.bing.com/webmasters > sign in.
2. **Import from Google Search Console**. This brings over the verified site
   and the sitemap.
3. Confirm the sitemap shows under **Sitemaps**.

---

## 4. Google Business Profile (GBP)

For "cleaner near me", "end of lease cleaning Ballina" and similar searches,
the map pack (the 3 businesses with a map above the normal results) gets most
of the clicks. **The website can't get you into the map pack. Only the
Business Profile can.** It's the most important item on this list.

### 4.1 What you need before you start

| Item | Notes |
| --- | --- |
| Business name | Exactly as TLB trades and as it appears on signage, invoices and the website. **Don't add keywords** ("TLB Cleaning Byron Bay Best Cleaners"). That breaks Google's rules and can get the profile suspended. |
| Primary category | Most likely **House cleaning service**. Pick the one that matches the main source of revenue. |
| Secondary categories | e.g. Commercial cleaning service, Carpet cleaning service, Window cleaning service, Janitorial service. Only add services TLB actually sells. |
| Address | Google needs a real street address to verify, **even if you hide it**. TLB visits customers, so set it up as a **service-area business** and hide the address. A PO box or virtual office isn't allowed. |
| Service areas | Up to 20 towns or regions. Start with the 14 live towns and the two regions (Northern Rivers, Southern Gold Coast). |
| Phone | The same number as the website, written the same way everywhere. |
| Website | `https://tlbcleaning.com.au/` |
| Hours | Real hours when TLB answers the phone. |
| Description | Up to 750 characters. What TLB does, for whom, where, and what makes it different. Plain, no keyword lists. |
| Services | List each service with a short description. Match the website's service names. |
| Photos | Logo (square), cover photo, and at least 10 **real** job photos: the team, vans, before and afters. No stock photos. Add new photos monthly. |
| Opening date | When TLB started trading. |
| Verification | Usually a short video showing the business: signage or branded van, equipment, and proof of being the owner or manager. Sometimes a postcard or phone call. |

### 4.2 After it's verified

- **Reviews are the biggest ranking factor you control.** Ask every happy
  customer, every job, with a direct review link (GBP > "Ask for reviews").
  Reply to every review, good or bad, within a few days.
- **Don't** offer discounts or gifts for reviews, and don't only ask customers
  you expect to be happy. Both break Google's rules.
- Post an update or photo every week or two (a recent job, a seasonal tip, a
  guide from the site).
- Keep hours current, including public holidays.

### 4.3 Keep the website matching the profile

**Done 12 Oct 2026.** Every page now tells Google the following
([src/data/business.ts](../src/data/business.ts)):

- **Name:** TLB Cleaning Services (the profile's name), with "TLB Cleaning"
  and "TLB Professional Cleaning Services" as alternate names
- **Address:** hidden; service area only, same as the profile
- **Hours:** Monday to Friday, 9am to 5pm
- **Logo:** `public/logo.png`
- **Profiles:** the Google Business Profile (set in Pages CMS > Reviews >
  Google Business Profile link), Facebook, Instagram, TikTok and LinkedIn

**If any of these change on the profile, change them in `business.ts` too.**
Different hours or names on the website and on Google weaken both.

The business uses three names today: "TLB Cleaning" (website), "TLB Cleaning
Services" (Google) and "TLB Professional Cleaning Services" (logo, social
handles). Settle on one long term and use it everywhere: Google, directories,
invoices, signage and the website.

### 4.4 Other map listings

Set up the same details on **Apple Business Connect** (Apple Maps and Siri)
and **Bing Places** (Bing can import from GBP).

---

## 5. Technical fixes still open in the code

| Fix | Where | Why it matters |
| --- | --- | --- |
| Add a default share image (`og:image`, 1200 x 630) | [src/layouts/Base.astro](../src/layouts/Base.astro) supports `ogImage` but no page passes one | Links shared on Facebook, Messenger, LinkedIn and iMessage show a blank card. Not a ranking factor, but it affects clicks. |
| `BreadcrumbList` schema | Base layout or the service and town templates | Shows the page path in Google results instead of a bare URL. |
| `Service` schema on service pages | Service page templates | Helps Google and AI search understand what each page sells and where. |
| `FAQPage` schema on pages with FAQs | Pages with FAQ sections | Google no longer shows FAQ rich results for most sites, but AI search tools still use it to understand the page. Optional. |
| Core Web Vitals | https://pagespeed.web.dev and Search Console > Experience > Core Web Vitals | The site is static and should pass. Check the homepage and one town page after launch, on mobile. |

**Don't** add star-rating (`AggregateRating` / `Review`) schema for TLB's own
reviews. Google stopped showing stars for a business's own reviews of itself,
and marking up reviews that aren't on the page breaks Google's rules.

---

## 6. Content: what actually makes pages rank

The technical setup gets pages *into* Google. Content decides *where* they
rank.

### 6.1 One page, one main search term

Each page should target one main phrase people really search for, plus close
variants. For example:

| Page | Main term |
| --- | --- |
| `/house-cleaning/end-of-lease-cleaning/` | end of lease cleaning [region] / bond cleaning |
| `/airbnb-holiday-home-cleaning/` | airbnb cleaning byron bay |
| `/locations/ballina/` | cleaners ballina / house cleaning ballina |

Check that the **title** (about 60 characters, ending "| TLB Cleaning") and
**description** (140 to 155 characters) in each page's SEO fields in Pages CMS
use that term naturally. The CMS already enforces the lengths. Don't target
the same term with two pages, or they compete with each other.

Use Search Console > **Performance** after a month or two to see what each
page already shows up for, then strengthen those terms on that page.

### 6.2 Town pages: earn each one before you make it live

A town page ranks when it has something the other 55 don't. Before adding a
town to **Live town pages**, give it at least:

- a local paragraph that's genuinely about that town (types of homes, holiday
  lets, local rules, how often TLB is in the area)
- one or two real photos of jobs there
- a review from a customer in that town, if there is one
- the suburbs or neighbouring towns TLB actually covers from there

Bring towns live a few at a time, starting where TLB already has the most
customers. Each town's own content lives in `src/content/towns/` and is
edited in Pages CMS under Locations.

### 6.3 Guides build topic depth

The 9 guides answer what customers search before they're ready to book ("how
much does end of lease cleaning cost"). They bring visitors in early, and they
show Google that TLB knows the subject.

- Link every guide to the matching service page, and the service page back to
  the guide.
- Add a new guide when customers keep asking the same question. The questions
  customers ask on the phone are the best topic list there is.
- Update the pricing guides at least once a year.

### 6.4 Write for people (and AI search)

Google's AI Overviews and tools like ChatGPT quote pages that answer a
question directly and specifically. Put the direct answer first, then the
detail. Use real numbers, real local facts and TLB's actual process. Generic
copy that could be on any cleaner's site rarely ranks or gets quoted.

---

## 7. Local SEO and links

### 7.1 NAP consistency

NAP means **name, address, phone**. They must be written identically
everywhere: the website, Google, Facebook and directories. Pick one format for
the phone number and stick to it.

### 7.2 Directory listings (citations)

Create or claim a free listing on each, with identical NAP and a link to the
website:

- Hipages
- Oneflare
- Yellow Pages (yellow.com.au)
- True Local
- Word of Mouth (wordofmouth.com.au)
- Yelp Australia
- Apple Business Connect and Bing Places (section 4.4)
- Local chambers of commerce and business directories in Byron, Ballina,
  Tweed and Lismore

Don't buy bulk listing packages. Ten good listings beat 200 junk ones.

### 7.3 Links from local businesses

One link from a relevant local site is worth more than dozens of directories.
Good sources for a cleaning business:

- real estate agencies and property managers TLB works with (a "preferred
  suppliers" page)
- Airbnb and holiday-let managers
- strata managers
- local sponsorships: sports clubs, school events, community groups
- local news, for anything newsworthy (milestones, community work)

**Don't** buy links or swap links in bulk. Google ignores or penalises both.

---

## 8. Measuring progress, and a realistic timeline

### 8.1 Monthly routine (30 minutes)

1. **Search Console > Performance > Search results**, last 28 days compared
   with the previous period: clicks, impressions, average position. Filter by
   page to see each service and town page.
2. **Queries** tab: which searches show TLB? Look for terms with lots of
   impressions but positions 8 to 20. Those are the quickest wins: improve
   the matching page.
3. **Indexing > Pages**: any new errors? Remember about 62 URLs are excluded
   by noindex on purpose.
4. **Business Profile > Performance**: calls, website clicks, direction
   requests.
5. **GA4**: enquiries (contact form submissions, phone clicks) by landing
   page.

### 8.2 What to expect

| When | What usually happens |
| --- | --- |
| Days 1 to 7 | Site verified, sitemap read. Searches for "TLB Cleaning" start to show the site. |
| Weeks 2 to 6 | Most of the 50 pages indexed. Impressions appear for long, specific searches. |
| Months 2 to 4 | Service and town pages start to rank on page 1 to 3 for local terms. The map pack depends mostly on the Business Profile and reviews. |
| Months 4 to 12 | Steady gains as reviews, links and content build. Competitive terms ("cleaners gold coast") take the longest. |

SEO grows slowly at first, then faster. Judge it after about 3 months, not
after 3 weeks.

---

## 9. Mistakes to avoid

- **Mass-producing thin pages**, such as making all 56 towns live at once with
  the same text. This is exactly what Google's spam policies target.
- **Changing a page's URL without a 301 redirect.** It loses that page's
  rankings. If a URL must change, add a redirect in `render.yaml` first.
- **Letting staging get indexed.** It's protected three ways; leave those
  protections alone. If staging ever appears in Google, tell the developer
  straight away.
- **Keyword stuffing** in titles, headings, the Business Profile name or alt
  text.
- **Fake or incentivised reviews**, or review schema for your own reviews.
- **Removing the Search Console DNS record.**
- **Buying links or "SEO packages"** that promise page 1 in a week.

---

## Checklist

- [ ] Search Console Domain property verified by DNS TXT
- [ ] `sitemap.xml` submitted, status Success, about 50 URLs
- [ ] Top 10 pages requested for indexing
- [ ] Hidden page confirmed "Excluded by 'noindex' tag"
- [ ] TLB added as Owner, team added as users
- [ ] Search Console linked to GA4
- [ ] `www` and `http` redirect to `https://tlbcleaning.com.au/`
- [ ] Bing Webmaster Tools imported from Google
- [ ] Google Business Profile created, verified, fully filled in
- [x] Profile URL, logo, hours and social links added to the website schema
- [ ] Default share image added
- [ ] Apple Business Connect and Bing Places set up
- [ ] Directory listings created with identical NAP
- [ ] Review-request routine running after every job
- [ ] Monthly Search Console review in the calendar
