---
tags:
  - GeneralSkills
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-20T21:29:25+08:00
---
## Challenge Description

![[PicoCTF useless.png]]

This challenge requires us to first connect to their SSH server as `picoplayer` on port 59574. We can do this by running `ssh -p 59574 picoplayer@saturn.picoctf.net`. The `-p` argument is used to specify the port.

![[PicoCTF useless 2.png]]

After successfully connecting to the server, I ran `ls` to check the files and directories within the home directory (`~`). 

As expected, there's a file named `useless` within this directory. In fact, it was the only file in this directory. Running `file useless` shows that it is a Borne-Again shell (bash) script. 

I proceeded to read the script:

```bash
picoplayer@challenge:~$ cat useless
#!/bin/bash
# Basic mathematical operations via command-line arguments

if [ $# != 3 ]
then
  echo "Read the code first"
else
        if [[ "$1" == "add" ]]
        then 
          sum=$(( $2 + $3 ))
          echo "The Sum is: $sum"  

        elif [[ "$1" == "sub" ]]
        then 
          sub=$(( $2 - $3 ))
          echo "The Substract is: $sub" 

        elif [[ "$1" == "div" ]]
        then 
          div=$(( $2 / $3 ))
          echo "The quotient is: $div" 

        elif [[ "$1" == "mul" ]]
        then
          mul=$(( $2 * $3 ))
          echo "The product is: $mul" 

        else
          echo "Read the manual"
         
        fi
fi
```

At the first glance, it seemed like the script did not contain any clue for us to proceed, However, upon closer inspection, we see that there's a part that requires our attention:

```bash
else
    echo "Read the manual"
```

>[!info] Manual pages in Linux
>
>In order to read manual pages of commands in Linux, we can run the `man` command. This is the basic syntax of it:
>
>```bash
>man [option] [command]
>```
>
>t provides detailed documentation about the usage, options, and functionality of commands, making it an essential tool for both beginners and experienced users (GeeksforGeeks, 2024).

### "Useless" manual page?

![[PicoCTF useless 3.png]]

The following output is displayed when I ran `man useless`:

```bash
picoplayer@challenge:~$ man useless 

useless
     useless, — This is a simple calculator script

SYNOPSIS
     useless, [add sub mul div] number1 number2

DESCRIPTION
     Use the useless, macro to make simple calulations like addition,subtraction, multiplication and division.

Examples
     ./useless add 1 2
       This will add 1 and 2 and return 3

     ./useless mul 2 3
       This will return 6 as a product of 2 and 3

     ./useless div 6 3
       This will return 2 as a quotient of 6 and 3

     ./useless sub 6 5
       This will return 1 as a remainder of substraction of 5 from 6

Authors
     This script was designed and developed by Cylab Africa

     picoCTF{us3l3ss_ch4ll3ng3_3xpl0it3d_8504}

```

There it is! The flag is included in the output. 

> [!NOTE] Flag
> picoCTF{us3l3ss_ch4ll3ng3_3xpl0it3d_8504}

#### References
- GeeksforGeeks. (2024d, June 10). _How to Read Manual Pages in Linux | man Command_. GeeksforGeeks. https://www.geeksforgeeks.org/man-command-in-linux-with-examples/