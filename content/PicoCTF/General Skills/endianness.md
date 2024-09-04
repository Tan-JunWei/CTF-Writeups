---
tags:
  - GeneralSkills
  - easy
  - Endianness
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-04T21:30:19+08:00
---
## Challenge Description
![[PicoCTF endianness.png]]

Honestly, I did not have much knowledge about endianness and what exactly is Big-Endian and Little-Endian before this challenge. Thus this challenge was a good introduction to the concept for me. 

>[!todo] What is endianness? 
>
>I was able to get a basic understanding of endianness from these 2 sources:
>
>- [Endianness - Wikipedia](https://en.wikipedia.org/wiki/Endianness)
>- [What is Endianness? Big-Endian & Little-Endian -  GeeksforGeeks](https://www.geeksforgeeks.org/little-and-big-endian-mystery/)
>  
>  Basically, endianness refers to the order in which bytes are arranged in computer memory. 
>  In a Big-Endian system, the most significant byte (MSB) is stored at the smallest memory address, and the least significant byte (LSB) at the largest. A Little-Endian system is of course the opposite, with the LSB at the smallest memory address and the MSB at the largest. 

### Little endian and big endian representations of a word

I first downloaded the provided file, which was a program written in `C` programming language.

![[PicoCTF endianness 2.png]]

#### References 
- _Endianness_. (2024, July 7). Wikipedia. https://en.wikipedia.org/wiki/Endianness
- GeeksforGeeks. (2024c, May 23). _What is Endianness? BigEndian & LittleEndian_. GeeksforGeeks. https://www.geeksforgeeks.org/little-and-big-endian-mystery/
- _Tutorial: Character Encoding_. (n.d.). https://dsc.gmu.edu/tutorials-data/tutorial-character-encoding/#:~:text=Just%202%20hex%20characters%20can,prefixed%20with%200x%20%2C%20like%200xC8%20.