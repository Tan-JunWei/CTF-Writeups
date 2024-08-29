---
tags:
  - Forensics
  - easy
  - Checksum
Creation Date: 
Last Date: 
References: 
draft: false
modified: 2024-08-29T13:12:15+08:00
---
## Challenge Description

![[PicoCTF Verify.png]]

This is a straightforward challenge. Following the directions given, we just have to connect to the server via SSH:
```
ssh -p 60821 ctf-player@rhea.picoctf.net
```



### SSH 

![[PicoCTF Verify 2.png]]
There is a `files` directory in after we use the `ls` command. It seems that we will have to create a SHA checksum of all files in this directory and compare it with the checksum given to obtain the file with the actual flag. 

>[!important]  You can create a SHA checksum of a file with `sha256sum <file>` or all files in a directory with `sha256sum <directory>/*`.



### Finding the file and decrypting it

![[PicoCTF Verify 3.png]]
We find the path to the file by using `grep` to find the file with the same checksum.  We can then run `/decrypt.sh files/<file-name>` to obtain the flag!




> [!NOTE] Flag
> picoCTF{trust_but_verify_2cdcb2de}




