---
tags:
  - GeneralSkills
  - easy
  - Git
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-05T12:53:32+08:00
---
## Challenge Description
![[PicoCTF Commitment Issues.png]]

In this challenge, we will be playing with Git and Git commands. There's a word play on Git commits in the challenge name. The hints given also hinted that this challenge is associated with version control, specifically using Git.

### Preparation
![[PicoCTF Commitment Issues 2.png]]
We start off by downloading the challenge file using `wget <link>`. It was a file called `challenge.zip`, so we proceed to unzip it. Based on the output of the unzipping process, we can see many files and directories created under a `.git` folder.

There is also a directory called `drop-in`, which contains a file called `message.txt`. Note that the `.git` folder is also inside this directory.

### Git
![[PicoCTF Commitment Issues 3.png]]

I ran `cat` to display the contents of `message.txt`, and all I got was `TOP SECRET`. This did not give me a clue on how I should proceed. 

However, since there was a `.git` folder extracted during the unzipping of the `challenge.zip` file, I ran `git init` to reinitialise it.

>[!faq] What is inside the `.git` folder?
>The _.git_ folder contains all the information that is necessary for your project in version control and all the information about commits, remote repository address, etc. All of them are present in this folder. It also contains a log that stores your commit history so that you can roll back to history (_What Is the .Git Folder?_, n.d.).
>

>[!todo] What does `git init` do?
>When you run `git init` in a directory, it initializes a new Git repository. This creates a new `.git` directory in the root of your project folder. The `.git` directory contains all the metadata and history for the repository, including configuration files, hooks, and the version control database.
>
>If you've just extracted a `.git` folder, it suggests that you have a Git repository that has already been initialized. Running `git init` in this case won't change anything if the repository is already set up, but it will ensure that the `.git` directory is correctly initialized if it wasn't done previously.
>
>Essentially, `git init` prepares the directory to start tracking changes with Git, allowing you to commit files, create branches, and perform other Git operations.

Since we already had a `.git` repository, `git init` just reinitialises it.

Based on the challenge name, we know that we have to check the commit logs by running `git log`. This will display the commit history for the current branch in your Git repository. By default, it displays a list of commits in reverse chronological order (most recent commits first).

As shown in the above image, running `git log` displayed the commit history with 2 commits. As you probably know, Git commit messages are often recommended or even required. The commit messages were "`remove sensitive info`" and "`create flag`" respectively.

>[!faq] PicoCTF Hint: You can 'checkout' commits to see the files inside them
>
>To checkout commits, we have to use the following command:
>```bash
>git checkout < commit-hash >
>```
>
>A commit hash (or commit ID) is a unique identifier assigned to each commit in a Git repository. It is a long string of characters, typically a 40-character hexadecimal number, which Git generates based on the content of the commit. This hash helps Git track the exact state of the project at the time of the commit.


![[PicoCTF Commitment Issues 4.png]]

I first ran `git checkout <commit-hash>` on the commit with the commit message stating "create flag". After I checked out to this specific commit, I wanted to look around for any files created that may contain the flag. Thus, I ran `ls` and realised that there was a file named `message.txt`. 

Running `cat message.txt` allowed me to get the flag,

> [!NOTE] Flag
> picoCTF{s@n1t1z3_cf09a485}


#### References
- _What is the .git folder?_ (n.d.). Stack Overflow. https://stackoverflow.com/questions/29217859/what-is-the-git-folder
- _Git - git-log Documentation_. (n.d.). https://git-scm.com/docs/git-log