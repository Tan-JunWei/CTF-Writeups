---
tags:
  - GeneralSkills
  - easy
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-05T22:39:44+08:00
---
## Challenge Description
![[PicoCTF GlitchCat.png]]

Hmm... the challenge name and description is quite vague. Let's run the command given when I launched an instance to understand what exactly is going on. 

### Getting the Flag
![[PicoCTF Glitchcat 2.png]]

Running `nc saturn.picoctf.net 53781` displayed the following string:

```
'picoCTF{gl17ch_m3_n07_' + chr(0x39) + chr(0x63) + chr(0x34) + chr(0x32) + chr(0x61) + chr(0x34) + chr(0x35) + chr(0x64) + '}'
```

>[!tip] What does `chr()` do?
>From a previous challenge ([[PW Crack 2]]), I learnt that the `chr()` function in Python returns the character that represents the specified unicode.
>
>For example, chr(97) allows us to get the character that represents the unicode 97.

So I proceeded to create a very simple Python script named "`solve.py`" to display the flag.

```python 
flag = 'picoCTF{gl17ch_m3_n07_' + chr(0x39) + chr(0x63) + chr(0x34) + chr(0x32) + chr(0x61) + chr(0x34) + chr(0x35) + chr(0x64) + '}'

print(flag)
```

Running `python solve.py` displayed the flag.

> [!NOTE] Flag
> picoCTF{gl17ch_m3_n07_9c42a45d}