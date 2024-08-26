---
tags:
  - Cryptography
  - medium
  - Python
  - Substitution
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-26T14:40:25+08:00
---
## Challenge Description
![[PicoCTF spellingquiz.png]]

This is, once again, a challenge involving substitution ciphers. 

We begin by downloading the given file and seeing its contents.

### Contents of the file
![[PicoCTF spellingquiz 2.png]]

After downloading the file using `wget <link>`, we realise that it is a `zip` file. 

We proceed to unzip this file (`public.zip)`, creating another directory called `public`, with 3 files in it, namely `encrypt.py`, `study-guide.txt` and `flag.txt`.

### The encrypted flag and the script used to encrypt it
![[PicoCTF spellingquiz3.png]]
Running `cat` on both the `flag.txt` and `encrypt.py` files provides us with more information on how we should continue. 

The contents of the `flag.txt` file is:
```
brcfxba_vfr_mid_hosbrm_iprc_exa_hoav_vwcrm
```

For the `encrypt.py` file, we realise that this script is used to encrypt the contents of all `.txt`files in the current directory as well as its subdirectories. 

>[!todo]+ `encrypt.py` (with added comments)
>```python
>import random
>import os
>
># Produce a list of all .txt files in the current directory and subdirectories
>files = [
>    os.path.join(path, file)               # Get the full path to each file
>    for path, dirs, files in os.walk('.')  # Walk through the directory tree, starting from the current directory
>    for file in files
>    if file.split('.')[-1] == 'txt'        # Include only files with a .txt extension
>]
>
># Generate a shuffled alphabet for substitution cipher
>alphabet = list('abcdefghijklmnopqrstuvwxyz')
>random.shuffle(shuffled := alphabet[:])
>dictionary = dict(zip(alphabet, shuffled)) # Map each original letter to its shuffled counterpart using a dictionary
>
># Encrypt the contents of each .txt file using the substitution cipher
>for filename in files:
>    text = open(filename, 'r').read()
>    encrypted = ''.join([
>        dictionary[c]                      # Substitute character 'c' if it's in the dictionary
>        if c in dictionary else c          # Leave the character unchanged if it's not in the dictionary
>        for c in text
>    ])
>    open(filename, 'w').write(encrypted)
>```
>>[!important] Key for this substitution cipher
>>Since the key(dictionary) for this substitution cipher is produced randomly, we are unable to reverse-engineer to find the key.

### Contents of `study-guide.txt`
![[PicoCTF spellingquiz 4.png]]

Running `cat study-guide.txt` displays the 272543 encrypted lines in this file.

>[!tip] Number of lines
>To display the number of lines in a file, we can run this command:
>```bash
>wc -l < file-name >
>```
>This will print the number of lines in a file, followed by the name of the file

Since we are unable to reverse-engineer the key, we can do [frequency analysis](https://www.101computing.net/frequency-analysis/) based on the contents in this file instead. After all, this should be the reason this file was provided.

### Getting the Flag
![[PicoCTF spellingquiz 5.png]]

For this challenge, I used [this](https://www.boxentriq.com/code-breaking/cryptogram) tool from [Boxentriq](https://www.boxentriq.com/) to retrieve the flag. I was able to get the flag by feeding this tool the first 50 lines of the `study-guide.txt` file, and adding the encrypted flag at the top. 

>[!NOTE] Flag
>picoCTF{perhaps_the_dog_jumped_over_was_just_tired}