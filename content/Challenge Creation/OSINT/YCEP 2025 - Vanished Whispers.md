---
tags:
  - OSINT
  - easy
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>In 1904, a young boy disappeared without a trace from a small town in Indiana, USA - a case that remains one of the state's most unsettling mysteries. Time has blurred the truth, but whispers of an old park in the area suggest it may still hold hidden clues.
>
>Your task: Trace the story, uncover the town, and reveal the name of the park that has been deliberately obscured in our case study image.
>
>But be warned! Some secrets were never meant to be found.
>
>Flag format: `YCEP25{full-name-of-park}`, no spaces, case-insensitive
>
>- **Author:** Jun Wei
>- **Category:** osint
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Files**
>
>- [[casestudy.png]]

## Vanished Whispers - Solution

Participants are given an image called `casestudy.png`. Their task is to find the name of the park in the image that has been purposely obfuscated.

In the challenge description, it was mentioned that there was a missing child mystery case that happened in a town in Indiana, USA in the year 1904. Participants are expected to use this information to get the name of this town. 

This can be done with a simple Google search. Participants are free to choose any of the top search results to locate the name of the town, as they should all highlight it.

![[Vanished-Whispers-1.png]]

The following image is a screenshot showing a webpage from the 2nd search result. The name of the town we're looking for is `Seelyville`.

![[Vanished-Whispers-2.png]]

Participants are allowed to use any online maps of their choice (E.g. Baidu, Bing, Yandex, Google). The example shown here is using Google Maps.

![[Vanished-Whispers-3.png]]

We can zoom in and look around to locate the name of park that matches the picture provided (`casestudy.png`). The park name should be `The Anna M. Dickerson Park`.

![[Vanished-Whispers-4.png]]

We can make use of the Google Maps Live View feature to verify whether our findings are correct!

![[Vanished-Whispers-5.png]]

Flag: `YCEP25{THEANNAMDICKERSONPARK}`