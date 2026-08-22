---
tags:
  - Forensics
  - medium
  - Sleuthkit
modified: 2024-08-19T20:05:24+08:00
---
## Challenge Description

![[PicoCTF Sleuthkit Intro.png]]

Based on the directions given, we will just have to `wget <link to file>` then run `mmls` and enter the value of the size of Linux partition in the `nc` server. If it's correct, we will obtain our flag. 

>[!important] The `mmls` command
>`mmls` displays the partition layout of a volume system, which can be helpful in disk image analysis. 
>To find out more, check out [[The Sleuth Kit (TSK)]]
### Execution

![[PicoCTF Sleuthkit intro 2.png]]

> [!NOTE] Flag
> picoCTF{mm15_f7w!}

#### Similar
- [[Sleuthkit Apprentice]]: uses `mmls`, `fls`, and `icat` for disk image analysis
- [[Disk Disk Sleuth]]: uses `srch_strings` to search a disk image for the flag
- [[Disk Disk Sleuth II]]: uses `fls` and `icat` to locate and read a file in a disk image
- [[Operation Oni]]: uses `fls` and `icat` to extract an SSH key from a disk image
- [[Operation Orchid]]: uses `fls` and `icat` to find and decrypt an encrypted flag file
