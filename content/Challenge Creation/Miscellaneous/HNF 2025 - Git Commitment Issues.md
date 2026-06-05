---
tags:
  - Miscellaneous
  - easy
  - Git
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>git commit -m 'feat: IDK what I did, help ples'
>
>- **Author:** Jun Wei
>- **Category:** misc
>- **Difficulty:** easy
>
>**Files**
>- [[calc.zip]]

## Git Commitment Issues - Solution

As the challenge name suggests, this challenge revolves around the usage of Git.

1. For this challenge, we are provided with a zip file called `calc.zip`. The first step is to unzip this file, which should show many git-related files being extracted.

![[Git-Commitment-Issues-1.png]]

2. We can navigate into the extracted directory. There should be one file called `calc.py`, and it contains a Python script for a simple calculator app.

![[Git-Commitment-Issues-2.png]]

3. Since there are no other files (or branches actually), we probably need to look at the git commit history. We can do this using the command `git log --all --oneline`.

```bash
┌──(nepz㉿nepz)-[~/safe-calculator]
└─$ git log --all --oneline
14bafe0 (HEAD -> main, origin/main, origin/HEAD) add help command
784a872 add command menu (with clear command)
96102cf add square root
37654b2 add quit command for graceful exit
b678c57 add robust input validation
8ed3fc5 HNF25{g1t_15_4w3s0m3}
1dd3071 refactor operations handling with the use of dictionary
eabfe27 add modulo (remainder)
a7f664d add exponentiation (power)
d5692d1 implement main function
e8a1cbf allow user input
fce462a add basic calc
```

One commit message (`HNF25{g1t_15_4w3s0m3}`) closely resembles a flag. However, this is a decoy flag, not the real flag.

4. The next step is to list out which files were changed in each commit so that we can proceed further into the investigation.

```bash
git log --all --oneline --name-only
```

![[Git-Commitment-Issues-3.png]]

We can see that a file called `flag.txt` was included in 2 commits, namely `8ed3fc5 - HNF25{g1t_15_4w3s0m3}` and `b678c57 - add robust input validation`.

5. We can check the status of this file to see what was happening in these 2 commits.

```bash
git log --all --oneline --name-status
```

![[Git-Commitment-Issues-4.png]]

We see that in the commit `8ed3fc5 - HNF25{g1t_15_4w3s0m3}`, the `flag.txt` file was added. This file was deleted in the next commit (`b678c57 - add robust input validation`).

So, we can simply use a `git show` command to display the contents of the `flag.txt` file when it was added in the commit with the commit hash of `8ed3fc5`.

```bash
┌──(nepz㉿nepz)-[~/safe-calculator]
└─$ git show 8ed3fc5:flag.txt
HNF25{v3rs10n_c0ntr01_w1th_g1t_c4n_b3_m3s5y}
```

Flag: `HNF25{v3rs10n_c0ntr01_w1th_g1t_c4n_b3_m3s5y}`