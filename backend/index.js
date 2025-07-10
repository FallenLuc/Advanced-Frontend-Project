const fs = require("fs")
const jsonServer = require("json-server")
const path = require("path")
const https = require("https")
const http = require("http")
const uid = require("uid")

const options = {
	key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
	cert: fs.readFileSync(path.resolve(__dirname, "cert.pem"))
}

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, "db.json"))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

server.use(async (req, res, next) => {
	await new Promise(res => {
		setTimeout(res, 800)
	})
	next()
})

server.post("/login", (req, res) => {
	try {
		const { userName, password } = req.body
		const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json"), "UTF-8"))
		const { users = [] } = db

		const userFromBd = users.find(
			user => user.userName === userName && user.password === password
		)

		if (userFromBd) {
			return res.json({
				userName: userFromBd.userName,
				id: userFromBd.id,
				avatar: userFromBd.avatar,
				roles: userFromBd.roles,
				features: userFromBd.features,
				settings: userFromBd.settings
			})
		}

		return res.status(403).json({ message: "User not found" })
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

server.post("/signUp", (req, res) => {
	try {
		const { userName, password } = req.body

		const db = router.db

		const existingUser = db.get("users").find({ userName, password }).value()

		if (existingUser) {
			return res.status(403).json({ message: "User already registered" })
		}

		const newUser = {
			id: uid.uid(8),
			userName: userName,
			password: password,
			roles: ["USER"],
			features: {
				isFeatureRating: true,
				isFeatureComments: true
			},
			settings: {
				theme: "app-dark-theme"
			},
			avatar: ""
		}

		db.get("users").push(newUser).write()

		db.get("profile")
			.push({
				firstName: newUser.userName,
				lastName: "",
				age: 0,
				currency: "RUB",
				country: "Russia",
				city: "",
				userName: newUser.userName,
				avatar: "",
				id: newUser.id
			})
			.write()

		return res.json(newUser)
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: e.message })
	}
})

server.use((req, res, next) => {
	next()
})

const HTTP_PORT = 8000
const HTTPS_PORT = 8443

const httpsServer = https.createServer(options, server)
const httpServer = http.createServer(server)

server.use(router)

httpsServer.listen(HTTPS_PORT, () => {
	console.log(`server is running on ${HTTPS_PORT} port`)
})

httpServer.listen(HTTP_PORT, () => {
	console.log(`server is running on ${HTTP_PORT} port`)
})
