---
tags:
  - Forensics
  - medium
  - Steganography
  - zsteg
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-03T20:20:33+08:00
---
## Challenge Description
![[PicoCTF St3g0.png]]

We shall start off by following the instructions. I ran `wget <link>` to download the file. I also opened the file in GUI, but as the challenge name suggests, this is a [[Steganography]] challenge, so there was no useful information there. 

>[!question]  PicoCTF Hint: We know the end sequence of the message will be `$t3g0`.

### How pico.flag.png looks like

![[PicoCTF St3g0 2.png]]

### Running [[zsteg]]
![[PicoCTF St3g0 3.png]]
Next, I ran `zsteg <file-name>` and the flag was revealed easily. 
`b1,rgb,lsb,xy       .. text: "picoCTF{7h3r3_15_n0_5p00n_a9a181eb}$t3g0"
`
>[!important] Check
>
>As established earlier, the end sequence of the message will be `$t3g0`. This proves that we have obtained the correct flag. 

> [!NOTE] Flag
>picoCTF{7h3r3_15_n0_5p00n_a9a181eb}
