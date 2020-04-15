const express = require('express');
const config = require('config');
const vhost = require('@tryghost/vhost-middleware');
const url = require('url');
const querystring = require('querystring');

const app = express();
const defaultRedirect = config.get('defaultRedirect');
const redirectMap = config.get('redirectMap');

const makeDst = (u, qu) => (qu && `${u}?${qu}` || u);

for (const {src, dst, withPath, withQs} of redirectMap) {
    app.use(vhost(RegExp(src), ({path, query}, res) => {
        const u = withPath === false && dst || url.resolve(dst, path) || dst;
        const dstUrl = withQs === false && u || makeDst(u, querystring.stringify(query))
        res.redirect(dstUrl);
    }));
}

app.use('*', (req, res) => {
    return res.redirect(301, defaultRedirect);
})

app.listen(3000);