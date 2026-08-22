---
tags:
  - OSINT
  - hard
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>A few months back, I stumbled upon this amazing dining place in Johor Bahru, Malaysia. It had cozy vibes, delicious food, and the best part? They had live music playing in the background. It wasn't just any background music though, there was this incredible musician performing, and the music just set the perfect mood.
>
>All I can recall is that this place was recommended by someone who goes by the username 'michrods' online. She's all about food, tourism and lifestyle. If you follow the trail, I bet you'll hear the music again. Oh, and did I mention that this happened on Christmas? Do keep that in mind!
>
>I also remember something about the musician planning to release a single - but the name escapes me. Let me know if you can find the musician and their latest single, I still can't get their music out of my head!
>
>Submit your flag in this format: YCEP25{musician's stage name_latest single}
>
>Example: YCEP25{jasminesokko_wecouldbesoelectric}
>
>- **Author:** Jun Wei
>- **Category:** osint
>- **Difficulty:** hard
>- **Discord:** syn3pz
>
>**Hints**
>
>- `Find the foodie, follow the festivities.`  (50 points)
>- `How might we craft more specific searches to get what we're looking for?`  (50 points)
>
>**Files**
>
>- None


## Etched in Memory - Solution

For this challenge, we are tasked to find a musician's stage name and their latest single.

>[!NOTE]
>
>From the description, we are expected to pick out certain clues like:
>
>- `Dining place` (Perhaps a restaurant)
>- `Johor Bahru, Malaysia` (Location)
>- `Live music performance`
>- `michrods` (Username of the person who recommended the place)
>- `Christmas` (Time period)
>- `Latest single` (Aforementioned musician has recently released a single)

1. To begin, we can check which platforms have users with the username `michrods`.

![[Etched-In-Memory-1.png]]

From the results, we know that the username has been used across several platforms. The person who recommended the place probably used mainstream social media platforms to post their recommendations, so we can zoom into results like `Instagram`, `Youtube`, and perhaps `threads`.

We can also try to check the Linktree of this person, as it may lead to certain findings.

![[Etched-In-Memory-2.png]]

We can see that the Linktree page stated that the user is a "JB Foodie". This confirms that this is the user we're looking for. In the Linktree, the person has featured their `TikTok` and `Instagram` pages.

2. We can proceed to check the `Instagram` page of this user. 

![[Etched-In-Memory-3.png]]

We see that the creator's `Instagram` bio states that her page features dining and tourist spots in JB, Malaysia as well, which means we're on the right track.

In fact, I've checked the `TikTok` page too, and it seems like this creator posts the same content on both social media platforms.

3. Since the challenge specifies that the event happened during the Christmas period, we can scroll down and check relevant posts that were posted by this creator during that time period.

![[Etched-In-Memory-4.png]]

One thing that should catch our attention is the post titled "Hotels & Restaurants to go during Christmas in Johor Bahru". 

4. We may even use a bit of Google Dorking to narrow our search.

A Google search query we can use is: 

```http
site:instagram.com inurl:michrods intext:christmas
```

![[Etched-In-Memory-5.png]]

Observe that the specific post is returned as the first result.

5. We can proceed and check out the post highlighted above.

![[Etched-In-Memory-6.png]]

This posts features many advertisement posters of different hotels and food establishments, but there should be one that catches our eye: Kuroma Buffet's "Pink Christmas Buffet Dinner" event.

In the poster, there is a line that reads:

```
Join us at KUROMA to celebrate the festive season with a lavish Christmas buffet and the gentle melodies of live music performance
```

This may be hard to pick out due to the tiny font size, especially on mobile phone screens.

Thankfully, as hinted in the challenge, the place is described as a `dining place`, which should shift our attention to the `Restaurants` section in the post description as well. `Kuroma Buffet` is the first restaurant listed there.

6. After we have identified the restaurant as `Kuroma Buffet`, we can essentially use the same steps to find the musician.

![[Etched-In-Memory-7.png]]

We can first navigate to Kuroma Buffet's `Instagram page`, then scroll down to find the content posted during the Christmas period.

![[Etched-In-Memory-8.png]]

As stated in the advertisement poster, there are 3 musicians who will be performing at Kuroma Buffet restaurant during the "Pink Christmas Buffet Dinner" event.

However, the challenge description states that the performance happened on Christmas. There is only 1 musician performing on that day.

7. We can check out the content of this specific post.

![[Etched-In-Memory-9.png]]

We have identified the musician as `Keyin`. However, this is not her musician stage name. She goes by `Keyin Saxophonist` usually, and this can be easily found by searching her name on Google.

8. Now that we know the musician's stage name, there is just 1 last piece of the puzzle - Finding her latest single.

![[Etched-In-Memory-10.png]]

Her latest single should be "Turn It Up".

Piecing everything together, we get the flag.

> [!NOTE] Flag
> YCEP25{keyinsaxophonist_turnitup}