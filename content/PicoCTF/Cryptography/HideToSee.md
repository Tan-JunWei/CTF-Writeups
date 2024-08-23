---
tags:
  - Cryptography
  - Steganography
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-23T15:18:45+08:00
---
## Challenge Description

![[PicoCTF HideToSee.png]]

From the description, it seems like this challenge will be using both Forensics and Cryptography concepts. 

As usual, we start off by downloading the image using `wget <link>`.

### Contents of the file

![[PicoCTF HideToSee 3.png]]

After opening the file, we now know that the flag is likely encrypted using the Atbash Cipher. However, this was the only file we were provided with. 

>[!question] PicoCTF Hint: Download the image and try to extract it.

### Attempts to extract the hidden files
![[PicoCTF HideToSee 2.png]]

>[!fail] 
>Running `exiftool` and `binwalk` to get a better understanding of the file was not useful. They did not provide me with any clue to proceed. 

However, since we are tasked to extract hidden files, I tried using [[Stegseek]].

### [[Stegseek]]
![[PicoCTF HideToSee 4.png]]

Running `stegseek` was successful, and now we have extracted a file from the original image. We can proceed by doing `cat <file-name>` to check its contents. 

>[!todo] Encrypted Flag
>This string, `krxlXGU{zgyzhs_xizxp_7142uwv9}`, was displayed when the `cat` command was executed.

### Getting the Flag
![[PicoCTF HideToSee 5.png]]

We can simply use an online Atbash Cipher tool to decrypt the flag. I used [this](https://www.boxentriq.com/code-breaking/atbash-cipher), but [[CyberChef]] works as well. 

> [!NOTE] Flag
>picoCTF{atbash_crack_7142fde9}