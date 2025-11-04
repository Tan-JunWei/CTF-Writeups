---
tags:
  - Miscellaneous
  - easy
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>I hope you paid attention during the Linux workshop. What does grep do again?
>
>Flag is in the following format: `YCEP25{flag}`
>
>- **Author:** Jun Wei
>- **Category:** misc
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Hints**
>- `How do we display only the lines with a specified string?`  (50 points)
>
>**Files**
>- [[story.txt]]

## Grab Flag - Solution

The file given contains a very long story. To filter for the flag, simply use the command `cat story.txt | grep YCEP` or other similar commands.

The flag is stated within a paragraph that looks like this:

```bash
┌──(nepz㉿nepz)-[~]
└─$ cat story.txt | grep YCEP
The attackers, with access to the Databanks, launched an assault on the Central Core. Their primary objective was clear: steal the kingdom’s master encryption key, "YCEP25{gr3p_1s_c00l}", which was the only key capable of unlocking the most sacred and secretive data stored within the Core. The Dark Netra's best hacker, known only as "NullDread," led the charge.
```

Flag: YCEP25{gr3p_1s_c00l}


