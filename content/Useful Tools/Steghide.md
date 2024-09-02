---
modified: 2024-09-02T21:50:50+08:00
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


#### References
- Kmety, M. (2022, March 30). Steganography on Kali Using Steghide - The KickStarter - Medium. _Medium_. https://medium.com/the-kickstarter/steganography-on-kali-using-steghide-7dfd3293f3fa
- Alim, A. (2022, January 22). Steghide — A beginners tutorial - System Weakness. _Medium_. https://systemweakness.com/steghide-a-beginners-tutorial-35ec0ea90446
- Canonical. (n.d.). _Ubuntu Manpage: steghide - a steganography program_. https://manpages.ubuntu.com/manpages/xenial/man1/steghide.1.html#:~:text=The%20JPEG%2C%20BMP%2C%20WAV%20and,graph%2Dtheoretic%20approach%20to%20steganography.
- xRick. (2019, January 25). _Steganography - A list of useful tools and resources_. 0xRick’s Blog. https://0xrick.github.io/lists/stego/#:~:text=Steghide%20is%20a%20steganography%20program,encrypted%20data%20from%20other%20files.
