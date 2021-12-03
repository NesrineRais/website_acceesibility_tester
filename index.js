const express = require('express')
const pa11y = require('pa11y');
const PORT = process.env.PORT || 5000;



const app = express()
app.use(express.static(__dirname + 'public'))

const cors = require('cors');
app.use(cors());

app.get('/', async (req, res) => {
    res.json({ status: 200, msg: "api is ok" })
})
app.get('/api/test', async (req, res) => {

    if (!req.query.url) {
        res.status(400).json({ error: 'url is require' })
    } else {
        const results = await pa11y(req.query.url)
        console.log("req.query", req.query)//retours req.query { url: 'https://traversy.dev/' }
        res.status(200).json(results)
    }
    //for test in postman must add /api/test?url=url
})
app.listen(PORT, () => {
    console.log('listening port ' + PORT + ' all is ok');
})