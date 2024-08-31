---
modified: 2024-08-31T21:49:33+08:00
---
[[File System Structure]]

In Linux and many other operating systems, directories can be structured in a tree-like hierarchy. The Linux directory structure is well defined and documented in the [Linux Filesystem Hierarchy Standard](http://www.pathname.com/fhs/) (FHS).
## Linux Directory Structure

The Filesystem Hierarchy Standard (FHS) is a reference describing the conventions used for the layout of [Unix-like](https://en.wikipedia.org/wiki/Unix-like) systems (_Filesystem Hierarchy Standard_, 2024). 

The image below shows the filesystem hierarchy. All files and directories appear under the root directory `/`, even if they are stored on different physical or virtual devices. 

![[Linux Filesystem Hierarchy.png]]


>[!info] Filesystem Hierarchy
>`/` : root directory
>This is the top-level directory of the file system. It contains all the files required to boot the Linux system before other filesystems are mounted. It must also contain all required executables and libraries required to boot the remaining filesystems. 
>`/bin` : contains essential & ready to run binaries
>`/boot` : contains bootloader files
>`/dev` : contains device files
>`/etc` : contains configuration files
>`/home` : home directory
>`/lib` : contains libraries
>`/mnt` : temp mounted FS
>`/opt` : optional software packages
>`/proc` : process info
>`/root` : home directory for root
>`sbin` : system binaries that are run by the root





#### References
- _Linux Filesystem, Partitions & Inodes - A Deep Dive For Beginners_. (2023, June 6). Anurag Kashyap. https://anuragkashyap.hashnode.dev/linux-filesystem-partitions-inodes-a-deep-dive-for-beginners
- _Classic SysAdmin: The Linux Filesystem Explained - Linux Foundation_. (2022, September 13). https://www.linuxfoundation.org/blog/blog/classic-sysadmin-the-linux-filesystem-explained
- GeeksforGeeks. (2024b, January 3). _Linux File System_. GeeksforGeeks. https://www.geeksforgeeks.org/linux-file-system/
- Both, D. (n.d.). _An introduction to Linux filesystems_. Opensource.com. https://opensource.com/life/16/10/introduction-linux-filesystems
- _Filesystem Hierarchy Standard_. (2024, August 28). Wikipedia. https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard

