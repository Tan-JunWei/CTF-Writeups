---
tags:
  - GeneralSkills
  - zip
  - easy
  - grep
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-09T10:46:41+08:00
---
## Challenge Description
![[PicoCTF big_zip.png]]

As usual, we begin by downloading the file using `wget <link>`. For this challenge, the downloaded file is a `zip` file, so I proceeded to unzip it. This created a directory called `big-zip-files`. 

### The overwhelming number of directories and files
![[PicoCTF big zip 2.png]]
I ran `tree -f big-zip-files` to check the number of files and directories that were present in this folder. As observed. there were 358 directories and 8732 files. I tried to use  pipe ("`|`") to grep "flag" or "pico" from the contents of the output of the `tree` command. However, since the `.txt` files were randomly named for this challenge, this approach was ineffective. An example file name is `ireiagcarkzcmosqzqlvrh.txt`.

>[!faq] PicoCTF Hint: Can grep be instructed to look at every file in a directory and its subdirectories?
>
>After checking various online sources, I came across this post on StackOverflow: 
>[How to perform grep operation on all files in a directory?](https://stackoverflow.com/questions/15286947/how-to-perform-grep-operation-on-all-files-in-a-directory)

With the help of this page, I realised the following command can be used.

```bash
grep -r "search-term" *
```
- `-r`: recursive i.e, search all subdirectories within the current directory
- `*`: select all files and directories in the current directory

I ran the above command twice, first time with the search term being "flag" and the second time with "pico" as the search term. 

There were many files with words containing "flag", but all of them were not what I was looking for.  
### Successful `grep`

![[PicoCTF big zip 3.png]]

After I changed the search term to "pico", I was able to get the flag instantly. 

> [!NOTE] Flag
> picoCTF{gr3p_15_m4g1c_ef8790dc}
#### References
- _How to perform grep operation on all files in a directory?_ (n.d.). Stack Overflow. https://stackoverflow.com/questions/15286947/how-to-perform-grep-operation-on-all-files-in-a-directory