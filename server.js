const express = require('express');
const bodyParser = require('body-parser')
const ctrl = require('./usersCtrl.js')



const app = express();
app.use(express.json());
app.use(bodyParser.json())


// GET
app.get('/api/user', ctrl.getAllUsers)
app.get('/api/user/:id', ctrl.getUserById)
app.get('/api/admin', ctrl.getAdmin)
app.get('/api/nonadmin', ctrl.getNonAdmin)
app.get('/api/type/:userType', ctrl.getUserType)

// PUT

app.put('/api/user/:id', ctrl.putUserId)
// POST
app.post('/api/user', ctrl.postNewUser)

// DELETE
app.delete('/api/user/:id', ctrl.deleteUser)


app.listen(3000, () => {
    console.log(`3000 Ducks Marching On Rome`)
})