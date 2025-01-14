---
modified: 2024-09-13T23:22:28+08:00
draft: false
---
Related: [[File System Structure]]

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
>	- This directory contains _binaries_, which are some of the applications and programs a user can run. These are also known as user executable files, and are available to all users.
>	- These include common Linux commands such as `cat`, `rm` and `mv`.
>
>`/boot` : contains bootloader files
>	- The files required for successfully starting the system(boot process) are stored in the `/boot` directory. 
>
>`/dev` : contains device files
>	- This directory contains device files for every single hardware device attached to the system. These are different from [device drivers](https://www.spiceworks.com/tech/devops/articles/what-is-device-driver/). `/dev` files are the interface that user programs use to access hardware, while device drivers are the software components that make this access possible by managing the actual hardware interaction.
>
>`/etc` : contains configuration files
>	- This directory contains the local system configuration files for the host computer. It contains most, if not all system-wide configuration files.
>	  
>`/home` : home directory
>	- This is a directory that contains users' personal files. It is the entry point for any login user on the Linux system. 
>	- The directories and files in the `/home` directory is specific to an individual user. 
>	  
>`/lib` : contains libraries (essential for basic system functionality)
>	- The `/lib` directory contains shared library images required in the `/bin` or `/sbin` directories. These are essential libraries required by the system to boot and run normally.
>	- Libraries are files containing code that applications can use. 
>	- Kernel modules are also located here.
>
>`/mnt` : temp mounted FS
>	- This directory provides a temporary mount point on which removal media such as CDROMs can be mounted. 
>	- It is used to mount storage devices or partitions manually. However, it is not used very often nowadays.
>
>`/opt` : optional software packages
>	-  This directory contains add-on applications or software packages that are not installed through your operating system package manager. 
>	- Each of these applications has its own subdirectory which contains all essential files required for it to run.
>	- When you install a software package from a third-party repository, or compile software binaries yourself, the files are stored in the `/opt` directory.
>	- Applications are stored in the `/opt/bin` directory, while libraries are stored in `/opt/lib`.
>
>`/tmp` : temporary files
>	- Temporary files created by the system and users are stored in this directory. These files are usually placed there by applications that are running, often containing data that an application need in future (not currently).
>	- These files are typically a few kilobytes (KB) in size and usually deleted when a system is rebooted (without prior notice)
>	- Users can store their own temporary files in this directory. This is one of the few directories that users can interact with without becoming superuser.
>
>`/proc` : process info
>	- The `/proc` directory (also called the `proc` file system) is a virtual/ pseudo filesystem that provides information about running processes as well as the kernel's current state. 
>	- The proc directory is a peculiar directory as it is not a real filesystem and ceases to exist once the system is powered off.
>	- Under Linux, all data are stored as files and users should be familiar with 2 primary categories of files, text and binary. This directory contains a different type of file: a virtual file. 
>
>`/root` : home directory for root
>	- This is **not** the root (`/`) file system. It is the home directory for the root user.
>	- This directory stores the configuration files for the root account, in the same way each individual user's home directory contains configuration files and regular files for that user.
>
>`/sbin` : system binaries that are run by the root
>	- The `/sbin` directory is similar to `/bin`, but this directory contains applications/ executables that only the superuser will require. These are privileged commands used for system administration.
>	- Regular users are able to use these applications with the `sudo` command.










#### References
- _A Complete Guide to Understanding Linux File System Tree_. (n.d.). Cherry Servers. https://www.cherryservers.com/blog/a-complete-guide-to-understanding-linux-file-system-tree#:~:text=the%20booting%20process.-,%2Fusr,are%20shareable%20among%20other%20users. 
- _Linux Filesystem, Partitions & Inodes - A Deep Dive For Beginners_. (2023, June 6). Anurag Kashyap. https://anuragkashyap.hashnode.dev/linux-filesystem-partitions-inodes-a-deep-dive-for-beginners
- _Classic SysAdmin: The Linux Filesystem Explained - Linux Foundation_. (2022, September 13). https://www.linuxfoundation.org/blog/blog/classic-sysadmin-the-linux-filesystem-explained
- GeeksforGeeks. (2024b, January 3). _Linux File System_. GeeksforGeeks. https://www.geeksforgeeks.org/linux-file-system/
- Both, D. (n.d.). _An introduction to Linux filesystems_. Opensource.com. https://opensource.com/life/16/10/introduction-linux-filesystems
- _Filesystem Hierarchy Standard_. (2024, August 28). Wikipedia. https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard
- _3.9. /lib : Essential shared libraries and kernel modules_. (n.d.). https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s09.html#:~:text=The%20%2Flib%20directory%20contains%20those,in%20%2Fbin%20and%20%2Fsbin%20.
- BasuMallick, C. (2022, October 12). _9 Types of Device Drivers and Their Applications - Spiceworks Inc_. Spiceworks Inc. https://www.spiceworks.com/tech/devops/articles/what-is-device-driver/
- _Chapter 5. The proc File System | Red Hat Product Documentation_. (n.d.). https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/4/html/reference_guide/ch-proc#s1-proc-virtual

