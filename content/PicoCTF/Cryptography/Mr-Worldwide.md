---
tags:
  - Cryptography
  - medium
  - Geography
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-27T10:50:06+08:00
---
## Challenge Description
![[PicoCTF Mr-Worldwide.png]]

Seems like an interesting challenge. We first download the file and display its contents using `wget <link>` and `cat <file-name>` respectively.

### Contents of `message.txt` (Coordinates)
![[PicoCTF Mr-Worldwide 2.png]]

Running `cat` displays a surprising output:
```
picoCTF{(35.028309, 135.753082)(46.469391, 30.740883)(39.758949, -84.191605)(41.015137, 28.979530)(24.466667, 54.366669)(3.140853, 101.693207)_(9.005401, 38.763611)(-3.989038, -79.203560)(52.377956, 4.897070)(41.085651, -73.858467)(57.790001, -152.407227)(31.205753, 29.924526)}
```

It seems like each coordinate will provide us with a letter for the flag. However, there is an issue. We do not know which letter we should take. It could be in the city name, or the country name. 

### Approach

We continue by using some geolocation tool to find the different locations, such as Google Maps. After some trial and error, I realised that we are supposed to take the first character of the city name at each location. 

>[!tip] Getting the Flag
>```python
>[K]yoto, Japan             (35.028309, 135.753082)
>[O]dessa, Ukraine          (46.469391, 30.740883)
>[D]ayton, Ohio, USA        (39.758949, -84.191605)
>[I]stanbul, Turkey         (41.015137, 28.979530)
>[A]bu Dhabi, UAE           (24.466667, 54.366669)
>[K]uala Lumpur, Malaysia   (3.140853, 101.693207)
>_
>[A]ddis Ababa, Ethiopia    (9.005401, 38.763611)
>[L]oja, Ecuador            (-3.989038, -79.203560)
>[A]msterdam, Netherlands   (52.377956, 4.897070)
>[S]leepy Hollow, NY, USA   (41.085651, -73.858467)
>[K]odiak, Alaska, USA      (57.790001, -152.407227)
>[A]lexandria, Egypt        (31.205753, 29.924526)
>```

 >[!NOTE] Flag
>picoCTF{KODIAK_ALASKA}

