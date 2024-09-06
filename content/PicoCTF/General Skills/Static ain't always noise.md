---
tags:
  - GeneralSkills
  - easy
  - strings
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T09:35:14+08:00
---
## Challenge Description
![[PicoCTF Static ain't always noise.png]]

This challenge is similar to [[strings it]] and [[Wave a flag]].

![[PicoCTF Static ain't always noise 2.png]]

After downloading the files using `wget`, I ran `file static` to check the file type of this file. Once again, it is a binary executable file. `strings` will likely be useful here.

>[!todo] `strings` command
>`strings` prints the strings of printable characters in files, specifically binary files.

I then ran nano `ltdis.sh`, which was the bash script file provided in the challenge. 

```bash
──(kali㉿kali)-[~/Desktop/picoCTF/general_skills/static_aint_always_noise]
└─$ cat ltdis.sh 
#!/bin/bash



echo "Attempting disassembly of $1 ..."


#This usage of "objdump" disassembles all (-D) of the first file given by 
#invoker, but only prints out the ".text" section (-j .text) (only section
#that matters in almost any compiled program...

objdump -Dj .text $1 > $1.ltdis.x86_64.txt


#Check that $1.ltdis.x86_64.txt is non-empty
#Continue if it is, otherwise print error and eject

if [ -s "$1.ltdis.x86_64.txt" ]
then
        echo "Disassembly successful! Available at: $1.ltdis.x86_64.txt"

        echo "Ripping strings from binary with file offsets..."
        strings -a -t x $1 > $1.ltdis.strings.txt
        echo "Any strings found in $1 have been written to $1.ltdis.strings.txt with file offset"



else
        echo "Disassembly failed!"
        echo "Usage: ltdis.sh <program-file>"
        echo "Bye!"
fi
```

Yep, this bash script `ltdis.sh` is a bash script that attempts to disassemble a binary file and extract strings from it. 

### Acquiring the flag
![[PicoCTF Static ain't always noise 3.png]]

I figured that running the bash script will likely be equivalent to running `strings` for the purpose of acquiring the flag, since they both work by displaying only the printable strings in `static`.

Indeed, running `strings static | grep -C 5 "pico"` displayed the flag in the terminal. I used the `-C 5` argument to display the5  lines of **context** before and after the matching line that contains the flag, but this is optional.

> [!NOTE] Flag
> picoCTF{d15a5m_t34s3r_f6c48608}
