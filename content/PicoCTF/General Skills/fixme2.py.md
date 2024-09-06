---
tags:
  - GeneralSkills
  - easy
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T11:55:50+08:00
---
## Challenge Description

![[PicoCTF fixme2.py .png]]

In this challenge, we are tasked to fix a single syntax error in the provided Python script. This challenge is highly similar to [[fixme1.py]].

### Fixing the syntax error
![[PicoCTF fixme2.py 2.png]]

>[!bug] Syntax errors
>
>As mentioned in [[fixme1.py]], when we run a python file, errors (if any) will be printed in the terminal, specifying the type of error and the line number in which the error occurs. 
>
>So, we can run `python fixme2.py` to check which line is causing the error.

This highlights a syntax error at line 22, where only 1 equal sign ("`=`") is used instead of 2 when comparing 2 values. 

We can fix this syntax error by modifying the script using `nano fixme2.py`. Running the script again successfully prints the flag in the terminal.

> [!NOTE] Flag
> picoCTF{3qu4l1ty_n0t_4551gnm3nt_4863e11b}