---
tags:
  - Cryptography
  - medium
  - Vigenere
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>Oh no! My French pen pal accidentally encrypted the contents of a few top-secret files, and things took an acidic turn! Now his boss is as sour as vinegar. He only possesses the encryption script and one of those encrypted files, can you help him before the situations becomes even more corrosive?
>
>
>- **Author:** Jun Wei
>- **Category:** crypto
>- **Difficulty:** medium
>- **Discord:** syn3pz
>
>**Hints**
>
>- `How we find the correct key?`  (50 points)
>
>**Files**
>- [[enc.txt]]
>- [[encrypt.py]]

## French Frenzy - Solution

For this challenge, participants are given 2 files:
- `enc.txt`: contains the encrypted flag
- `encrypt.py`: python script used to encrypt the plaintext flag

The plaintext flag is encrypted with the Vigenere cipher (hence the word play on "vinegar"), but with a twist. 

The encryption key is selected randomly from a list that contains 100 cryptographic terms:

```python
possible_keys = [
    "encryption", "decryption", "cipher", "key", "algorithm", 
    "hashing", "plaintext", "ciphertext", "blockchain", "publickey", 
    "blowfish", "signature", "salting", "AES", "RSA", 
    "DiffieHellman", "HMAC", "SSL", "TLS", "hash", 
    "primitiveroot", "DHKE", "premasterkey", "fingerprinting", "token", 
    "pki", "vigenere", "random", "security", "generator", 
    "authentication", "symmetric", "asymmetric", "galoiscountermode", "salt", 
    "modularexponentiation", "XOR", "OR", "SHA", "MD5", 
    "confidentiality", "quantum", "maninmiddle", "multiplicativegroup", "protocol", 
    "integerfactorization", "message", "integrity", "keypair", "initializationvector", 
    "signature", "cryptanalysis", "plaintextattack", "discretelogarithm", "fuzzing", 
    "keyexchange", "password", "bruteforce", "salt", "PKI", 
    "publickeycryptography", "DES", "RNG", "cryptosystem", "substitution", 
    "permutation", "seed", "computationalpower", "lattice", "randomness", 
    "zeroknowledge", "cryptographic", "diffusion", "postquantum", "pairing", 
    "statevector", "hashcollision", "keyspace", "cyclicgroup", "secure", 
    "keysize", "ElGamal", "blockcipher", "enigma", "ciphersuite", 
    "substitutionbox", "cipherblockchaining", "hashfunction", "modulararithmetic", "quantumresistant", 
    "privatekey", "digitalcertificate", "onetimepad", "galoisfield", "ECC", 
    "railfencecipher", "Kuznyechik", "EllipticCurve", "Blake2b", "handshake"
]
```

The script uses the `random` python built-in library to select one of the items in this list. This will be used as the encryption key for the Vigenere cipher.

Participants are required to read and understand the encryption script and create a corresponding decryption script. Below is an example of a working decryption script:

```python
possible_keys = [
    "encryption", "decryption", "cipher", "key", "algorithm", 
    "hashing", "plaintext", "ciphertext", "blockchain", "publickey", 
    "blowfish", "signature", "salting", "AES", "RSA", 
    "DiffieHellman", "HMAC", "SSL", "TLS", "hash", 
    "primitiveroot", "DHKE", "premasterkey", "fingerprinting", "token", 
    "pki", "vigenere", "random", "security", "generator", 
    "authentication", "symmetric", "asymmetric", "galoiscountermode", "salt", 
    "modularexponentiation", "XOR", "OR", "SHA", "MD5", 
    "confidentiality", "quantum", "maninmiddle", "multiplicativegroup", "protocol", 
    "integerfactorization", "message", "integrity", "keypair", "initializationvector", 
    "signature", "cryptanalysis", "plaintextattack", "discretelogarithm", "fuzzing", 
    "keyexchange", "password", "bruteforce", "salt", "PKI", 
    "publickeycryptography", "DES", "RNG", "cryptosystem", "substitution", 
    "permutation", "seed", "computationalpower", "lattice", "randomness", 
    "zeroknowledge", "cryptographic", "diffusion", "postquantum", "pairing", 
    "statevector", "hashcollision", "keyspace", "cyclicgroup", "secure", 
    "keysize", "ElGamal", "blockcipher", "enigma", "ciphersuite", 
    "substitutionbox", "cipherblockchaining", "hashfunction", "modulararithmetic", "quantumresistant", 
    "privatekey", "digitalcertificate", "onetimepad", "galoisfield", "ECC", 
    "railfencecipher", "Kuznyechik", "EllipticCurve", "Blake2b", "handshake"
]

def gen_key(msg, key):
    key = list(key)
    if len(msg) == len(key):
        return key
    else:
        for i in range(len(msg) - len(key)):
            key.append(key[i % len(key)])
    return "".join(key)

def dec(msg, key):
    decrypted_text = []
    key = gen_key(msg, key)
    for i in range(len(msg)):
        char = msg[i]
        if char.isupper():
            decrypted_char = chr((ord(char) - ord(key[i]) + 26) % 26 + ord('A'))
        elif char.islower():
            decrypted_char = chr((ord(char) - ord(key[i]) + 26) % 26 + ord('a'))
        else:
            decrypted_char = char
        decrypted_text.append(decrypted_char)
    return "".join(decrypted_text)

with open("enc.txt", "r") as f:
    ciphertext = f.read().strip()
    for key in possible_keys:
        decrypted_text = dec(ciphertext, key)
        print(f"Decrypted Text: {decrypted_text}")
        if "YCEP25" in decrypted_text:
            print(f"Key: {key}")
            print(f"Flag found: {decrypted_text}")
            break
```

```bash
Key: ElGamal
Flag found: YCEP25{1s_th1s_4_r34lly_s3cur3_3ncrypt10n_a1g0r1thm}
```

The random key that was used to encrypt the plaintext flag was `ElGamal`. As long as the decryption scripts that the participants create themselves work, they should be able to retrieve the flag.

Flag: `YCEP25{1s_th1s_4_r34lly_s3cur3_3ncrypt10n_a1g0r1thm}`