---
tags:
  - Forensics
  - medium
  - Wireshark
  - pcap
  - ROT13
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-03T20:29:34+08:00
---
## Challenge Description

![[PicoCTF Wireshark doo dooo do doo... .png]]
Aha, a [[Wireshark]] challenge. First we download the .`pcapng` file using `wget <link>`. 

>[!important] Wireshark
> Wireshark is a network analysis tool. 
> 
> For more information, refer to [[Wireshark|this page]].
### Finding the flag
![[PicoCTF Wireshark doo dooo do doo... 1.5.png]]

After opening the file in [[Wireshark]], I first went to check the Protocol Hierarchy, and decided to use `tcp` as a filter. 

>[!question] What is Protocol Hierarchy?
>Protocol hierarchy in Wireshark is a feature that displays a breakdown of the different protocols
>used within the captured data, organized by their layers in the [OSI model](https://www.geeksforgeeks.org/open-systems-interconnection-model-osi/). It shows how much traffic each protocol generated in terms of packets and bytes, helping you understand the structure of the captured data.
>
>This can identify potential points of interest.

>[!todo] Protocol Hierarchy in Wireshark
>Simply head over to `Statistics > Protocol Hierarchy` to view the Protocol Hierarchy. 
### TCP Stream 5
![[PicoCTF Wireshark doo dooo do doo...2 .png]]

After filtering the packets by using the`tcp`filter, I went to check the `TCP streams`. In `tcp stream 5`, there was a string with the familiar curly braces `{` and `}`, which hinted that the string may be the flag we're looking for. 

>[!caution]  Unfortunately, the flag isn't in plaintext.
>Here's what the string looks like: `Gur synt vf cvpbPGS{c33xno00_1_f33_h_qrnqorrs}`

### Retrieving the flag
![[PicoCTF Wireshark doo do dooo dooo... 3.png]]

Since I did not intuitively realise which cipher was used to encrypt the flag, I used a [Cipher Identifier](https://www.dcode.fr/cipher-identifier) to do the job for me.

![[PicoCTF Wireshark doo dooo do doo... 4.png]]

Since it highlighted that the string may have been encrypted using [ROT13](https://en.wikipedia.org/wiki/ROT13), I headed to [[CyberChef]] to obtain our flag. https://rot13.com/ also works.

> [!NOTE] Flag
> picoCTF{p33kab00_1_s33_u_deadbeef}

