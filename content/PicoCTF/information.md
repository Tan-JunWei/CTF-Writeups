---
tags:
  - Forensics
  - easy
Creation Date: 
Last Date: 
References: 
draft:
---
## Challenge Description

![[information.png]]

>[!question] PicoCTF Hint: Look at the details of the file
>

That may be a clue for us to check the metadata of the file downloaded, we shall see!

### Metadata of the file

![[information 2.png]]
Spot on! We can see that there is a suspicious string of characters at `License` section of the metadata after running `exiftool`.  It also seems `base64 encoded`. Let's head over to [[CyberChef]] and give it a try!


### CyberChef output
![[information 3.png]]

Indeed, we managed to get the flag instantly!

> [!NOTE] Flag
>picoCTF{the_m3tadata_1s_modified}


Similar:
- [[CanYouSee]]

