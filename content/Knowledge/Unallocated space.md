---
modified: 2024-08-29T21:49:06+08:00
---
>[!info] Unallocated space
>**Unallocated space** on a disk refers to areas that are not currently assigned to any active file or directory by the file system. This space is available for new data to be written.
>
>When a file is deleted, the space it occupied becomes unallocated, meaning the file system marks it as available for new data, but the actual data may still be present on the disk until it is overwritten.

### Allocated vs. Unallocated in `fls`:
- **Allocated**: The file is actively in use, and its name, metadata, and data blocks are all tracked by the file system.
- **Unallocated**: The file name or metadata has been marked as not in use, typically because the file was deleted. However, the data might still exist on the disk, or there could be multiple copies of the file name in different states.

For more information about unallocated space in disk images highlighted by the `fls` command, refer to this [[Operation Orchid#Unallocated space|excerpt]]. Alternatively, check out the [[The Sleuth Kit (TSK)]] [fls command page](https://wiki.sleuthkit.org/index.php?title=Fls).

#### References
- _Fls - SleuthKitWiki_. (n.d.). https://wiki.sleuthkit.org/index.php?title=Fls