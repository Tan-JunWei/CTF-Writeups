---
tags:
  - GeneralSkills
  - easy
  - Netcat
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T09:58:36+08:00
---
## Challenge Description
![[PicoCTF Nice netcat... .png]]

I'll begin by running the command given in the description to understand how I can proceed. After connecting to the server, I was greeted with an overwhelming number of numbers, as shown below.

```bash
┌──(kali㉿kali)-[~/Desktop/picoCTF/general_skills/nice_netcat...]
└─$ nc mercury.picoctf.net 35652
112 
105 
99 
111 
67 
84 
70 
123 
103 
48 
48 
100 
95 
107 
49 
116 
116 
121 
33 
95 
110 
49 
99 
51 
95 
107 
49 
116 
116 
121 
33 
95 
57 
98 
51 
98 
55 
51 
57 
50 
125 
10
```

Based on the challenge description, I figured that we may be required to convert each number into an ASCII character. We can do this using the Python `chr()` function. I proceeded to store all the numbers in a file called `num.txt`.

>[!tip] What does `chr()` do?
>The `chr()` function returns the character that represents the specified unicode. For example, chr(97) allows us to get the character that represents the unicode 97.
>
>Since ASCII is a proper subset of Unicode, `chr()` can be used to convert the above numbers into ASCII characters.

Hence, I came up with this python script to convert each number into an ASCII character, which will be added to the `flag`. At the end, the flag will be printed out in the terminal. 

```python 
flag = ""

with open("num.txt","r") as file:
    for number in file:
        flag += chr(int(number))

print(flag)
```

> [!NOTE] Flag
> picoCTF{g00d_k1tty!_n1c3_k1tty!_9b3b7392}