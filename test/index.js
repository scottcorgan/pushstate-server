let path = require('path')
let test = require('tape')
let got = require('got')
let app = require('../index')

test('server with port', t => {

    let server

    server = app.start({
        directory: path.join(__dirname, 'fixtures'),
        port: 4321
        }, err => {

        if (err) return server.close(() => t.end(err))

        got('localhost:4321')
            .then(res => {

                t.equal(res.statusCode, 200, 'root status code')
                server.close(t.end.bind(t))
            })
            .catch(err => server.close(() => t.end(err)))
    })
})

test('server with multiple directories', t => {

    let server

    server = app.start({
        directories: [
            path.join(__dirname, 'fixtures'),
            path.join(__dirname, 'test-directory')
        ],
        }, err => {

        if (err) return server.close(() => t.end(err))

        got('localhost:9000/test-json.json')
            .then(res => {

                t.equal(res.statusCode, 200, 'response status code')
                server.close(t.end.bind(t))
            })
            .catch(err => server.close(() => t.end(err)))
    })
})

test.skip('server with custom index file', t => {

    let server

    server = app.start({
        directory: path.join(__dirname, 'fixtures'),
        file: 'cat.js',
        port: 8000
        }, err => {

        if (err) return server.close(() => t.end(err))

        got('localhost:8000')
            .then(res => {

                t.equal(res.statusCode, 200, 'root status code')
                t.equal(res.body, "// cat.js", "body")
                server.close(t.end.bind(t))
            })
            .catch(err => server.close(() => t.end(err)))
    })
})

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
