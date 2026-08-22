---
tags:
  - ChallengeCreation
  - Forensics
  - Sleuthkit
  - hard
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>The flag's lost in the chaos of files, lurking in the shadows. Well, all I can say is that it's well hidden, I hope!
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** hard
>- **Discord:** syn3pz
>
>**Hints**
>- `Not all things that are hidden are out of sight. Some things prefer to blend in, becoming invisible when you least expect it.` (50 points)
>
>**Files**
>- [[disk.img.gz]]

## Stealth Mode Activated - Solution

Participants are given a disk image file `disk.image.gz`.

For this writeup, the provided solution uses TheSleuthKit (TSK) CLI approach, instead of Autopsy's GUI approach. 

To begin, we need to decompress the gzip file. Next, run `mmls` and `fls` to have a high-level understanding of the disk contents.

```bash
mmls disk.img
```

```bash
fls -o 2048 disk.img
```

Doing this will reveal 2 files that are of interest, `hidden_data.txt` and `.i_hope_this_file_stays_invisible`.

![[Stealth-Mode-Activated-1.png]]

By using `icat` to display the contents of the 2 respective files, we now know that the flag is within the `bin` directory in the file system.

```bash
icat -o 2048 disk.img 255
```

```bash
icat -o 2048 disk.img 256
```

![[Stealth-Mode-Activated-2.png]]

>[!NOTE]
>![[Stealth-Mode-Activated-3.png]]
>Technically, we are also able to use `srch_strings` and search for terms like "flag". This should reveal the same clue above.
>However, since the actual flag is encoded in base64, this disallows participants from searching for the flag format "YCEP25" to get the flag.

```bash
srch_strings disk.img | grep "flag"
```

![[Stealth-Mode-Activated-4.png]]

When we use the fls command with the -r flag to recursively display the contents of the file system, we’ll see a detailed list of all items within the directories, including key system directories like bin.

Notice that the inode number for the `bin` directory is 13 (from the very first screenshot).

By specifying the inode number (13), we can display only the contents of the `bin` directory. Within this directory, we can see that this directory contains many of the common commands used in Linux CLI.

```bash
fls -o 2048 -r disk.img 13
```

![[Stealth-Mode-Activated-5.png]]

Scrolling through the output, we can see that there's a file called "hide". This should raise suspicions as there is no such command in Linux. The description also gives a subtle hint to this, saying that it's "well hidden".

![[Stealth-Mode-Activated-6.png]]

We should note down the inode number of the "hide" file (`545`).

Now, using the found inode number, we can display the contents of this file. It should reveal a base64 encoded string. This can be decoded using `base64 -d` or other similar methods.

```bash
icat -o 2048 disk.img 545 | base64 -d
```

![[Stealth-Mode-Activated-7.png]]

> [!NOTE] Flag
> YCEP25{d15k_d15k_h1d3}