const got = require('got');
const assert = require('assert');
const { certificateFor } = require('devcert');
const https = require('https');

describe('http request', function() {
    var App;
    var Http;

    this.timeout(5000);

    before(function () {
        const { app, run } = require('../index');
        App = app;
        Http = run();
    });

    it('method GET HOST http://www.one.pub should 301 redirect to https://another.org', async function() {
        const { headers } = await got(
            'http://localhost:3000',
            { 
                method: 'GET',
                headers: { host: 'www.one.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://another.org');
    });

    it('method GET HOST http://x.one.pub should 301 redirect to https://another.org', async function() {
        const { headers } = await got(
            'http://localhost:3000',
            { 
                method: 'GET',
                headers: { host: 'x.one.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://another.org');
    });

    it('method GET HOST http://coolone.pub should 301 redirect to https://www.proxywow.com', async function() {
        const { headers } = await got(
            'http://localhost:3000',
            { 
                method: 'GET',
                headers: { host: 'coolone.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://www.proxywow.com');
    });

    it('method GET HOST http://one.pub/this/place should 301 redirect to https://another.org/this/place, path included by default.', async function() {
        const { headers } = await got(
            'http://localhost:3000/this/place',
            { 
                method: 'GET',
                headers: { host: 'one.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://another.org/this/place');
    });


    it('method GET HOST http://one.pub/?test=1 should 301 redirect to https://another.org/?test=1, query included by default.', async function() {
        const { headers } = await got(
            'http://localhost:3000/?test=1',
            { 
                method: 'GET',
                headers: { host: 'one.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://another.org/?test=1');
    });

    it('method GET HOST http://one.pub/a/b/c?test=1 should 301 redirect to https://another.org/a/b/c?test=1, query included by default.', async function() {
        const { headers } = await got(
            'http://localhost:3000/a/b/c?test=1',
            { 
                method: 'GET',
                headers: { host: 'one.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://another.org/a/b/c?test=1');
    });

    it('method GET HOST http://two.pub/a/b/c should 301 redirect to https://line.struggle with withPath==false', async function() {
        const { headers } = await got(
            'http://localhost:3000/a/b/c',
            { 
                method: 'GET',
                headers: { host: 'two.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://line.struggle');
    });


    it('method GET HOST http://three.pub/a/b/c?q=1 should 301 redirect to https://in.one/a/b/c with withQs==false', async function() {
        const { headers } = await got(
            'http://localhost:3000/a/b/c?q=1',
            { 
                method: 'GET',
                headers: { host: 'three.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://in.one/a/b/c');
    });
    

    it('method GET HOST http://four.pub/a/b/c?q=1 should 301 redirect to https://unit.cell with withQs==false and withPath==false', async function() {
        const { headers } = await got(
            'http://localhost:3000/a/b/c?q=1',
            { 
                method: 'GET',
                headers: { host: 'three.pub' },
                followRedirect: false
            }
        );

        return assert.equal(headers.location, 'https://in.one/a/b/c');
    });


    after(function () {
        Http.close();
    });
})