---
tags:
  - GeneralSkills
  - easy
  - strings
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T08:38:25+08:00
---
## Challenge Description
![[PicoCTF Wave a flag.png]]

This challenge is basically identical to a previous challenge I've completed ([[strings it]]). We first download the challenge file using `wget <link>`, check the file type using `file <file-name>` (optional), and display printable characters in the file using `strings <file-name>`.

>[!todo] `strings` command
>`strings` prints the strings of printable characters in files.

![[PicoCTF Wave a flag 2.png]]

As seen above, the output of the strings command display the full flag. 

> [!NOTE] Flag
> picoCTF{b1scu1ts_4nd_gr4vy_30e77291}
