---
modified: 2024-09-02T21:48:14+08:00
---
>[!info] What is Steghide and why is it used?
>Steghide is a steganography program that helps in hiding data in various kinds of image and audio files. In this process, the color- respectivly sample-frequencies are not changed thus making the embedding resistant against first-order statistical tests.
>
>- Steghide supports file formats like JPEG, BMP, WAV and AU. File formats like PNG are not supported with this tool.
>  
>To check whether a file has [[Steganography]] embedded data:
>```bash
># Displays info about a file (whether it contains embedded data)
>steghide info < file-name >
>```
>
>
>>[!tip] Extract data
>>Of course, it can also do the reverse and extract the data from these files. The most basic command is:
>>```bash
>>steghide extract -sf < file-name >
>>```



