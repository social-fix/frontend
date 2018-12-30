
var HttpsProxyAgent = require('https-proxy-agent');

// var proxyConfig = [
// 	{
// 		context: '/users',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "https:",
// 			port: 443
// 		},
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	},
// 	{
// 		context: '/service',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "https:",
// 			port: 443
// 		},
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	},
// 	{
// 		context: '/meal',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "https:",
// 			port: 443
// 		},
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	},
// 	{
// 		context: '/bed',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "https:",
// 			port: 443
// 		},
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	},
// 	{
// 		context: '/washing',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "https:",
// 			port: 443
// 		},
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	},
// 	{
// 		context: '/get_auth_token',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "https:",
// 			port: 443
// 		},
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	},
// 	{
// 		context: '/wss',
// 		target: {
// 			host: "socialfixtest.herokuapp.com",
// 			protocol: "wss:",
// 			port: 443
// 		},
// 		ws: true,
// 		secure: false,
// 		changeOrigin: true,
// 		logLevel: "debug"
// 	}
//  ];
var proxyConfig = [
	{
		context: "/users",
		target: "http://localhost:8000",
		secure: false
	},
	{
		context: "/service",
		target: "http://localhost:8000",
		secure: false
	},
	{
		context: "/meal",
		target: "http://localhost:8000",
		secure: false
	},
	{
		context: "/bed",
		target: "http://localhost:8000",
		secure: false
	},
	{
		context: "/washing",
		target: "http://localhost:8000",
		secure: false
	},
	{
		context: "/get_auth_token",
		target: "http://localhost:8000",
		secure: false
	},
	{
		context: "/wss",
		target: "ws://localhost:8000",
		ws: true,
		secure: false
	}
]
function setupForCorporateProxy(proxyConfig) {
	if (!Array.isArray(proxyConfig)) {
		proxyConfig = [proxyConfig];
	}

	const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
	let agent = null;

	if (proxyServer) {
		agent = new HttpsProxyAgent(proxyServer);
		console.log(`Using corporate proxy server: ${proxyServer}`);
		proxyConfig.forEach(entry => { entry.agent = agent; });
	}

	return proxyConfig;
}


module.exports = setupForCorporateProxy(proxyConfig);
