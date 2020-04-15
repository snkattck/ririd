const express = require('express');
const config = require('config');
const vhost = require('@tryghost/vhost-middleware');
const defaultRedirect = config.get('defaultRedirect');
const redirectMap = config.get('redirectMap');
const app = express();
const url = require('url');
const querystring = require('querystring');

const makeDst = (u, qu) => (qu && `${u}?${qu}` || u);

for (const {src, dst} of redirectMap) {
    app.use(vhost(RegExp(src), ({path, query}, res) => {
        const u = url.resolve(dst, path);
        res.redirect(makeDst(u, querystring.stringify(query)));
    }));
}

app.use('*', (req, res) => {
    return res.redirect(301, defaultRedirect);
})

app.listen(3000);