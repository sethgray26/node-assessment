const userData = require('./userData.json')


module.exports = {
    getAllUsers: async (req, res, next) => {
        const { age, favorites, email } = req.query
        var theMaster = []
        for (i = 0; i < userData.length; i++) {
            for (key in userData) {
                // theMaster.push(userData[key])
                if (userData[key].age < age) {
                    theMaster.push(userData[key])
                } else if ((userData[key].favorites.includes(favorites))) {
                    theMaster.push(userData[key])
                } else if (userData[key].email === email) {
                    theMaster.push(userData[key])
                }
                // else {
                //     theMaster.push(userData)
                // }
            }
            return res.status(200).send(theMaster)
        }
    },
    getUserById: (req, res) => {
        const { id } = req.params
        console.log(id)
        for (key in userData) {
            if (userData[key].id == id) {
                return res.status(200).send(userData[key])
            }
        }
        for (key in userData) {
            if (userData[key].id !== id) {
                return res.status(404).send('failed')
            }
        }



    },
    getAdmin: async (req, res) => {
        var admins = []
        for (i = 0; i < userData.length; i++) {
            for (key in userData) {
                if (userData[key].type === 'admin') {
                    admins.push(userData[key])
                }
            }
            console.log(admins.length)
            return res.status(200).send(admins)
        }
    },
    getNonAdmin: (req, res) => {
        var theUsers = []
        for (i = 0; i < userData.length; i++) {
            for (key in userData) {
                if (userData[key].type !== 'admin') {
                    theUsers.push(userData[key].type)
                }
            }
            return res.status(200).send(theUsers)
        }
    },
    getUserType: async (req, res) => {
        const { userType } = req.params
        console.log(userType)
        var userTypes = []
        for (key in userData) {
            if (userData[key].type == userType) {
                userTypes.push(userData[key])
            }
        }
        return res.status(200).send(userTypes)
    },
    putUserId: (req, res) => {
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        const { id } = req.params
        console.log(id)
        let index;
        for (i = 0; i < userData.length; i++) {
            for (key in userData) {
                if (userData[key].id == id)
                    index = userData.indexOf(req.params.id)
                userData.splice(index, id, req.body)
                return res.status(200).send(userData[key])
            }
        }
    },
    postNewUser: (req, res) => {
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;

        let newUser = {
            first_name: first_name, last_name: last_name, email: email, gender: gender, language: language, age: age, city: city, state: state, type: type, favorites: favorites
        }

        let theNewID;
        for (key in userData) {
            theNewID = userData[key].id
        }

        newUser.id = theNewID
        newUser.id++
        console.log(theNewID)
        console.log(newUser.id)
        // console.log(console.log(newUser))

        userData.push(newUser)
        res.status(200).send(userData)


    },
    deleteUser: (req, res) => {
        const { id } = req.params
        console.log(id)
        let deleteID = [];
        for (key in userData) {
            if (userData[key].id == id)
                deleteID.push(userData[key])
        }
        console.log(deleteID)
        deleteID.splice(0, deleteID.length)
        console.log(deleteID)
        return res.status(200).send(deleteID)
    }

}