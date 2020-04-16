const http = require("http")
const httpProxy = require("http-proxy")
const path = require("path")
const serve = require("serve-handler")

const server = ({ proxyFile, serveDir }) => {
    const allProxies = require(path.resolve(proxyFile))
    const proxiesUrlTrigger = Object.keys(allProxies)
    const proxy = httpProxy.createProxyServer()
    return http.createServer((request, response) => {
        const proxyThisUrl = proxiesUrlTrigger.find((urlTrigger) => request.url.match(urlTrigger))

        if (proxyThisUrl) {
            const proxyConfig = allProxies[proxyThisUrl]
            request.url = request.url.replace(proxyThisUrl, "")
            return proxy.web(request, response, proxyConfig, (error) => {
                response.destroy(error)
                console.dir({
                    from: request.url,
                    target: proxyConfig.target,
                    message: error.message
                })
            })
        }

        return serve(request, response, {
            // eslint-disable-next-line quote-props
            public: path.resolve(serveDir)
        })
    })
}

module.exports = server
