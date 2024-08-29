---
tags:
  - Forensics
  - medium
  - Image
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-29T13:06:35+08:00
---
## Challenge Description

![[PicoCTF extensions description.png]]

We shall begin by using `wget <link>` to download the file provided. 

![[PicoCTF extensions.png]]

Running `file flag.txt` shows that `flag.txt` is a `.png` file instead of a `.txt` file. `exiftool` also indicates that the file type is `PNG`.

>[!question] PicoCTF Hint: How do operating systems know what kind of file it is? (It's not just the ending!
>By running `hexedit flag.txt`, we can also see that the file signature of `flag.txt` is indeed the file signature of a _png_ file.

Hence, we can run `cp flag.txt flag.png` to give this file the correct file extension. Opening this file using the GUI allows us to see the flag in plaintext.

### Flag
![[PicoCTF extensions 3.png]]

> [!NOTE] Flag
> picoCTF{now_you_know_about_extensions}
