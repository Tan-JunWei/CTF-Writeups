---
tags:
  - Forensics
  - easy
Creation Date: 
Last Date: 
draft: 
modified: 2024-08-28T16:30:36+08:00
---
## Challenge Description

![[PicoCTF Glory of the Garden.png]]

This is a very straightforward challenge. After downloading the file, I just ran `strings <file-name>`, and the flag was shown instantly. 
### `Strings` example output
![[PicoCTF Glory of the Garden 2.png]]
![[PicoCTF Glory of the Garden 3.png]]

Since the flag was the last line displayed, I did not have to use `grep` as well.

> [!NOTE] Flag
> picoCTF{more_than_m33ts_the_3y3eBdBd2cc}

