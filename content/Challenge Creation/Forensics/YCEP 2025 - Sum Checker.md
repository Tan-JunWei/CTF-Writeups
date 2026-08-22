---
tags:
  - Forensics
  - Checksum
  - easy
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>30 files, each locked behind a SHA-256 checksum, and the task is clear: figure out which one has the real flag. It's like being handed a stack of cryptic treasure maps and told, "Good luck, no pressure!"
>
>**Checksum:** `a91561aa9ce79c721f66a7d846128df4f81d11937fd723860ad92547ff2e814e`
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Hints**
>- `How can we find the SHA256 checksum of files?` (100 points)
>
>**Files**
>- [[check.zip]]

## Sum Checker - Solution

We are provided with a zip file, containing 30 files named flag(n).txt.

After unzipping the zip file, we must find the file with a SHA256 checksum that matches the one given in the challenge: 
**Checksum of correct file:** `a91561aa9ce79c721f66a7d846128df4f81d11937fd723860ad92547ff2e814e`

To display the checksum of all 30 files in the `check` folder, we can run the following command:

```bash
sha256sum check/*
```

![[Sum-Checker-1.png]]

Out of the 30 files, 29 of them contain fake flags. To find the correct file, we can do:

```bash
sha256sum check/* | grep a91561aa9ce79c721f66a7d846128df4f81d11937fd723860ad92547ff2e814e
```

We now know that the file that contains the correct flag is flag28.txt.

We can cat the flag28.txt to obtain the flag.

![[Sum-Checker-2.png]]

> [!NOTE] Flag
> YCEP25{UNPR3D1CT4BL3_0UTPUT}