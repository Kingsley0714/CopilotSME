# CopilotSME

> **AI-Driven SME Financing Intelligence Platform for Malaysia**
> Live at [copilotsme.com](https://copilotsme.com)

CopilotSME helps Malaysian SME owners figure out — in minutes, without a middleman — how much they can actually borrow, which banks will say yes, and how to improve their chances. Enter your numbers, see the answer, walk into the bank with confidence.

---

## 🎯 What It Does

Malaysian SME owners usually rely on loan middlemen who charge fees, hide information, and often match businesses with the wrong banks. CopilotSME removes the middleman by putting the same logic the banks use directly into the hands of the business owner.

Enter your financials → the engine runs them against 10 Malaysian banks' lending rules → you get your maximum loan eligibility, which banks you pass, and what to fix.

---

## ✨ Core Features

### Mode 1 — Manual Data Input (live)
Enter financial data manually. The engine calculates eligibility across all 10 banks and returns:
- Maximum loan amount
- Pass / fail per bank
- Ranked bank recommendations
- Actionable improvement suggestions

### Mode 2 — AI Document Upload (in development)
Upload bank statements, audited reports, or CCRIS reports. AI extracts the data automatically, eliminating manual entry errors.

---

## 🧮 How the Calculation Works

Three independent eligibility methods are run in parallel, and the **highest qualifying amount** across the three becomes the final recommendation — provided the gearing ratio check passes.

### Method 1 — EBITDA Coverage (DSCR)
```
DSCR = EBITDA ÷ (existing annual commitments + proposed annual installment)
Requirement: DSCR ≥ 1.0x  (some banks require higher)
```

### Method 2 — Income Factor
```
Monthly usable income = average monthly bank-in × 8%
Requirement: (existing monthly + proposed monthly) ÷ usable income ≤ 80%
```

### Method 3 — Ending Balance Coverage
```
Requirement: (existing monthly + proposed monthly) ÷ average ending balance ≤ 30% or 50%
```

### Hard Gate — Gearing Ratio
```
Gearing = total bank borrowings ÷ net worth < 5x
```
If this fails, no bank qualifies regardless of the three methods above.

### Proposed Loan Assumptions
- Interest rate: **8.45% effective**
- Tenure: **84 months (7 years)**
- Uses standard PMT formula

---

## 🏦 Bank Coverage (10 Malaysian Banks)

| Bank | Max Loan | DSCR | Income Factor | Balance Coverage | Special Rules |
|---|---|---|---|---|---|
| Maybank | 20% of turnover | > 1.0x | < 80% | — | Construction flagged high-risk |
| CIMB | 20% of turnover | > 1.0x | < 80% | < 30% | — |
| HLBB | 20% of turnover | > 1.0x | — | — | — |
| OCBC | Max RM600k | > 0.2x | < 50% | < 50% | Can be loss-making — most lenient |
| SCB | 20% of turnover | — | < 80% | < 50% | No DSCR requirement |
| UOB | 20% of turnover | > 1.0x | < 80% | < 30% | — |
| RHB | 30% of turnover | > 1.0x | < 80% | — | DSCR if >RM3M turnover; else Income Factor |
| Alliance Bank | Max RM500k | > 1.0x | < 80% | < 50% | No gearing requirement |
| Bank Muamalat | 30% of turnover | > 1.0x | < 80% | < 50% | Islamic financing |
| Bank Islam | 30% of turnover | > 1.0x | — | — | Islamic financing |

All parameters live in the `BANK_RULES` object inside `index.html` and can be updated without touching calculation logic.

---

## 📁 Project Structure

```
.
├── index.html                    # Main SME loan calculator (Mode 1)
├── education/
│   └── index.html                # Education / how-it-works page
├── education.html                # Legacy education page at root (pre-restructure)
├── index_2.0.html                # Working draft of the next version
├── _redirects                    # Netlify routing rules for multi-page URLs
├── .gitignore                    # Excludes .DS_Store and temp folders
├── DESIGN.md                     # Design system notes
├── credit-analysis-template.md   # Template for the credit-analysis skill
├── google-apps-script-upload.js  # Backend script for lead-capture uploads
├── Axion Stitch/                 # UI design assets from the Stitch phase
└── [various docs]                # Retrospectives, records, consent forms
```

---

## 🚀 Local Preview

No build step required — it's plain HTML/CSS/JS.

```bash
# Option 1: Python 3 built-in server
python3 -m http.server 8000
# → open http://localhost:8000

# Option 2: Node http-server
npx http-server -p 8000
```

Open `index.html` for the main calculator, or `education/index.html` for the education page.

---

## 🌐 Deployment

CopilotSME is deployed via **GitHub → Netlify** with auto-deploy on every push to `main`.

### How it works
1. Push to `main` on [github.com/Kingsley0714/CopilotSME](https://github.com/Kingsley0714/CopilotSME)
2. Netlify detects the push and rebuilds in ~4 seconds
3. New version goes live at [copilotsme.com](https://copilotsme.com)

### Multi-page routing
Netlify serves only one root `index.html` by default. Additional pages live in subfolders with their own `index.html` so Netlify serves them at clean URLs like `/education/`. The `_redirects` file handles any explicit routing rules.

### Custom domain
`copilotsme.com` is connected via **GoDaddy → Netlify DNS** with SSL auto-provisioned.

### Before every push
```bash
# Always verify local commits match remote
git log origin/main..main
# If this shows anything, you have unpushed commits
```
_(Learned this the hard way — see the retrospective.)_

---

## 🔄 Updating Bank Parameters

When a bank changes its policy:

1. Update the `BANK_RULES` object in `index.html`
2. Update the bank coverage table in this README
3. Commit with a clear message: `Update [Bank Name] rules: [what changed]`
4. Push to `main` → Netlify auto-deploys

Parameters are the single source of truth — do NOT let anyone "update them from what they found online." Always verify with the actual bank policy document first.

---

## 💼 Business Model

Revenue comes from four streams:

| Stream | Description |
|---|---|
| **Bank Referral Fees** | Commission for successful loan transfers to partner banks |
| **Bank Ad Placements** | Premium visibility on the platform for partner banks |
| **Advisory Services** | Deep-dive human analysis reports for SME owners |
| **AI Token Revenue** | Micro-fees per analysis computation (future) |

---

## 🛠 Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Vanilla HTML + CSS + JavaScript (no framework) |
| Hosting | Netlify (free tier) |
| Domain | GoDaddy → Netlify DNS |
| Email | Zoho Mail |
| Version control | Git + GitHub |
| AI assistance (future) | Anthropic API for LLM analysis layer |

---

## 🗺 Roadmap

### ✅ Phase 1 — Core (done)
- Manual calculation engine
- 10-bank parameter table
- Responsive design
- Custom domain live

### 🟡 Phase 2 — Conversion (now)
- WhatsApp one-click contact
- Lead capture form
- Google Analytics integration
- Customer testimonials / case studies

### ⚪ Phase 3 — AI Upgrade (next)
- Anthropic API integration
- Document upload → automatic extraction (Mode 2)
- Membership / paid analysis reports

---

## ⚠️ Important Notes

1. **Platform results are for reference only.** Always guide users to contact Kingsley for deep human analysis before making financial decisions.
2. **OCBC is the fallback bank** for weaker financials — EBITDA can be loss-making, DSCR only needs > 0.2x.
3. **RHB has split logic** — turnover > RM3M uses DSCR, < RM3M uses Income Factor.
4. **Gearing ratio is a hard gate** — if it fails, show the warning regardless of other passes.

---

## 👤 Contact

**Kingsley Fong**
Email: kingsley.fong0714@gmail.com
Site: [copilotsme.com](https://copilotsme.com)

---

_Built in the open, one commit at a time. See `CopilotSME_0_to_1_Record.docx` for the full build journey and `CopilotSME_Retrospective.docx` for what I'd do differently next time._
