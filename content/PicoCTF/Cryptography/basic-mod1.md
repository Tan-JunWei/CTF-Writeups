---
tags:
  - Cryptography
  - medium
  - Mod
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-25T15:02:06+08:00
---
## Challenge Description
![[PicoCTF basic-mod1.png]]

The approach for this challenge was already provided in the description, so we can just follow that.

### The contents of `message.txt`
![[PicoCTF basic-mod1 2.png]]

After downloading the file using `wget`, and running `cat message.txt`, we get this string of numbers:

```
165 248 94 346 299 73 198 221 313 137 205 87 336 110 186 69 223 213 216 216 177 138
```

### Decrypting the Message
>[!todo]+ Decryption Script
>I used a python script to decrypt the message above in order to get the flag. The following shows my code.
>```python
># Based on the specifications in the challenge description
>chrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_"
>
>enc_message = "165 248 94 346 299 73 198 221 313 137 205 87 336 110 186 69 223 213 216 216 177 138"
>
>flag = "" 
>
>for i in enc_message.split():
>   mod37 = int(i) % 37
>   dec_chr = chrs[mod37]
>   flag += dec_chr
>
>print(flag)
>```

>[!NOTE] Flag
>picoCTF{R0UND_N_R0UND_B6B25531}

