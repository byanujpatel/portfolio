# Personalization Audit

## Reference Identity Tokens

The supplied master prompt is a generic specification and contains no source-owner identity to inherit. The current repository already belongs to Anuj Patel and contains approved current-owner identity values.

| Token category | Approved value or action |
| --- | --- |
| Name | `Anuj Patel` |
| Handle | `byanujpatel` |
| Domain | `byanujpatel.online` |
| Email | `byanujpatel@gmail.com` |
| GitHub | `github.com/byanujpatel` |
| LinkedIn | `linkedin.com/in/byanujpatel` |
| X | `x.com/byanujpatel` |
| Booking | `cal.com/anuj-patel-xhrcwq/intro-call` |
| Projects | `VANI`, `Smriti`, `Content Repurposing Engine`, `TrendChain AI` |
| Former 100 Days feature | `REMOVE` |
| Avatar/companion | `TBD`; do not fabricate or infer likeness |

## Verification

The production scan must check source and built output for inherited identity tokens before release. Current implementation uses only the approved values above. Run:

```bash
npm run build
grep -RInE '100-days|Health Label|RajNet|UK Realty|Imperium Marketing' src public dist 2>/dev/null || true
```

Expected result: no matches for removed or reference-only tokens.
