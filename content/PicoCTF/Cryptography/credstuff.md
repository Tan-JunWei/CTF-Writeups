---
tags:
  - Cryptography
  - medium
  - ROT13
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-27T10:12:10+08:00
---
## Challenge Description
![[PicoCTF credstuff.png]]

We first begin by downloading the file using `wget <link>`. 

### Contents of the Downloaded file
![[PicoCTF credstuff 2.png]]
The file provided for this challenge is a `.tar` file. 

>[!info] What is a TAR file?
>A TAR file is an [archive](https://techterms.com/definition/archive) saved in the Tape Archive format. It contains multiple files that have been packaged together for easier storage and sharing. Notably, unlike [.ZIP](https://fileinfo.com/extension/zip) files and many other types of archives, TAR files are not [compressed](https://techterms.com/definition/compression) (_TAR File Extension_, 2023).

To extract a `.tar` file, we can run this command:

```bash
tar -xvf < file-name >
```
- `-x`: Extract files from an archive
- `-v`: Verbosely list files processed (basically prints the names of the files extracted)
- `-f`: Specify archive file name
- `-z`: Filter the archive through gzip (for `.tar.gz` files). This is not used for this challenge.

### Obtaining the Flag
![[picoCTF credstuff 3.png]]

Based on the challenge description, we need to find the password of the user _"cultiris"_ and decrypt it. The first user in `usernames.txt` corresponds to the first password in `passwords.txt`. The second user corresponds to the second password, and so on.

>[!tip] The Approach
>After running `cat` on the 2 files, `usernames.txt` and `passwords.txt`, we can see that 1 username and password is displayed on each line for the respective files. 
>
>This means that we can find the line number of the username "_cultiris_" in the `usernames.txt` file, and then display the password with the same line number in the `passwords.txt` file. 

#### Finding the line number of "cultiris"
We can find the line number of username "_cultiris_" in the `usernames.txt` file by using this command:

```bash
cat usernames.txt | grep -n "cultiris"
```

#### Displaying the password of "cultiris"
We realise that this username is found at line 378. So we will display the 378th line in the `passwords.txt` file as well, with this command:

```bash
sed -n "378p" passwords.txt
```
- `-n`: Suppresses the default output behavior of `sed`
- `"387p"`: Prints only the 378th line

>[!info] `sed`
>`sed` is a stream editor for filtering and transforming text. It can be used to edit text files, with its most common use being to replace occurrences of words in a files. This is extremely helpful in situations where a configuration file has a lot of instances of the same word that needs replacing throughout the file.

This command will output this string `cvpbPGS{P7e1S_54I35_71Z3}`, which looks like it's been encoded using ROT13. Decoding this will give us the flag.
#### Decoding the password of "cultiris"

We can decode this using this command:
```bash
echo cvpbPGS{P7e1S_54I35_71Z3} | rot13
```

The command `echo cvpbPGS{P7e1S_54I35_71Z3} | rot13` prints the string `cvpbPGS{P7e1S_54I35_71Z3}` using `echo`, then pipes (`|`) that output to the `rot13` command, which performs a ROT13 substitution cipher on the input string.

Alternatively, we can use tools like [[CyberChef]] to decode this string.

 >[!NOTE] Flag
>picoCTF{C7r1F_54V35_71M3}
#### References
- _TAR File Extension_. (2023, June 15). https://fileinfo.com/extension/tar