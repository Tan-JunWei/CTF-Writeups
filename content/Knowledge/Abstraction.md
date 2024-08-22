---
modified: 2024-08-22T14:50:15+08:00
---
Abstraction in computer science is the process of removing elements of a code or program that aren't relevant or that distract from more important elements. 

>[!info] In a nutshell
>Abstraction refers to looking at something to maintain the general form or meaning while reducing the presence of specific details.

### Examples of abstraction

>[!tip]- Example 1: Layers of File Systems
>- **Physical File System (PFS):** This layer operates at the lowest level, dealing directly with hardware and the physical details of data storage. It manages raw data blocks and interacts with device drivers, making it the most specific and detailed layer.
>- **Virtual File System (VFS):** This layer abstracts the details of different physical file systems by providing a unified interface. It allows multiple file systems to work together and standardizes interactions between them, hiding the underlying complexity from the layers above.
>- **Logical File System (LFS):** This layer is the most abstract, providing an interface for user applications to interact with files and directories. It handles high-level operations such as file creation, reading, and writing, without requiring the user to understand the details of how data is stored or managed at lower levels.

>[!tip]- Example 2: Accessing Files in File Systems
>With a file system, we can organize our data into files, directories, and other constructs, and manipulate them in various ways. To open a file, you need only its path; it's not necessary to determine the exact location on the disk or manually instruct the hard drive controller. The file system handles the complexities of locating and accessing data, abstracting these details to provide a user-friendly interface for file management.

>[!tip]- Example 3: Object-Oriented Programming(OOP)
>**Abstraction** in OOP is about identifying commonalities and creating general solutions that can be applied across various scenarios. It simplifies interactions by hiding complex details and exposing only necessary functionality.
>
>*Example of Abstraction in Practice:**
>
>**_With_ Abstraction:**
>- **Button Title:** "Make Coffee"
>	- This single button abstracts all the detailed steps involved in making coffee. Users interact with a straightforward, high-level action, while the underlying system handles all the complexities of boiling water, adding coffee, and cleaning up.
>	  
>**_Without_ Abstraction:**
>- **Button Titles:**
>	- "Boil the Water"
>	- "Add Cold Water to the Kettle"
>	- "Add 1 Spoon of Ground Coffee to a Clean Cup"
>	- "Clean Any Dirty Cups"
>In the non-abstraction approach, each button represents a specific, detailed task. Users need to manage multiple steps and handle the minutiae of the process, which can be cumbersome and error-prone.

