---
tags:
  - Cryptography
  - Transposition
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-23T15:16:40+08:00
---
## Challenge Description

![[PicoCTF transposition-trial.png]]

This is a transposition cipher challenge. We first download the corrupted message by using `wget`. 

### Scrambled message
![[PicoCTF transposition-trial 2.png]]

After running `cat message.txt`, we can see a scrambled message. 

Scrambled message: `heTfl g as iicpCTo{7F4NRP051N5_16_35P3X51N3_V6E5926A}4`.

>[!question] PicoCTF Hint: Split the message up into blocks of 3 and see how the first block is scrambled

### Understanding the problem
By observing the scrambled message, we can infer that the first 2 words of the message should be "The flag".

Let's zoom into the first 3 blocks (of 3), which will make up the first 2 words.
-  First block: `heT`
-  Second block: `fl `
-  Third block: `g a`
>[!important] Spaces in between characters
>We must not neglect the spaces in between characters. They should also be treated as normal characters as they were also scrambled during the encryption process.

From the above 3 blocks. we can conclude that the third character of each block should be the first. This will be followed by the first and second character of the block.

### Decryption
>[!todo]+ Decryption script for the Flag
>Since we have established that each block should be in this format instead: 
><`third-chr`><`first-chr`><`second-chr`>
>
>I used a Python script to decrypt the scrambled message to obtain the flag.
>```
>enc_flag = "heTfl g as iicpCTo{7F4NRP051N5_16_35P3X51N3_V6E5926A}4"
>flag = ""
>
>blocks_of_3 = [enc_flag[i:i+3] for i in range(0, len(enc_flag), 3)]
>
>for block in blocks_of_3:
>    flag += block[2] + block[0] + block[1]
>
>print(flag)
>```

Running the script reveals the flag in plaintext.

Decrypted message: `The flag is picoCTF{7R4N5P051N6_15_3XP3N51V3_56E6924A}`

>[!NOTE] Flag
>picoCTF{7R4N5P051N6_15_3XP3N51V3_56E6924A}
