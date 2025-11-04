---
tags:
  - OSINT
  - medium
  - ChallengeCreation
modified: 2024-09-04T14:19:43+08:00
---
## Challenge Description

>[!todo] Description
>
>My brother told me about this aesthetic cafe with perfect vibes and cozy corners. The only problem? I have no clue where it is. I only have this image. Guess I'll have to make do with it...
>
>Flag format: YCEP25{cityname_cafename}
>Example: YCEP25{bangkok_cafeclaire}
>
>- **Author:** Jun Wei
>- **Category:** osint
>- **Difficulty:** medium
>- **Discord:** syn3pz
>
>**Hints**
>- `Why does the image look so weird? Is there any way we can make it look "normal"?`  (50 points)
>
>**Files**
>- [[cafe.png]]

## Snips and Sips - Solution

The given file is an image with inverted image colours.

Before performing a Google reverse image search, the image colours should be inverted back to original. 

We can use any online image colours inverter tool to do this. Other methods should also produce the same result.

![[Snips-and-Sips-1.png]]

After we get the original image, perform a simple Google reverse image search.

![[Snips-and-Sips-2.png]]

There should be at least 1 result that matches our image, like the `lemon8` one in the following image.

![[Snips-and-Sips-3.png]]

Clicking on the lemon8 result brings us to a post on lemon8. The description under this post is written in Thai, so we must first translate into English before reading it.

We can identify both the city name (lopburi) and the cafe name (Kyoto Shi Cafe) from the post description.

![[Snips-and-Sips-4.png]]

By performing a quick Google search, we can verify that our results are correct (Cafe interior matches the one in our original image).

![[Snips-and-Sips-5.png]]

Flag: `YCEP25{lopburi_kyotoshicafe}`