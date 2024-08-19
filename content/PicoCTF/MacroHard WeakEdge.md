---
tags:
  - Forensics
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-19T18:38:38+08:00
---
## Challenge Description

![[PicoCTF MacroHard WeakEdge.png]]

As the challenge name suggests, we will be dealing with `Microsoft PowerPoint` files in this challenge. 

![[PicoCTF MacroHard WeakEdge 3.png]]
We begin our journey by downloading the `.pptm` file using `wget <link>`. Using the GUI, there was no important information that could provide us with any hints, other than a demotivating message as shown below.

However, running `binwalk` reveals that there are many zip files that we can extract.
### Contents of the `ppt` file
![[PicoCTF MacroHard WeakEdge 2.png]]
### Using `tree` to list contents of directories in a tree-like format
![[PicoCTF MacroHard WeakEdge 4 .png]]
After running `binwalk -e <file-name>` to extract the embedded files, I ran `tree -f <directory-name>`.

>[!important] `tree` command
>Running `tree <directory-name>` allows us to get an overview of the contents present in a directory, especially if there are many files within it. 
>`-a`: prints all files, but without full path prefix for each file
>`-f`: prints the full path prefix for each file

While looking through the files and directories, I chanced upon a suspicious file named `hidden`.
### Suspicious file
![[PicoCTF MacroHard WeakEdge 5.png]]

The advantage of using `tree -f` is that it allows us to see the full file path of files that may be of interest. With the path to this `hidden` file, I `cd` into the directory and `cat` this file.
### Contents of the `hidden` file

![[PicoCTF MacroHard WeakEdge 6.png]]

It seems like this string "`Z m x h Z z o g c G l j b 0 N U R n t E M W R f d V 9 r b j B 3 X 3 B w d H N f c l 9 6 M X A 1 f Q`" is base64 encoded. Let's head over to [[CyberChef]] to test this hypothesis. 

### CyberChef output

![[PicoCTF MacroHard WeakEdge 7.png]]

After we remove the spaces in between the characters in the string, the string could be decoded to reveal our flag. 

> [!NOTE] Flag
> picoCTF{D1d_u_kn0w_ppts_r_z1p5}
