---
tags:
  - Forensics
  - medium
  - Sleuthkit
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-20T22:54:59+08:00
---
## Challenge Description 

![[PicoCTF Disk Disk Sleuth.png]]

This seems like a straightforward [[The Sleuth Kit (TSK)]] challenge. As per normal, we begin by downloading the compressed disk image using `wget`, and then expand the file using `gunzip`.

### The Flag
![[PicoCTF disk disk sleuth 2.png]]

>[!question] PicoCTF Challenge Description Clue
>The description instructed us to use `srch_strings` from [[The Sleuth Kit (TSK)]] to find the flag.
>`srch_strings` displays printable strings in files. This is similar to `strings` but `srch_strings` is a [[The Sleuth Kit (TSK)]] command that can provide additional functionality such as offset information of found strings.
>
>It can also handle raw disk images and other file system-specific data structures, which are common in forensic investigations.

Running `srch_strings <file-name> | grep "pico` successfully gives us our flag. 

> [!NOTE] Flag
> picoCTF{f0r3ns1c4t0r_n30phyt3_a69a712c}
