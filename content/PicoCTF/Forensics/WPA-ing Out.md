---
tags:
  - Forensics
  - medium
  - Wireshark
  - aircrack-ng
Creation Date: 2024-08-28
Last Date: 2024-08-28
References: 
draft: 
modified: 2024-08-29T11:06:05+08:00
---
## Challenge Description
![[PicoCTF WPA-ing Out.png]]

This is an interesting challenge, as we are trying to crack the WPA password of a wireless network, by using a common password list `rockyou.txt`. 

>[!info] `rockyou.txt`
>`rockyou.txt` contains over 14 million unique passwords. It is commonly used in password bruteforce attacks. 
>
>For more information about `rockyou.txt`, you can check out [this page](https://www.keepersecurity.com/blog/2023/08/04/understanding-rockyou-txt-a-tool-for-security-and-a-weapon-for-hackers/), which talks about the history of `rockyou.txt`, and how it is used by Cybersecurity professionals and cybercriminals alike. 

>[!tip] WPA
>Wi-Fi Protected Access (WPA) is a security standard for computing devices equipped with wireless internet connections (Gillis, 2022). 
>
>[This page](https://www.techtarget.com/searchmobilecomputing/definition/Wi-Fi-Protected-Access) provides a good description of WPA, why and when it is used, and more.

### Downloaded file
![[PicoCTF WPA-ing Out 2.png]]

We first begin by downloading the `wpa-ing_out.pcap` file. I proceeded to open it in [[Wireshark]], and observed that this file contains 23523 packets from an internal network. 

### Cracking the password
To crack the password of password of a wireless network like this by using a common password list, we can run this command:

```bash
aircrack-ng -w < path-to-word-list > < file-name >
```

Using this command, I was able to successfully crack the password. The output is displayed below:

```bash
┌──(kali㉿kali)-[~/Desktop/picoCTF/forensics/wpa-ing_out]
└─$ aircrack-ng -w ../../../../../../usr/share/wordlists/rockyou.txt wpa-ing_out.pcap
Reading packets, please wait...
Opening wpa-ing_out.pcap
Resetting EAPOL Handshake decoder state.
Resetting EAPOL Handshake decoder state.
Read 23523 packets.

   #  BSSID              ESSID                     Encryption

   1  00:5F:67:4F:6A:1A  Gone_Surfing              WPA (1 handshake)

Choosing first network as target.

Reading packets, please wait...
Opening wpa-ing_out.pcap
Resetting EAPOL Handshake decoder state.
Resetting EAPOL Handshake decoder state.
Read 23523 packets.

1 potential targets










                               Aircrack-ng 1.7 

      [00:00:01] 1262/10303727 keys tested (1489.64 k/s) 

      Time left: 1 hour, 55 minutes, 16 seconds                  0.01%

                          KEY FOUND! [ mickeymouse ]


      Master Key     : 61 64 B9 5E FC 6F 41 70 70 81 F6 40 80 9F AF B1 
                       4A 9E C5 C4 E1 67 B8 AB 58 E3 E8 8E E6 66 EB 11 

      Transient Key  : 90 63 ED C6 BB 8A 59 D1 A5 E8 B4 6F 2F 89 66 C2 
                       0B D4 FC 62 37 2F 54 3B 7B B4 43 9B 37 F4 57 40 
                       FD D1 91 86 7F FE 26 85 7B AC DD 2C 44 E6 06 18 
                       03 B0 0F F2 75 A2 32 63 F7 35 74 2D 18 10 1C 25 

      EAPOL HMAC     : 65 2F 6C 0E 75 F0 49 27 6A AA 6A 06 A7 24 B9 A9
```

### Submitting the flag
As shown above, the cracked password is "mickeymouse". We can wrap it with `picoCTF{}` to submit it. 

> [!NOTE] Flag
> picoCTF{mickeymouse}
#### References
- Gillis, A. S. (2022, December 2). _Wi-Fi Protected Access (WPA)_. Mobile Computing. https://www.techtarget.com/searchmobilecomputing/definition/Wi-Fi-Protected-Access
- Jester, T., & Jester, T. (2024, February 23). _Understanding RockYou.txt: A Tool for Security and a Weapon for Hackers_. Keeper Security Blog - Cybersecurity News & Product Updates. https://www.keepersecurity.com/blog/2023/08/04/understanding-rockyou-txt-a-tool-for-security-and-a-weapon-for-hackers/