---
tags:
  - Forensics
  - medium
  - pcap
  - Steganography
  - Steghide
  - filetypes
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-03T12:54:24+08:00
---
## Challenge Description 
![[PicoCTF Trivial Flag Transfer Protocol.png]]

Hmmmm... vague description. We first download the file using `wget <link>` and see what type of file it is. 

The downloaded file is called `tftp.pcapng`. We will use [[Wireshark]] to analyze the packets. Since both the downloaded file name and the challenge name talks about TFTP, I went to learn more about it. This page, [What is TFTP?](https://www.spiceworks.com/it-articles/what-is-tftp/), was a useful resource.

### Examining the Protocol Hierarchy
![[PicoCTF Trivial Flag Transfer Protocol 2.png]]

This `pcapng` file contained 152413 packets. I went on to check the Protocol Hierarchy in this packet capture. I used TFTP as a filter since a high percentage (100%) of packets used it. 

### Checking UDP streams
![[PicoCTF Trivial Flag Transfer Protocol 3.png]]

I followed the UDP stream of a packet displayed, and saw that UDP stream 0 showed `..instructions.txt.octet.`. It seems like a file called `instructions.txt` was transferred. 

After checking the other UDP streams, I realised that more than 1 file was transferred. 

### Exporting files transferred

![[PicoCTF Trivial Flag Transfer Protocol 4.png]]

There were a total of 6 files transferred using TFTP. The 6 files are: `instructions.txt`, `picture1.bmp`, `picture2.bmp`, `picture3.bmp`, `plan` and `program.deb`. I proceeded to download all of them for further analysis. 

>[!todo] Download transferred files
>To download the files transferred, go to `File > Export Objects > TFTP > Save All`.

### Contents of the downloaded files
![[PicoCTF Trivial Flag Transfer Protocol 5.png]]

For the next step of the analysis, I first checked the contents of `instructions.txt` by running `cat instructions.txt`. This was displayed: 

```
GSGCQBRFAGRAPELCGBHEGENSSVPFBJRZHFGQVFTHVFRBHESYNTGENAFSRE.SVTHERBHGNJNLGBUVQRGURSYNTNAQVJVYYPURPXONPXSBEGURCYNA
```

There are no numbers in this string. Maybe it was encoded using Caesar cipher. My first instinct was to use ROT13. The following shows the output: 

```bash
┌──(kali㉿kali)-[~/Desktop/picoCTF/forensics/trivial_flag_transfer_protocol]
└─$ echo "$(cat instructions.txt)" | rot13 
TFTPDOESNTENCRYPTOURTRAFFICSOWEMUSTDISGUISEOURFLAGTRANSFER.FIGUREOUTAWAYTOHIDETHEFLAGANDIWILLCHECKBACKFORTHEPLAN
```

The guess was spot on. By adding spaces in between the words, we can make out this message: 

```
TFTP DOESNT ENCRYPT OUR TRAFFIC SO WE MUST DISGUISE OUR FLAG TRANSFER. FIGURE OUT A WAY TO HIDE THE FLAG AND I WILL CHECK BACK FOR THE PLAN
```
We can see that they are trying to hide the flag from plain sight. 


#### References
- _What is TFTP? | Spiceworks_. (2018, April 23). IT Articles. https://www.spiceworks.com/it-articles/what-is-tftp/
