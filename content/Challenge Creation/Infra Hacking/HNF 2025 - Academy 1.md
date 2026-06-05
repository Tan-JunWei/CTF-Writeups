---
tags:
  - InfraHacking
  - hard
  - ChallengeCreation
  - SSH
  - FileUploadBypass
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>Triton Academy appears unremarkable at first glance, just another corner of the web with tidy pages and familiar promises. Some pages do not end where they should. Certain words repeat, faint echoes tucked into forgotten archives, and the academy’s silence feels strangely watchful.
>
>Hidden in its structure is a secret waiting to be uncovered. Those who wander too far notice that the academy sometimes answers back. Patterns >emerge, and paths (that were never meant to be followed) unfold.
>
>NOTE: Academy is a multi-part challenge. This is part ONE of the Academy challenge, where you are tasked to submit the USER flag.
>
>Rules of Engagement:
>
>The flag is located at /home/[username]/flag.txt.
>The use of all forms of Nmap scanning is within scope of this challenge.
>The use of all forms of enumeration/brute forcing that is necessary to solve this challenge is within scope of this challenge.
>This machine DOES respond to ICMP (ping) requests. Be patient and don't just throw -Pn at the problem.
>
>- **Author:** Jun Wei
>- **Category:** infra
>- **Difficulty:** hard
>
>**Hints**
>- `Seems like we are allowed to upload files on the "Profile" page. What kind of files will bypass very basic checks?` (20 points)

## Academy 1 - Solution

"Academy" is a multi-part infra hacking challenge that tests several skills:
- File upload bypasses
    - File upload vulnerability exists on the page where authenticated students can upload a profile picture.
    - However, the application enforces a blocklist that prevents upload of `.php` files. 
    - Bypass this by changing into other acceptable file extensions like `.phtml`.
- SSH bruteforcing to gain access to user accounts
- GTFOBins for privilege escalation

[[HNF 2025 - Academy 1|Academy 1]] tests on the first 2 skills. As such, only the steps taken to obtain the `user` flag will be demonstrated in the writeup below. 

> Academy 2 writeup: [[HNF 2025 - Academy 2]]

This challenge is **less about an immediate root pwn and more about moving horizontally first**. After an initial foothold as `www-data`, you should:
1. Discover that SSH (port 22) is open on the target.
2. Enumerate valid usernames from the compromised web context (these are required for SSH attempts).
3. Perform targeted SSH brute-force against those usernames instead of blind guessing.
4. Check for user flags after compromising users with weak passwords. There should be 2 users discovered with weak passwords.

1. Connect to VPN and run an Nmap scan to scan for open ports and services on the target machine.

```bash
nmap -A -T4 -p- 10.10.1.129
```

![[Academy-1-1.png]]

2. Based on the Nmap scan results, we can see that ports 22 (SSH), 80 (HTTP), and 2049 (NFS) are open. To begin with the low-hanging fruits, we can investigate the NFS service to see what information or files it exposes.

```bash
showmount -e 10.10.1.129
```

```bash
mkdir /mnt/academy
```

```bash
sudo mount -t nfs 10.10.1.129:/srv/share /mnt/academy
```

3. We can see that a file called `note.txt` has been exported to `/mnt/academy`, and we can take a look at its contents.

![[Academy-1-2.png]]

```
29/9/25 Update:

I have already set up a demo version of our new website! You may try to login with the test student account now. Will bring this up in the next meeting as well. 
Nothing urgent today, but it’s a good chance to clean up old log archives when you have time.  
Checked on the scheduled backup jobs last night and everything completed without errors.  
Reminder: the monthly maintenance window is this Friday, please confirm if you’ll be on shift or if I should cover.  
Also, I noticed a couple of warning entries in the system logs. It's nothing critical, but worth a quick review later in the week.  
Finally, the new equipment for the lab has been delivered to storage, so we’ll need to plan a setup slot sometime next week.  

- Mike
```

There are a few things to note here:
- There should be a demo version of the website available. This might be why port 80 was open!
- A test student account was created for testing purposes. This might highlight a weak password being used.

4. We can take a look at `http://IP-address` to view the website. However, it looks completely empty other than a "Hello World" at the top. Perhaps some directory enumeration will be useful.

![[Academy-1-3.png]]

5. Perform directory enumeration using `ffuf` or a tool of your choice. There are many wordlists that we can use for this, but let's keep things simple and try the `dirb/common.txt` wordlist.

