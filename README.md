### What is Wallids WAF

**[Wallids](https://wallids.com/ "Wallids")** is a permanently evolving and cloud empowered AI network, built to protect your website from cyber attacks.

### How can i use?

install Package

`npm install wallids`

import Wallids Library

` const wallids = require('wallids')`

Set Options

`let wallidsInitial = {
    secretKey: "SECRET_KEY", // SECRET KEY
    useMonitoring: false, // IDS + IPS
};`

Use Middleware

`app.use(wallids(wallidsInitial))` / `express.use(wallids(wallidsInitial))`
