---
tags:
  - Forensics
  - medium
  - base64
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-19T15:23:40+08:00
---
## Challenge Description 

![[PicoCTF FindAndOpen.png]]

We are provided with a `flag.zip` file and a `dump.pcap` file. The `flag.zip` file is password protected, as displayed below. 

![[PicoCTF FIndAndOpen 2.png]]

>[!question] PicoCTF Hint: Download the pcap and look for the password or flag.

With the above hint, I ran `strings dump.pcap` to have a quick glimpse of what's going on in the `pcap` file. 

### Suspicious strings
>[!important] I identified 5 suspicious strings that are worth paying attention to: 
>1. Flying on Ethernet secret: Is this the flag
>2. iBwaWNvQ1RGe1Could the flag have been splitted?  
>3. AABBHHPJGTFRLKVGhpcyBpcyB0aGUgc2VjcmV0OiBwaWNvQ1RGe1IzNERJTkdfTE9LZF8=  
>4. PBwaWUvQ1RGesabababkjaASKBKSBACVVAVSDDSSSSDSKJBJS  
>5. PBwaWUvQ1RGe1Maybe try checking the other file

Of the 5 strings, I zoomed into string 3 first. It seems like a [[Base64]] encoded string, with a padding character `=` at the end. I immediately went to [[CyberChef]] to try to decode from `Base64`.  

### CyberChef Base64 Decoding
![[PicoCTF FindAndOpen 3.png]]

All I got was gibberish. However, I noticed that this string has a length of 70.

>[!important] During encoding, the [[Base64]] algorithm replaces each three bytes with four bytes and, if necessary, adds padding characters, so the result will always be a multiple of four (_What Is Base64? | Learn | Base64_, n.d.). 

This meant that I will have to delete 2 characters from the input string. I first tried to remove 2 characters from the front. 

![[PicoCTF FindAndOpen 4.png]]

It worked! We now have the flag ...right? Well, no. It turns out that this is just half the flag. From `string 2 "iBwaWNvQ1RGe1Could the flag have been splitted? "`  earlier, the challenge hints that the first "flag" we obtain may not be the full one. 

I then tried to use our "half flag" to unzip the password protected `flag.zip`, and obtained the actual flag. 

![[PicoCTF FindAndOpen 5.png]]

> [!NOTE] Flag
> picoCTF{R34DING_LOKd_fil56_succ3ss_b98dda6a}



_What is Base64? | Learn | Base64_. (n.d.). https://base64.guru/learn/what-is-base64#:~:text=During%20encoding%2C%20the%20Base64%20algorithm,larger%20than%20the%20original%20data.