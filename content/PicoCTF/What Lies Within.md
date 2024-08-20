---
tags:
  - Forensics
  - medium
  - Steganography
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-20T23:13:03+08:00
---
## Challenge Description
![[PicoCTF What Lies Within.png]]

Let's begin by downloading the file using `wget <link>`. 

### `buildings.png`

![[PicoCTF What Lies Within  2.png]]

The downloaded file, `buildings.png` looked like this. Doesn't seem helpful in any way.

>[!question] PicoCTF Hint: There is data encoded somewhere... there might be an online decoder
>This may be hinting that this is a [[Steganography]] challenge.

### Decoded Flag

![[PicoCTF What Lies Within 3.png]]

Following the directions in the hint, I went to Google and searched "Online png decoder", and tried using the [top search result](https://stylesuxx.github.io/steganography/) to see where it leads me. After putting the `building.png` file as input and clicking "Decode", indeed, the flag was in the first line within the "Hidden message" space. 

> [!NOTE] Flag
> picoCTF{h1d1ng_1n_th3_b1t5}

