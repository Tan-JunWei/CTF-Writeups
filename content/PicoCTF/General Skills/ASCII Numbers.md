---
tags:
  - GeneralSkills
  - medium
  - ASCII
  - Hex
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-07T12:21:36+08:00
---
## Challenge Description

![[PicoCTF ASCII Numbers.png]]

We are given a string of hexadecimal values, where each value corresponds to an ASCII character.

>[!faq] PicoCTF Hint: CyberChef is a great tool for any encoding but especially ASCII.
>
>Indeed, [[CyberChef]] can be useful in challenges like these.

### Acquiring the flag using [[CyberChef]]

![[PicoCTF ASCII Numbers 2.png]]

Using the 'From Hex' function in [[CyberChef]] shows the full flag as the ouput.

### Acquiring the flag using a Python script

Alternatively, I came up with a Python script which does the same thing:

```python
hexadecimal = "0x70 0x69 0x63 0x6f 0x43 0x54 0x46 0x7b 0x34 0x35 0x63 0x31 0x31 0x5f 0x6e 0x30 0x5f 0x71 0x75 0x33 0x35 0x37 0x31 0x30 0x6e 0x35 0x5f 0x31 0x6c 0x6c 0x5f 0x74 0x33 0x31 0x31 0x5f 0x79 0x33 0x5f 0x6e 0x30 0x5f 0x6c 0x31 0x33 0x35 0x5f 0x34 0x34 0x35 0x64 0x34 0x31 0x38 0x30 0x7d"
flag = ""

for hex in hexadecimal.split():
    flag += chr(int(hex, 16))

print(flag)
```

Running the script will display the flag as output as well.

> [!NOTE] Flag
> picoCTF{45c11_n0_qu35710n5_1ll_t311_y3_n0_l135_445d4180}