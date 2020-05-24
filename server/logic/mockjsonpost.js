const jsonpost =   {
        "postId": 1,
        "programNumber": "O0001",
        "referencePoint": "G54",
        "maxRevs": "G50 S4500",
        "toolChangePosition": "G28 U0 W0",
        "outsideRoughingTool": "T0101(ROUHINTA)",
        "outsideRoughingSpeed": "M3 G96 S200",
        "facingFeed": "F0.2",

        "facingStartingPos": "G0 X"+stockDiameterOutside + facingApproachX + " Z 0",
        "facingCutDepth": "G1 X"+stockDiameterInside + facingFinalDepth,
        "facingEndPosition": "G0 X"+stockDiameterOutside + facingRetractX + " Z"+facingRetractZ,

        "roughingCycleFirstLine": "G71 U1 R0.2",
        "roughingCycleSecondLine": "G71 P10 Q20 U0.5 W0.1 F0.3 S200",

        "geometryStart": "N10 G0 X"+diameterOutside+(-outSideChamfer*2),
        "geometryStartCut": "G1 Z0",
        "chamferEnd": "G1 X"+diameterOutside+" Z"+(-outSideChamfer),
        "cuttingLength": "G1 Z"+(-partLength+outSideChamfer),
        "rearChamfer": "G1 X"+diameterOutside +(-outSideChamfer*2)+" Z"+(-partLength),
        "rearChamferClear": "G1 Z"+(-partLength) +(-rearClearance),
        "geometryEnd": "N20 G1 X"+stockDiameterOutside + geometryRetractX,

        "outsideFinishingTool": "T0202 (VIIMEISTELY)",

        "finishingPosition": "G0 X"+stockDiameterOutside+finishingApproachX+" Z"+finishingApproachZ,

        "outsideFinishingCycle": "G70 P10 Q20 F0.15 S200",
        "insideRoughingTool": "T0303 (SISÄROUHINTA)",

        "insidePosition": "G0 X"+stockDiameterInside+(insideApproachX)+" Z"+insideApproachZ,
        "insideRoughingCycleFirstLine": "G71 U1 R0.2",
        "insideRoughingCycleSecondline": "G71 P30 Q40 U-0.5 W0.1 F0.3 S200",

        "insideGeometryStart": "N30 G0 X"+diameterInside+(insideChamfer*2),
        "insideGeometryStartCut": "G1 Z0",
        "insideChamferEnd": "G1 X"+diameterInside+" Z"+(-insideChamfer),
        "insideCuttingLength": "Z"+ (-partLength+insideChamfer),
        "insideRearChamfer": "X"+diameterInside+(insideChamfer*2)+" Z"+(-partLength),
        "insideRearChaferClear": "Z"+ (-partLength+(-insideRearClearance)),
        "insideGeometryEnd": "N40 X"+diameterInside+(-insideRetractX),
        
        "insideFinishingTool": "T0404 (SISÄVIIMEISTELY)",
        "insideFinishingPosition": "G0 X"+ stockDiameterInside+" Z"+insideApproachZ

        "insideFinishingCycle": "G70 P30 Q40 F0.15 S200",
        "cutOffTool": "T0505 (KATKAISU)",
        "cutOffSpeed": "M3 G96 S120",
        "cutOffFeed": "F0.1",

        "cutOffStartingPosition": "G0 X"+stockDiameterOutside+(cutOffApproachX)+" Z"+(-partLength-cuttingToolWidth)
        "cutOffDepth": "G1 X"+stockDiameterInside+(cutOffDepthX) 
        "cutOffEndPosition" "G0 X"+ stockDiameterOutside +(cutOffRetractX)

        "programEnd": "M30",
        "postName": "custom"
    }