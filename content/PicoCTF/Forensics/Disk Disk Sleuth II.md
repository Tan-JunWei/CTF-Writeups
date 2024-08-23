---
tags:
  - Forensics
  - medium
  - Sleuthkit
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-22T15:02:28+08:00
---
## Challenge Description 

![[PicoCTF Disk Disk Sleuth II.png]]

Another disk forensics challenge! As usual, we first download the file using `wget <link>`. We will have to run `gunzip <file-name>` as well to expand the file. 

>[!info] Linux File System
>Having a basic knowledge of  the [[Linux File System]] will be beneficial for this challenge.
### `mmls` command
![[PicoCTF Disk Disk Sleuth II 2.png]]

Next, we attempt `mmls <file-name>`, just to get a general overview of how the volume system looks like. We have to take note of the starting offset of the different partitions. 

>[!question] PicoCTF Challenge Description Clue
>The file with the flag is named `down-at-the-bottom.txt`.

Running `fls -o -r 048 <file-name>` shows the contents of countless files and directories. So we will need to pair this with `grep down-at-the-bottom.txt` to find the inode of the `down-at-the-bottom.txt` file. 

>[!important] `-r` argument
>The `-r` argument for `fls` command allows us to recursively display directories as well as the files within them, which will be helpful in our search for the flag.
### Finding the flag
![[PicoCTF Disk DIsk Sleuth II 3.png]]

After finding the inode of the `down-at-the-bottom.txt` file, we can simply do `icat -o <img-offset> <image-name> <inode>` to output the contents of this file. 

> [!NOTE] Flag
>picoCTF{f0r3ns1c4t0r_n0v1c3_82489dbf}

