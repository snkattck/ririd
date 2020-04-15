const express = require('express');
const config = require('config');
const vhost = require('@tryghost/vhost-middleware');
const defaultRedirect = config.get('defaultRedirect');
const redirectMap = config.get('redirectMap');
const app = express();
const url = require('url');
const querystring = require('querystring');

for (const {src, dst} of redirectMap) {
    console.log(RegExp(src));
    app.use(vhost(RegExp(src), ({path, query}, res) => {
        const u = url.resolve(dst, path);
        const q = querystring.stringify(query);
        const finalDst = `${u}?${q}`;
        res.redirect(finalDst);
    }));
}

app.use('*', (req, res) => {
    return res.redirect(301, defaultRedirect);
})

app.listen(3000);