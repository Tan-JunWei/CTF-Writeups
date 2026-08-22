---
tags:
  - Forensics
  - easy
  - binwalk
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>This is a binwalk practice challenge to be gone through during the workshop.
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Files**
>- [[calming.jpg]]

## Calming - Solution

To solve this challenge, run `binwalk -e` on the given image. This challenge will be gone through during the workshop.

```bash
binwalk -e calming.jpg
```

```console
┌──(nepz㉿nepz)-[~]
└─$ binwalk -e calming.jpg

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             JPEG image data, JFIF standard 1.02
382           0x17E           Copyright string: "Copyright (c) 1998 Hewlett-Packard Company"
2188529       0x2164F1        Zip archive data, at least v2.0 to extract, name: hidden/
2188598       0x216536        Zip archive data, at least v2.0 to extract, name: hidden/hidden.png
4268033       0x412001        End of Zip archive, footer length: 22
```

A file called `hidden.png` will be extracted into a directory called `_calming.jpg.extracted/hidden`.

This file will contain the flag in plaintext, as shown below.

![[hidden.png]]

> [!NOTE] Flag
> YCEP25{pr3tty_c00l_1m4ge_m4g1c}