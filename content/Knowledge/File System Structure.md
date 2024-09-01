---
modified: 2024-09-01T14:50:57+08:00
---
A file system is a fundamental component of an operating system that manages how data is stored, organized, and accessed on storage devices. It provides a structured way to store and retrieve files, ensuring efficient data management across various storage mediums. Understanding its layered architecture helps explain how data is handled from the physical storage up to user interactions.

>[!info] The 3 layers of a file system
>A file system mainly consists of 3 layers: 
>
>Physical File System (PFS)
>	- responsible for the management and storage of physical memory blocks on the disk
>	- handles the low-level storage and retrieval of data
>	- ensures the efficient allocation and utilization of physical storage resources
>	- interacts with storage hardware via [Device Drivers](https://www.spiceworks.com/tech/devops/articles/what-is-device-driver/)
>	  
>Virtual File System (VFS)
>	- acts as the intermediary between the PFS and the LFS
>	- enables the concurrent operation of multiple instances of physical file systems
>	- provides a standardised interface, allowing different file systems to operate simultaneously
>	- ensures compatibility and cohesion between various file system implementations
>	
>Logical File System (LFS)
>	- acts as the interface between the user applications and the file system itself
>	- facilitates essential operations like opening and reading files, without the user having to deal with any storage hardware

Each layer builds upon the previous, with increasing levels of [[Abstraction|abstraction]] to manage complexity and provide a seamless user experience.

>[!todo]- Layered Architecture of File Systems
>The layered approach allows for efficient data handling by isolating hardware-specific details, standardizing interactions between different file systems, and offering a simplified interface for end users, ultimately creating a cohesive and user-friendly data management system.

#### References
- _File System Structure — CS 374 - Operating Systems  documentation_. (n.d.). https://rgambord.github.io/cs374/modules/03/file-system-concepts/structure/
- Lavarian, R. (2022, January 12). _What Is a File System? Types of Computer File Systems and How they Work – Explained with Examples_. freeCodeCamp.org. https://www.freecodecamp.org/news/file-systems-architecture-explained/
- GeeksforGeeks. (2024, January 3). _Linux File System_. GeeksforGeeks. https://www.geeksforgeeks.org/linux-file-system/