---
tags:
  - Cryptography
  - medium
  - MorseCode
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-25T13:34:38+08:00
---
## Challenge Description
![[PicoCTF morse-code.png]]

For this challenge, we are required to decrypt morse code in an audio format. 

We begin by downloading the file provided, which is a `.wav` file.

![[morse_chal.wav]]

>[!question] PicoCTF Hint: Audacity is a really good program to analyze morse code audio.
>However, using Audacity will likely be a longer approach, so I used an online morse code audio decoder tool instead.
### Decrypting Morse Code
![[PicoCTF morse code 2.png]]

There are numerous morse code audio decoder tools online, but I used [this](https://databorder.com/transfer/morse-sound-receiver/). 
After uploading the file and playing it, I received this string:
```
WH47 H47H 90D W20U9H7
```

From the description, we need to wrap the answer with picoCTF{}, put underscores in place of pauses, and use all lowercase.

After doing these, we can submit the flag.

>[!NOTE] Flag
>picoCTF{wh47_h47h_90d_w20u9h7}