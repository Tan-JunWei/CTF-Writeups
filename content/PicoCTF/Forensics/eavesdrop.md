---
tags:
  - Forensics
  - medium
  - pcap
  - Wireshark
  - Cryptography
Creation Date: 
Last Date: 
References: 
draft: true
modified: 2024-09-25T14:53:45+08:00
---
## Challenge Description

![[PicoCTF Eavesdrop.png]]

For this challenge, not much clue was given in the description. However, a hint was provided.

>[!faq] PicoCTF Hint: All we know is that this packet capture includes a chat conversation and a file transfer.
>
>We'll have to keep that in mind when we analyse the packets in [[Wireshark]].

We begin by downloading the file using `wget <link>`. Opening the `pcapnp` file in Wireshark showed that there are only 75 packets in total. 

### Protocol Hierarchy
![[PicoCTF Eavesdrop 2.png]]

I proceed to check the protocol hierarchy to understand what protocols are used in this communication. Since 100% of the packets used `TCP`, I used `TCP` as a packet filter for further analysis.

### Understanding the conversation
![[PicoCTF Eavesdrop 3.png]]

I first checked the `TCP` streams, and I got to see a conversation between 2 people in stream 0. The conversation is also included below:

```
Hey, how do you decrypt this file again?
You're serious?
Yeah, I'm serious
*sigh* openssl des3 -d -salt -in file.des3 -out file.txt -k supersecretpassword123
Ok, great, thanks.
Let's use Discord next time, it's more secure.
C'mon, no one knows we use this program like this!
Whatever.
Hey.
Yeah?
Could you transfer the file to me again?
Oh great. Ok, over 9002?
Yeah, listening.
Sent it
Got it.
You're unbelievable
```

>[!info] Decryption
>
>It seems like we are given a command to decrypt a file named `file.des3`:
>
>```bash
>openssl des3 -d -salt -in file.des3 -out file.txt -k supersecretpassword123
>```
>
>However, we don't currently have this file in our possession. 
>
>>[!example] Recall: File transfer
>>
>>In the hint provided, we are told that this packet capture includes a file transfer. We'll have to explore and retrieve the file that was transferred.
>
>Based on the conversation, one person requested for a file to be transferred to him again, and it is implied that the file was subsequently transferred over `9002`.
>

I suspected that 9002 was a port that they were using to transfer the file, and hence used this display filter to only show the packets using port number 9002:

```python
tcp.port == 9002
```

Then, I proceeded to follow the TCP stream of a random packet displayed (only 8 were displayed). This is the contents in tcp stream 2:

```
Salted__<K&....,J.......o..%....I{97X...........
```

I saved this data to a file named `file.des3`, and ran the command provided to us in the conversation, which decrypted the contents and saved the flag in a file named `file.txt`.

![[PicoCTF Eavesdrop 5.png]]

Running `cat file.txt` displays the flag.

> [!NOTE] Flag
>picoCTF{nc_73115_411_0ee7267a}