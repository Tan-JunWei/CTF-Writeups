---
tags:
  - GeneralSkills
  - easy
  - MD5
  - Hash
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-05T21:45:46+08:00
---
## Challenge Description
![[PicoCTF HashingJobApp.png]]

From the challenge description and name, we can tell that the challenge's about cryptographic [hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions). But we don't know which. 

### Understanding the challenge
![[PicoCTF HashingJobApp 2.png]]

After I launched an instance, I was given this command to run:

```bash
nc saturn.picoctf.net 62154
```

After using this command to connect to the server, I realised what the challenge was all about. We are given a random text, and we are required to provide the [MD5](https://en.wikipedia.org/wiki/MD5) hash of the text. After submitting 3 correct MD5 hashes of 3 different strings, we are given the flag. 

For this challenge, I just used a random online MD5 hash generator to acquire the MD5 hashes. Any works!

> [!NOTE] Flag
> picoCTF{4ppl1c4710n_r3c31v3d_bf2ceb02}

#### References
- _List of hash functions_. (2024, June 23). Wikipedia. https://en.wikipedia.org/wiki/List_of_hash_functions
- _MD5_. (2024, August 30). Wikipedia. https://en.wikipedia.org/wiki/MD5