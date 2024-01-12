const fs = require('fs');
var path = './Ahoora/';

const server = Bun.serve({
    port: 3000,
    async fetch(request: Request) {
        let req = await request.text();
        let data = JSON.parse(req);
        // remove all the "/" from data.url and replace it with "-"
        let filename = data.url.toISOString().replace(/[\/\\:]/g, "_");
        fs.writeFileSync(`${path}${filename}`, data.solution);
        const res = new Response('hello world yo yo');
        res.headers.append('Content-Type', 'text/plain');
        res.headers.append('Access-Control-Allow-Origin', 'https://codeforces.com');
        res.headers.append('Access-Control-Allow-Credentials', 'true');
        res.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.append('Access-Control-Allow-Headers', 'x-csrf-token');
        res.headers.append('Access-Control-Allow-Headers', 'content-type');
        return res;
    },
});

console.log(`Listening on localhost:${server.port}`);

// write an ajax request to the server
// Path: index.html
// // <script>
//    fetch("http://localhost:3000").then((response) => {
//
//    });
