---
tags:
  - Cryptography
  - easy
  - ChallengeCreation
  - base64
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>I heard encoding and encryption are 2 different things. Not sure whether this is useful.
>
>- **Author:** Jun Wei
>- **Category:** crypto
>- **Difficulty:** easy
>
>**Files**
>- [[secret.txt]]

## 23summit46 - Solution

1. For this challenge, we are given a file called `secret.txt`. It contains a long base64-encoded string.

![[23summit46-base64.png]]

2. There are many ways to solve this challenge. We can use CyberChef to repeatedly decode from Base64. Alternatively, we can use scripts to automate this. 2 solve scripts (Python and bash) are attached below. 

> These solve scripts were developed based on the prior knowledge that the string has undergone 32 rounds of base64 encoding.
> 
> This is not blind guessing, however, because the challenge name suggests that the flag has indeed been base64-encoded 32 times.
> 
>23summit46 is a sort of wordplay:
>
>- Flipping 23 gives 32.
>
>- The opposite of "summit" could be interpreted as "base".
>
>- Flipping 46 gives 64.
>
>Put together, this suggests base64 encoded 32 times, which matches the challenge.

```python
import base64

with open("secret.txt", "r") as file:
    text = file.read().strip()

for i in range(32):
    text = base64.b64decode(text.encode()).decode("utf-8")

print(text)
```

```bash
#!/bin/bash

file="secret.txt"
text=$(cat "$file")

for i in $(seq 1 32);
do
    text=$(echo "$text" | base64 --decode)
done

cat <<< "$text"
```

3. We can use either of the above methods to obtain the flag, which will be revealed after decoding from base64 32 times.

![[23summit46-solve.png]]

Flag: `HNF{4ft3r_32_base64s}`