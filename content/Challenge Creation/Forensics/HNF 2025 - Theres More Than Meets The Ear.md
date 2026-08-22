---
tags:
  - Forensics
  - easy
  - ChallengeCreation
  - AudioForensics
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>There's more than meets the ear. I think there's something hidden in this audio.
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** easy
>
>**Files**
>- [[cool.wav]]

## There’s More Than Meets The Ear - Solution

>[!info] What is a spectrogram?
>A **spectrogram** is a visual representation of the frequencies present in an audio signal over time. The x-axis represents time, the y-axis represents frequency, and the colour/intensity represents amplitude at each frequency.
>
>Hidden messages can be embedded in the high-frequency range of audio files, where they are inaudible to the human ear but visually visible in the spectrogram. This is a common audio Steganography technique in CTF challenges.

1. Download the audio file (`cool.wav`) provided.

2. Open the file in **Audacity**. By default, Audacity displays the waveform view. To switch to the spectrogram:
   - Click on the track name (left panel) → select **Spectrogram** from the dropdown.
   - Alternatively, go to the track’s dropdown arrow → `Spectrogram`.

3. Look for text patterns in the spectrogram. The flag should be visible in plain text within the frequency bands.

![[theres-more-than-meets-the-ear.png]]

Simply read the flag from the spectrogram image.

> The submissions for this challenge were strangely interesting, although my peers and I thought this was a relatively easy challenge and the flag was easy to read.
> 
> But after reviewing the flags people actually submitted and the avalanche of tickets (+ DMs) I got just for this one challenge, I’m starting to suspect some of you were reading hieroglyphics instead of the flag. Either that, or the flag grew legs and ran away. 😆

> [!NOTE] Flag
> HNF25{h1dd3n_in_audi0}