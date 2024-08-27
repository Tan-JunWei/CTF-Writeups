---
tags:
  - Cryptography
  - medium
  - CaesarCipher
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-27T17:04:27+08:00
---
## Challenge Description
![[PicoCTF Caesar.png]]

This challenge, as both the name and hint suggest, is all about the Caesar cipher.

### Encrypted flag
![[PicoCTF Caesar 2.png]]
We first download the provided file using `wget`, and running `cat` on it displays the following string:
```
picoCTF{ynkooejcpdanqxeykjrbdofgkq}
```
This looks like a possible flag that we can submit...right? Nope.

### Acquiring Clues
>[!info] Flag
>In typical challenges, flags typically consist of readable text, often with some letters replaced by numbers. 
>
>An example containing only words from the english dictionary is from [[The Numbers]] challenge, where the flag was `PICOCTF{THENUMBERSMASON}`.
>
>There are also instances where some, if not most, of the letters in the flag are substituted by similar looking numbers instead. The flag for [[credstuff]] is `picoCTF{C7r1F_54V35_71M3}`, which is still "readable" in some sense since we can make out the words "CtrlF saves time".
>
>##### Anomalies
>Of course, there are anomalies such as the flag for [[New Caesar]]:
>
>`picoCTF{et_tu?_5723f4e71a0736d3b1d19dde4279ac03}`
>
>As you can see, this flag just looks like a combination of random characters.


>[!tip] So, how does this help us solve the problem at hand?
>The string of characters in the "flag" above, `ynkooejcpdanqxeykjrbdofgkq`, seems suspicious. 
>
>As we know, the [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) is a substitution cipher where each letter in the [plaintext](https://en.wikipedia.org/wiki/Plaintext "Plaintext") is replaced by a letter some fixed number of positions down the alphabet. Hence, since we are dealing with the Caesar cipher in this challenge, the correct flag should not contain numbers.
>>[!question] Piecing everything together
>>This begs the next question: If the correct flag doesn't contain any numbers, it should look similar to the first flag format example above, where the flag contains readable text. Hence, it will likely contain words in the English dictionary that we should look out for.

The problem now is that we don't know the number of rotations required to shift each letter in the ciphertext to obtain the plaintext. We only have 1 clue, which is that the plaintext will likely contain word(s) in the English dictionary. 

However, the good news is that since there are only 26 possible shifts for the Caesar cipher, one for each letter in the alphabet. We will at most require 25 attempts to find the plaintext, because the 26th shift returns the original ciphertext.

We can bruteforce this in many ways, such as writing a script or using an online tool like [[CyberChef]].
### Flag
![[PicoCTF Caesar 3.png]]

For this challenge, I used [[CyberChef]] to obtain the plaintext. It didn't take too long for me to realise that the key (shift) used was 4, as the other values produced random strings of characters. From here, we just have to wrap this plaintext in `picoCTF{...}` format to get the flag.

> [!NOTE] Flag
>picoCTF{crossingtherubiconvfhsjkou}