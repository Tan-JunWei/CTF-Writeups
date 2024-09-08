---
tags:
  - GeneralSkills
  - medium
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-08T12:05:32+08:00
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

I noticed an interesting section at the bottom of the script provided.

```python

```

![[PicoCTF PW Crack 3 2.png]]
