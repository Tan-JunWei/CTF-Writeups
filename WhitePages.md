---
tags:
  - Forensics
  - medium
  - Binary
  - Hex
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-03T15:59:18+08:00
---
## Challenge Description
![[PicoCTF WhitePages.png]]

This challenge was pretty interesting when I tried it, as I've never encountered a "blank" `.txt` file before. 

As per normal, we first download the provided file by using `wget <link>` to understand what we're dealing with. 

### Downloaded file
![[PicoCTF WhitePages 2.png]]

The downloaded file is called `whitepages.txt`. As the name of the challenge and file suggest, there was "nothing" inside this file when I ran `cat` on it. I received the same output when I used`strings`.

I actually tried `exiftool` and other methods when I first attempted this challenge as well, but they did not provide me with any clue on how I should proceed.

### Viewing the hex
![[PicoCTF WhitePages 3.png]]
I then tried to use `hexedit` to view the file in hexadecimal. I realised that throughout the entire file, there were 2 recurring values. These are `e28083` and `20`. 

>[!tip] Binary?
>Since there were exactly 2 recurring values, I thought that they could be hinting about binary numbers, 0 and 1.

### Obtaining the flag

![[PicoCTF WhitePages 4.png]]

With this idea, I used `xxd` to store the hex dump of `whitepages.txt` in a file called `output.txt`. I will be using a Python script to convert the 2 recurring values in the hex dump into 0s and 1s.

### Conversion
>[!abstract]+ Python script
>
>```python
>hex = ""
>with open("output.txt", "r") as file:
>    for line in file:
>        row = line.strip()[10:49].split()
>        # Example row: ['e280', '83e2', '8083', 'e280', '83e2', '8083', '20e2', '8083']
>
>        hex += "".join(row)
>
>bin = hex.replace("e28083", "0").replace("20", "1")
>print(f"Binary:\n{bin}")
>
>for i in range(0, len(bin), 8):
>    byte = bin[i:i+8]
>    print(chr(int(byte,2)), end='')
>```
>I tried to replace `e28083` with `1` and `20` with `0` at first, but the output was gibberish. After swapping the substituted values, I could finally get the flag.

> [!NOTE] Flag
> picoCTF{not_all_spaces_are_created_equal_3e2423081df9adab2a9d96afda4cfad6}

