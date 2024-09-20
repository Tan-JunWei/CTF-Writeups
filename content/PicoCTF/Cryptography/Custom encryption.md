---
tags:
  - Cryptography
  - medium
  - Python
  - XOR
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-20T11:42:05+08:00
---
## Challenge Description

![[PicoCTF Custom encryption.png]]

In this challenge, we will attempt to decode the contents of the given file that has been encrypted with a Python script.

We first begin by downloading the 2 files, `enc_flag` and `custom_encryption.py`, by running `wget <link1> <link2>`.

![[PicoCTF Custom encryption 2.png]]

I proceeding to use `cat` to display the contents of `enc_flag` file:

```
a = 97
b = 22
cipher is: [151146, 1158786, 1276344, 1360314, 1427490, 1377108, 1074816, 1074816, 386262, 705348, 0, 1393902, 352674, 83970, 1141992, 0, 369468, 1444284, 16794, 1041228, 403056, 453438, 100764, 100764, 285498, 100764, 436644, 856494, 537408, 822906, 436644, 117558, 201528, 285498]
```

We see that there are 2 variables given, `a` and `b`. There's also a list of seemingly random numbers. 

To understand the contents of this file, we need to check the Python script provided, which I've included below as well:

```python
from random import randint
import sys


def generator(g, x, p):
    return pow(g, x) % p


def encrypt(plaintext, key):
    cipher = []
    for char in plaintext:
        cipher.append(((ord(char) * key*311)))
    return cipher


def is_prime(p):
    v = 0
    for i in range(2, p + 1):
        if p % i == 0:
            v = v + 1
    if v > 1:
        return False
    else:
        return True


def dynamic_xor_encrypt(plaintext, text_key):
    cipher_text = ""
    key_length = len(text_key)
    for i, char in enumerate(plaintext[::-1]):
        key_char = text_key[i % key_length]
        encrypted_char = chr(ord(char) ^ ord(key_char))
        cipher_text += encrypted_char
    return cipher_text


def test(plain_text, text_key):
    p = 97
    g = 31
    if not is_prime(p) and not is_prime(g):
        print("Enter prime numbers")
        return
    a = randint(p-10, p)
    b = randint(g-10, g)
    print(f"a = {a}")
    print(f"b = {b}")
    u = generator(g, a, p)
    v = generator(g, b, p)
    key = generator(v, a, p)
    b_key = generator(u, b, p)
    shared_key = None
    if key == b_key:
        shared_key = key
    else:
        print("Invalid key")
        return
    semi_cipher = dynamic_xor_encrypt(plain_text, text_key)
    cipher = encrypt(semi_cipher, shared_key)
    print(f'cipher is: {cipher}')


if __name__ == "__main__":
    message = sys.argv[1]
    test(message, "trudeau")

```

There are a total of 5 functions used to encrypt the original flag. After reading the code, we will understand why the values of `a` and `b` were given. It's because `a` and `b` are random values between **87 - 97** and **21 - 31** respectively. 

We are also given the list of numbers named "`cipher`" as we will need to do some reverse-engineering using these values to find the original flag.

To decode the encrypted file contents of `enc_flag`, I wrote this Python script:

```python
'''
p = 97
g = 31

a = 97 (random number from p-10 to p, both included)
b = 22 (random number from g-10 to g, both included)

u = g^a mod p
u = 31

v = g^b mod p
v = 54

key = v^a mod p
key = 54

b_key = u^b mod p
b_key = 54

So, shared_key = key = b_key = 54

semi_cipher = dynamic_xor_encrypt(flag, "trudeau")
cipher = encrypt(semi_cipher, shared_key)
'''
cipher = [151146, 1158786, 1276344, 1360314, 1427490, 1377108, 1074816, 1074816, 386262, 705348, 0, 
          1393902, 352674, 83970, 1141992, 0, 369468, 1444284, 16794, 1041228, 403056, 453438, 100764, 
          100764, 285498, 100764, 436644, 856494, 537408, 822906, 436644, 117558, 201528, 285498]

def decrypt_semi_flag(key):
    semi_flag = ""
    for chr_cipher in cipher:
        x = chr(chr_cipher // (key*311))
        semi_flag += x
    return semi_flag

def dynamic_xor_decrypt(semi_flag, key): 
    flag = ""
    key_length = len(key)
    for i, char in enumerate(semi_flag):
        key_char = key[i % key_length]
        decrypted_char = chr(ord(char) ^ ord(key_char))
        flag += decrypted_char
    return flag

semi_flag = decrypt_semi_flag(54)
flag = dynamic_xor_decrypt(semi_flag, "trudeau")
print(flag[::-1]) # unreverse the flag
```

Running this script allows us to retrieve the flag.

> [!NOTE] Flag
> picoCTF{custom_d2cr0pt6d_e4530597}