---
tags:
  - GeneralSkills
  - easy
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-05T21:26:25+08:00
---
## Challenge Description
![[PicoCTF PW Crack1.png]]

Currently, all we know is that we are provided with a password checker file and an encrypted flag file which we can download with `wget <link>`. Perhaps we need to decrypt the flag and submit it as a password in the password checker?

### Understanding the challenge
![[PicoCTF PW Crack 1 2.png]]

When I tried to `cat` the encrypted flag, all I got was gibberish. I do not have any clue on how I can decrypt this to get the flag.

![[PicoCTF PW Crack 1 3.png]]

I proceeded to `cat` password checker file, which was a python script named `level1.py`. After doing this, the approach to get the flag became clear. 

In a nutshell, this python script asks a user for a password and validates it. If the input is correct, the flag will be printed. The following shows the function that handles the validation of the password:

```python
def level_1_pw_check():
    user_pw = input("Please enter correct password for flag: ")
    if( user_pw == "1e1a"):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")
```
Noticed something? We are given the password that we need to use as input, "`1e1a`".

After running this script with `python level1.py` and entering the correct input, the flag was displayed on screen. 

> [!NOTE] Flag
> picoCTF{545h_r1ng1ng_fa343060}