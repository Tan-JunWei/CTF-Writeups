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
modified: 2024-09-03T13:35:38+08:00
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

`TFTP DOESNT ENCRYPT OUR TRAFFIC SO WE MUST DISGUISE OUR FLAG TRANSFER. FIGURE OUT A WAY TO HIDE THE FLAG AND I WILL CHECK BACK FOR THE PLAN`

We can see that they are trying to hide the flag from plain sight. 

>[!tip] Recall
>One of the files downloaded was called `plan`. Could it be what they are hinting at?

I proceeded to test this hypothesis. The contents of `plan` is: 

```
VHFRQGURCEBTENZNAQUVQVGJVGU-QHRQVYVTRAPR.PURPXBHGGURCUBGBF
```

It looks like it has been encoded in the same way. Using the same command, we get another clue: 

`IUSEDTHEPROGRAMANDHIDITWITH-DUEDILIGENCE.CHECKOUTTHEPHOTOS`

With the added spaces, the message becomes:
`I USED THE PROGRAM AND HID IT WITH-DUEDILIGENCE.CHECK OUT THE PHOTOS`

Another file we downloaded was called `program.deb`. We can see that we are most likely on the right path. 

However, since it is generally not advisable to install `.deb` files directly, I will not do that. Instead, I will be used this command:

```bash
dpkg-deb --info <file-name>
```

The command `dpkg-deb --info <file-name>` is used to display information about the contents of a `.deb` package without actually installing it. This can be helpful to check what files the package will install and where they will be placed, as well as other metadata about the package.

![[PicoCTF Trivial Flag Transfer Protocol 6.png]]
As seen above, we see a chunk of text under "_Description_" which states that Steghide is [[Steganography]] program which hides bits of a data file in some of the least significant bits of another file in such a way that the existence of the data file is not visible and cannot be proven.

From the above clue about checking out the photos, we can conclude that the flag has been hidden in the photos using [[Steghide]]. 

![[PicoCTF Trivial Flag Transfer Protocol 7.png]]

>[!warning] Passphrase required
>To extract the flag hidden using [[Stegseek]], we must provide a passphrase. It seems like we have not been provided with any. Of course, we can use tools like Stegseek or Stegcracker to brute-force the passphrase.
>
>However, thankfully, upon further inspection, we were actually given the passphrase. 
>
>`I USED THE PROGRAM AND HID IT WITH-DUEDILIGENCE.CHECK OUT THE PHOTOS`
>
>With reference to the message above, the passphrase to extract hidden files in the pictures is `DUEDILIGENCE`. Sneaky.

Let's run the following command on the 3 `.bmp` photos we have downloaded:
```bash
steghide extract -sf < file-name > -p DUEDILIGENCE
```
- `-sf`: Specifies name of the stego file
- `-p`: Specifies passphrase

[[Steghide]] was unable to extract any data from `picture1.bmp` and `picture2.bmp`, but for `picture3.bmp`, a file called `flag.txt` was extracted.

When we `cat` this file, we will be able to see the flag. 


>[!NOTE] Flag
>picoCTF{h1dd3n_1n_pLa1n_51GHT_18375919}

#### References
- _What is TFTP? | Spiceworks_. (2018, April 23). IT Articles. https://www.spiceworks.com/it-articles/what-is-tftp/
- _Trivial File Transfer Protocol_. (2024, July 8). Wikipedia. https://en.wikipedia.org/wiki/Trivial_File_Transfer_Protocol
- How to inspect and validate a deb package before installation? (n.d.). Ask Ubuntu. https://askubuntu.com/questions/642665/how-to-inspect-and-validate-a-deb-package-before-installation
- Alim, A. (2022b, January 24). Steganography — Crack password protected message! - System Weakness. _Medium_. https://systemweakness.com/steganography-crack-password-protected-message-2d91830ba90c