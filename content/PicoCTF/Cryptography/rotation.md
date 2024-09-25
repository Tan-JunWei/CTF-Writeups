---
tags:
  - Cryptography
  - ROT13
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-25T22:23:50+08:00
---
## Challenge Description

![[PicoCTF rotation.png]]

As the challenge name and hint suggest, the flag is probably encrypted using a caesar cipher. We first download the file using `wget` to see how the encrypted flag looks like to understand how we should obtain the flag. 

![[PicoCTF rotation 2.png]]

Running `cat encrypted.txt` displays a string `xqkwKBN{z0bib1wv_l3kzgxb3l_555957n3}`. Observing this string allows us to conclude that we will need to use caesar cipher to decrypt it, due to the presence of the familiar curly braces `{}`. 

Further analysis (or trial and error) tells us that the caesar cipher input value should be _18_. From here, we can use [[CyberChef]] to decrypt the message.

![[PicoCTF rotation 3.png]]

> [!NOTE] Flag
>picoCTF{r0tat1on_d3crypt3d_555957f3}