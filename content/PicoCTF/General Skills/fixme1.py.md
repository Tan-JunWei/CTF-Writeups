---
tags:
  - GeneralSkills
  - easy
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T11:46:52+08:00
---
## Challenge Description

![[PicoCTF fixme1.py .png]]

Alright, it looks like we just have to fix 1 simple syntax error to allow the flag to be printed successfully. Let's download the challenge file using `wget <link>` and check for the syntax error.

### Fixing the syntax error
![[PicoCTF fixme1.py 2.png]]

>[!bug] Syntax errors
>
>When we run a python file, the errors (if any) will be printed in the terminal, specifying the type of error and the line number in which the error occurs. We can run `python fixme1.py` to check which line is causing the error.

It can be observed that there is an indentation error at line 20. We can run `nano fixme1.py` to edit it. Running the script again does not display any more errors, and awards us with the flag.

> [!NOTE] Flag
> picoCTF{1nd3nt1ty_cr1515_09ee727a}