---
tags:
  - GeneralSkills
  - BinarySearch
  - SSH
  - easy
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-04T13:50:20+08:00
---
## Challenge Description

![[PicoCTF Binary Search.png]]
As the name suggests, this challenge will be about binary search. 

>[!tip] What is binary search? 
>
>From the [GeeksforGeeks Binary Search Algorithm](https://www.geeksforgeeks.org/binary-search/) page, the _Binary Search Algorithm_ is a [searching algorithm](https://www.geeksforgeeks.org/searching-algorithms/) used in a sorted array by **repeatedly dividing the search interval in half**. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log N).

For this challenge, we will have to guess a number between 1 and 1000. This number is randomly generated every time a user connects to the SSH server. We will only be given the flag is we guess the number. 

>[!faq] PicoCTF Hint: The program will randomly choose a new number each time you connect. You can always try again, but you should start your binary search over from the beginning - try around 500. Can you think of why?
>
>Basically, in the binary search algorithm, there will be 2 important values - the upper and lower bound. For example, in this challenge, the initial upper bound is 1000, and of course the lower bound is 1. 
>
>According the the binary search algorithm, we are basically adjusting either the upper or lower bound during each guess. Each guess will be the middle value between the upper and lower bound. Thus, after each guess, we will have reduced our search space by half.

### Implementing the binary search algorithm
![[PicoCTF Binary Search 2.png]]
As mentioned earlier, the initial upper bound is 1000 and the lower bound is 1. We will start by guessing the middle value, which is 500. Since the output tells us that the target value is higher than 500, our new lower bound is now 501. The upper bound is still 1000. Search space is reduced to `501-1000`.

Next, we guess the middle value of the new upper and lower bound (750). As observed, the target value is lower than 750, so we adjust the upper bound to 749 accordingly. Our search space is reduced to `501-749`.

We continue implementing the binary search algorithm until we get the target value. In my attempt, the target value was `650`. After guessing this value correctly, the flag was displayed in the next line. 

> [!NOTE] Flag
> picoCTF{g00d_gu355_1597707f}

#### References 
- GeeksforGeeks. (2024c, August 29). _Binary Search Algorithm Iterative and Recursive Implementation_. GeeksforGeeks. https://www.geeksforgeeks.org/binary-search/

