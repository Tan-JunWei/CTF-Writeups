---
tags:
  - Forensics
  - medium
  - Sleuthkit
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-22T15:03:05+08:00
---
### Challenge Description

![[PicoCTF Sleuthkit Apprentice.png]]

We will first download and extract the compressed disk image using `wget <link>` and `gunzip <file-name>` respectively. We will then need to use [[The Sleuth Kit (TSK)]] commands for disk image analysis.

>[!info] Linux File System
>Having a basic knowledge about the [[Linux File System]] will be helpful for this challenge.
### `mmls` command
![[PicoCTF Sleuthkit Apprentice 2.png]]
Next, we run `mmls` to display the partition layout of a volume system (partition tables). This will provide us with the offset address for each partition on the image, which will be useful later. 

>[!important] Offset address
> This is basically the starting address of each partition. `mmls <image-name>` will highlight the `Start` of each partition.

### `fsstat` command
![[PicoCTF Sleuthkit Apprentice 3.png]]

To get more information about the different partitions, we can do `fsstat`. `fsstat` will display the general details of a file system. 

>[!important] Usage of `fsstat`
>`fsstat -o <img-offset> <image-name>`
>The`<img-offset>` is the sector offset where the file system starts in the image.

For this challenge, `fsstat` was not particularly useful, so I went on to attempt `fls`.

### `fls` command
![[PicoCTF Sleuthkit Apprentice 4.png]]
 The `fls` command lists file and directory names in a disk image. I used the `-r` flag to search recursively for files and directories in each partition as well. 

There wasn’t much that seemed of interest on the first partition. However when I ran the same command on the third partition, it revealed a lot of files and directories present in this partition. 

![[PicoCTF Sleuthkit Apprentice 5.png]]

I then ran `fls -o 360448 -r disk.flag.img | grep flag` and found 2 `.txt` files in this partition. Subsequently, I tried `icat` on both files and obtained the flag. 

>[!important] Usage of `icat`
>`icat` is used to output the contents of a file based on its inode number
>`icat -o <img-offset> <image-name> <inode-number>`
>Specifying the partition offset and the inode number as such allows the content of file to be displayed.

> [!NOTE] Flag
>picoCTF{by73_5urf3r_3497ae6b}

