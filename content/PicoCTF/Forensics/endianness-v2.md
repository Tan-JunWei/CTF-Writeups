---
tags:
  - Forensics
  - medium
  - Endianness
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-19T20:49:47+08:00
---
## Challenge Description
![[PicoCTF endianness-v2.png]]

Welcome to another challenge about endianness. I have done a challenge related to Big-Endian and Little-Endian systems before, which you can check out here: [[endianness]]

Without further ado, let's dive into this challenge.

![[PicoCTF endianness-v2 2.png]]

We first download the challenge file provided using `wget`. The challenge file is named `challengefile`. 

>[!question] What type of file is it?
>
>The file provided did not have any file extension. From the challenge description above, it is stated that "We're not even sure what type of file it is." 
>
>Seems like the first step of our challenge is to determine which type of file the provided file is, or is supposed to be.

### Comparison

We can do this by running `hexedit` or `xxd`. This time, I ran `xxd challengefile | head` to only show the first 10 lines of the hexadecimal data of the file. This is because I wanted to compare the file header of `challengefile` with some known file signatures. 

The first line of the output is shown below:

```
e0 ff d8 ff 46 4a 10 00 01 00 46 49 01 00 00 01
```

>[!bug] Possibility of distorted file signature provided
>
>As we know, the challenge is about endianness, which is basically the order in which bytes are arranged in computer memory. 
>
>This means that the file header of `challengefile` may be "reversed". We have to keep this in mind when we compare the possible file signatures.

![[PicoCTF endianness-v2 file headers.png]]

For this challenge, I used the [list of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures) on wikipedia for comparison. The file header of `challengefile` matches the `jpg` file signature. 

I have included both hex file headers for comparison below:

```
E0 FF D8 FF 46 4A 10 00 01 00 46 49
```

```
FF D8 FF E0 00 10 4A 46 49 46 00 01
```

Noticed something? Let's take the first 32-bit chunk of both file headers as example.

**`E0 FF D8 FF`** is the reverse of **`FF D8 FF E0`**. 

>[!info] Endianness
>**Big-endian** stores the most significant byte first (as it appears in **`FF D8 FF E0`**). **Little-endian** stores the least significant byte first, which results in the reversed order **`E0 FF D8 FF`**.

So, our task is to reverse the order of the bytes for every 32-bit chunk. I used to a Python script (shown below) to do this, and create a new `jpg` file named "`solved.jpg`".

```python
new_hex = ""

with open("challengefile", "rb") as file:
    hexdata = file.read().hex()

hex_chunks = [hexdata[i:i+8] for i in range(0, len(hexdata), 8)]

for chunk in hex_chunks:
    for i in range(len(chunk)-2,-1,-2):
        new_hex += chunk[i] + chunk[i+1]

with open("solved.jpg", "wb") as file:
    file.write(bytes.fromhex(new_hex))

print("File created successfully")
```

After creating the `solved.jpg` file, we can open it to claim the flag.

![[PicoCTF endianness-v2 3.png]]


> [!NOTE] Flag
> picoCTF{cert!f1Ed_iNd!4n_s0rrY_3nDian_188d7b8c}