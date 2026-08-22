---
tags:
  - Forensics
  - medium
modified: 2024-09-03T20:22:30+08:00
---
## Challenge Description
![[PicoCTF Lookey Here.png]]

We begin by downloading the file using `wget`. We realise that the file provided is a text file. Based on the description, this text file is likely to be text-heavy. 

![[PicoCTF lookey here 3.png]]

Indeed, running `cat <file-name>` here displays a large block of text in the terminal. Let's look for more clues. 

>[!question] PicoCTF Hint: Download the file and search for the flag based on the known prefix.

Based on the hint, it seems like we will have to search for the flag using `grep pico`, since the common flag format for PicoCTF challenges is `picoCTF{...}`.

>[!info] `grep` basics
>`grep` (Global Regular Expression Print) searches through text line by line and prints lines that match the given pattern. For this challenge:
>```bash
>grep "picoCTF" <file-name>
>```
>This scans the text file and outputs only the line(s) containing the flag prefix `picoCTF`. The `-n` flag can be added to also show the line number where the match was found.

![[PicoCTF Lookey here 2.png]]

Indeed, doing that reveals our flag. 

> [!NOTE] Flag
> picoCTF{gr3p_15_@w3s0m3_2116b979}

#### Similar
- [[Big Zip]]: uses `grep -r` to recursively search hundreds of directories for the flag
- [[First Grep]]: introductory `grep` challenge
- [[Plumbing]]: uses piping with `grep` to extract the flag from a stream of output
