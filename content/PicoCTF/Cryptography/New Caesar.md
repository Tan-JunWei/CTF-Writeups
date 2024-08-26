---
tags:
  - Cryptography
  - medium
  - Python
  - CaesarCipher
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-26T21:57:46+08:00
---
## Challenge Description
![[PicoCTF New Caesar.png]]

As the name suggests, this challenge revolves around the concept of the caesar cipher.

The downloaded file, `new_caesar.py` is used to encrypt the flag, and the encrypted flag is given in the challenge description:

```
mlnklfnknljflfjljnjijjmmjkmljnjhmhjgjnjjjmmkjjmijhmkjhjpmkmkmljkjijnjpmhmjjgjj
```

>[!abstract]- Script used to encrypt the flag
>The following is how the encryption script, `new_caesar.py` looks like. I have added some comments to understand the code more easily.
>```python
>import string
>
>LOWERCASE_OFFSET = ord("a")
>
>ALPHABET = string.ascii_lowercase[:16]         # Only first 16 alphabets
>
>def b16_encode(plain):
>    enc = ""
>    for c in plain:
>        binary = "{0:08b}".format(ord(c))      # Converts each character to its binary representation, like such: 01110000
>        enc += ALPHABET[int(binary[:4], 2)]    # Converts the 1st half of the binary representation into a decimal, then use it as an index
>        enc += ALPHABET[int(binary[4:], 2)]    # Converts the 2nd half of the binary representation into a decimal, then use it as an index
>    return enc
>
>def shift(c, k):
>    t1 = ord(c) - LOWERCASE_OFFSET 
>    t2 = ord(k) - LOWERCASE_OFFSET
>    return ALPHABET[(t1 + t2) % len(ALPHABET)] # Shift c by the index of k, wrap around using modulo
>
>flag = "REDACTED"
>key = "REDACTED"
>assert all([k in ALPHABET for k in key])       # Checks if the key is in the alphabet
>assert len(key) == 1                           # Checks if the key is only 1 character long
>
>b16 = b16_encode(flag)
>enc = ""
>for i, c in enumerate(b16):
>    enc += shift(c, key[i % len(key)]) 
>print(enc)
>```

So how do we proceed? We currently have 2 unknowns, `flag` and `key`. They have both been replaced with "REDACTED" in the script provided.

>[!tip]+ Decryption Script
>Since we know how the string provided above was encrypted initially, we can come up with a decryption script to reverse engineer the flag.
>```python
>import string
>
>LOWERCASE_OFFSET = ord("a")
>ALPHABET = string.ascii_lowercase[:16]
>
>cipher_text = "mlnklfnknljflfjljnjijjmmjkmljnjhmhjgjnjjjmmkjjmijhmkjhjpmkmkmljkjijnjpmhmjjgjj"
>
>def unshift(c, k):
>    t1 = ord(c) - LOWERCASE_OFFSET
>    t2 = ord(k) - LOWERCASE_OFFSET
>    return ALPHABET[(t1 - t2) % len(ALPHABET)]            # Reverse the shift and return the original character
>
>def b16_decode(enc):
>    flag = ""
>    for i in range(0, len(enc), 2):
>        t1 = "{0:04b}".format(ALPHABET.index(enc[i]))     # Convert first character to 4-bit binary
>        t2 = "{0:04b}".format(ALPHABET.index(enc[i + 1])) # Convert second character to 4-bit binary
>        flag += chr(int(t1 + t2, 2))                      # Concatenate binaries and convert to ASCII character
>    return flag
>
>for k in ALPHABET:                                        # Bruteforcing the key
>    dec = ""
>    for c in cipher_text:
>        dec += unshift(c, k)
>    print(f"Key: {k}, Decrypted: {dec}")
>    print(f"Decoded: {b16_decode(dec)}")
>    print()
>```

This script will allow us to find the flag through a little bruteforcing. Below shows a portion of the output when we run the script.

```
Key: e, Decrypted: ihjghbjgjhfbhbfhfjfeffiifgihfjfdidfcfjfffiigffiefdigfdfligigihfgfefjflidiffcff
Decoded: qQqWYTUVYSRYUXUSS[VTY[RU

Key: f, Decrypted: hgifgaifigeagaegeiedeehhefhgeiechcebeieeehhfeehdechfecekhfhfhgefedeiekhcheebee
Decoded: v`@`FHCDwEvHBrAHDGuDsBuBJuuvECHJrtAD

Key: g, Decrypted: gfhefphehfdpfpdfdhdcddggdegfdhdbgbdadhdddggeddgcdbgedbdjgegegfdedcdhdjgbgddadd
Decoded: et_tu?_5723f4e71a0736d3b1d19dde4279ac03

Key: h, Decrypted: fegdeogdgecoeocecgcbccffcdfecgcafacpcgcccffdccfbcafdcacifdfdfecdcbcgcifafccpcc
Decoded: TcNcd.N$&!"U#T& P/&"%S"Q S (SST#!&(PR/"

Key: i, Decrypted: edfcdnfcfdbndnbdbfbabbeebcedbfbpepbobfbbbeecbbeabpecbpbhececedbcbabfbhepebbobb
Decoded: CR=RS↔=‼§►◄D↕C§▼O▲§◄¶B◄@▼B▼↨BBC↕►§↨OA▲◄
```

As seen, some of the decoded strings are weird-looking. After skimming through the decoded strings, we narrow our options to only 1 possible string.

 >[!NOTE] Flag
>picoCTF{et_tu?_5723f4e71a0736d3b1d19dde4279ac03}