---
tags:
  - GeneralSkills
  - medium
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-08T14:07:47+08:00
---
## Challenge Description

![[PicoCTF PW Crack 3.png]]

Another challenge in the "PW Crack" series! Check out the previous 2 challenges in this series too:

- [[PW Crack 1]]
- [[PW Crack 2]]

We first download the 3 challenge files using `wget <link1> <link2> <link3>`. 

Running `cat` on both `level3.hash.bin` and `level3.flag.txt.enc` displayed gibberish, as expected. Let's dive into the python script provided instead. I used `nano` to do this so that I can fix the code immediately if required. I've attached the full code below.

```python
import hashlib

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

flag_enc = open('level3.flag.txt.enc', 'rb').read()
correct_pw_hash = open('level3.hash.bin', 'rb').read()

def hash_pw(pw_str):
    pw_bytes = bytearray()
    pw_bytes.extend(pw_str.encode())
    m = hashlib.md5()
    m.update(pw_bytes)
    return m.digest()


def level_3_pw_check():
    user_pw = input("Please enter correct password for flag: ")
    user_pw_hash = hash_pw(user_pw)

    if( user_pw_hash == correct_pw_hash ):
		print("Welcome back... your flag, user:")
		decryption = str_xor(flag_enc.decode(), user_pw)
		print(decryption)
	return
    print("That password is incorrect")


level_3_pw_check()

# The strings below are 7 possibilities for the correct password. 
#   (Only 1 is correct)
pos_pw_list = ["f09e", "4dcf", "87ab", "dba8", "752e", "3961", "f159"]
```

When we run this script, we are required to enter the correct password to obtain the flag. The flag will only be revealed once our (hashed) password has been validated. 

>[!warning] So, what's the correct password that we need to submit?
>
>I noticed an interesting section at the bottom of the script provided:
>
>```python
># The strings below are 7 possibilities for the correct password. 
>#   (Only 1 is correct)
>pos_pw_list = ["f09e", "4dcf", "87ab", "dba8", "752e", "3961", "f159"]
>```
>
>There seems to be only 7 possible passwords that we need to try. We can either run the script 7 (or less) times and submit a possible password per try, or use a loop to automate the process.

Of course, I chose the second option.

>[!abstract]+ Full script 
>
>I've commented out the non-essential parts of the original script and only modified the `level_3_pw_check()` function.
>
>```python
>import hashlib
>
># MOVED THIS TO THE TOP
># The strings below are 7 possibilities for the correct password.
>#   (Only 1 is correct)
>pos_pw_list = ["f09e", "4dcf", "87ab", "dba8", "752e", "3961", "f159"]
>
>### THIS FUNCTION WILL NOT HELP YOU FIND THE FLAG --LT ########################
>def str_xor(secret, key):  
>    #extend key to secret length
>    new_key = key
>    i = 0
>    while len(new_key) < len(secret):
>        new_key = new_key + key[i]
>        i = (i + 1) % len(key)        
>    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])
>###############################################################################
>  
>flag_enc = open('level3.flag.txt.enc', 'rb').read()
>correct_pw_hash = open('level3.hash.bin', 'rb').read()
>
>
>def hash_pw(pw_str):
>    pw_bytes = bytearray()
>    pw_bytes.extend(pw_str.encode())
>    m = hashlib.md5()
>    m.update(pw_bytes)
>    return m.digest()
>
>
>def level_3_pw_check():
>    # Challenge wants user to guess the correct password
>   # user_pw = input("Please enter correct password for flag: ")
>  
>    for pos_pw in pos_pw_list:
>        user_pw_hash = hash_pw(pos_pw)
>        if( user_pw_hash == correct_pw_hash ):
>            print(f"The correct password was: {pos_pw}")
>            print("Welcome back... your flag, user:")
>            decryption = str_xor(flag_enc.decode(), pos_pw)
>            print(decryption)
>            return
>        else:
>            print(f"Password `{pos_pw}` is incorrect!")
>
>    # user_pw_hash = hash_pw(user_pw)
>    # if( user_pw_hash == correct_pw_hash ):
>    #         print("Welcome back... your flag, user:")
>    #         decryption = str_xor(flag_enc.decode(), user_pw)
>    #         print(decryption)
>    #         return
>    # print("That password is incorrect")
>
>
>
>level_3_pw_check()
>```

![[PicoCTF PW Crack 3 2.png]]

This is the output when I ran the script again:

```
Password `f09e` is incorrect!
Password `4dcf` is incorrect!
The correct password was: 87ab
Welcome back... your flag, user:
picoCTF{m45h_fl1ng1ng_cd6ed2eb}
```

As you can see, the flag is revealed.

> [!NOTE] Flag
> picoCTF{m45h_fl1ng1ng_cd6ed2eb}
