---
tags:
  - Forensics
  - medium
  - Sleuthkit
Creation Date: 
Last Date: 
References: 
draft: 
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

