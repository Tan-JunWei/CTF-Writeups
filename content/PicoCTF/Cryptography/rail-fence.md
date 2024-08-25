---
tags:
  - Cryptography
  - medium
  - Transposition
  - RailFence
Creation Date: 
Last Date: 
modified: 2024-08-25T13:17:41+08:00
References: 
draft: 
---
## Challenge Description 
![[PicoCTF rail-fence.png]]

This was an interesting challenge that involves a message encoded using the rail fence cipher.

>[!tip] Rail Fence Cipher
>Essentially, the plaintext is written diagonally in a zig-zag format, according the number of "rails" in the "fence". The ciphertext is the result of reading off the "rails" horizontally. 
>
>For more information about this cipher, refer to [this page](https://en.wikipedia.org/wiki/Rail_fence_cipher). This is the same page provided in the challenge description.

### Ciphertext
![[PicoCTF rail-fence 2.png]]
We begin by download the file `message.txt` using `wget`, followed by running `cat` to see the ciphertext that we need to decode:
```
Ta _7N6D49hlg:W3D_H3C31N__A97ef sHR053F38N43D7B i33___N6
```

### Decoding the ciphertext
![[PicoCTF rail-fence 3.png]]
Using an online [Rail Fence Cipher decoder](https://www.boxentriq.com/code-breaking/rail-fence-cipher), we can specify the number of rails to decode the ciphertext and obtain the flag. 

>[!NOTE] Flag
>picoCTF{WH3R3_D035_7H3_F3NC3_8361N_4ND_3ND_4A76B997}