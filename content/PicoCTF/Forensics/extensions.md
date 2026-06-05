---
tags:
  - Forensics
  - medium
  - Image
  - hexedit
  - filetypes
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-03T20:31:48+08:00
---
## Challenge Description

![[PicoCTF extensions description.png]]

We shall begin by using `wget <link>` to download the file provided. 

![[PicoCTF extensions.png]]

Running `file flag.txt` shows that `flag.txt` is a `.png` file instead of a `.txt` file. `exiftool` also indicates that the file type is `PNG`.

>[!question] PicoCTF Hint: How do operating systems know what kind of file it is? (It's not just the ending!)

>[!info] File Signatures (Magic Bytes)
>Operating systems and tools like `file` determine a file's actual type not from its extension, but from its **file signature**, a sequence of bytes at the very start of the file (also called "magic bytes"). Each file format has a unique signature:
>
>| Format | Magic Bytes (hex) |
>|--------|-------------------|
>| PNG    | `89 50 4E 47 0D 0A 1A 0A` |
>| JPEG   | `FF D8 FF` |
>| ZIP    | `50 4B 03 04` |
>| PDF    | `25 50 44 46` |
>
>By running `hexedit flag.txt`, we can see that the file signature of `flag.txt` matches a PNG file, confirming what `file` reported. The `.txt` extension is simply misleading.

Hence, we can run `cp flag.txt flag.png` to give this file the correct file extension. Opening this file using the GUI allows us to see the flag in plaintext.

### Flag
![[PicoCTF extensions 3.png]]

> [!NOTE] Flag
> picoCTF{now_you_know_about_extensions}

#### Similar
- [[endianness-v2]]: also involves identifying a file type from its (distorted) magic bytes
- [[Mob psycho]]: also starts with identifying that an `.apk` file is really a `.zip`
