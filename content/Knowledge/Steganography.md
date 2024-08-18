>[!important] Description
>Steganography is the practice of concealing information within another message or physical object to avoid detection. Steganography can be used to hide virtually any type of digital content, including text, image, video, or audio content. That hidden data is then extracted at its destination (_What Is Steganography & How Does It Work?_, 2023). 

- Hiding the existence of data
- Embedding messages into image, audio, or video files
- Achieved by dividing data and hiding in unused portions of the file
- Invisibly altering the structure of a digital image

### How Steganography works

>[!important] Least Significant Bit (LSB)
>Steganography works by concealing information in a way that avoids suspicion. One of the most prevalent techniques is called ‘least significant bit’ (LSB) steganography. This involves embedding the secret information in the least significant bits of a media file. For example:
>- In an image file, each pixel is made up of three bytes of data corresponding to the colors red, green, and blue. Some image formats allocate an additional fourth byte to transparency, or ‘alpha’
>- LSB steganography alters the last bit of each of those bytes to hide one bit of data. So, to hide one megabyte of data using this method, you would need an eight-megabyte image file
>- Modifying the last bit of the pixel value doesn’t result in a visually perceptible change to the picture, which means that anyone viewing the original and the steganographically-modified images won’t be able to tell the difference.

For more information, see [this page](https://ctf101.org/forensics/what-is-stegonagraphy/)

_What Is Steganography & How Does It Work?_ (2023, February 8). /. https://www.kaspersky.com/resource-center/definitions/what-is-steganography
Llc, O. L. C. (n.d.). _What is Steganography - CTF Handbook_. https://ctf101.org/forensics/what-is-stegonagraphy/