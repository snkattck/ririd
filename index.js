const express = require('express');
const config = require('config');
const vhost = require('@tryghost/vhost-middleware');
const url = require('url');
const querystring = require('querystring');
const slashes = require('remove-trailing-slash');
const app = express();
const defaultRedirect = config.get('defaultRedirect');
const redirectMap = config.get('redirectMap');

const makeDst = (u, p, qu) => (qu && `${u}${p === '/' && p || ''}?${qu}` || u);

for (const {src, dst, withPath, withQs} of redirectMap) {
    app.use(vhost(RegExp(src), ({path, query}, res) => {
        const u = slashes(withPath === false && dst || url.resolve(dst, path) || dst);
        const dstUrl = withQs === false && u || makeDst(u, path, querystring.stringify(query))
        res.redirect(dstUrl);
    }));
}

app.use('*', (req, res) => {
    return res.redirect(301, defaultRedirect);
})

const port = config.has('port') && config.get('port') || 3000;

module.exports = { 
    app, 
    run: () => app.listen(port)
}