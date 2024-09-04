---
tags:
  - GeneralSkills
  - easy
  - SSH
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-04T14:00:55+08:00
---
## Challenge Description

![[PicoCTF Super SSH.png]]

The challenge description basically told us exactly what we have to do to get the flag. We can just follow the instructions.

The main challenge is to come up with the SSH command to connect to their server. Thankfully, the [SSH Linux man page](https://linux.die.net/man/1/ssh) was provided in one of the hints. Alternatively, running `man ssh` in the terminal also works. 

With the help of the SSH man page, I was able to use the following command to connect to the SSH server:

```bash
ssh -p 59909 ctf-player@titan.picoctf.net
```

- `-p`: Specifies the port to connect to on the remote host.

### Obtaining the flag
![[PicoCTF SuperSSH 2.png]]

Once I connected to the server, I was greeted with this line: 
`Welcome ctf-player, here's your flag: picoCTF{s3cur3_c0nn3ct10n_07a987ac}`

> [!NOTE] Flag
> picoCTF{s3cur3_c0nn3ct10n_07a987ac}`

