---
tags:
  - GeneralSkills
  - easy
  - Hex
  - ASCII
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-07T11:54:20+08:00
---
## Challenge Description

![[PicoCTF Lets Warm Up.png]]

This challenge is similar to previous warmup challenges([[Warmed Up]] and [[2Warm]]). For this challenge, we only have to convert hexadecimal(`0x70`) to decimal, then to an ASCII character.

I made a Python Script to assist with the conversions.

```python
decimal = int("70",16)

print(chr(decimal))
```

>[!todo] The `int()` function
>The `int()` function in Python can convert any base to base10. We just have to supply the base we are converting from as the second argument, which in this case is base16.

>[!tip] What does `chr()` do?
>The `chr()` function returns the character that represents the specified unicode. For example, chr(97) allows us to get the character that represents the unicode 97.
>
>Since ASCII is a proper subset of Unicode, `chr()` can be used to convert the above numbers into ASCII characters.

Running the python script displays the ASCII character "p". Wrapping this with `picoCTF{...}` will give us the flag.

> [!NOTE] Flag
> picoCTF{p}
