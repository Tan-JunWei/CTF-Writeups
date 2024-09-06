---
tags:
  - GeneralSkills
  - easy
  - strings
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T09:06:43+08:00
---
## Challenge Description
![[PicoCTF strings it.png]]

Well, the description gave us a very useful clue. We'll have to use `strings` for this challenge.

>[!todo] `strings` command
>`strings` prints the strings of printable characters in files.
### `strings` strings
![[PicoCTF strings it 2.png]]

After I downloaded the file (named "`strings`") using `wget`, I ran `file strings` to check what type of file it is. It turns out that it is an executable file, which is why the description mentions "running it".

Anyway, I proceeded by running `strings strings` to display the printable characters in this executable file. With my previous experiences with `strings`, an overwhelming block of text is always displayed in the terminal after running this command, burying the flag within it (if any).
This time, I piped the output through `grep` with the search term being "`pico`" to get the flag, since the flag format for picoCTF challenges is`picoCTF{...}`.

This allowed me to get the flag easily

> [!NOTE] Flag
> picoCTF{5tRIng5_1T_d66c7bb7}