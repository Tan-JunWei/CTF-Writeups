---
modified: 2024-08-23T14:27:28+08:00
---
Stegseek is a lightning fast steghide cracker that can be used to extract hidden data from files. It is built as a fork of the original steghide project.

>[!info] Uses
>Stegseek can also be used to extract steghide metadata without a password, which can be used to test whether a file contains steghide data.

>[!tip] Cracking
>The most important feature of stegseek is wordlist cracking:
>
>```
>stegseek [stegofile.jpg] [wordlist.txt]
>```
>
>This mode will simply try all passwords in the provided wordlist against the provided stegofile.

All information is taken from their official [GitHub](https://github.com/RickdeJager/stegseek?tab=readme-ov-file) page.