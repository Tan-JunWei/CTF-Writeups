---
tags: 
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T14:25:10+08:00
---
## Challenge Description

![[PicoCTF Collaborative Development.png]]

From the challenge description, it is hinted that the "team" is facing some version control difficulties, possibly with Git. Other than this, we are not provided with any more clues.

![[PicoCTF Collaborative Development 2.png]]

Let's understand the challenge by first downloading the `challenge.zip` file using `wget`. Unzipping it extracts a directory `drop-in`, which contains a `git` repository within it.

### Git branches
![[PicoCTF Collaborative Development 3.png]]

I `cd` into the `drop-in` directory, and run `git init` to reinitialise the existing Git repository in this directory. 

Since the challenge is about collaborative development, I already had a feeling that we have to explore the different branches in the `git` repository. 

>[!faq] PicoCTF Hint: `git branch -a` will let you see available branches
>
>This hint confirms that we are interested in git branches for this challenge.

>[!info] Git branches
>
>Branching means you diverge from the main line of development and continue to do work without messing with that main line (_Git - Branches in a Nutshell_, n.d.).
>
>This basically means that a team can work on the same project concurrently, and merge the branches only when they are all satisfied with their work.

Running `git branch -a` lists 4 different branches, namely `feature/part-1`, `feature/part-2`, `feature/part-3` and main, which we are currently on.

From my past experiences with Git, I know that we can run `git checkout <branch-name>` to switch to a different branch. 

I first switched to `feature/part-1`, and ran `ls` in this branch. There was a file named `flag.py` in this branch, and I proceeded to `cat` its contents, which displayed a part of what I expected to be the flag:

```
picoCTF{t3@mw0rk_
```

I suspected that the original flag was split into 3 parts, as there are 3 branches with similar names (`feature/part-1`, `feature/part-2` and `feature/part-3`) within this `git` repository.

### Piecing it together
![[PicoCTF Collaborative Development 4.png]]

Hence, I ran `git checkout` to switch to `feature/part-2` branch and checked the `flag.py` file, where I obtained the second part of the flag:

```
m@k3s_th3_dr3@m_
```

I repeated the same steps for the third branch, and found the third and final part of the flag:

```
w0rk_4c24302f}
```

We will be able to form the flag by piecing the 3 parts together.

> [!NOTE] Flag
> picoCTF{t3@mw0rk_m@k3s_th3_dr3@m_w0rk_4c24302f}

#### References
- _Git - Branches in a Nutshell_. (n.d.). https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell