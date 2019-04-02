const express = require('express')
const server = express()

server.use(express.json())
const cohortsRouter = require('./cohorts-router.js')

server.use('/api/cohorts', cohortsRouter)

server.get('/', (req, res) => {
  res.send('Week 2 on API project')
})

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`\n** API running on http://localhost:${port} **\n`)
})
