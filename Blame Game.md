---
tags:
  - GeneralSkills
  - easy
  - Git
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T15:08:45+08:00
---
## Challenge Description

![[PicoCTF Blame Game.png]]

Another challenge about version control using Git. This time, as the description mentions, it's about commits made by someone.

To begin, download the file using `wget` and unzip it. Unzipping the `challenge.zip` file will extract many `git` files and directories, which will all be stored in a directory called `drop-in`.

### Understanding what we have
![[PicoCTF Blame Game 2.png]]

We `cd` into the `drop-in` directory. Running `ls` shows that there's one file called `message.py`. However, it only contains 1 line of code which is not useful in our quest for the flag.

>[!info] Why was the `.git` folder not shown when I ran `ls`?
>
>Worry not, it's still there! 
>
>The `.git` folder is hidden by default due to this folder storing important git related information (Rashid, 2022). 

I then ran `git branch -a` to check if there are more than 1 branch in this `git` repository. Thankfully there was only 1 branch named "`master`". This simplifies our task as we don't have to check the commits made in different branches.

### Finding the author
![[PicoCTF Blame Game 3.png]]

>[!faq] PicoCTF Hint: In collaborative projects, many users can make many changes. How can you see the changes within one file?
>
>Looks like we only have to check the commits within one file. We can do this by running `git log <file-name>`.
>
>This actually makes our task much easier. In a separate terminal, I actually ran `git log` to display the entire commit history in this `git` repository, and received an overwhelming output, as shown below.
>
>![[PicoCTF Blame Game 4.png]]
>

I ran `git log message.py`, as this was the only file that I knew existed in this repository. Doing this revealed the flag.

### Alternative solution

![[PicoCTF Blame Game 5.png]]

Alternatively, I figured that we can technically run `git log | grep "Author"`, especially since we know from the challenge description that our motive is to find the name of someone in the commit history who messed up the program. 

In `git` logs, the name of the person who made the commit is known as the "Author". That is why we pipe the content through `grep` with the search term being "Author" to find our flag.

> [!NOTE] Flag
>picoCTF{@sk_th3_1nt3rn_b64c4705}

#### References
- Rashid, I. (2022, January 30). _.git folder not visible | Cloud Build_. Cloud Build. https://cloudbuild.co.uk/tag/git-folder-not-visible/#:~:text=git%20folder%20is%20created%20within,view%20and%20selecting%20hidden%20items.