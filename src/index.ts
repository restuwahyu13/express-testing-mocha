import express, { Express, Request, Response } from 'express'
import { Server } from 'http'

const app = express() as Express

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/profile/create', (req: Request, res: Response) => {
	if (req.body.name !== 'aldi khan' && req.body.age !== 25) {
		return res.status(403).json({
			message: 'add new profile failed'
		})
	}
	return res.status(201).json({
		message: 'add new profile successfully'
	})
})

app.get('/profile/result', (req: Request, res: Response) => {
	return res.status(200).json({
		name: 'john doe',
		age: 28
	})
})

app.get('/profile/:name', (req: Request, res: Response) => {
	if (req.params.name != 'jane doe') {
		return res.status(400).json({
			success: false
		})
	}
	return res.status(200).json({
		success: true
	})
})

app.listen(3001, () => console.log('server is running')) as Server

export default app