```bash
ffuf -u http://10.10.1.129/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

![[Academy-1-4.png]]

6. From the above results, observe that there is a `uploads` directory (status code 301). Visiting it should not show anything, but the presence of this directory may mean that we can potentially upload something and view it here...

![[Academy-1-5.png]]

7. Since we did not find anything else, we can attempt to use a bigger wordlist. This is because we are certain that there exists a demo website somewhere (as mentioned in the note).

```bash
ffuf -u http://10.10.1.129/FUZZ -w /usr/share/wordlists/dirb/big.txt
```

![[Academy-1-6.png]]

Here, a bigger wordlist (20479 lines) is used.

The results show that there is a directory called `academy`.

8. Visiting http://10.10.1.129/academy should show the home page of Triton Academy's demo website. We can go ahead and explore what this website is about.

![[Academy-1-7.png]]

9. On the "Team Triton" page, we see a list of students and team members of Triton Academy. 

![[Academy-1-8.png]]

10. When we click on "Profile", we are redirected to a login page. This is expected since authentication is usually required before we can view our own profile.

![[Academy-1-9.png]]

> [!IMPORTANT]  
> Recall that a demo student account was created for testing. We can try to login using methods like default credentials, weak passwords.
> The credentials to login is found to be `student`:`student`.

11. After successful login, we can see that we are able to access the default student account's profile. The username and email fields have been filled up. There are 2 other fields ("Short bio" and "Profile Picture") on this page. There is currently no profile picture.

![[Academy-1-10.png]]

> [!IMPORTANT]  
> Recall that there was an empty `uploads` directory. It is possible that the profile picture (or any other files uploaded for that matter) is saved within that directory!
> This also means that we can attempt to upload a malicious `PHP` reverse shell script.

12. We can get a PHP reverse shell script from https://github.com/pentestmonkey/php-reverse-shell or any other reliable sources, and change the variables accordingly. For example, we need to change the values of the IP address and port to match our listener's.

![[Academy-1-11.png]]

13. Unfortunately, it seems like we are unable to upload a `.php` file, as we will encounter an error saying "Upload rejected: .php not allowed."

![[Academy-1-12.png]]

14. There are many ways an application can check whether a file uploaded should be deemed as malicious. Some common ways include checking file extensions and magic bytes (file signature).

Since the demo web application has just been set up not too long ago, there is a chance that the file upload function is flawed. 

We have no way to confirm this, but we can attempt other things like changing the file extensions, and see how the application responds. This [source](https://jorgectf.gitbook.io/awae-oswe-preparation-resources/by-vulnerability/file-upload-restrictions-bypass/file-extension-filters-bypass) might be helpful.

![[Academy-1-13.png]]

Changing the file extension to `.phtml` should result in a successful upload.

15. When we visit http://10.10.1.129/uploads/ again, we should now see 2 new files added, with one being a `json` file.

![[Academy-1-14.png]]

The file essentially contains some metadata about our file, such as the time of upload and name of file.

16. Our reverse shell script has been uploaded and we can directly access it, since the directory contents are all publicly accessible. Next, we can set up a simple Netcat listener for our reverse shell connection.

```bash
nc -nvlp 4444
```

Simply click on the uploaded reverse shell script in the uploads directory to execute it. 

Back in our reverse shell listener, we can see that a connection has been established. `whoami` shows that we are the `www-data` user, and we do not have much access. 

![[Academy-1-15.png]]

However, there seems to be an interesting `password.txt` file that contains a list of passwords:

```
123456
password
12345678
qwerty
123456789
12345
1234
111111
1234567
dragon
123123
baseball
abc123
football
monkey
letmein
696969
shadow
master
666666
qwertyuiop
123321
mustang
1234567890  
<----snip---->
```

Actually, this password file only contains 100 commonly used weak passwords. It is an exact replica of `xato-net-10-million-passwords-100.txt`. It is intentionally placed on the target machine to facilitate convenience (players can simply copy the contents and run a bruteforce attempt using this exact file), especially since SecLists may not be installed by default on Kali.  

The presence of this file gives us a hint that we may need to perform some bruteforce authentication attempts. But for what service? What users? We have no idea.

17. If we `cd` to `/home`, we can see that there are 5 home directories present. This means that there are 5 users.

![[Academy-1-16.png]]

Here are the 5 usernames:

```
athompson
jwalker
mbennett
panderson
student
```

> [!IMPORTANT]  
> We have previously established that there was a "Team Triton" page featuring students and team members. This stage proves that all `sysadmins` have an account on this target machine, with the naming convention of `<first-initial><last-name>` for their usernames.

18. It is likely that we need to take this information and perform some SSH password bruteforce attempts with the suggested wordlist.

We can first try this against the `athompson` user:

```bash
hydra -l athompson -P /usr/share/seclists/Passwords/xato-net-10-million-passwords-100.txt ssh://10.10.1.129:22 -V
```

![[Academy-1-17.png]]

However, this will be unsuccessful. Even if we use a bigger wordlist, we will be unable to find the password of this user.

Let's try this attack against the `jwalker` user.

```bash
hydra -l jwalker -P /usr/share/seclists/Passwords/xato-net-10-million-passwords-100.txt ssh://10.10.1.129:22 -V
```

![[Academy-1-18.png]]

We successfully identified the password of this user as `1qazxsw2`. We can now try to SSH as this user.

![[Academy-1-19.png]]

From the above results, we can confirm that SSH login was successful. However, there is nothing particularly interesting on this account. There are no interesting privileges, commands that we can run as `sudo`, backup scripts running in the background, etc.

We can go ahead and perform the same attack against other users. Perhaps other user accounts are configured with weak passwords as well?

> After attempting the SSH bruteforce attacks, we will soon realise that we are unable to find the passwords of most of the other users, except for `panderson`.

```bash
hydra -l panderson -P /usr/share/seclists/Passwords/xato-net-10-million-passwords-100.txt ssh://10.10.1.129:22 -V
```

![[Academy-1-20.png]]

Using the credentials `panderson`:`zxcvbnm`, we are once again able to SSH as a user on the target machine.

![[Academy-1-21.png]]

From there, we are able to get the user flag in a file called `flag.txt`! The full path to the flag should be `/home/panderson/flag.txt`.

That's it! Quite a long challenge, with a lot of tasks to do to get the user flag. Once again, the key takeaway of this challenge is to keep finding for information that may help us progress, no matter how trivial it may be!

User flag: `HNF25{S5H_brut3forc1ng_1s_pr3t1y_n34t}`