---
tags:
  - Forensics
  - medium
  - pcap
Creation Date: 
Last Date: 
draft: 
modified: 2024-09-25T22:21:14+08:00
---
### Challenge Description
![[PicoCTF PcapPoisoning.png]]

After downloading the file, we realise that it is a `pcap` file, as the challenge name already suggests. 

### Using `strings`
![[PicoCTF Pcap Poisoning 2.png]]

>[!success]  Acquiring the flag using `strings`
>
>We can run `strings <file-name> | grep pico` to get the flag immediately. Piping the output of the `strings` command through `grep` will allow us to filter out line(s) that contain the search term "pico".

Alternatively, we can use [[Wireshark]] for packet analysis.

### Using [[Wireshark]]

![[PicoCTF Pcap Poisoning 3.png]]

Using the display filter `tcp contains "pico"`, we narrow our search to 1 packet that contains our flag. 

> [!NOTE] Flag
> picoCTF{P64P_4N4L7S1S_SU55355FUL_31010c46}





