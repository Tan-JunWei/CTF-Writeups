---
tags:
  - Miscellaneous
  - easy
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>I unintentionally scrambled the content of a file, but thankfully the lines are previously labelled with their corresponding line numbers. Can you help me sort them?
>
>Submit the flag in the following format: YCEP25{flag}
>
>- **Author:** Jun Wei
>- **Category:** misc
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Files**
>- [[file.txt]]

## Sort and Read - Solution

We are given a file `file.txt` with the randomly sorted contents.

![[Sort-and-Read-1.png]]

The characters on the right represent the individual characters that form the flag, when sorted correctly.

They are all accompanied by a respective line number.

![[Sort-and-Read-2.png]]

To sort them, we can run `sort -n file.txt`. Alternatively, participants can (and are encouraged to) explore scripting to display the flag in a single line.

![[Sort-and-Read-3.png]]

Example python script:

```python
input = "file.txt"

with open(input, "r") as file:
    lines = file.readlines()

    lines.sort(key=lambda line: int(line.split()[0])) # Sort lines by the leftmost number in each line
    
    flag = "" 

    for line in lines:
        parts = line.split()
        
        if len(parts) > 1:  
            char = parts[1]
            flag += char 

    print("Flag:", flag)
```

> [!NOTE] Flag
> YCEP25{5UCC355FUL1Y_50RT3D}