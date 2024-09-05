---
tags:
  - GeneralSkills
  - easy
  - strings
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-05T22:44:27+08:00
---
## Challenge Description

![[PicoCTF Tab,Tab, Attack.png]]

The description tells us that we are recommended to use tabcomplete in this challenge while finding the flag. 

>[!tip] What is tabcomplete?
>Tabcomplete basically helps you finish words or commands while typing by pressing the Tab key in the terminal. It's useful for saving time and making sure you enter things correctly, especially when you're not sure of the full word or command.

### Directories and subdirectories
![[PicoCTF Tab. Tab. Attack 2.png]]

I used `wget <link>` to download the challenge file provided. After seeing that it's a `zip` file, I proceeded to unzip it, extracting a directory and numerous subdirectories in it.

### Contents
![[PicoCTF Tab. Tab. Attack 3.png]]

I ran `tree -f -a` on the extracted directory. `-f` specifies the full path of the file, and `-a` displays all files. Running this command revealed that there are a total of 7 directories and 1 file within the extracted directory, which is why we are recommended to use tabcomplete in this challenge.

I tried to display the contents of the only file in extracted directory by doing `cat <full-path-to-file>`. Of course, to save time, I used tabcomplete. However, this command only displayed gibberish in the terminal. 

### Acquiring the flag
![[PicoCTF Tab. Tab. Attack 4.png]]

Next, I tried using `strings` instead of `cat`, hoping for a clearer result. As expected, `strings` did reveal the flag, though it was buried within a large block of text. I reran the command, `strings <full-path-to-file>`, this time piping ("`|`") the output through `grep pico` to filter the relevant content. This allowed me to see the full flag easily.

>[!todo] `strings` command
>`strings` prints the strings of printable characters in files.


> [!NOTE] Flag
> picoCTF{l3v3l_up!_t4k3_4_r35t!_76266e38}