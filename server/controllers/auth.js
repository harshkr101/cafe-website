const  jwt = require('jsonwebtoken');
const SECRET = 'anskfbainfn1o98b2fobo12bf0pb2f1pbp2fnp12i';
const  {promisify} = require('util');
const  fs = require('fs');
const  readdirAsync = promisify(fs.readdir);
const  readFileAsync = promisify(fs.readFile);
const  writeFileAsync = promisify(fs.writeFile);
// authenticate user
const auth = async (req, res) =>{

    try {
        const data = require('../data');
        if (req.cookies && req.cookies.token_mama) {
            const token = req.cookies.token_mama,
                decoded = jwt.verify(token, SECRET);
            if (data[decoded.email]) {
                res.status(200).send({msg: 'Auth successful', data: data[decoded.email]});
            } else {
                res.status(500).send({msg: 'Auth failed... there is no user with this token'});
            }
        } else {
            res.status(500).send({msg: 'Auth failed... there is no cookie'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
}

// login user
const login = async (req, res) => {
    try {
        const data = require('../data'),
            email = req.params.email,
            password = req.params.password,
            maxAge = req.params.remember === "true" ? (10 * 365 * 24 * 60 * 60) : (60 * 5 * 1000);
        if (data[email] && data[email].password === password) {
            const token = jwt.sign({email}, SECRET);
            res.cookie('token', token, {maxAge: maxAge});
            res.status(200).send({msg: 'Login successful', data: data[email]});
        } else {
            res.status(500).send({msg: 'Login failed... Either email or password are incorrect'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
}

// logout user
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({msg: 'Logout successful'});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
}

// signUp user
const signup = async (req, res) => {
    try {
        const email = req.body.email,
            password = req.body.password,
            address = req.body.address,
            houseNum = req.body.houseNum,
            city = capitalize(req.body.city),
            zip = req.body.zip,
            firstName = capitalize(req.body.firstName),
            lastName = capitalize(req.body.lastName),
            country = req.body.country;
        const data = require('../data');
        if (!data[email]) {
            data[email] = {
                "user": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "address": address,
                    "city": city,
                    "country": country,
                    "houseNum": houseNum,
                    "email": email,
                    "zip": zip
                },
                "password": password,
                "orders": {},
                "currentItems": {}
            };
            await writeFileAsync('../data.json', JSON.stringify(data));
            const token = jwt.sign({email}, SECRET);
            res.cookie('token', token, {maxAge: 60 * 5 * 1000});
            res.status(200).send({msg: 'Signup successful'});
        } else {
            res.status(500).send({msg: `The user ${email}, is already signed up...`});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const data = require('../data'),
            email = req.params.email,
            password = req.params.password;
        if (data[email] && data[email].password === password) {
            delete data[email];
            await writeFileAsync('../data.json', JSON.stringify(data));
            res.status(200).send({msg: 'User was deleted successfully', data: data[email]});
        } else {
            res.status(500).send({msg: 'User deletion failed'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
}


//Private functions
function capitalize(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


module.exports = {
    auth,
    login,
    logout,
    signup,
    deleteUser
}