const request = require('supertest');
const app = require('../app')
const server = request.agent(app);
//test flow: insert project --> insert part -->get parts --> insert batch --> part to batch --> delete part from batch -->

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


describe('part api test', function(){
    test('signin', signInUser());
    test('login', loginUser());
    test('insert project', function(done){
        server
            .post('/api/part/insertproject')
            .send({"projectName": "testproject"})      
            .expect("inserted project")        
            .expect(200,done)
    });
    test ('get projects', function(done){
        server
            .post('/api/part/getprojects')
            .expect([{ 
                projectId: 1, 
                projectName: 'testproject' 
            }])
            .expect(200,done)
    })
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
    test ("get part", function(done){
        server
            .post('/api/part/getpart')
            .send({"partId": 1})
            .expect([{
                partId: 1,
                partName: 'testpart',
                outsideDiameter: 54,
                insideDiameter: 30,
                bushingLength: 22,
                outsideChamfer: 2,
                insideChamfer: 2,
                outsideChamferType: 'chamfer',
                insideChamferType: 'chamfer'
            }])
            .expect(200,done)
    })
    test("get parts", function (done){
        server
            .post('/api/part/getparts')
            .send({"projectId": 1})
            .expect([{
                partId: 1,
                partName: 'testpart',
                outsideDiameter: 54,
                insideDiameter: 30,
                bushingLength: 22,
                outsideChamfer: 2,
                insideChamfer: 2,
                outsideChamferType: 'chamfer',
                insideChamferType: 'chamfer'
        },])
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
    test('get batch content', function(done){
        server
            .post('/api/part/getbatchcontent')
            .send({"batchId": 1})
            .expect([{ "partId": 1 }])
            .expect(200,done)
    })
    test("remove part from batch", function(done){
        server
            .post('/api/part/removepartfrombatch')
            .send({"partId": 1, "batchId": 1})
            .expect("removed part from batch")
            .expect(200,done)
    })
    test("get batches", function(done){
        server
            .post("/api/part/getbatches")
            .expect([{ "batchId": 1, "batchName": 'testbatch' }])
            .expect(200,done)
    })
    test("delete batch", function(done){
        server
            .post("/api/part/deletebatch")
            .send({"batchId": 1})
            .expect("deleted batch")
            .expect(200,done)
    })
    test("delete part", function(done){
        server
            .post("/api/part/deletepart")
            .send({"partId": 1})
            .expect("part deleted")
            .expect(200, done)
    })
    test("delete project", function(done){
        server
            .post("/api/part/deleteproject")
            .send({"projectId": 1})
            .expect("deleted project")
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
            .send({"email": "testuser@hotmail.com", "passw": "testpassword"})
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
