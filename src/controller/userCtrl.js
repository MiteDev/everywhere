const userDAO = require('../model/userDAO');
const crypto = require('crypto');

const createUser = async (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;
    let output = crypto.createHash('sha512').update(pw).digest('base64');
    let name = req.body.name;
    let p_num = req.body.p_num;
    let region = req.body.region;

    let parameters = {
        id,
        pw : output,
        name,
        p_num,
        region
    }
    try {
        await userDAO.register(parameters);
        res.sendStatus(200);
    } catch(err) {
        throw err;
    }
}

const getLogin = (req, res) => {
    res.render('login');
}

const findUser = async (req, res) => {
    if(req.session.is_Loggedin) {
        console.log('이미 로그인 되어있습니다.');
        res.redirect('/');
    } else {
        let id = req.body.id;
        let pw = req.body.pw;
        let output = crypto.createHash('sha512').update(pw).digest('base64');
    
        const parameters = {
            id,
            pw : output
        }
        try {
            let db_data = await userDAO.login(parameters);
            if(db_data[0] === undefined) {
                res.status(401).send('<script>alert("아이디 또는 비밀번호가 잘못되었습니다.")</script>');
            } else {
                req.session.is_Loggedin = true;
                req.session.user_name = db_data[0].name;
                req.session.user_id = db_data[0].id;
                res.cookie('isLoggedin')
                res.sendStatus(200);
            }
        } catch(err) {
            throw err;
        }
    }
}

const logout = (req, res) => {
    if(req.session.is_Loggedin) {
        req.session.destroy((err) => {
            if(err) {
                console.log('로그아웃 에러');
            } else {
                res.redirect('/');
            }
        })
    }
}

const deleteUser = (req, res) => {
    if(req.session.is_Loggedin) {
        let id = req.session.user_id;
        let parameters = {
            id
        }
        console.log(parameters);
        userDAO.deleteUser(parameters);
        res.redirect('/');

    } else {
        console.log('로그인이 되어 있지 않습니다.');
        res.redirect('/');
    }
}
const checkPw = async (req, res) => {
    if(req.session.is_Loggedin) {
        let pw = req.body.pw;
        let id = req.session.user_id;
        let output = crypto.createHash('sha512').update(pw).digest('base64');
        let parameters = {
            id,
            pw : output
        }
        try {
            const db_data = await userDAO.pwCheck(parameters)
            if(db_data[0] == undefined) {
                console.log(parameters);
                console.log(`${parameters}`);
                res.redirect('/');
            } else {
                console.log('비밀번호가 맞습니다');
                res.redirect('/update-user');
            }
        } catch(err) {
            throw err;
        }
    } else {
        console.log('로그인이 되어 있지 않습니다.');
        res.redirect('/');
    }
}

const updateUser = async (req, res) => {
    if(req.session.is_Loggedin) {
        let pw = req.body.pw;
        let output = crypto.createHash('sha512').update(pw).digest('base64');
        let parameters = {
            id : req.session.user_id,
            pw : output
        }
        console.log(req.session);
        await userDAO.userUpdate(parameters);
        res.redirect('/');
    } else {
        console.log('로그인이 되어 있지 않습니다.');
        res.redirect('/');
    }
}

module.exports = {
    createUser,
    findUser,
    logout,
    deleteUser,
    updateUser,
    checkPw,
    getLogin
}