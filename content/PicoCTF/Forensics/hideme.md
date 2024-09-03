---
tags:
  - Forensics
  - medium
  - binwalk
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-03T20:18:42+08:00
---
## Challenge Description

![[PicoCTF hideme.png]]

The `hideme` challenge name already suggests that the flag is hidden from plain sight. We shall try to explore. 

### Trying `binwalk`
![[PicoCTF hideme 2.png]]

Running binwalk reveals that there are embedded files that we need to take note of. I then ran `binwalk -e` to extract the files which will be extracted into the `_file.png.extracted` directory.

>[!important] `binwalk -e <file-name>`:   the `-e flag` automatically extracts known file types

### Contents of the `_file.png.extracted` directory
![[PicoCTF hideme3.png]]

There are a total of 4 files/directories in the `_file.png.extracted` directory. These are: `29`, `29.zlib`, `9B3B.zip`, and a `secret` directory. Running `file 29` shows that `29` is an empty file. 

>[!important] The `secret` directory seems most suspicious. I `cd` into it to find that there is another `png` file called `flag.png`. Using the GUI, I open the image to find the familiar flag prefix of `picoCTF`. There's our flag in plaintext!

### Flag found in `flag.png`
![[PicoCTF hideme 4.png]]

> [!NOTE] Flag
> picoCTF{Hiddinng_An_imag3_within_@n_ima9e_cda72af0}