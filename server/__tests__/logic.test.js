const request = require('supertest');
const app = require('../app')
const server = request.agent(app);

beforeAll(function(done){
    server.post('/test/disableforeignkey')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });
})
beforeAll(function(done){
    server.post('/test/resettestdatabase')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });
})
beforeAll(function(done){
    server.post('/test/enableforeignkey')
    .end(function(err, res) {
        if (err) return done(err);
        done();
    });
})


describe('api test', function(){
    test('signin', signInUser());
    test('login', loginUser());
    test('insert project', function(done){
        server
            .post('/api/part/insertproject')
            .send({"projectName": "testproject"})      
            .expect("inserted project")        
            .expect(200,done)
    });
    test('insert part', function(done){
        server
            .post('/api/part/insertpart')
            .send({"partobj":	{
                "partName": "testpart",
                "projectId": 1,
                "outsideDiameter": 54, 
                "insideDiameter": 30, 
                "partLength": 22, 
                "insideChamfer": 2, 
                "outsideChamfer": 2, 
                "outsideChamferType": "chamfer",
                "insideChamferType": "chamfer"}
            })
            .expect("inserted part")
            .expect(200,done)
    })
    test('insert batch', function(done){
        server
            .post('/api/part/insertbatch')
            .send({"batchName": "testbatch"})
            .expect("created batch")
            .expect(200,done)
    })
    test('part to batch', function(done){
        server
            .post('/api/part/parttobatch')
            .send({"partId": 1, "batchId": 1})
            .expect("inserted part to batch")
            .expect(200,done)
    })
    test("insert post", function(done){
        server
            .post("/api/machine/insertpost")
            .send({"postobj":{       
                "programNumber":"O0001",
                "referencePoint":"G54",
                "maxRevs": "G50 S4500",
                "toolChangePosition": "G28 U0 W0",
                "outsideRoughingTool": "T0101 (ROUHINTA)",
                "outsideRoughingSpeed": "M3 G96 S200",
                "facingFeed": "F0.2",
                "roughingCycleFirstLine": "G72 U1 R0.2",
                "roughingCycleSecondLine": "G72 P10 Q20 U0.5 W0.1 F0.3 S200",
                "outsideFinishingTool":"T0202 (VIIMEISTELY)",
                "outsideFinishingCycle":"G70 P10 Q20 F0.15 S200",
                "insideRoughingTool":"T0303 (SISÃ„ROUHINTA",
                "insideRoughingCycleFirstLine":"G72 U1 R0.2",
                "insideRoughingCycleSecondline":"G72 P30 Q40 U0.5 W0.1 F0.3 S200",
                "insideFinishingTool":"T0404 (SISÃ„VIIMEISTELY)",
                "insideFinishingCycle":"G70 P30 Q40 F0.15 S200",
                "cutOffTool":"T0505 (KATKASU)",
                "cutOffSpeed":"M3 G96 S120",
                "cutOffFeed":"F0.1",
                "programEnd": "M30",
                "postName": "test post"
                }
            })
            .expect("post inserted")
            .expect(200,done)
    })
    test("insert machine", function(done){
        server 
            .post("/api/machine/insertmachine")
            .send({"machineobj":{
                "machineName": "test machine",
                "post": 1,
                "minLength": 50,
                "maxLength": 150,
                "minOutsideDiameter": 45,
                "maxOutsideDiameter": 70,
                "minInsideDiameter": 10,
                "maxInsideDiameter":37
                }
            })
            .expect("inserted machine")
            .expect(200,done)
    })
    test("logout", function(done){
        server 
            .post('/auth/logout')
            .expect("logged out")
            .expect(200,done)
    })
});



function signInUser() {
    return function(done){
        server
            .post('/auth/signin')
            .send({"email": "testuser@hotmail.com", "passw": "testpassword", "userType": "client"})
            .expect("succesfully created user with email testuser@hotmail.com")
            .expect(200,done)
    }
}

function loginUser() {
    return function(done) {
        server
            .post('/auth/login')
            .send({"email": "testuser@hotmail.com", "passw": "testpassword"})
            .expect("welcome in")
            .expect(200,done)
    };
};
