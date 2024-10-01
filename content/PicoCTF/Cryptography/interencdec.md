---
tags:
  - Cryptography
  - base64
  - CaesarCipher
  - easy
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-10-01T20:51:41+08:00
---
## Challenge Description

![[PicoCTF interencdec.png]]

From the description and hint provided, we can infer that this challenge will likely use a variety of decoding processes. We shall begin by downloading the file using `wget <link>`. 

>[!question] PicoCTF Hint: Engaging in various decoding processes is of utmost importance

![[PicoCTF interencde 2.png]]

After running `file enc_flag`, we realise that this file contains ASCII text. `cat enc_flag` displays a string of characters.

>[!tip]
>Since the string ends with 2 `=` characters, this string is likely [[Base64]] encoded, because the special character "`=`" is used in its encoding process.
>
>How does Base64 encoding work? 
>Check this out: [[Base64#Base64 Encoding|Base64 Encoding]]

### The decoding process
![[PicoCTF interencdec 3.png]]

Using [[CyberChef]], we proceed by attempting [[Base64]] decoding. We receive an output that contains a string of characters which once again, looks like it's [[Base64]] encoded. Let's extract that string and run it through the [[Base64]] decoding process again.

![[PicoCTF interencdec 4.png]]

We now have an output that looks slightly off from the picoCTF flag format `picoCTF{...}`. This means that a common cipher like the caesar cipher may have been used to encrypt the flag.

![[PicoCTF interencdec 5.png]]

I played around with the caesar cipher values, starting with `ROT13`. Changing the shift value to 19 reveals the flag. 

> [!NOTE] Flag
>picoCTF{caesar_d3cr9pt3d_b204adc6}