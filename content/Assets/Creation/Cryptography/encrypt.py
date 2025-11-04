import random

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

def enc(msg, key):
    encrypted_text = []
    key = gen_key(msg, key)

    for i in range(len(msg)):
        char = msg[i]
        if char.isupper():
            encrypted_char = chr((ord(char) + ord(key[i]) - 2 * ord('A')) % 26 + ord('A'))
        elif char.islower():
            encrypted_char = chr((ord(char) + ord(key[i]) - 2 * ord('a')) % 26 + ord('a'))
        else:
            encrypted_char = char
        encrypted_text.append(encrypted_char)
    return "".join(encrypted_text)

# plaintext = <ACTUAL FLAG>
key = random.choice(possible_keys)
output_file = "enc.txt"

ciphertext = enc(plaintext, key)
print(f"Encrypted Text: {ciphertext}")
with open(output_file, "w") as f:
    f.write(ciphertext)
    print(f"Encrypted Text saved to {output_file}")

