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
modified: 2024-09-09T12:03:37+08:00
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

We know that we will have to make changes to the provided script, but how should we go about doing it? Let's first understand the contents of the `dictionary.txt` file.
### `dictionary.txt`

![[PicoCTF PW Crack 5 3.png]]

To check the contents of `dictionary.txt`, I ran `cat dictionary.txt | head`. 

Piping the contents through `head` will only display the first 10 lines of the file, limiting the output. The first 10 lines of the file is enough for us to understanding what we're dealing with.

It seems that the passwords in this file all have a length of 4. In fact, if we run `cat dictionary.txt | tail` as well, we will see this output:

```bash
┌──(kali㉿kali)-[~/Desktop/picoCTF/general_skills/PW_crack_5]
└─$ cat dictionary.txt| tail     
fff6
fff7
fff8
fff9
fffa
fffb
fffc
fffd
fffe
ffff
```

With this information, we know that the passwords in this list are all in hexadecimal representation. If we go 1 step further, we will realise that when we convert to decimal representation, `0000` is 0 and `ffff` is 65535 respectively.

This means that this password dictionary contains a total of 65536 passwords, and each password is on its own separate line. We can confirm this by running `wc -l dictionary.txt` or `cat dictionary.txt | wc -l`. 

>[!info] What does `wc -l` do?
>
>This command will display the total number of lines in a specified file. 
>- `-l`: print the newline counts (basically total number of lines)
>  
>There are other useful arguments for this command, such as `-w` which displays the total number of words in a file.

### Modifying the script
![[PicoCTF PW Crack 5 4.png]]

Since I now know how the `dictionary.txt` file looks like, I will modify the script given to iterate through the 65536 possible passwords in the dictionary in order to find the correct password. 

To do this, I will only need to modify the bottom section of the script and implement a loop. When the correct password is found, the flag should be revealed instantly.

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


def level_5_pw_check(password):
    # user_pw = input("Please enter correct password for flag: ")
    user_pw_hash = hash_pw(password)
    
    if( user_pw_hash == correct_pw_hash ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), password)
        print(decryption)
        return True
    # print("That password is incorrect")


with open("dictionary.txt", "r") as pw_dict:
    count = 0
    for possible_password in pw_dict:
        count += 1
        if level_5_pw_check(possible_password.strip()):
            print(f"The correct password was {possible_password}({count}/65536)")
```

I've attached the script above as well. Running the script will display which was the correct password out of the 65536 potential passwords, as well as the flag.

```bash
┌──(kali㉿kali)-[~/Desktop/picoCTF/general_skills/PW_crack_5]
└─$ python level5.py 
Welcome back... your flag, user:
picoCTF{h45h_sl1ng1ng_40f26f81}
The correct password was 7e5f
(32352/65536)
```

> [!NOTE] Flag
> picoCTF{h45h_sl1ng1ng_40f26f81}

#### References
- _Brute-Force & Dictionary attacks: Definition and prevention_. Rapid7. (n.d.). https://www.rapid7.com/fundamentals/brute-force-and-dictionary-attacks/#:~:text=Dictionary%20attack%20definition%3A,used%20by%20businesses%20and%20individuals.%E2%80%9D