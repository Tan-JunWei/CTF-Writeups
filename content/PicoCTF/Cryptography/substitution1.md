---
tags:
  - Cryptography
  - medium
  - Substitution
Creation Date: 
Last Date: 
References: 
modified: 2024-08-24T22:48:22+08:00
draft: 
---
## Challenge Description

![[PicoCTF substitution1.png]]

For this challenge, we will basically repeat the same steps we did to retrieve the flag for the [[substitution0]] challenge. We first download the file using `wget`, and then run `cat` to see the message.

>[!important] Closely similar challenges
>[[substitution0]], [[substitution1]] and [[substitution2]] are 3 closely similar PicoCTF #Cryptography  challenges.

### The Message
![[PicoCTF substitution1 2.png]]
The encrypted message is as follows:
```
SYTe (eakdy tkd sjbyndr yar thjm) jdr j yobr kt skxbnyrd ersndzyo skxbryzyzkc. Skcyreyjcye jdr bdrercyrq gzya j ery kt sajhhrcmre gazsa yrey yarzd sdrjyzwzyo, yrsaczsjh (jcq mkkmhzcm) evzhhe, jcq bdklhrx-ekhwzcm jlzhzyo. Sajhhrcmre nenjhho skwrd j cnxlrd kt sjyrmkdzre, jcq garc ekhwrq, rjsa ozrhqe j eydzcm (sjhhrq j thjm) gazsa ze enlxzyyrq yk jc kchzcr eskdzcm erdwzsr. SYTe jdr j mdrjy gjo yk hrjdc j gzqr jddjo kt skxbnyrd ersndzyo evzhhe zc j ejtr, hrmjh rcwzdkcxrcy, jcq jdr akeyrq jcq bhjorq lo xjco ersndzyo mdknbe jdkncq yar gkdhq tkd tnc jcq bdjsyzsr. Tkd yaze bdklhrx, yar thjm ze: bzskSYT{TD3UN3CSO_4774SV5_4D3_S001_7JJ384LS}
```

### Decoding the Message
![[PicoCTF substitution1 3.png]]

Using a substitution cipher decoder tool like [this one](https://planetcalc.com/8047/) by [PlanetCalc](https://planetcalc.com/), we can obtain the flag. 

>[!info] PlanetCalc's Substitution Cipher decoder tool
>This online calculator tries to decode substitution cipher without knowing the key. It uses genetic algorithm over text fitness function to break the encoded text. 

That's it! We got our flag...right?? 

Well, actually...no.

>[!bug] Error
>Using the tool mentioned above, we managed to get this string that resembles a flag.
>`PICOCTF{FR3JU3NCY_4774CK5_4R3_C001_7AA384BC}` 
>However, when I tried submitting this string in [PicoCTF](https://picoctf.org/), it states that the flag is incorrect. I attempted to use other online tools, yet I kept receiving the same string. 
>
>In the end, changing the "`J`" in the above string to a "`Q`" solved the problem. Since this was an older [PicoCTF](https://picoctf.org/) challenge, I read through some of the writeups by others and they did encounter the same issue. Perhaps this is the reason why this challenge is only 44% liked.

>[!NOTE] Flag
>PICOCTF{FR3QU3NCY_4774CK5_4R3_C001_7AA384BC}