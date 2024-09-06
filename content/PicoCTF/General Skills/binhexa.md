---
tags:
  - GeneralSkills
  - easy
  - Binary
  - Hex
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T11:29:37+08:00
---
## Challenge Description
![[PicoCTF binhexa.png]]

We begin by connecting to the server by running `nc titan.picoctf.net 61359`. 

### Binary operations
![[PicoCTF binhexa 2.png]]

We are greeted with a barrage of questions related to binary operations. Once we answer the 6 questions and enter the results of the last operation in hexadecimal, we are awarded with the flag.

![[PicoCTF binhexa 3.png]]

For this challenge, I used a python script to assist with the binary operations:

>[!todo] Python script for basic binary operations
>
>I've included some comments as well to explain the binary operations.
>
>```python
>binary_number_1 = 0b00111010  
>binary_number_2 = 0b00101001 
>
># Question 1: Right shift binary_number_2 by 1
>print(f'{binary_number_2 >> 1:08b}')
># Output: 00010100 (Right shift by 1 divides by 2)
>
># Question 2: Bitwise OR between binary_number_1 and binary_number_2
>print(f'{binary_number_1 | binary_number_2:08b}')
># Output: 00111011 (OR operation combines bits, 1 if either bit is 1)
>
># Question 3: Bitwise AND between binary_number_1 and binary_number_2
>print(f'{binary_number_1 & binary_number_2:08b}')
># Output: 00101000 (AND operation, 1 if both bits are 1)
>
># Question 4: Multiplication of binary_number_1 and binary_number_2
>print(f'{binary_number_1 * binary_number_2:08b}')
># Output: 1110100010 (This result exceeds 8 bits; it will show as a larger binary number)
>
># Left shift binary_number_1 by 1
>print(f'{binary_number_1 << 1:08b}')
># Output: 01110100 (Left shift by 1 multiplies by 2)
>
># Addition of binary_number_1 and binary_number_2
>print(f'{binary_number_1 + binary_number_2:08b}')
># Output: 01100011 (58 + 41 = 99 in decimal, which is 01100011 in binary)
>
># Hexadecimal representation of the addition
>print(f'{binary_number_1 + binary_number_2:x}')
># Output: 63 (99 in decimal is 63 in hexadecimal)
>```

After submitting the 6 correct answers, the flag will be revealed.

> [!NOTE] Flag
> picoCTF{b1tw^3se_0p3eR@tI0n_su33essFuL_6862762d}