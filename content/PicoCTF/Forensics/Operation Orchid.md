---
tags:
  - Forensics
  - medium
  - Sleuthkit
  - OpenSSL
modified: 2024-08-29T22:10:22+08:00
Creation Date: 
Last Date: 
References: 
draft: 
---
## Challenge Description 
![[PicoCTF Operation Orchid.png]]

Since this challenge provides a compressed disk image, we will probably have to use [[The Sleuth Kit (TSK)]] tools to assist us. 

We first download the file using `wget`, then run `gunzip <file-name>` to expand the compressed disk image file.
### Understanding the volume system
![[PicoCTF Operation Orchid 2.png]]

Running `mmls` displays the partition tables of this volume system. We see that there are 2 Linux partitions in the downloaded disk image. We shall check both.

>[!tip] `fls` 
>We run `fls -o <img-offset> -r <disk-img-name>` to list the file and directories names in the disk image. 
>
>The `-r` argument allows us to recursively display directories.

Running this command on the `2048` offset did not show anything suspicious. However, running this command on the `411648` offset displays an overwhelming number of files and directories. So we shall zoom in to this. 

### Finding the Flag?
![[PicoCTF Operation Orchid 3.png]]

I continued and tried to use `grep "flag"` to check if there is any file or directory that contains the word "flag" in its name. Indeed, running this command revealed 2 files, `flag.txt` and `flag.txt.enc`.
### Unallocated space
>[!bug] `r/r * 1876(realloc): flag.txt`
>According to the official [[The Sleuth Kit (TSK)]] [fls command page](https://wiki.sleuthkit.org/index.php?title=Fls):
>```
>If the file name is in unallocated space of the directory, there will be a '*' between the 
>file type(r/r) and the metadata address.
>
>`r/r * 1304-128-1: IO.SYS`
>
>In general, this means that the file is deleted. But, some file systems keep the directory 
>contents sorted and will move file names around. This can result in unallocated copies of the file
>name, even when the file is still allocated. As of version 3.0.0, TSK suppresses duplicate 
>file names and will suppress a deleted version of a name if an equivalent allocated version exists
>(equivalent is defined as the same name and pointing to the same metadata address).
>
>Sometimes, you will see the text '(realloc)' after the metadata address.
>
>`r/r * 1304-128-1(realloc): IO.SYS`
>
>This occurs when the file name is in an unallocated state and the metadata structure is in an allocated 
>state. This can only occur on file systems that separate the file name from the metadata 
>(such as NTFS, Ext2/3, UFS, etc.). Seeing '(realloc)' with versions of TSK 3.0.0 and greater 
>(because of the duplicate name suppression) is generally an indication that the metadata structure has 
>been reallocated to a new file and therefore not likely to be the metadata or file content that
>originally corresponded to this file name.
>```
>>[!tip] Conclusion
>>
>>`r/r * 1876(realloc): flag.txt` was displayed when we successfully used `grep` to find files with "flag" in their names. From the above excerpt, this indicates that the file name is in an unallocated state (meaning the file has been deleted or moved), but the metadata structure (the detailed information about the file) is still in an allocated state.
>
>See also:
>- [[Unallocated space#Allocated vs. Unallocated in `fls`|Allocated vs Unallocated in `fls`]]

Hence, as expected, running `cat flag.txt` did not show anything special. 

However, the contents of `flag.txt.enc` is as follows:

```
Salted__S�+%���+�O��k�ђ(A����c��
                                @]ԣ
L�ޢȤ7� ���؎$�'%
```

 It seems like the contents have been encrypted. A salt was used in the encryption process, as we can conclude from  "Salted". 

>[!info] Salt
>In cryptography, a salt is random data fed as an additional input to a one-way function that hashes data, a password, or passphrase. Salting helps defend against attacks that use precomputed tables (E.g. [rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table)) by vastly growing the size of table required for a successful attack. It also helps protect passwords that occur multiple times in a database, since a new salt is used to each password instance (_Salt (Cryptography)_, 2024). 

Other than this, we basically have no other information about how we can decrypt the content of this file. Hence, I ran the following command to gather more information:

```bash
fls -o 411648 -r disk.flag.img | grep -C 5 flag
```

The `-C` argument displays the lines before and after the matching line(s). We can then specify the number of lines we would like to display.
- `-C 5`: Only displays 5 lines before and after the matching line(s) 

>[!tip]
>This command displayed the inode number of `.ash_history` (1875). 
>
>This file typically stores the command history for the ash shell, recording the commands users executed. It functions similarly to `.bash_history` in the Bash shell or `.zsh_history` in Zsh.
### Reverse engineering for the flag
![[PicoCTF Operation Orchid 4.png]]

We can check the contents of `.ash_history` by running the command below:
```bash
icat -o 411648 disk.flag.img 1875
```
From the displayed contents, we can pick out the command used to encrypt the file:
```bash
openssl aes256 -salt -in flag.txt -out flag.txt.enc -k unbreakablepassword1234567
```
We can see that the key used for encryption is `unbreakablepassword1234567`. 

![[PicoCTF Operation Orchid 5.png]]

We will store the encrypted contents into a file called `enc_flag.txt`, by running:
```bash
icat -o 411648 disk.flag.img 1782 > enc_flag.txt
```
The command to decrypt the encrypted contents is:
```bash
openssl aes256 -d -salt -in flag.txt.enc -out flag.txt -k unbreakablepassword1234567
```
This command stores the decrypted output in the `flag.txt` file, which we can then run `cat` on to get the flag. 

> [!NOTE] Flag
>picoCTF{h4un71ng_p457_1d02081e}
#### References
- _Salt (cryptography)_. (2024, August 26). Wikipedia. https://en.wikipedia.org/wiki/Salt_(cryptography)
- _Rainbow table_. (2024, June 23). Wikipedia. https://en.wikipedia.org/wiki/Rainbow_table
- _Fls - SleuthKitWiki_. (n.d.). https://wiki.sleuthkit.org/index.php?title=Fls