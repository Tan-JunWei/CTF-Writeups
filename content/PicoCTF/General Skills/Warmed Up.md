---
tags: 
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-07T11:51:01+08:00
---
## Challenge Description
![[PicoCTF Warmed Up.png]]

This is an easy challenge where we are tasked to convert 0x3D (hexadecimal representation) to base10 (decimal representation). This can be done in many ways, such as using an online conversion tool or writing a script.

I chose the latter as it's just 1 line of code.

```python
print(int('3D',16))
```

The `int()` function in Python can convert any base to base10. We just have to supply the base we are converting from as the second argument, which in this case is base16.

Wrapping the decimal value with `picoCTF{...}` will allow us to get the flag.

> [!NOTE] Flag
> picoCTF{61}