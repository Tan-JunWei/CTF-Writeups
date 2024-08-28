---
tags:
  - Cryptography
  - medium
  - RSA
Creation Date: 
Last Date: 
References: 
draft: 
modified: 2024-08-28T15:20:43+08:00
---
## Challenge Description
![[PicoCTF john_pollard.png]]

In this challenge, we will be dealing with [RSA certificates](https://cheapsslweb.com/blog/what-is-an-rsa-certificate-how-it-works/).

### Downloaded certificate
The contents of the downloaded certificate is as follows:

```
-----BEGIN CERTIFICATE-----
MIIB6zCB1AICMDkwDQYJKoZIhvcNAQECBQAwEjEQMA4GA1UEAxMHUGljb0NURjAe
Fw0xOTA3MDgwNzIxMThaFw0xOTA2MjYxNzM0MzhaMGcxEDAOBgNVBAsTB1BpY29D
VEYxEDAOBgNVBAoTB1BpY29DVEYxEDAOBgNVBAcTB1BpY29DVEYxEDAOBgNVBAgT
B1BpY29DVEYxCzAJBgNVBAYTAlVTMRAwDgYDVQQDEwdQaWNvQ1RGMCIwDQYJKoZI
hvcNAQEBBQADEQAwDgIHEaTUUhKxfwIDAQABMA0GCSqGSIb3DQEBAgUAA4IBAQAH
al1hMsGeBb3rd/Oq+7uDguueopOvDC864hrpdGubgtjv/hrIsph7FtxM2B4rkkyA
eIV708y31HIplCLruxFdspqvfGvLsCynkYfsY70i6I/dOA6l4Qq/NdmkPDx7edqO
T/zK4jhnRafebqJucXFH8Ak+G6ASNRWhKfFZJTWj5CoyTMIutLU9lDiTXng3rDU1
BhXg04ei1jvAf0UrtpeOA6jUyeCLaKDFRbrOm35xI79r28yO8ng1UAzTRclvkORt
b8LMxw7e+vdIntBGqf7T25PLn/MycGPPvNXyIsTzvvY/MXXJHnAqpI5DlqwzbRHz
q16/S1WLvzg4PsElmv1f
-----END CERTIFICATE-----
```

### Certificate Decoder
Since the challenge wants us to break the certificate, I used the [CertLogik Certificate Decoder](https://certlogik.com/decoder/) website to gain a better understanding of the certificate.

![[PicoCTF john_pollard 2.png]]

![[PicoCTF john_pollard 3.png]]

>[!question] PicoCTF Hint: The flag is in the format picoCTF{p,q}
>We have to find the values, `p` and `q`, used.

>[!tip] Information about the certificate
>The certificate decoder tool displayed information like the values of the `exponent e` and the `modulus n` used for the RSA encryption, as shown above.
>
>Since `n = p * q`, where both `p` and `q` are prime numbers, we can factorise `n` to find these values.

### Finding `p` and `q`
![[PicoCTF john_pollard 4.png]]

We can use [dCode.fr's prime factors decomposition tool] to find the 2 values, `p` and `q`. 

This gives us 2 values, 67867967 and 73176001. But we don't know which is `p` and `q` respectively. I first tried to submit `picoCTF{67867967,73176001}`, but the flag was incorrect. 

>[!question] PicoCTF Hint: Try swapping p and q if it does not work
>Swapping the 2 values will allow us to get the correct flag.

>[!NOTE] Flag
>picoCTF{73176001,67867967}

