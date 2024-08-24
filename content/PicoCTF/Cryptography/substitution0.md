---
tags:
  - Cryptography
  - medium
  - Substitution
Creation Date: 
Last Date: 
modified: 2024-08-24T22:54:53+08:00
References: 
draft: 
---
## Challenge Description
![[PicoCTF substitution 0.png]]

As the description suggests, we will likely have to decode a message which was encrypted using substitution cipher. We first download the file using `wget`, and then run `cat` to see the message.

>[!important] Closely similar challenges
>[[substitution0]], [[substitution1]] and [[substitution2]] are 3 closely similar PicoCTF [[PicoCTF Writeups#Cryptography|Cryptography]] challenges.
### The Message
![[PicoCTF substitution 0 2.png]]

Running `cat` displays the encrypted message:
```
ZGSOCXPQUYHMILERVTBWNAFJDK 

Qctcnrel Mcptzlo ztebc, fuwq z ptzac zlo bwzwcmd zut, zlo gtenpqw ic wqc gccwmc
xtei z pmzbb szbc ul fqusq uw fzb clsmebco. Uw fzb z gcznwuxnm bsztzgzcnb, zlo, zw
wqzw wuic, nlhlefl we lzwntzmubwb—ex sentbc z ptczw rtukc ul z bsuclwuxus reulw
ex aucf. Wqctc fctc wfe tenlo gmzsh brewb lczt elc cjwtciuwd ex wqc gzsh, zlo z
melp elc lczt wqc ewqct. Wqc bszmcb fctc cjsccoulpmd qzto zlo pmebbd, fuwq zmm wqc
zrrcztzlsc ex gntlubqco pemo. Wqc fcupqw ex wqc ulbcsw fzb actd tcizthzgmc, zlo,
wzhulp zmm wqulpb ulwe selbuoctzwuel, U senmo qztomd gmzic Ynruwct xet qub eruluel
tcbrcswulp uw.

Wqc xmzp ub: ruseSWX{5NG5717N710L_3A0MN710L_357GX9XX} 
```

### Decoding the Message
![[PicoCTF substitution 0 3.png]]
Using a substitution cipher decoder tool like [this one](https://planetcalc.com/8047/) by [PlanetCalc](https://planetcalc.com/), we can obtain the flag. 

>[!info] PlanetCalc's Substitution Cipher decoder tool
>This online calculator tries to decode substitution cipher without knowing the key. It uses genetic algorithm over text fitness function to break the encoded text. 

Hence, there was no need to even provide the key as input since I used this tool. 

>[!NOTE] Flag
>PICOCTF{5UB5717U710N_3V0LU710N_357BF9FF}