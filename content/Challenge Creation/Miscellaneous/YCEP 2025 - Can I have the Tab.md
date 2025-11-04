---
tags:
  - Miscellaneous
  - easy
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>People always say light is at the end of the tunnel, but how about the flag?
>
>- **Author:** Jun Wei
>- **Category:** misc
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Hints**
>- `How do we get to the bottom of this FAST?`  (50 points)
>
>**Files**
>- [[dir1.zip]]

## Can I have the Tab - Solution

After unzipping the zip file, just tabcomplete and cat the `text.txt` file in `dir20`.

```bash
┌──(nepz㉿nepz)-[~]
└─$ unzip dir1.zip
Archive:  dir1.zip
   creating: dir1/
   creating: dir1/dir2/
   creating: dir1/dir2/dir3/
   creating: dir1/dir2/dir3/dir4/
   creating: dir1/dir2/dir3/dir4/dir5/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/dir17/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/dir17/dir18/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/dir17/dir18/dir19/
   creating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/dir17/dir18/dir19/dir20/
  inflating: dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/dir17/dir18/dir19/dir20/text.txt

┌──(nepz㉿nepz)-[~]
└─$ cat dir1/dir2/dir3/dir4/dir5/dir6/dir7/dir8/dir9/dir10/dir11/dir12/dir13/dir14/dir15/dir16/dir17/dir18/dir19/dir20/text.txt
YCEP25{put_th15_0n_my_tab}
```

Flag: `YCEP25{put_th15_0n_my_tab}`