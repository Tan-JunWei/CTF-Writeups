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

>[!info] What is FTP?
>**FTP (File Transfer Protocol)** is a standard network protocol used to transfer files between a client and a server. A critical security concern is that FTP transmits **all data in plaintext** (including usernames, passwords, and file contents) with no encryption. Anyone who can capture the network traffic can read everything transferred.
>
>This is in contrast to SFTP (SSH File Transfer Protocol) or FTPS (FTP Secure), which encrypt the connection. The flag in this challenge directly references this vulnerability: `FTP_15_UN3CRYPT3D`.

1. For this challenge, we are given a file called `ftp.pcap`. Open it in [[Wireshark]].

2. Since FTP transmits data in plaintext, the flag is directly readable in the captured traffic. There are multiple approaches:

   **Option A: Follow TCP Stream:**
   Right-click any FTP packet → `Follow > TCP Stream`. The stream will show the full FTP session, including any file contents transferred, in plaintext.

   **Option B: Check FTP-DATA stream:**
   Use the display filter `ftp-data` to isolate the file transfer packets. Follow the TCP stream on one of these packets to see the transferred file's contents.

   An example of the flag being obtained after checking the stream information (communication between the FTP server and client) is shown below.

![[solve.png]]

Flag: `HNF25{FTP_15_UN3CRYPT3D}`

#### Similar
- [[Trivial Flag Transfer Protocol]]: PicoCTF challenge involving TFTP (Trivial FTP), another unencrypted file transfer protocol