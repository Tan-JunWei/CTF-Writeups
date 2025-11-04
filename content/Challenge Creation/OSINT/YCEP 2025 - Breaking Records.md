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
>I'm a big fan of Nezha! I heard that the recent animated movie, Nezha 2, has been breaking records and setting new industry milestones. They even have an incredible ice sculpture attaction in China now! I'm really excited to visit, can you help me find out where it is?
>
>Submit your flag in this format (lowercase, no spaces): YCEP25{city_province}
>
>Example: `YCEP25{nanjing_jiangsuprovince}`
>
>- **Author:** Jun Wei
>- **Category:** osint
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Files**
>- [[nezha.png]]

## Breaking Records - Solution

Participants are given an image file showing a Nezha ice sculpture. Simply use Google reverse image search and check out the top results!

The image should match the one in the following webpage. We can easily identify the city name (Changchun) and province (Jilin province) from the description.

![[breaking-records-1.png]]

The other search results should also provide similar information!

Flag: `YCEP25{changchun_jilinprovince}`