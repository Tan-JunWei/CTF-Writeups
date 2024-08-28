---
tags:
  - Cryptography
  - medium
  - MorseCode
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-28T16:07:46+08:00
---
## Challenge Description
![[PicoCTF tapping.png]]

>[!question] PicoCTF Hint:What kind of encoding uses dashes and dots?

Both the description and the hint imply that the flag we are looking for in this challenge is most likely encoded using morse code. 

In fact, this made me recall the [[morse-code]] challenge where the challenge was to decode morse code (`.wav` file).

After I ran `nc jupiter.challenges.picoctf.org 9422`, this was displayed:

```
.--. .. -.-. --- -.-. - ..-. { -- ----- .-. ... ...-- -.-. ----- -.. ...-- .---- ... ..-. ..- -. ..--- -.... ---.. ...-- ---.. ..--- ....- -.... .---- ----- }
```

We likely have the correct flag format, as the encoded text included the curly braces `{}`. So we will only need to convert the morse characters into letters to get our flag.
### Decoding morse code using a script

We can either decode morse code using an online morse code translator, or write a script to do the same thing.

>[!abstract] Python Script to decode morse code
>This script translates each morse sequence into its corresponding character using a dictionary. Characters that are not morse characters, such as the curly braces `{}` remain unchanged.
>```python
>morse_characters = ['.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..',"-----",".----","..---","...--","....-",".....","-....","--...","---..","----."]
>
>morse_dict = dict(zip(morse_characters,'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')) 
>
>def morse_code(text:str)->str:
>    plaintext = ""
>    morse = text.split()
>    for char in morse:
>        if char in morse_characters:
>            plaintext += morse_dict[char]
>        else:
>            plaintext += char
>    return plaintext
>
>morse = ".--. .. -.-. --- -.-. - ..-. { -- ----- .-. ... ...-- -.-. ----- -.. ...-- .---- ... ..-. ..- -. ..--- -.... ---.. ...-- ---.. ..--- ....- -.... .---- ----- }"
>print(morse_code(morse)) # PICOCTF{M0RS3C0D31SFUN2683824610}
>```

### Decoding morse code using online tools
![[PicoCTF tapping 2.png]]

[BoxenTriq's morse code translator] is also another option to get the flag, without programming.

>[!warning] Caution
>The translator helps to translate the morse characters successfully, giving us this string:
>```
>PICOCTF#M0RS3C0D31SFUN2683824610#
>```
>However, since the curly braces `{}` are not regarded as morse characters (and therefore are not translated), they are replaced with hashtags "`#`" instead by the translator. Thus we will have to manually replace the hashtags '`#`' with curly braces '`{}`' accordingly to get the correct flag.

>[!NOTE] Flag
>PICOCTF{M0RS3C0D31SFUN2683824610#}