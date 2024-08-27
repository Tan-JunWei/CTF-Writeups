---
tags:
  - Cryptography
  - medium
  - Substitution
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-27T17:10:00+08:00
---
## Challenge Description
![[PicoCTF Flags.png]]

Looks like an interesting challenge with a seemingly helpful description. Let's see.

We first download the file using `wget <link>`. The file downloaded is called `flag.png`. Opening it will show the contents below.
### How the downloaded file looks like
![[PicoCTF Flags 2.png]]
### Understanding the challenge
We see that each character of the original flag has been replaced by unique flags, although we are unsure what these flags represent yet. 

We know that we are dealing with a Substitution cipher, since it looks like we can reverse engineer to get the flag as it seems like it is already in the correct `picoCTF{...}` flag format. This is proven as we can see the 3rd and 5th character of the ciphertext above being replaced by the same flag. The 2 "C"s in `picoCTF` have been replaced by the same flag. 

>[!question] PicoCTF Hint: The flag is in the format PICOCTF{}
>Our claim above is justified by this hint.

So, we can proceed by checking what these flags mean. Since I had no prior knowledge about the flags, I searched "`blue flag with white square`" on Google, and checked the top search results. This brought me to [this](https://www.nps.gov/media/photo/gallery-item.htm?id=29091438-15a4-447d-851c-5a9481d211f7&gid=791FF38A-DF86-4963-932F-EE7641143F49) page. 

>[!tip] What are these flags?
>According to the page above, the first flag (blue background with white square in the middle) in the ciphertext is the ICS signal flag for "P". This once again justifies my observation above. 

We have now established that the flags above are ICS signal flags. The [Wikipedia page for ICS signal flags](https://en.wikipedia.org/wiki/International_Code_of_Signals) shows a useful image that we can use to find the plaintext:


![[PicoCTF Flags 3.png|500]]


>[!warning] Remaining unknown flags
>Using the above image, we can replace the flags with the letters associated with them. This allows us to get the following string:
>
>```
>PICOCTF{F?AG?AND5TUFF}
>```
>
>2 of the flags are not included in the above image, which causes us to have 2 unknown characters in the plaintext (as shown by the question marks `?`)
>

>[!fail] Possible approach: Guessing
>Now, we can technically guess that the flag is going to be `PICOCTF{F1AG5AND5TUFF}`, because the question marks will likely be replaced by numbers since they were not replaced by letters. 
>
>However, we shall not just rely on our intelligent guess. 

>[!tip] Finding the full flag
>After further searching online, I found [this](http://www.quadibloc.com/other/flaint.htm) page, which states "The illustration below illustrates the flags used for the International Code of Signals, and additional flags currently in use by the U.S. Navy and apparently by the British Navy as well".
>
>This was accompanied by the following image:
>
>![[PicoCTF flag 4.png|400]]

With this, we can finally replace the 2 question marks and obtain the full flag, instead of purely guessing. 

 >[!NOTE] Flag
>PICOCTF{F1AG5AND5TUFF}

