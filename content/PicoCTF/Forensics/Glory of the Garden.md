---
tags:
  - Forensics
  - easy
Creation Date: 
Last Date: 
draft: 
modified: 2024-08-28T16:30:36+08:00
---
## Challenge Description

![[PicoCTF Glory of the Garden.png]]

>[!question] PicoCTF Hint: What is a hex editor?

The hint references a hex editor, but `strings` is a faster approach here. The flag is not visually embedded in the image. It is appended as raw text after the image data, which is why viewing the image normally doesn't reveal it.

>[!info] Why does `strings` work on image files?
>`strings` scans binary files and prints any sequence of printable characters that is at least 4 characters long (by default). Image files like `.jpg` mostly contain binary pixel data, but any plaintext (such as metadata, comments, or hidden messages) will be found and printed. Flags appended directly to an image file show up this way.

This is a very straightforward challenge. After downloading the file, I just ran `strings <file-name>`, and the flag was shown instantly. 

### `Strings` example output
![[PicoCTF Glory of the Garden 2.png]]
![[PicoCTF Glory of the Garden 3.png]]

Since the flag was the last line displayed, I did not have to use `grep` as well. In larger files, pairing with `grep` helps narrow the output:

```bash
strings <file-name> | grep "pico"
```

> [!NOTE] Flag
> picoCTF{more_than_m33ts_the_3y3eBdBd2cc}

#### Similar
- [[strings it]]: uses `strings` on a binary to find the flag
- [[Wave a flag]]: uses `strings` on a binary to find the flag
- [[Static ain't always noise]]: uses `strings` on a binary, also examines a disassembly script
