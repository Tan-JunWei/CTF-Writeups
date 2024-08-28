---
tags:
  - Forensics
  - easy
  - metadata
Creation Date: 2024-08-15
References: 
draft: false
modified: 2024-08-28T16:29:51+08:00
---
## Challenge Description

![[PicoCTF CanYouSee.png]]

Right off the bat, the description seems interesting. "Hide and seek" implies that the flag may be hidden and may not be easily seen. 

### Contents
![[PicoCTF CanYouSee 2.png]]

As per usual, we begin by downloading the file. For this challenge, it is a zip file. After unzipping, we get a `.jpg` file



### How the JPG image looks like

![[PicoCTF CanYouSee4.png]]

The image doesn't seem to tell us anything. 

>[!question] PicoCTF Hint: How can you view the information about the picture? 

The clue seems to be hinting us to check the metadata of the picture. We shall do just that.



![[PicoCTF CanYouSee 3.png]]



From the metadeta, we realise a suspicious string of characters shown for the `Atrribution URL`. It looks like it is `base64 encoded`. We shall try decoding it using [[CyberChef]]. 


### CyberChef output
![[PicoCTF CanYouSee5.png]]

Aha! There's our flag.

> [!NOTE] Flag
>picoCTF{ME74D47A_HIDD3N_4dabddcb}