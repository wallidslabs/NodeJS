### What is Wallids WAF

**[Wallids](https://wallids.com/ "Wallids")** is a permanently evolving and cloud empowered AI network, built to protect your website from cyber attacks.


### How can i use?

install Package

`npm i @wallids/waf`

import Wallids Library

` const wallids = require('@wallids/waf')`

Set Options

`let wallidsInitial = {
    secretKey: "SECRET_KEY", // SECRET KEY
    useMonitoring: false, // IDS + IPS
};`

Use Middleware

`app.use(wallids(wallidsInitial))` / `express.use(wallids(wallidsInitial))`



**[NPM](https://www.npmjs.com/package/@wallids/waf "NPM")** 