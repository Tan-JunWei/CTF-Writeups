---
tags:
  - Cryptography
  - RSA
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-23T09:45:41+08:00
---
## Challenge Description

![[PicoCTF mind your Ps and Qs.png]]

As the description suggests, this is an RSA cryptography challenge. 

### Contents of `values` file
![[PicoCTF mind your Ps and Qs 2.png]]

After downloading the file provided using `wget <link>`, we can run `cat values`. We are given the values `c`, `n` and `e`.

>[!info] How RSA works
>RSA is an example of public-key cryptography, otherwise known as asymmetric cryptography. This means that we need the private key `d` to decrypt the string.
>
>For more information about the math behind RSA, check out https://brilliant.org/wiki/rsa-encryption/.
### RSA Decryption 
![[PicoCTF mind your Ps and Qs 3.png]]

We can feed the 3 values above and decrypt `c` using [dcode.fr’s RSA cipher decoder](https://www.dcode.fr/rsa-cipher). It computes the values of `p`, `q` and subsequently `d` to decrypt the message.

> [!NOTE] Flag
>picoCTF{sma11_N_n0_g0od_45369387}

