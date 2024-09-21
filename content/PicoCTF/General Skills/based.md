---
tags:
  - GeneralSkills
  - medium
  - Binary
  - Hex
  - Octal
Creation Date: 
Last Date: 
References: 
draft: true
modified: 2024-09-21T22:32:07+08:00
---
## Challenge Description

![[PicoCTF Based.png]]

As the challenge description suggests, we must be equipped with basic knowledge of different data encodings in order to solve this challenge.

However, there are many types of **numerical encodings** or **data encodings** used to represent data in different formats. We will need to know which are used for this challenge.

To do this, we run the command given in the challenge:

```bash
nc jupiter.challenges.picoctf.org 15130
```

>[!info] How does the challenge work?
>
>We are first tasked to convert a **binary (base-2) representation** of a word to the original word. There is a time limit of 45 seconds for us to submit to correct answer.
>
>If the answer is correct, we will then be given an **octal (base-8) representation** of another word. Our task is basically the same; we have to decode the octal representation and submit the correct word.
>
>The final stage will require us to decode the **base64 representation** of a word. After which, the answer submitted is correct, we will be awarded with the flag.

I created a few python scripts to do the conversion for me:

>[!abstract]+ Python scripts used for conversions
>
>**Binary Conversion**
>
>```python
># Binary conversion
>
>word = ""
>binary = input("Enter binary representation: ")
>
>for octet in binary.split():
>    char = chr(int(octet,2))
>    word += char
>
>print(f"The word is '{word}'.")
>```
>
>**Octal Conversion**
>
>```python
># Octal conversion
>
>word = ""
>octal = input("Enter octal representation: ")
>
>for num in octal.split():
>    char = chr(int(num,8))
>    word += char
>
>print(f"The word is '{word}'.")
>```
>
>**Hex conversion**
>
>```python
># Hex conversion
>
>word = ""
>hex = input("Enter hex representation: ")
>
>for i in range(0,len(hex),2):
>    hex_char = hex[i] + hex[i+1]
>    char = chr(int(hex_char,16))
>    word += char
>
>print(f"The word is '{word}'.")
>```
### Solving the challenge

![[PicoCTF Based 2.png]]

I proceeded to run the above command to connect to the server once again, and used the scripts shown above to convert the values accordingly. I used a separate terminal to do the conversions.

![[PicoCTF Based 3.png]]

After submitting the right input, I was awarded with the flag for this challenge.

> [!NOTE] Flag
> picoCTF{learning_about_converting_values_02167de8}