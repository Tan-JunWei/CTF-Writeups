---
tags:
  - Cryptography
  - Vigenere
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-23T11:22:52+08:00
---
## Challenge Description
![[PicoCTF Vigenere.png]]

For this challenge, we only have to download the provided file, check its contents and decode it using a Vigenere cipher decoder, with the key given.

![[PicoCTF Vigenere 3.png]]

Running `cat cipher.txt` displays the encrypted string that we will need to decode. 

![[PicoCTF Vigenere 2.png]]

To decode, I used [[CyberChef]] and entered the key provided `CYLAB`, and from there I got the flag. Other tools like https://www.boxentriq.com/code-breaking/vigenere-cipher are also fine.

> [!NOTE] Flag
>picoCTF{D0NT_US3_V1G3N3R3_C1PH3R_2951a89h}