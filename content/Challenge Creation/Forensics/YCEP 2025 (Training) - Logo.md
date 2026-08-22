---
tags:
  - Forensics
  - easy
  - ChallengeCreation
modified: 2026-08-22T08:25:37+08:00
---
## Challenge Description

>[!todo] Description
>
>This is a practice challenge that will be gone through during the workshop.
>
>- **Author:** Jun Wei
>- **Category:** forensics
>- **Difficulty:** easy
>- **Discord:** syn3pz
>
>**Files**
>- [[nullsec.png]]

## Logo - Solution

Run strings on the provided file and the flag will be shown in the last line of the output.

```console
┌──(nepz㉿nepz)-[~]
└─$ ls
nullsec.png

┌──(nepz㉿nepz)-[~]
└─$ strings nullsec.png
IHDR
        pHYs
IDATx
ysNvM
`#Ul<
F`6_
O3__
8!AH
^-^yo
 $kW
bH/@
g6_>
fo0z
rV3'
X}u_@y
ll~f
`cKn
`cKn
>H1<5
|Rs8S
UlF9z
<\Tq
7n\e
}lP(Un5le{
        UlO
p$/f
Pr6_
8ToLTT(\
z6_^
foLD
f^enukxk
|yV3
WvUo
VWjo
z#V1
:vK\
mt0\t`
K+BO/
>o*8
N|ul
        P/f.
`c6_
5W_K
(/27
;nc&
nul5
1'"wUZ
uWfK^
(GT9
2u={
;q-X
`C{O
iul] 3
lDo~
;\4U
7UU}
KI-*
Lloy
ltqXe$
W57{
wUU}
^-^     7
nl*6
_?dul]{
`zTp
*6R+
:v6_
Ee#ZG
:zw g
q^sP
UoTm
IDATf
@cS;\
]-/9
)>Si(a
1JSW
AiN]
gADy
oTlP
{Vol[
`BTp
`#wP
_7\%
>s*8
)=KQ
cUol
~KZ%
oI-+
[^[%K
0qS[%
O37)
>X%K
C,K2
?Y%;M
UoT5
~KZ%
`*&S
skW/
x|mV
6iYy
FK1l5
ml-*
}1-*
7N/=
6iYy
>ET<4
{_R#>
%WoT6
@iTo
swWl
W{UoL@
$ToLP
7&nk
7^dnr
[TTo
qt(V
nP9W
b.Gj?Y4
gp-*q%
sBrU
/27Q
Fzl=
`zv^
gnrYx
ToT5
v6_~l8
[TTo091
xR3P3gt
F<7;    ;
`:ziQQ
LG_-*u
UW-*
#Vg4
7hed
Xs3(
UoT-B
I:3\
|Vn&
hikb
*"U,
UoTSlO  6
d'-j
>D q
j6_~
e6_^
0riFF
CUU_WU
pR*8
Cj{Y
L\Td4]%
d/"@
F?en
d7-+{UI
UU-b
0xfp
@1\4W
IDAT
@'RX
BZT>e
6b(o.
hJY%
xfPi9j*
iei2
^-F1
g([^
e%U{|
/"X)U
9IUI
0Xfp
^-.{
8 7]%
unIMu
CjQi
v|yp
n3\4
op%G
d?X%;L
Jn0#
{VR8
JvXr
T*+c
d?Y%{:q@
T3;e
Z\X%;,Qa
_7s$
8$>j
[%{T
8r-!
/G=l4
QeL.
";lt6_
zv0<6
@S+hr
@/      8
Qd1od
23Jv
2/@Zt
-9Jv+
j6:/
dK5B
de:Jv]K?
U[<T
72vo
8Jv^E
f]}9
_>l/
yKfTo
ewW,
^L{}
^Tj<
`IQ=
%+{K
T{8N
e;^Swobf]
:%n\^
Jt4n#
`cO<;
Q]<^
Yv5xQ
4_",<S
xrq}z
h *(e
Ei:z}z
xry}zp
A'      7
z\Tz|
@Kng&u\F
';.J
}7\c
B_      8
IDATWw>
$V.2N
/8[G
2Qep
lUF9
.-)S
s1b|;
**7z
S_gze
zn,"
R6MS
h<)7h
W.dX
lMG/
e|;q!
}=)bYJy
wOUF
/2a(J
@o4M
rdj:
*.b/#\+a
xrv}z
w`[2
JtD^
-}Dv5
aUq2
pDHx
h:ZN
'v"0X
~4ML
 CI,
        8X5
.5g&
I*U,S
oWy(
*c b"
3KLf
pl5MsR
**R3LS
o\e2O
e*U<h:
EW-V
)ytuF{
d?q5R
\xC7
>t`SzM
q}zp3
:ns"
i,YIQ
O\[_>W
y~)U;
^k+4}
8nqiM
e?~_;
uQaQ
,%['n
(K:V
+=:J
K?~k9
K~zG
wy*L6*8
>=(OJ
RiRU
[KSX
a4j#
HX6h
/Y      8
':zw
{SS`
i.#T_w
        8`      Q
vi(J
zWU-]'
GW      8
Kc_A:
}]ZX
Iys-
T)VD
Qn"G
nTtl
P`h"
I       I,G
*IDAT
@nUU
IEND
YCEP25{stringing_it}
```

> [!NOTE] Flag
> YCEP25{stringing_it}