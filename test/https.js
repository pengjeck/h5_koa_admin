const http = require('http');
const https = require('https');
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
// Settings
const HOST = 'localhost';
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;
app.use(async ctx => {
    ctx.body = 'Hello World';
});
// Listen
const httpServer = http.createServer(app.callback())
    .listen(HTTP_PORT, HOST, listeningReporter)


const options = {
    key: fs.readFileSync('../ssl/2_www.serious-playing.com.cn.key'),
    cert: fs.readFileSync('../ssl/1_www.serious-playing.com.cn_bundle.crt')
};
const httpsServer = https.createServer(options, app.callback())
    .listen(HTTPS_PORT, HOST, listeningReporter)
// A function that reports what type of server listens on which port
function listeningReporter() {
    const { address, port } = this.address();
    const protocol = this.addContext ? 'https' : 'http';
    console.log(`Listening on ${protocol}://${address}:${port}...`);
}