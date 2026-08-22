---
tags:
  - WebExploitation
  - beginner
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
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

>[!info] What is `robots.txt`?
>`robots.txt` is a text file placed at the root of a website (e.g., `https://example.com/robots.txt`) that tells web crawlers and search engine bots which pages they are **allowed or disallowed** from indexing.
>
>Example format:
>```
>User-agent: *
>Disallow: /admin/
>Disallow: /secret-page
>```
>
>While `robots.txt` is intended for polite bots, it is **not a security mechanism**. Any human can simply visit `robots.txt` directly in a browser. In CTF challenges (and real-world security assessments), `robots.txt` often inadvertently reveals sensitive or hidden paths that the site owner didn't want indexed.

1. Connect to the VPN and visit the website.

2. Press `Ctrl + U` to view the page source. The source code comments hint at checking `robots.txt`. Alternatively, directly navigate to `/robots.txt` on the target website, which is always publicly accessible.

Here are the contents of `robots.txt`:

```http
User-agent: *
# Congratulations, you found the first clue! The path you're not supposed to visit is the one you must visit.
Disallow: /f1ag_h3r3_n0w_th3_r0b0ts_path
```

3. Navigate to the disallowed path (`/f1ag_h3r3_n0w_th3_r0b0ts_path`) in your browser. The flag will be shown in plaintext.

>[!tip] Quick shortcut
>In any web CTF, checking `/robots.txt` and viewing the page source (`Ctrl + U`) should be among your first steps. They frequently reveal hidden paths, comments, or credentials.

> [!NOTE] Flag
> HNF25{s0uRc3_c0d3_anD_r0b0ts_m4tt3r_s0m3t1m3s!}