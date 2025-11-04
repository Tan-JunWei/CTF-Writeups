---
tags:
  - Forensics
  - easy
  - ChallengeCreation
  - pcap
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>What do you know about File Transfer Protocol (FTP)? I've heard many people call it the Flag Transfer Protocol!
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** easy
>
>**Files**
>- [[ftp.pcap]]

## Flag Transfer Protocol - Solution

1. For this challenge, we are given a file called `ftp.pcap`. It contains the flag in plaintext, so this challenge can be solved in multiple ways. An example is shown below, where the flag is obtained after checking the stream information (communication between the FTP server and client).

![[solve.png]]

Flag: `HNF25{FTP_15_UN3CRYPT3D}`