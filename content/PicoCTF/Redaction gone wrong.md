---
tags:
  - Forensics
  - medium
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-19T15:26:00
---

## Challenge Description 

![[PicoCTF Redaction gone wrong.png]]

After downloading the file, we can simply use the GUI to open the pdf file. In this case, I opened it with Atril Document Viewer. Selecting one of the blacked out portion reveals the flag in plaintext. We can also do `Ctrl+A` to select all the text to reveal the flag.

### GUI Approach
![[PicoCTF redaction gone wrong 2.png]]


### CLI Approach
![[PicoCTF redaction gone wrong 3.png]]
Alternatively, we can run `pdftotext <file-name>` to read the pdf file and write its content into a text file. We can then `cat` the text file to obtain the flag. 

> [!NOTE] Flag
>picoCTF{C4n_Y0u_S33_m3_fully}
