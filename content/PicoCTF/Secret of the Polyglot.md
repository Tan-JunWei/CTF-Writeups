---
tags:
  - Forensics
  - easy
Creation Date: 
Last Date: 
References: 
draft:
---
## Challenge Description

![[PicoCTF Secret of the Polyglot.png]]

Another forensics challenge! As usual, we first download the suspicious file. 



### File type

![[PicoCTF Secret of the Polyglot 2.png]]

We notice that the file is supposedly a pdf file. However, when we run `file <file-name>`, we realise that the file is a PNG file instead. 

Using the CLI, I opened the PDF file to check whether there is anything inside. 



### Contents of the PDF File

![[PicoCTF Secret of the Polygot 4.png]]

Hmmm... it looks like gibberish at the moment. I move on to make a copy of this pdf file and renamed this `.pdf` file to a `.png` file as we previously established. 



### Contents of the new PNG File

![[PicoCTF Secret of the Polygot 3.png]]



That's it! We found the flag! ...or is it? It seems like only half the flag is present in the PNG file. 

>[!question] Recall that there were characters inside the pdf file earlier, with a closing curly brace `}` at the end! Could that be the other half of the flag? 

Upon further inspection, it seems like the contents of both the `.pdf` and `.png` files combine to form the flag. Joining both of them together, we can get the flag. 




> [!NOTE] Flag
> picoCTF{f1u3n7_1n_pn9_&_pdf_2a6a1ea8}