---
tags:
  - Cryptography
  - ROT13
  - medium
modified: 2024-08-23T10:06:27+08:00
---
## Challenge Description

![[PicoCTF Mod 26.png]]

>[!info] Why "Mod 26"?
>ROT13 shifts each letter by 13 positions in the alphabet. Since the English alphabet has **26** letters, this shift wraps around modularly (hence "Mod 26"). Mathematically, for a letter at position `x` (0–25), ROT13 computes `(x + 13) mod 26`. Because 13 + 13 = 26 ≡ 0 (mod 26), ROT13 is self-inverse: encrypting and decrypting use the exact same operation.

For this challenge, we do not need to download any files. We can copy the encrypted string `cvpbPGS{arkg_gvzr_V'yy_gel_2_ebhaqf_bs_ebg13_Ncualgvd}` and head over to [[CyberChef]].

### The Flag
![[PicoCTF Mod 26 2.png]]

As the challenge description suggests, the string is encrypted using ROT13. So we use ROT13 to decrypt it. 


> [!NOTE] Flag
>picoCTF{next_time_I'll_try_2_rounds_of_rot13_Aphnytiq}

#### Similar
- [[13]]: ROT13 on a provided ciphertext string
- [[rotation]]: Caesar cipher (ROT18) decryption
- [[credstuff]]: ROT13 used to decode a retrieved password