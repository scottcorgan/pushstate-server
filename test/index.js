let path = require('path')
let test = require('tape')
let got = require('got')
let app = require('../index')

testWithServer("serves index.html", (t, done) => {

    let base = got('localhost:9000')
        .then(res =>{

            t.equal(res.statusCode, 200, 'root status code')
            t.equal(res.body, 'index.html', 'root response body')
        })

    let somePath = got('localhost:9000/anything/here')
        .then(res => {

            t.equal(res.statusCode, 200, 'some path status code')
            t.equal(res.body, 'index.html', 'some path response body')
        })


    Promise.all([base, somePath])
        .then(() => done())
        .catch(done)
})

testWithServer("serves files", (t, done) => {

    let tests = [
        ["jpg", "image/jpeg"],
        ["js", "application/javascript"],
        ["json", "application/json"]
    ].map(data => {

        return got(`localhost:9000/cat.${data[0]}`)
            .then(res =>{

                t.equal(res.statusCode, 200, `${data[0]} successful`)
                t.equal(res.headers['content-type'], data[1], `${data[0]} format`)
            })
    })

    Promise.all(tests)
        .then(() => done())
        .catch(done)
})


function testWithServer (name, done) {

    test(name, t => {
        let server

        server = app.start({directory: path.join(__dirname, 'fixtures')}, err => {

            done(t, err => server.close(() => t.end(err)))
        })
    })
}
