---
tags:
  - GeneralSkills
  - medium
  - Python
  - PWcrack
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-09T11:34:12+08:00
---
## Challenge Description

![[PicoCTF PW Crack 5.png]]

This is the final challenge of the "PW Crack" challenge series. What a journey it has been! 

In this challenge, we will be cracking a password using a [dictionary attack](https://www.rapid7.com/fundamentals/brute-force-and-dictionary-attacks/#:~:text=Dictionary%20attack%20definition%3A,used%20by%20businesses%20and%20individuals.%E2%80%9D), which is a brute-force approach.

### Understanding the challenge
![[PicoCTF PW Crack 5 2.png]]

We begin by downloading the 4 challenge files using `wget <link1> <link2> <link3> <link4>`. Like the other "PW Crack" challenges, running `cat` on the `flag.txt.enc` and `hash.bin` files only displayed gibberish as expected.

>[!faq] What makes PW Crack 5 different from the earlier challenges?
>
>For the previous challenges, we are always given some sort of clue within the Python file. It may contain the actual password, or a list of potential passwords. However, when I inspected the `level5.py` script (included below) using `nano`, it did not provide any hints. 
>
>The script only contained the functions to convert the contents of the 2 files above (`flag.txt.enc` and `hash.bin`) into the flag, similar to the previous challenges. 
>
>For this challenge, we are instead provided with a unique `dictionary.txt` file instead of a list of potential passwords in the Python script, like in [[PW Crack 3]] and [[PW Crack 4]].

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

flag_enc = open('level5.flag.txt.enc', 'rb').read()
correct_pw_hash = open('level5.hash.bin', 'rb').read()


def hash_pw(pw_str):
    pw_bytes = bytearray()
    pw_bytes.extend(pw_str.encode())
    m = hashlib.md5()
    m.update(pw_bytes)
    return m.digest()


def level_5_pw_check():
    user_pw = input("Please enter correct password for flag: ")
    user_pw_hash = hash_pw(user_pw)
    
    if( user_pw_hash == correct_pw_hash ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")



level_5_pw_check()
```
#### References
- _Brute-Force & Dictionary attacks: Definition and prevention_. Rapid7. (n.d.). https://www.rapid7.com/fundamentals/brute-force-and-dictionary-attacks/#:~:text=Dictionary%20attack%20definition%3A,used%20by%20businesses%20and%20individuals.%E2%80%9D