---
tags:
  - Forensics
  - Steganography
  - Steghide
  - medium
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>You’ve received an unusual WAV file - but it doesn't feel quite right. Could there be more to this sound than meets the ear?
>
>Do note that the flag is case-sensitive.
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** medium
>- **Discord:** syn3pz
>
>**Hints**
>- `I wonder what can be hidden within this file...`  (100 points)
>
>**Files**
>- [[song.wav]]

## Riding WAVes - Solution

Participants are only given 1 audio file `song.wav` for this challenge. They are expected to extract the embedded image file that was hidden in `song.wav` using steganography.

![[Riding-WAVes-1.png]]

To do this, we can use `steghide` to view what the embedded files are. We can then use the following steghide command to extract the embedded `image.png` file:

```bash
steghide extract -sf song.wav
```

> [!NOTE]  
> There was no passphrase entered when the file was embedded using steghide. Hence when prompted for the passphrase, we do not need to input anything.

The extracted image looks like a plain white image. However, a very faint-looking flag can technically be seen in the bottom left corner of the image if we zoom in on the image.

We can use tools like Forensically to clearly view the flag.

![[Riding-WAVes-2.png]]

Alternatively, we can input `image.png` in AperiSolve. Under the 'View' section of the results, we should be able to see some images with the flag clearly stated.

![[Riding-WAVes-3.png]]

We can select any of them to see the full flag. Do note that this flag is case-sensitive.

![[Riding-WAVes-4.png]]

> [!NOTE] Flag
> YCEP25{3mb3d_N_3xtract}