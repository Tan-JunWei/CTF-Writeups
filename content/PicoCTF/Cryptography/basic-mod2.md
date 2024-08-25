---
tags:
  - Cryptography
  - medium
  - Python
  - Mod
Creation Date: 
Last Date: 
draft: 
References: 
modified: 2024-08-25T15:33:52+08:00
---
## Challenge Description
![[PicoCTF basic-mod2.png]]

This challenge is similar to the previous challenge, [[basic-mod1]], but instead of calculating the modulus of each number, we need to calculate the modular inverse. There is also a slight difference in the character set instructions that we need to consider.

### Getting the Flag
![[PicoCTF basic-mod2 2.png]]

Running `cat message.txt` after downloading the file with `wget` displays a string of numbers:

```
268 413 438 313 426 337 272 188 392 338 77 332 139 113 92 239 247 120 419 72 295 190 131
```

We need to calculate the modular inverse of each number and map it to a character in the predefined character set in the description. I used a python script to do this. The modular inverse function was created with the assistance of [this page](https://bitcointalk.org/index.php?topic=5430100.0).

>[!todo]+ Decryption Script
>```python
>chrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"
>enc_message = "268 413 438 313 426 337 272 188 392 338 77 332 139 113 92 239 247 120 419 72 295 190 131"
>flag = ""
>
>def modular_inverse(x: int, m: int) -> int:
>    return pow(x, -1, m)
>
>for i in enc_message.split():
>    mod_inverse = modular_inverse(int(i),41)
>
>    # -1 since the character set for this challenge starts from 1, unlike the previous challenge
>    flag += chrs[mod_inverse-1]
>
>print(flag)
>```

> [!NOTE] Flag
>picoCTF{1NV3R53LY_H4RD_8A05D939}






