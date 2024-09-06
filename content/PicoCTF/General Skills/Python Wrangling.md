---
tags:
  - GeneralSkills
  - easy
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-06T09:08:36+08:00
---
## Challenge Description
![[PicoCTF Python Wrangling.png]]

We first download the 3 challenge files, `ende.py`, `pw.txt` and `flag.txt.en` by running `wget`. I also tried to display the contents of `pw.txt` and `flag.txt.en`. The `flag.txt.en` file contained an encrypted string of characters, which we need to decrypt.

### Understanding the script
>[!abstract] Excerpt from python script provided
>I ran `nano` to check the code in `ende.py` to understand what I have to do to successfully obtain the flag. The excerpt shown below handles the decryption process.
>
>```python
>elif sys.argv[1] == "-d":
>    if len(sys.argv) < 4:
>        sim_sala_bim = input("Please enter the password:")
>    else:
>        sim_sala_bim = sys.argv[3]
>
>    ssb_b64 = base64.b64encode(sim_sala_bim.encode())
>    c = Fernet(ssb_b64)
>
>    with open(sys.argv[2], "r") as f:
>        data = f.read()
>        data_c = c.decrypt(data.encode())
>        sys.stdout.buffer.write(data_c)
>```

It seems for this challenge, in order to get the flag, we need to run `ende.py` with 3 arguments:
- Option - encrypt (`-e`) or decrypt (`-d`)
- File with encrypted flag (`flag.txt.en`)
- Password (`67c6cc9667c6cc9667c6cc9667c6cc96`)

![[PicoCTF Python Wrangling 2.png]]

So, in order to get the flag, we can run the following command: 

```bash
python ende.py -d flag.txt.en $(cat pw.txt)
```

`$(cat pw.txt)` allows us to use the contents (password) in `pw.txt` without using the entire string as an argument.

> [!NOTE] Flag
> picoCTF{4p0110_1n_7h3_h0us3_67c6cc96}