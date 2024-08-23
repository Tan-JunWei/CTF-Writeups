---
tags:
  - Forensics
  - medium
  - metadata
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-21T15:11:42+08:00
---
## Challenge Description

![[PicoCTF So Meta.png]]

After downloading the file using `wget`, we can run `exiftool <file-name>` to retrieve the flag, as both the description and the hint indicate that we have to examine the metadata of the file. 

>[!question] PicoCTF Hint: What does meta mean in the context of files?

![[PicoCTF So Meta 2.png]]

Indeed, our flag is in the 'Artist' section of the file metadata.

> [!NOTE] Flag
>picoCTF{s0_m3ta_eb36bf44}

