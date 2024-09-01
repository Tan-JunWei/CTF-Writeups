---
modified: 2024-09-01T14:50:09+08:00
---
### Introduction 
**Base64 encoding** is a format designed to prevent communication “mishaps” during the transfer of binary information. It achieves this through the conversion of binary data and a “lookup table” — data is eventually made in a stream of _ASCII_ characters, which can then be transmitted and decoded. On base 64 encoded data, the resultant string is always larger than the original (i.e. this is _not_ a compression algorithm). Another important distinction is that base 64 _does not_ encrypt any information — it uses a “standard” table of characters to encode and decode information. In other words, any base-64 string can be decoded, as long as the string was encoded using a standard set of characters (which the decoder can also understand). (_What Is Base64 Encoding & Decoding?_, n.d.)

### Base64 Index Mapping Table

![[base64 table.png]]

### Encoding Base64

>[!important] The encoding algorithm is simple:  
>Take three character bytes from the input stream (24bits), divide them into four 6 bit parts and convert each 6 bit value according to the table above. Repeat this until no more input character bytes are left.
![[base 64 encoding example.png]]

>[!question]- What to do if the number of input character bytes is not divisible by three?  
>In this case, the input buffer is filled up with zeros until it is divisable by three. Then each 6 bit part which was filled up with zero is encoded with the special padding character '='.
>![[base64 padding 1.png]] 
>![[base64 padding 2.png]]

### Decoding Base64

>[!important] Length of a [[Base64]] string
>Due to the padding during encoding, the number of characters of a Base64 string is always divisable by four. 

>[!success] Decoding a [[Base64]] string
>The decoding process is the reverse of that of the encoding.

#### References
- _What is Base64 Encoding & Decoding?_ (n.d.). bunny.net. https://bunny.net/academy/http/what-is-base64-encoding-and-decoding/
- Sunshine2k. (n.d.). _Sunshine2k’s homepage - Understanding and implementing Base64_. http://www.sunshine2k.de/articles/coding/base64/understanding_base64.html