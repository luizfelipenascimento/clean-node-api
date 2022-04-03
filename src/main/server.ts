import express from 'express'

const app = express()
app.listen(5050, () => {
  console.log('Server running at localhost:5050')
})
