const app = require('./app');
const {createConnection} = require('./database');

createConnection();
app.listen(3000);
console.log('Server on port', 3000);