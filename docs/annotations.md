# EGN Annotations

EGN provides optional commentary infrastructure for annotating bidding decisions and card plays. Annotations are stored on each phase as a map from a decision or trick index (as a string key) to an array of annotation strings.

* `callAnnotations` — applies to `EUCHRE_BIDDING` phases; the key is the 0-based index into the `calls` array.
* `playAnnotations` — applies to `TRICK_PLAY` phases; the key is the 0-based index into each play across all tricks.

```json
"callAnnotations": {
  "3": ["[!]Strong order by Dealer"]
},
"playAnnotations": {
  "2": ["[?]Mistake here by Seat 2."]
}
```

---

## Annotation Labels

An annotation string may optionally begin with a **label tag** that classifies the quality or significance of the annotated decision. Labels follow the bracket notation used in Chess analysis, adapted for Euchre:

| Label  | Meaning                                      |
|--------|----------------------------------------------|
| `[??]` | **Blunder** —  For significant mistakes that directly cost the team points.        |
| `[?]`  | **Mistake** — For clear mistakes that may or may not have cost the team points this time.               |
| `[?!]` | **Dubious** —  For hard to see mistakes that didn't cost the team points this time but could have if the cards were different.  |
| `[!?]` | **Interesting** — For creative plays that might not have earned the team points this time, but could have if the cards were different.    |
| `[!]`  | **Great play** — For great plays that may or may not have earned the team points this time.   |
| `[!!]` | **Brilliant play** — For brilliant plays that directly led to earning the team extra points.   |

### Format

The label must appear at the very **beginning** of the annotation string, immediately followed by the commentary text with no separator required (though a space is conventional):

```
"[??]Throwing trump here needlessly lost the hand."
"[?]Should not have passed here given the score."
"[?!]Risky river cross here call. Probably not optimal."
"[!?]Interesting lead — trading a trick for a positional advantage."
"[!]Correct next call here from seat 1 after the Ace turned down."
"[!!]Perfect decision to duck here. Only way to get the euchre."
```

A label is **optional**. Annotations without a label are treated as plain commentary:

```
"Dealer had no choice here."
```

### Multiple Annotations

A single decision or trick index can have multiple annotation strings, allowing both a labeled assessment and extended commentary:

```json
"playAnnotations": {
  "3": [
    "[!!]Perfect trump lead to clear the way.",
    "Seat 1 held right, left, and ace — no other line wins all five tricks."
  ]
}
```

---

## Parsing Label Tags

Compliant EGN parsers and renderers should detect a label tag by checking whether the annotation string begins with one of the recognized bracket sequences (`[??]`, `[?]`, `[?!]`, `[!?]`, `[!]`, `[!!]`). The remaining text after the tag is the display commentary. If no recognized tag is found at the start, the entire string is treated as plain commentary.

> **Note:** Parsers should check longer tags before shorter ones (e.g., `[??]` before `[?]`, and `[!!]` before `[!]`) to avoid incorrect prefix matches.
