---
modified: 2024-09-02T22:03:22+08:00
---
Stegseek is a lightning fast steghide cracker that can be used to extract hidden data from files. It is built as a fork of the original steghide project.

>[!info] Uses
>Stegseek can also be used to extract steghide metadata without a password, which can be used to test whether a file contains steghide data.

>[!tip] Cracking
>The most important feature of stegseek is wordlist cracking. StegSeek uses a wordlist that you provide to crack hidden data in the file:
>
>```
>stegseek [stegofile.jpg] [wordlist.txt]
>```
>
>This mode will simply try all passwords in the provided wordlist against the provided stegofile.

All information is taken from their official [GitHub](https://github.com/RickdeJager/stegseek?tab=readme-ov-file) page.

#### References
- RickdeJager. (n.d.). _GitHub - RickdeJager/stegseek: :zap: Worlds fastest steghide cracker, chewing through millions of passwords per second :zap:_ GitHub. https://github.com/RickdeJager/stegseek?tab=readme-ov-file
- Banerjee, R. (2024, March 27). Steganography : Tools & Techniques - Ria Banerjee - Medium. _Medium_. https://medium.com/@ria.banerjee005/steganography-tools-techniques-bba3f95c7148