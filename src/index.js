const app = require('./app');
const {createConnection} = require('./database');

createConnection();
app.listen(app.get('port'));
console.log('Server on port', app.get('port'));