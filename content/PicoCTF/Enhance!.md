---
tags:
  - Forensics
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-19T17:33:03+08:00
---
## Challenge Description 

![[PicoCTF enhanced.png]]

A straightforward challenge. First, we download the file using `wget <link>`. 

## Trying `Strings`
![[PicoCTF enhanced 2.png]]

At first, running `strings <file-name>` does not seem to reveal any important information. But I was wrong. Upon closer and more careful inspection, I realised that the flag was split and hidden in the `html` code. Specifically, it was hidden in the `tspan` tags. 
### Revealing the Flag

![[PicoCTF enhanced 3.png]]
The only difficulty of this challenge is to realise that the flag was split into different parts. All we have to do is join "p", "i", "c","o", "C", "T", "F { 3 n h 4 n " and "c 3 d _ 2 4 3 7 4 6 7 5 }" and we have our flag. 

> [!NOTE] Flag
>picoCTF{3nh4nc3d_24374675}


