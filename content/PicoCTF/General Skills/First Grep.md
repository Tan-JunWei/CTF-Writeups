---
tags:
  - GeneralSkills
  - easy
  - grep
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T13:53:26+08:00
---
## Challenge Description
![[PicoCTF First Grep.png]]

Yep, as the challenge description suggests, we just need to pipe the contents of the downloaded file through `grep` with the search term "`pico`" or "`picoCTF`" to get the flag.

This can be done by running this, after we download the file using `wget`:

```bash
cat file | grep pico
```

![[PicoCTF First Grep 2.png]]

Using the command above allows us to find the flag easily, rather than combing through the large chunk of text after we run `cat <file-name>`.

> [!NOTE] Flag
> picoCTF{grep_is_good_to_find_things_f77e0797}