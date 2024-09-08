---
tags:
  - GeneralSkills
  - medium
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-08T21:37:24+08:00
---
## Challenge Description

![[PicoCTF PW Crack 4.png]]

The 4th addition to the "PW Crack" challenge series! How exciting!

Check out the previous challenges if you're interested:
- [[PW Crack 1]]
- [[PW Crack 2]]
- [[PW Crack 3]]

### Downloaded files
![[PicoCTF PW Crack 4 2.png]]

In this challenge, we are provided with 3 files, as usual. The files, in no particular order, are `level4.flag.txt.enc`, `level4.hash.bin` and `level4.py`. 

Like in the previous "PW Crack" challenges, gibberish is displayed when we run `cat` on the `flag.txt.enc` and `hash.bin` files. The Python script contains the most important clues.

### What's the password in this challenge
![[PicoCTF PW Crack 4 3.png]]

The major similarity in all "PW Crack" challenges is that we are only awarded the flag after the correct password has been submitted into the `pw_check()` function. 

>[!info]+ How can we find the correct password?
>
>The above functions in the Python script will always work as expected, so I only zoomed into the `level_4_pw_check()` function and the lines below. 
>
>Interestingly, this challenge is extremely similar to [[PW Crack 3]] challenge. However, in the previous challenge, we are provided with 7 possible passwords to attempt. This challenge gives us 100.
>
>The approach is similar; I'm still going to iterate through the list of possible passwords with a `for` loop.
>
>```python
>import hashlib
>
>### THIS FUNCTION WILL NOT HELP YOU FIND THE FLAG --LT ########################
>def str_xor(secret, key):
>    #extend key to secret length
>    new_key = key
>    i = 0
>    while len(new_key) < len(secret):
>        new_key = new_key + key[i]
>        i = (i + 1) % len(key)        
>    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])
>###############################################################################
>
>flag_enc = open('level4.flag.txt.enc', 'rb').read()
>correct_pw_hash = open('level4.hash.bin', 'rb').read()
>
>
>def hash_pw(pw_str):
>    pw_bytes = bytearray()
>    pw_bytes.extend(pw_str.encode())
>    m = hashlib.md5()
>    m.update(pw_bytes)
>    return m.digest()
>
>
>def level_4_pw_check(user_pw):
>    # user_pw = input("Please enter correct password for flag: ")
>    user_pw_hash = hash_pw(user_pw)
>    
>    if( user_pw_hash == correct_pw_hash ):
>        print("Welcome back... your flag, user:")
>        decryption = str_xor(flag_enc.decode(), user_pw)
>        print(decryption)
>        return True
>
>
># The strings below are 100 possibilities for the correct password. 
>#   (Only 1 is correct)
>pos_pw_list = ["8c86", "7692", "a519", "3e61", "7dd6", "8919", "aaea", "f34b", "d9a2", "39f7", "626b", "dc78", "2a98", "7a85", "cd15", "80fa", "8571", "2f8a", "2ca6", "7e6b", "9c52", "7423", "a42c", "7da0", "95ab", "7de8", "6537", "ba1e", "4fd4", "20a0", "8a28", "2801", "2c9a", "4eb1", "22a5", "c07b", "1f39", "72bd", "97e9", "affc", "4e41", "d039", "5d30", "d13f", "c264", "c8be", "2221", "37ea", "ca5f", "fa6b", "5ada", "607a", "e469", "5681", "e0a4", "60aa", "d8f8", "8f35", "9474", "be73", "ef80", "ea43", "9f9e", "77d7", "d766", "55a0", "dc2d", "a970", "df5d", "e747", "dc69", "cc89", "e59a", "4f68", "14ff", "7928", "36b9", "eac6", "5c87", "da48", "5c1d", "9f63", "8b30", "5534", "2434", "4a82", "d72c", "9b6b", "73c5", "1bcf", "c739", "6c31", "e138", "9e77", "ace1", "2ede", "32e0", "3694", "fc92", "a7e2"]
>
>for i in range(100):
>    if level_4_pw_check(pos_pw_list[i]):
>        print(f"'{pos_pw_list[i]}' was the correct password ({i+1} out of 100)")
>        break
>
>```

### Running the script to get the flag
![[PicoCTF PW Crack 4 4.png]]

After modifying the provided script, running it will display the flag. Additionally, the output reveals that the correct password was actually the 82nd password in the provided list of possible passwords.

> [!NOTE] Flag
> picoCTF{fl45h_5pr1ng1ng_d770d48c}

