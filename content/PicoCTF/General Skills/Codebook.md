---
tags:
  - GeneralSkills
  - eeasy
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-07T10:24:48+08:00
---
## Challenge Description

![[PicoCTF codebook.png]]

Let's first download the 2 files provided using `wget <link1> <link2>`. 

With reference to the challenge description, we are supposed to follow instructions given and run the script `code.py` in the same directory as the `codebook.txt` file. This means that `codebook.txt` contains important information required for the script to run.

I did not know how many lines the `codebook.txt` file contains, so I tried running `cat codebook.txt | head`. Piping the contents through `head` should display the first 10 lines of the file. The output of this command was:

```
azbycxdwevfugthsirjqkplomn
```

It seems like this file only had 1 line, which is a string of random characters.
### What does the script do?
![[PicoCTF codebook 2.png]]

I ran `nano codebook.txt` to check what how the Python script works. 

It seems like this script XOR-decrypts an encrypted flag (`flag_enc`) using a password derived from specific characters in a file called `codebook.txt`. The `str_xor` function performs the XOR operation between the flag and the password to reveal the original flag.

For this challenge, we technically do not need to possess strong understanding of how the script works, as simply running the script in the same directory as `codebook.txt` will reveal the full flag.

![[PicoCTF codebook 3.png]]

As such, the flag is given after we run `python code.py`.

> [!NOTE] Flag
> picoCTF{c0d3b00k_455157_d9aa2df2}