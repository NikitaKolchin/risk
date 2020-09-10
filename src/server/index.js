const express = require('express')
const app = express()
const config = require('/config')
const path = require('path')
const ntlm = require('express-ntlm')
// const fs = require('fs')

app.use(express.static('build'))


if (process.env.PROD === 'stend') { //ntlm
	app.use(function(req, res, next){
		req.ntlm = {
			DomainName: 'REGION',
			UserName: '22KolchinNV',
			Workstation: 'D22KNV',
			Authenticated: true
		}
	next()
	})
} 
else {
	app.use(ntlm())
}

app.get('/ntlm', function(req, res){ //ntlm
	res.end(JSON.stringify(req.ntlm))
})


app.listen(config.get('port'), function(){
	console.log('Express server listening on port '+ config.get('port'))
	app.on('error', (error) => {
		console.log('ERROR in index.js')
		console.log(error)
		 })
})
