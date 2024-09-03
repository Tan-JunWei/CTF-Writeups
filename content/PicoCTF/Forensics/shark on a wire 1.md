---
tags:
  - Forensics
  - medium
  - pcap
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-22T21:11:06+08:00
---
## Challenge Description

![[PicoCTF shark on a wire 1.png]]

We shall start our journey by downloading the file using `wget <link>`. The downloaded file is a `.pcap` file. Hence we will continue by using [[Wireshark]].

The `capture.pcap` file contained a total of 2317 packets. After checking the Protocol Hierarchy, I decided to use `UDP` as a display filter, and proceeded by following a random `UDP stream`.

>[!question] PicoCTF Hint: What are streams?
>This confirms that we should pay more attention to the `streams` in [[Wireshark]].

## Finding the flag

![[PicoCTF shark on a wire 1 2.png]]

I analysed the various `UDP streams`, and managed to find the flag in the 6th stream. 

>[!danger] Decoy Flags
>There are decoy flags in this challenge, such as one fake flag in _UDP 7th stream_. 

![[PicoCTF shark on a wire 1 3.png]]

> [!NOTE] Flag
>picoCTF{StaT31355_636f6e6e}

