---
tags:
  - GeneralSkills
  - easy
  - base64
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-04T22:34:38+08:00
---
## Challenge Description
![[PicoCTF repetitions.png]]

Hmmm... the challenge name "repetitions" implies that we will be doing something repeatedly. 

>[!question] PicoCTF Hint: Multiple decoding is always good.

Could our task be decoding a string repeatedly? Let's find out!

![[PicoCTF repetitions 2.png]]

We are only provided with one file, `enc_flag`. Running `file enc_flag` shows that it is a file containing ASCII text. We display its contents by using `cat`: 

```
VmpGU1EyRXlUWGxTYmxKVVYwZFNWbGxyV21GV1JteDBUbFpPYWxKdFVsaFpWVlUxWVZaS1ZWWnVh
RmRXZWtab1dWWmtSMk5yTlZWWApiVVpUVm10d1VWZFdVa2RpYlZaWFZtNVdVZ3BpU0VKeldWUkNk
MlZXVlhoWGJYQk9VbFJXU0ZkcVRuTldaM0JZVWpGS2VWWkdaSGRXCk1sWnpWV3hhVm1KRk5XOVVW
VkpEVGxaYVdFMVhSbFZrTTBKVVZXcE9VazFXV2toT1dHUllDbUY2UWpSWk1GWlhWa2RHZEdWRlZs
aGkKYlRrelZERldUMkpzUWxWTlJYTkxDZz09Cg==
```

Notice something? There are 2 equal signs ("`=`") at the end of this string of characters. This drew my attention, as equal signs ("`=`") are the padding characters used in [[Base64]] encoding. This, in addition to the characters in the string, led me to believe that the string has been encoded using [[Base64]].

I used [[CyberChef]] to try to this decode this string. This is because the challenge implied that the flag has been encoded multiple times. I did not know how the decoded base64 output was encoded, and decided that [[CyberChef]] would be the best tool to use here, since it can analyse the output and recommend methods to further decode the results.

Well... yes and no. It turns out that the flag had been encoded using [[Base64]] six times! While [[CyberChef]] did recommend me to decode using base64 again and again, it was not what I expected. I initially thought that the string would be encoded using different encoding techniques instead. 

![[PicoCTF repetitions 3.png]]

However, [[CyberChef]] still proved to be a very useful tool for this challenge, and allowed me to get the flag easily.

> [!NOTE] Flag
> picoCTF{base64_n3st3d_dic0d!n8_d0wnl04d3d_492767d2}
