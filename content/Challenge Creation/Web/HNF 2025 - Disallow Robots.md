---
tags:
  - WebExploitation
  - beginner
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>Someone once told me "Why settle for boring old robots.txt when you can have clankers.txt guarding your website?"
>
>- **Author:** Jun Wei
>- **Category:** web
>- **Difficulty:** beginner

## Disallow Robots - Solution

1. Connect to the VPN and visit the website.
2. `Ctrl + U` to view source code, which will direct you to check out `robots.txt`.

Here are the contents of `robots.txt`:

```http
User-agent: *
# Congratulations, you found the first clue! The path you're not supposed to visit is the one you must visit.
Disallow: /f1ag_h3r3_n0w_th3_r0b0ts_path
```

3. Visit that path and the flag will be shown in plaintext.

Flag: `HNF25{s0uRc3_c0d3_anD_r0b0ts_m4tt3r_s0m3t1m3s!}`