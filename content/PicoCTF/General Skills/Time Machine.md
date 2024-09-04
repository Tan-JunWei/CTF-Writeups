---
tags:
  - GeneralSkills
  - easy
  - Git
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-04T16:59:23+08:00
---
## Challenge Description
![[PicoCTF Time Machine.png]]

Hmmmm.... the challenge description hints that we will be following a [[PicoCTF Writeups#Forensics|Forensics]] approach. However, this challenge is categorised under `General Skills`. We shall explore!

We first download the file given using `wget <link>`.

### Downloaded file
![[PicoCTF Time Machine 2.png]]

The downloaded file is called `challenge.zip`. When we `unzip` the file, many directories and files are created in a directory called `drop-in`. Most files were created under a [.git folder](https://stackoverflow.com/questions/29217859/what-is-the-git-folder). This gives us a clue that our flag may be associated with [Git](https://git-scm.com/), which is used in version control. 

There is also a file called `message.txt` in the `drop-in` directory. 
### Contents
![[PicoCTF Time Machine 3.png]]

When I ran `cat` on the `message.txt` file, this string was displayed:

```
This is what I was working on, but I'd need to look at my commit history to know why...
```

Interesting... Let's `cd` into the `.git` folder to check its contents. There are a few files and directories within this folder, such as `COMMIT_EDITMSG`, `index` and `branches`.

I first checked `COMMIT_EDITMSG` by running `cat`, and the file was indeed present in it. 

> [!NOTE] Flag
> picoCTF{t1m3m@ch1n3_5cde9075}