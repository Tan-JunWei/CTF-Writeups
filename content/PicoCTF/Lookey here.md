---
tags:
  - Forensics
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-19T15:26:05+08:00
---
## Challenge Description
![[PicoCTF Lookey Here.png]]

We begin by downloading the file using `wget`. We realise that the file provided is a text file. Based on the description, this text file is likely to be text-heavy. 

![[PicoCTF lookey here 3.png]]

Indeed, running `cat <file-name>` here displays a large block of text in the terminal. Let's look for more clues. 

>[!question] PicoCTF Hint: Download the file and search for the flag based on the known prefix.

Based on the hint, it seems like we will have to search for the flag using `grep pico`, since the common flag format for PicoCTF challenges is picoCTF{}.

![[PicoCTF Lookey here 2.png]]

Indeed, doing that reveals our flag. 

> [!NOTE] Flag
> picoCTF{gr3p_15_@w3s0m3_2116b979}
