---
tags:
  - GeneralSkills
  - medium
  - Python
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-09-08T11:51:21+08:00
---
## Challenge Description

![[PicoCTF Serpentine.png]]

This is a challenge involving a `Python` script. We will likely have to manipulate the script to display the flag in this challenge. 

We first download the provided script using `wget <link>`. I've attached to full script below for reference:

```python
import random
import sys



def str_xor(secret, key):
    #extend key to secret length
    new_key = key
    i = 0
    while len(new_key) < len(secret):
        new_key = new_key + key[i]
        i = (i + 1) % len(key)        
    return "".join([chr(ord(secret_c) ^ ord(new_key_c)) for (secret_c,new_key_c) in zip(secret,new_key)])


flag_enc = chr(0x15) + chr(0x07) + chr(0x08) + chr(0x06) + chr(0x27) + chr(0x21) + chr(0x23) + chr(0x15) + chr(0x5c) + chr(0x01) + chr(0x57>


def print_flag():
	flag = str_xor(flag_enc, 'enkidu')
    print(flag)


def print_encouragement():
	encouragements = ['You can do it!', 'Keep it up!', 
					'Look how far you\'ve come!']
	choice = random.choice(range(0, len(encouragements)))
	print('\n-----------------------------------------------------')
	print(encouragements[choice])
	print('-----------------------------------------------------\n\n')



def main():

	print(
'''
	Y
	.-^-.
   /     \      .- ~ ~ -.
  ()     ()    /   _ _   `.                     _ _ _
   \_   _/    /  /     \   \                . ~  _ _  ~ .
	 | |     /  /       \   \             .' .~       ~-. `.
	| |    /  /         )   )           /  /             `.`.
	\ \_ _/  /         /   /           /  /                `'
	 \_ _ _.'         /   /           (  (
					/   /             \  \
				   /   /               \  \
				  /   /                 )  )
				 (   (                 /  /
				  `.  `.             .'  /
					`.   ~ - - - - ~   .'
					   ~ . _ _ _ _ . ~
'''
	)
	print('Welcome to the serpentine encourager!\n\n')
  
	while True:
		print('a) Print encouragement')
		print('b) Print flag')
		print('c) Quit\n')
		choice = input('What would you like to do? (a/b/c) ')
	    
	if choice == 'a':
		print_encouragement()
	  
	elif choice == 'b':
		print('\nOops! I must have misplaced the print_flag function! Check my source code!\n\n')
	  
	elif choice == 'c':
		sys.exit(0)
	  
	else:
		print('\nI did not understand "' + choice + '", input only "a", "b" or "c"\n\n')
	
	
	
	if __name__ == "__main__":
	main()

```

>[!tip] What does the script do?
>
> When we run this program, we are provided with 3 options. 
>- `a) Print encouragement`
>- `b) Print flag`
>- `c) Quit`
>
>Options `a` and `c` work perfectly when I run the program. But option `b`(print flag) does not.

### Fixing the error

>[!bug] Understanding the error
>
> Noticed something in the script attached above? There's a function named "`print_flag`". However, when we choose option '`b`' when we run the program, the script prints this line instead:
>
>```
>Oops! I must have misplaced the print_flag function! Check my source code!
>```

![[PicoCTF Serpentine 2.png]]

We can run `nano serpentine.py` to add the `print_flag()` function if the user chooses option `b`.

I added the following 2 lines after the `elif` statement, and ran the code again.

```python
elif choice == 'b':
      print('\nFixed the code now! The flag will be displayed below!\n')
      print_flag()
```


![[PicoCTF Serpentine 3.png]]

This allows the script to display the flag correctly when we choose option `b`.

> [!NOTE] Flag
> picoCTF{7h3_r04d_l355_7r4v3l3d_8e47d128}