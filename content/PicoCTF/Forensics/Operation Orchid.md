---
tags:
  - Forensics
  - medium
  - Sleuthkit
  - OpenSSL
modified: 2024-08-29T15:04:48+08:00
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

Running `mmls` displays the partition tables of this volume system. We see that there are 2 Linux partitions that we shall check. 

>[!tip] `fls` 
>We run `fls -o <img-offset> -r <disk-img-name>` to list the file and directories names in the disk image. 
>
>The `-r` argument allows us to recursively display directories.

Running this command on the `2048` offset did not show anything suspicious. However, running this command on the `411648` offset displays an overwhelming number of files and directories. So we shall zoom in to this. 

### Finding the Flag?
![[PicoCTF Operation Orchid 3.png]]

I continued and tried to use `grep "flag"` to check if there is any file or directory that contains the word "flag" in its name. Indeed, running this command revealed 2 files, `flag.txt` and `flag.txt.enc`.

Running `cat flag.txt` did not show anything special. However, there was something that caught my eye:

```
Salted__S�+%���+�O��k�ђ(A����c��
                                @]ԣ
L�ޢȤ7� ���؎$�'%
```

The above shows the contents of `file.txt.enc`. It seems like it has been encrypted. A salt was used in the encryption process, as we can conclude from  "Salted". 

>[!info] Salt
>In cryptography, a salt is random data fed as an additional input to a one-way function that hashes data, a password, or passphrase. Salting helps defend against attacks that use precomputed tables (E.g. [rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table)) by vastly growing the size of table required for a successful attack. It also helps protect passwords that occur multiple times in a database, since a new salt is used to each password instance (_Salt (Cryptography)_, 2024). 

Other than this, we basically have no other information about how we can decrypt the content of this file. Hence, I ran the following command:

```bash
fls -o 411648 -r disk.flag.img | grep -C 5 flag
```

We limit the displayed output by using `grep -C 5 flag`. 
- `-C 5`: Only displays the 5 lines before and after the matching line(s) 

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