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



