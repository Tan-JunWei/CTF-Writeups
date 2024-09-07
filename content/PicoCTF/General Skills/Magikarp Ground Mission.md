---
tags:
  - GeneralSkills
  - easy
  - SSH
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-07T10:57:39+08:00
---
## Challenge Description
![[PicoCTF Magikarp Ground Mission.png]]

For this challenge, we will be tasked to move between directories after we SSH into a server, according to clues we pick up along the way.

Let's begin by running the command to SSH into the server (shown after launching an instance):

```bash
ssh ctf-player@venus.picoctf.net -p 60161
```

This allows us to SSH into the picoCTF server on port 60161 as `ctf-player`.  When prompted to continue connecting, enter "yes". Next, enter the password provided in the challenge description. Following these steps will allow us to successfully connect to the server.

### Connection successful
![[PicoCTF Magikarp Ground Mission 2.png]]

After successful connection, we can run `ls` to list the files in our current directory. This shows 2 files, `1of3.flag.txt` and `instructions-to-2of3.txt`. 

We can run `cat` on both files to display their contents. The contents of the 2 files are as follows.

`1of3.flag.txt`:
```
picoCTF{xxsh_
```

`instructions-to-2of3.txt`
```
Next, go to the root of all things, more succinctly `/`
```

For this challenge, it seems like the flag has been separated into 3 parts, and we have to follow the instructions to find the location of each file. At the end, we will combine the 3 parts to form the full flag.

![[PicoCTF Magikarp Ground Mission 3.png]]

To find the second file, we will have to go to the root directory. We can do this by using `cd /`.

Indeed, running `ls` in the root directory shows a file named `2of3.flag.txt` and of course, `instructions-to-3of3.txt`.

So the second part of the flag is:

```
0ut_0f_\/\/4t3r_
```

The instructions to find the third file is:

```
Lastly, ctf-player, go home... more succinctly `~`
```

Alright, by running `cd ~`, we move from the root directory (`/`) to the home directory (`~`), where the final file `3of3.flag.txt` resides.

This is third part of the flag:

```
c1754242}
```

Piecing everything together, we can secure our flag.

> [!NOTE] Flag
> `picoCTF{xxsh_0ut_0f_\/\/4t3r_c1754242}`