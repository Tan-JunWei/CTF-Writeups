---
tags:
  - GeneralSkills
  - easy
  - zip
  - grep
  - tree
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-04T22:21:30+08:00
---
## Challenge Description
![[PicoCTF First FInd .png]]

Well, from the description, it seems like we can first download the given `zip` file using `wget <link>`, unzip the file, and then find the full path to the file named `uber-secret.txt` so that we can `cat` its contents. Let's try.

### Unzipping
![[PicoCTF First FInd 2.png]]

Unzipping the `files.zip` file created many directories, subdirectories and files within them. Technically, we can see the full path to the `uber-secret.txt` file from the output during the unzipping process. We can straight away run `cat` on this file using its path. But I'd like to show 2 methods of how we can still find the flag without relying on this output. 

This is because the `zip` file unzipped did not contain many directories and files (only 10 directories and 12 files). That is one of the reasons why we are able to see the path to the `uber-secret.txt` at a glance. In the event where we receive a much larger `zip` file, the above method will not work, since we were just lucky to be able to see the full path instantly.

### Methods
![[PicoCTF First Find 3.png]]

I have had experience with folders with more than 100,000 directories and 90,000 files. I used the following command to find the full path of a **known** file. 

```bash
tree -f -a < folder-name > | grep < search-term (e.g file-name) >
```
- `-a`: All files are printed
- `-f`: Prints the full path prefix for each file (for full path)

We can then `cat` the contents of the file using the full path we just found. This method uses a similar approach to the above method, with the difference being having more control in terms of how you can `grep` your desired search term. 

Another method is just using `grep`, but it only works if we know a flag prefix or similar:
```bash
grep -r < search-term > *
```
- `-r`: recursive i.e, search all subdirectories within the current directory
- `*`: select all files and directories in the current directory

The above command can be used if we want to recursively check if the contents of files in the different directories contain our search term. For this challenge specifically, using the search term "pico" will allow us to get the flag.

> [!NOTE] Flag
> picoCTF{f1nd_15_f457_ab443fd1}