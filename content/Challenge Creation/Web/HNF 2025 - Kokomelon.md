---
tags:
  - WebExploitation
  - easy
  - ChallengeCreation
  - DirectoryEnumeration
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>Cocomelon specializes in 3D animation videos of traditional nursery rhymes and original children's songs... I think? Pretty sure that's how kids learn stuff nowadays. Certainly did not use that to learn my ABCs.
>
>- **Author:** Jun Wei
>- **Category:** web
>- **Difficulty:** easy

## Kokomelon - Solution

1. This challenge is really straightforward, as the description above already presents the task. All users need to do is find the correct letter out of the 52 (*26 uppercase* + *26 lowercase*) possible characters.

![[Home.png]]

2. The users may manually click through the buttons that redirect them to the page that shows the corresponding letter. The screenshot below shows an example.

![[trial.png]]

3. Of course, this is not the best way to solve the challenge. Instead, we can use a Python script that checks for the flag format `HNF25{}` on every page, out of the 52 possibilities.

```python
import requests
import string
import re

base_url = "http://127.0.0.1:5000/"
flag_prefix = "HNF25"

pattern = re.compile(rf"{re.escape(flag_prefix)}\{{([^}}]+)\}}")

for letter in string.ascii_letters:
    url = f"{base_url}{letter}"
    try:
        resp = requests.get(url, timeout=10)
        m = pattern.search(resp.text)
        if m:
            inner = m.group(1)  # content inside the flag format
            flag = f"{flag_prefix}{{{inner}}}"
            print(f"[+] SUCCESS: FLAG found at {url}: {flag}")
        else:
            print(f"[-] FAILURE: No {flag_prefix}{{...}} in {url}")
    except requests.RequestException as e:
        print(f"[!] Error fetching {url}: {e}")
```

As shown below, the flag was found using the script. The secret letter was `W`.

![[kokomelon.png]]

> [!NOTE] Flag
> HNF25{i_l0v3_c0c0m3l0n!}