---
tags:
  - Forensics
  - medium
  - pcap
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-19T15:26:00
---
## Challenge Description
![[PicoCTF Packets Primer.png]]

Seems like a typical network forensics challenge. After downloading the pcap file using `wget`, we can use [[WIreshark]] to get the flag. 

### Wireshark
![[PicoCTF Packets Primer 2.png]]

Since there are only 9 packets in this pcap file, finding the flag was straightforward. Display filters was not necessary.

### Using `strings`
![[PicoCTF Packets Primer 3.png]]

`strings` also works here. The flag is revealed instantaneously. 

For both methods, all we have to do after that is just formatting the flag, that is, removing the redundant spaces in between the characters. 

> [!NOTE] Flag
>picoCTF{p4ck37_5h4rk_01b0a0d6}


