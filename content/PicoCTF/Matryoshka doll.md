---
tags:
  - Forensics
  - medium
  - binwalk
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-20T15:53:04+08:00
---
## Challenge Description 
![[PicoCTF Matryoshka doll.png]]

This seems like an interesting challenge. The name suggests that we will probably have to recursively extract embedded files from the file provided, since [this source](https://en.wikipedia.org/wiki/Matryoshka_doll) explains what Matryoshka Dolls are. 

### Attempting first binwalk

![[PicoCTF Matryoshka doll 2.png]]

After downloading the file using `wget <link>`, I tested this hypothesis by first running `binwalk`. Indeed, there were embedded files that we can extract using `binwalk -e <file-name>`.

>[!question] PicoCTF Hint: Wait, you can hide files inside files? But how do you find them?
>This once again confirms that we will likely rely on `binwalk` for most parts of the challenge.

### Extracted Contents
![[PicoCTF Matryoshka doll 3.png]]
After using `binwalk -e <file-name>` as described earlier, we realise that a new directory with a `zip` file and another directory was extracted. Since this challenge was named "Matryoshka doll", I wasted no time and `cd` into the `base_images` directory. A simple `ls` revealed a file called `2_c.jpg` within it. 

>[!important] My Initial Plan
>My initial plan was to continuously `cd` and `binwalk -e` to extract embedded files recursively. If that didn't work, I would try unzipping the `4286C.zip` file and analyse it.

### Continuing the Journey
![[PicoCTF Matryoshka doll 4.png]]

Running `binwalk -e` on this file allowed us to extract another directory with similar contents. This confirmed that I was most likely heading in the right direction ([Matryoshka Doll concept](https://en.wikipedia.org/wiki/Matryoshka_doll)). 

### Again
![[PicoCTF Matryoshka doll 5.png]]
A final `binwalk -e` on `4_c.jpg` extracted a `_4_c.jpg extracted` directory, but did not extract a `base_images` directory. Hence I stopped and did an `ls` to list the contents of the `_4_c.jpg extracted` directory. 
>[!success] flag.txt
>A `flag.txt` was present in this directory. Using `cat` revealed the flag in plaintext.

> [!NOTE] Flag
>picoCTF{ac0072c423ee13bfc0b166af72e25b61} 
