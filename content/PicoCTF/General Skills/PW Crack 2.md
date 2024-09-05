---
tags:
  - GeneralSkills
  - easy
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-05T17:34:34+08:00
---
## Challenge Description
![[PW Crack 2.png]]

This challenge approach is really similar to that of the [[PW Crack 1]] challenge. We just have to input the correct password and we get our flag. There is only a minor modification in this challenge compared to the previous one.
### How does the password checker work in this challenge?
![[PicoCTF PW Crack 2 2.png]]

In the [[PW Crack 1]] challenge, the password we need to enter was given to us in a very straightforward manner. We can copy and paste the password and be given the flag easily. 

After downloading the file using `wget`, I proceed to `cat` its contents. It can be observed that the password we need to enter is `chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36)`.

>[!tip] What does `chr()` do?
>The `chr()` function returns the character that represents the specified unicode.
>
>For example, chr(97) allows us to get the character that represents the unicode 97.

Since this is a python function, we can just display the correct password by running `nano` and adding a single line of code. 

### Modifying the given script
![[PicoCTF PW Crack 2 3.png]]

I simply added this line `print(chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36))` before the program asks me for the input, so that I can copy the correct password and enter it to get my flag. I've attached the full code below as well.

```python
### THIS FUNCTION WILL NOT HELP YOU FIND THE FLAG --LT ########################
def str_xor(secret, key):
    #extend key to secret length
    new_key = key
    i = 0
    while len(new_key) < len(secret):
        new_key = new_key + key[i]
        i = (i + 1) % len(key)        
    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])
###############################################################################

flag_enc = open('level2.flag.txt.enc', 'rb').read()



def level_2_pw_check():
    print(chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36)) # The only line I added
    user_pw = input("Please enter correct password for flag: ")
    if( user_pw == chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36) ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")



level_2_pw_check()
```

![[PicoCTF PW Crack 2 4.png]]

After modifying the script, I simply ran the script using `python level2.py`. The correct password I had to enter was `de76`. Submitting this got me the flag. 

> [!NOTE] Flag
> picoCTF{tr45h_51ng1ng_489dea9a}
#### References
- _W3Schools.com_. (n.d.). https://www.w3schools.com/python/ref_func_chr.asp