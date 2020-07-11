const {app} = require('./bin/routes');

app.listen(3000, () => {
    console.log('Servidor online na porta 3000');
})