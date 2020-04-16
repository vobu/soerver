# soerver [![npm version](https://img.shields.io/badge/npm/v/:soerver)](https://img.shields.io/badge/npm/v/:soerver)

easy peasy http server with proxy capability bolted in.  
it's essentially a cli wrapper around [`serve`](https://www.npmjs.com/package/serve) and [`http-proxy`](https://www.npmjs.com/package/http-proxy).

## install

```bash
# use global install to serve any dir
# on your box
$> npm install -g soerver
```

## usage

calling `soerver` w/o any options serves the current directory via http at port `4711`.

```bash
$> cd /your/dir
$> soerver
🕺 at http://localhost:4711 for ./
```

you can optionally supply a different port and a specific dir for being served:

```bash
$> soerver -p 8080 -d ~/_tmp
🕺 for /Users/you/_tmp at http://localhost:8080
```

## with proxy

if you want (parts of) an url to be proxied,
first create a json file such as `proxyrc.json` anywhere on disk, according to the specs from https://github.com/http-party/node-http-proxy#options

```javascript
// proxyrc.json
{
  "/nw": {
    "target": "https://services.odata.org/V2/Northwind/Northwind.svc/",
    "secure": false, //yay, don't break on self signed certs
    "changeOrigin": true
  }
}
```

then pass that file to `soerver`:

```bash
$> soerver -x examples/proxyrc.json
🏎  proxy rules detected in examples/proxyrc.json!
🕺 at http://localhost:4711 for ./
```

now any request to `http://localhost/nw` gets proxied to `https://services.odata.org/V2/Northwind/Northwind.svc/`:

```bash
$> curl http://localhost:4711/nw/$metadata
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
...
</service>
```

## contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make your IDE/editor aware of the included `eslint` rules and `prettier` formatting and use appropriately.

Also make sure to write tests (because I haven't (yet) 😂).

## license

```text
THE DERIVED BEER-WARE LICENSE" (Revision 1):
You can do whatever you want with this stuff. When you like it, just buy
Volker Buzek (@vobu) a beer when you see him.
```
