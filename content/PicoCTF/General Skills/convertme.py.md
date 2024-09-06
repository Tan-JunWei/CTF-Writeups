---
tags:
  - GeneralSkills
  - easy
  - Python
  - Binary
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T15:36:53+08:00
---
## Challenge Description

![[PicoCTF convertme.py .png]]

Alright, our task is to convert a number from decimal to binary, pretty simple! There are many ways to do this.

![[PicoCTF convertme.py 2.png]]

First, we download the Python script `convertme.py` (using `wget`), and ran `nano` immediately to examine the code.

### How the provided python script looks like
![[PicoCTF convertme.py 3.png]]

It seems like upon running the script, a random number between 10 to 100 will be generated, and we are tasked to convert this number from decimal to binary. If our answer is correct, we are awarded with the flag. 

To assist myself, I added this line in the above script:

```python 
print(f'Binary representation is {bin(num)}')
```

This line prints the binary representation of the decimal number right before I am asked for the answer, which will allow me to basically copy and paste the correct answer and get the flag easily.

Running the script with this added line will allow us to acquire the flag. Alternatively, you can use online decimal to binary conversion tools or perform manual conversion.

> [!NOTE] Flag
> picoCTF{4ll_y0ur_b4535_722f6b39}