---
tags:
  - Forensics
  - medium
  - pcap
Creation Date: 
Last Date: 
draft: 
modified: 2024-08-19T15:26:00
---
### Challenge Description
![[PicoCTF PcapPoisoning.png]]

After downloading the file, we realise that it is a `pcap` file, as the challenge name already suggests. 

### Using `strings`
![[PicoCTF Pcap Poisoning 2.png]]

>[!success]  We can run `strings <file-name> | grep pico` to get the flag immediately.

Alternatively, we can use [[WIreshark]] for packet analysis.

### Using [[WIreshark]]

![[PicoCTF Pcap Poisoning 3.png]]

Using the display filter `tcp contains "pico"`, we narrow our search to 1 packet which contains our flag. 

> [!NOTE] Flag
> picoCTF{P64P_4N4L7S1S_SU55355FUL_31010c46}





