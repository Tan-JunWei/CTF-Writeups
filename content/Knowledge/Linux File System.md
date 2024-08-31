---
modified: 2024-08-31T23:12:18+08:00
---
[[File System Structure]]

In Linux and many other operating systems, directories can be structured in a tree-like hierarchy. The Linux directory structure is well defined and documented in the [Linux Filesystem Hierarchy Standard](http://www.pathname.com/fhs/) (FHS).
## Linux Directory Structure

The Filesystem Hierarchy Standard (FHS) is a reference describing the conventions used for the layout of [Unix-like](https://en.wikipedia.org/wiki/Unix-like) systems (_Filesystem Hierarchy Standard_, 2024). 

The image below shows the filesystem hierarchy. All files and directories appear under the root directory `/`, even if they are stored on different physical or virtual devices. 

![[Linux Filesystem Hierarchy.png]]


>[!info]+ Filesystem Hierarchy
>`/` : root directory
>	- This is the top-level directory of the file system. It contains all the files required to boot the Linux system before other filesystems are mounted. It must also contain all required executables and libraries required to boot the remaining filesystems. 
>
>`/bin` : contains essential & ready to run binaries
>	- This directory contains _binaries_, which are some of the applications and programs a user can run. These are also known as user executable files.
>
>`/boot` : contains bootloader files
>	- The files required for starting the system(boot process) are stored in the `/boot` directory. 
>
>`/dev` : contains device files
>	- This directory contains device files for every single hardware device attached to the system. These are different from [device drivers](https://www.spiceworks.com/tech/devops/articles/what-is-device-driver/). `/dev` files are the interface that user programs use to access hardware, while device drivers are the software components that make this access possible by managing the actual hardware interaction.
>
>`/etc` : contains configuration files
>	- This directory contains the local system configuration files for the host computer. It contains most, if not all system-wide configuration files.
>	  
>`/home` : home directory
>	- This is the home directory storage for user files, where a user will find his personal directories. 
>	  
>`/lib` : contains libraries
>	- This directory contains shared library files, such as shared library images needed to boot the system.
>	- Libraries are files containing code that applications can use. 
>
>`/mnt` : temp mounted FS
>
>`/opt` : optional software packages
>
>`/proc` : process info
>
>`/root` : home directory for root
>
>`/sbin` : system binaries that are run by the root










#### References
- _Linux Filesystem, Partitions & Inodes - A Deep Dive For Beginners_. (2023, June 6). Anurag Kashyap. https://anuragkashyap.hashnode.dev/linux-filesystem-partitions-inodes-a-deep-dive-for-beginners
- _Classic SysAdmin: The Linux Filesystem Explained - Linux Foundation_. (2022, September 13). https://www.linuxfoundation.org/blog/blog/classic-sysadmin-the-linux-filesystem-explained
- GeeksforGeeks. (2024b, January 3). _Linux File System_. GeeksforGeeks. https://www.geeksforgeeks.org/linux-file-system/
- Both, D. (n.d.). _An introduction to Linux filesystems_. Opensource.com. https://opensource.com/life/16/10/introduction-linux-filesystems
- _Filesystem Hierarchy Standard_. (2024, August 28). Wikipedia. https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard
- _3.9. /lib : Essential shared libraries and kernel modules_. (n.d.). https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s09.html#:~:text=The%20%2Flib%20directory%20contains%20those,in%20%2Fbin%20and%20%2Fsbin%20.
- BasuMallick, C. (2022, October 12). _9 Types of Device Drivers and Their Applications - Spiceworks Inc_. Spiceworks Inc. https://www.spiceworks.com/tech/devops/articles/what-is-device-driver/

