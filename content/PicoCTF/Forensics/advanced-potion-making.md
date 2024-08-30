---
tags:
  - Forensics
  - medium
  - Image
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-30T14:39:35+08:00
---
## Challenge Description

![[PicoCTF advanced potion making .png]]

We begin our quest for the flag by downloading the file using `wget`. Running `file advanced-potion-making` and `exiftool advanced-potion-making` did not provide us with any clue about the file type of this file. 

![[PicoCTF advanced potion making 2.png]]
### Trying `hexedit`
![[PicoCTF advanced potion making 4.png]]

According to [this source](https://www.oreilly.com/library/view/learning-malware-analysis/9781788392501/1b730be0-0f55-4400-a375-de996989d966.xhtml#:~:text=The%20manual%20method%20of%20determining,the%20analysis%20of%20a%20file.), one way of determining the file type is to look for the [_file signature_](https://threat.media/definition/what-is-a-file-signature/) by opening it in a hex editor.

>[!important] Hex Editor
>A _hex editor_ is a tool that allows an examiner to inspect each byte of the file; most hex editors provide many functionalities that help in the analysis of a file.

So I proceeded to use `hexedit` and recognised that this file is likely a `png` file with a wrong file signature. 

![[PicoCTF advanced potion making 3.png]]
With reference to [this page](https://medium.com/@0xwan/png-structure-for-beginner-8363ce2a9f73), I changed the file header of this file using `hexedit`. 

### `pngcheck` and `zsteg`
![[PicoCTF advanced potion making 5.png]]
After changing the header, I used `cp` to add a `.png` file extension to the file, and tested this file for corruption using `pngcheck -v advanced-potion-making.png`. Thankfully, there were no errors. I proceeded to attempt `zsteg` to check if there was any hidden data. However this was not useful. 

### Looking at the image from another angle

![[advanced-potion-making.png]]
The above shows how the `advanced-potion-making.png` image looks like. It seems that it's just one red image with nothing of interest. I tried using the _bucket tool_ in [GIMP - GNU Image Manipulation Program](https://www.gimp.org/), but that did not reveal our flag. 

![[PicoCTF advanced potion making 6.png]]

I then headed over to [https://29a.ch/photo-forensics/#forensic-magnifier](https://29a.ch/photo-forensics/#forensic-magnifier) to see if I can retrieve the flag by magnifying the image. Indeed, hovering over specific portions of the image reveals parts of the flag. I would be able to get the flag from this. But this process would be rather tedious if I rely solely on magnification. 

### The Flag
![[PicoCTF Advanced Potion Making 7.png]]

I searched online for other tools for image forensics, and came across [Aperi'Solve](https://www.aperisolve.com/). This was my first time using it. As seen above, the full flag was easily seen when I uploaded the file on Aperi'Solve.

For more information, see [[Aperi'Solve]] or refer to their [official GitHub page](https://github.com/Zeecka/AperiSolve).

![[PicoCTF advanced potion making 8.png]]

The flag can be read easily from the above image, although the '`1`' may be mistaken to be an '`i`'.

> [!NOTE] Flag
> picoCTF{w1z4rdry}

