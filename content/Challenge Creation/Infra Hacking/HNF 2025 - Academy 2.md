---
tags:
  - InfraHacking
  - hard
  - ChallengeCreation
  - GTFOBins
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>Triton Academy appears unremarkable at first glance, just another corner of the web with tidy pages and familiar promises. Some pages do not end where they should. Certain words repeat, faint echoes tucked into forgotten archives, and the academy’s silence feels strangely watchful.
>
>Hidden in its structure is a secret waiting to be uncovered. Those who wander too far notice that the academy sometimes answers back. Patterns emerge, and paths (that were never meant to be followed) unfold.
>
>NOTE: Academy is a multi-part challenge. This is part TWO of the Academy challenge, where you are tasked to submit the ROOT flag.
>
>Rules of Engagement:
>
>1. The flag is located at `/root/root.txt`.
>2. The use of all forms of Nmap scanning is within scope of this challenge.
>3. The use of all forms of enumeration/brute forcing that is necessary to solve this challenge is within scope of this challenge.
>4. This machine DOES respond to ICMP (ping) requests. Be patient and don't just throw -Pn at the problem.
>
>- **Author:** Jun Wei
>- **Category:** infra
>- **Difficulty:** hard
>
>**Hints**
>
>- `There are multiple users on the target machine. Perhaps some of these accounts aren't as protected as they should be.` (50 points)
>- `I don't particularly like what the cow says. But I think it may be there for a reason.` (30 points)


## Academy 2 - Solution

"Academy" is a multi-part infra hacking challenge that tests several skills:
- File upload bypasses
    - File upload vulnerability exists on the page where authenticated students can upload a profile picture.
    - However, the application enforces a blocklist that prevents upload of `.php` files. 
    - Bypass this by changing into other acceptable file extensions like `.phtml`.
- SSH bruteforcing to gain access to user accounts
- GTFOBins for privilege escalation

"Academy 2" tests on the final skill, which is privilege escalation. As such, only the steps taken to obtain the `root` flag will be demonstrated in the writeup below. 

The true difficulty in this challenge is probably (**horizontal**) privilege escalation, as most CTF-style rooms/boxes typically follows the same flow: Get initial foothold on machine (through web vulnerability, plaintext credentials somewhere, etc.), and run automated privilege escalation scripts in order to escalate our privileges vertically (to `root`) and access the `/root` folder. There is usually an obvious path for rooting the machine. 

However, this isn't the case for this challenge. This challenge tests players on whether they are able to realise that port 22 (SSH) is open on the server and whether they are able to find the valid user accounts' usernames after getting an initial foothold as the `www-data` user. These 2 were the prerequisites before performing SSH bruteforce attempts. 

This challenge was designed to highlight the importance of "moving horizontally until we can move vertically". We may not always be able to `root` a machine in 5 minutes after compromising our first user. That should be the main takeaway of this challenge.

With that said, enjoy the extremely brief and straightforward 4-step demonstration of privilege escalation below!

1. From the previous part of the challenge (Academy 1), we should have already gotten access to 2 users on the target machine (`jwalker` and `panderson`). The `user` flag is stored in `/home/panderson`.

```bash
ssh panderson@10.10.1.129
```

![[Academy-2-21.png]]

2. From here, we need to perform some form of privilege escalation to get the root flag.

Running `sudo -l` as `panderson` reveals that the `cowsay` command can be executed with `sudo` privileges.

3. We may refer to GTFObins (https://gtfobins.github.io/gtfobins/cowsay) to check how we might be escalate our privileges for our current situation.

![[Academy-2-22.png]]

4. By running the commands shown, we should be able to gain a shell as the `root` user. We have now successfully rooted the machine and can enjoy our `root.txt` flag!

```bash
TF=$(mktemp)
echo 'exec "/bin/sh";' >$TF
sudo /usr/games/cowsay -f $TF x
```

![[Academy-2-23.png]]

Well, that's the intended solve of this challenge! During the CTF itself, I actually received a DM from a participant who was trying to solve this challenge, and he actually managed to get the root flag using an unintended solution (with **CVE-2023-2640**)!

![[unintended solve.png]]

I guess it was my fault for using a slightly outdated Ubuntu OS version. But hey, it's still a valid solution! I love seeing unintended solutions on "infra hacking" challenges, like those on THM/HTB, as they truly highlight the fact that there is usually more than 1 way to solve a challenge. That also means that we shouldn't always assume that a system is invulnerable and impossible to compromise :)

Anyways, here's the root flag: `HNF25{c0ll4tera1_d4m4g3_t0_r00t}`