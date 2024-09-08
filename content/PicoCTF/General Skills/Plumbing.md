---
tags:
  - GeneralSkills
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-08T20:35:28+08:00
---
## Challenge Description

![[PicoCTF Plumbing.png]]

When I saw the challenge name, my first instinct was that I'll be required to use pipe ("`|`") for this challenge. Of course, it will be pointless guessing without more clues.

 There was a command given in the challenge description that attempts to establish a connection to the server `jupiter.challenges.picoctf.org` on port 14291:

```bash
nc jupiter.challenges.picoctf.org 14291
```

### Overwhelming Output
![[PicoCTF Plumbing 2.png]]

When I ran the command, the output contained an overwhelming number of lines, and finding the flag within this was like finding a needle in a haystack.

### Searching with a Goal
![[PicoCTF Plumbing 3.png]]

>[!faq] How many lines?
>
>```bash
>nc jupiter.challenges.picoctf.org 14291 | wc -l
>```
>- `-l`:  print the newline counts (basically total number of lines)
>
>I piped the output received through `wc` with the `-l` argument to check how many lines it consisted of. This step is optional; I was just curious.

Since I knew that the flag format for picoCTF challenge is always `picoCTF{...}`, I can simply pipe the output through `grep` with the search term being "pico" to find our flag, using the command shown below.

```bash
nc jupiter.challenges.picoctf.org 14291 | grep pico
```

>[!fail] Why can't the search term be "`flag`"?
>
>For many CTF challenges, in order to find the flag using `grep`, there are typically 2 categories of search terms.
>
>- "`flag`": This search term helps to quickly locate flag patterns in files that may contain a flag in a recognizable format, but where you don't know the full string (**generic search term**).
>- subset of, or the full flag format like "`pico`": By searching for the platform-specific keyword (e.g., `pico`), you're targeting the exact format used in that particular challenge, which can help filter out irrelevant results and quickly pinpoint the flag. In fact, [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) can also be used.
>  
>  For this challenge, as you can see from the above pictures containing the output, there are many lines with the word "flag" in them. In fact, these make up the majority of the lines. Thus, using "`flag`" as the search term will not narrow the scope of the search for the flag.

With that being said, we can find our flag with the search term being "`pico`" using the command stated above.

> [!NOTE] Flag
> picoCTF{digital_plumb3r_ea8bfec7}
#### References
- _Regular expression_. (2024, September 6). Wikipedia. https://en.wikipedia.org/wiki/Regular_expression


