O0002
(stock outside d:65)
(stock inside d: 40)
(part length: 80)
G54
G50 S4500
G28 U0 W0
T0101(ROUHINTA)
M3 G96 S200
F0.2
G0 X67 Z0
G1 X38
G0 X65 Z2
G71 U1 R0.2
G71 P10 Q20 U0.5 W0.1 F0.4 S200
N10 G0 X56
G1 Z0
X60 Z-2
Z-78
X56 Z-80
Z-83.5
N20 X67
G28 U0 W0
T0202 (VIIMEISTELY)
G0 X65 Z2
G70 P10 Q20 F0.15 S200
G28 U0 W0
T1111 (SISÄROUHINTA)
G0 X40 Z2
G71 U1 R0.2
G71 P30 Q40 U0.5 W0.1 F0.4 S200
N30 G0 X49
G1 Z0
X45 Z-2
Z-78
X49 Z-80
Z-83.5
N40 X44
G28 U0 W0
T1111 (SISÄVIIMEISTELY)
GO X40 Z2
G70 P30 Q40 F0.4 S200
G28 U0 W0
T0808 (KATKAISU)
M3 G96 S120
F0.2
G0 X67 Z-83
G1 X38
G0 X67
G28 U0 W0
M30
