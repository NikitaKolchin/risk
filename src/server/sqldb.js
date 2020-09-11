const sql = require('mssql/msnodesqlv8')
const config = require('./config')
//const log = require('../log')(module)
const connectionPool = new sql.ConnectionPool(config.get('db'))
const poolConnect = connectionPool.connect()

connectionPool.on('error', err => {
	console.log('Connection Error!')
	console.log(err)
	
})

const getTimeStamp=()=>`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`

const getSelect = async function(query) {
	try {
		await poolConnect
		const result = await connectionPool.request().query(query)
		//const result= await request
		return result.recordset
	} catch (err) {
		//log.info(err)
		console.log(`${getTimeStamp()} ERROR in db/sqldb.js/getSelect() on query:`)
		console.log(query)
		console.log(err)
		throw err
	}
}
const executeQuery = async function(query) {
	try {
		await poolConnect
		const result = await connectionPool.request().query(query)
		return result.rowsAffected
	} catch (err) {
		//log.info(err)
		console.log(`${getTimeStamp()} ERROR in db/sqldb.js/executeQuery() on query:`)
		console.log(query)
		console.log(err)
		throw err
	}
}
module.exports = { getSelect, executeQuery }
