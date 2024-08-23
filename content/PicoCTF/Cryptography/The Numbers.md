---
tags:
  - Cryptography
  - Python
  - easy
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-23T10:47:11+08:00
---
## Challenge Description

![[PicoCTF The Numbers.png]]

Seems like an interesting challenge. The downloaded file looks like this.
### The numbers
![[PicoCTF The Numbers 2.png]]

>[!question] PicoCTF Hint: The flag is in the format PICOCTF{}
>Now, this is surprising. All the previous challenges have had the same flag format of `picoCTF{...}`.

I realised "P" is the 16th character of the alphabet, and "I" is the 9th. I concluded that the numbers most likely correspond the alphabets' place in the alphabet. After all, the numbers are all within the range of 1 and 26. 

>[!info] Check 
>This also means that the flag will only contain uppercase letters.

### Decryption script
>[!todo]+ Script to obtain the flag
>```
>enc_flag = "16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }"
>
>alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
>
>flag = ""
>
>for i in enc_flag.split():
>    if i.isnumeric():
>        flag += alphabets[int(i)-1]
>    else:
>        flag += i
>
>print(flag)
>```

The above shows the python script I used to convert the numbers into the desired flag format.

 >[!NOTE] Flag
>PICOCTF{THENUMBERSMASON}

