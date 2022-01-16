const noticeDAO = require('../model/noticeDAO');

const showNoticeList = (req, res) => {
    noticeDAO.show_Notice_List()
        .then((db_data) => {
            res.send(db_data);
        })
        .catch((err) => {
            throw err;
        })
}

const showOneNotice = (req, res) => {
    n_seq = req.params.n_seq;
    let parameters = {
        n_seq
    }

    noticeDAO.show_one_Notice(parameters)
        .then((db_data) => {
            res.send(db_data);
        })
        .catch((err) => {
            throw err;
        })
}

const createNotice = (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let parameters = {
        title,
        content
    }
    console.log(parameters);

    noticeDAO.create_Notice(parameters)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            throw err;
        })
}

const updateNotice = (req, res) => {
    let n_seq = req.body.n_seq;
    let title = req.body.title;
    let content = req.body.content;
    let parameters = {
        n_seq,
        title,
        content
    }

    noticeDAO.update_Notice(parameters)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            throw err;
        })
}

const deleteNotice = (req, res) => {
    let n_seq = req.body.n_seq;
    let parameters = {
        n_seq
    }

    noticeDAO.delete_Notice(parameters)
        .then(() => {
            res.redirect('/');
        }).catch((err) => {
            throw err;
        })
}

module.exports = {
    showNoticeList,
    showOneNotice,
    createNotice,
    updateNotice,
    deleteNotice
}