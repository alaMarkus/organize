O0001
(stock outside d:47)
(stock inside d: 27)
(part length: 61)
G54
G50 S4500
G28 U0 W0
T0101(ROUHINTA)
M3 G96 S200
F0.2
G0 X49 Z0
G1 X25
G0 X47 Z2
G71 U1 R0.2
G71 P10 Q20 U0.5 W0.1 F0.3 S200
N10 G0 X38
G1 Z0
X42 Z-2
Z-59
X38 Z-61
Z-64.5
N20 X49
G28 U0 W0
T0202 (VIIMEISTELY)
G0 X47 Z2
G70 P10 Q20 F0.15 S200
G28 U0 W0
T0303 (SISÄROUHINTA)
G0 X27 Z2
G71 U1 R0.2
G71 P30 Q40 U-0.5 W0.1 F0.3 S200
N30 G0 X36
G1 Z0
X32 Z-2
Z-59
X36 Z-61
Z-64.5
N40 X31
G28 U0 W0
T0404 (SISÄVIIMEISTELY)
GO X27 Z2
G70 P30 Q40 F0.15 S200
G28 U0 W0
T0505 (KATKAISU)
M3 G96 S120
F0.1
G0 X49 Z-64
G1 X25
G0 X49
G28 U0 W0
M30