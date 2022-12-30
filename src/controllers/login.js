const Login = require('../models/Login')

exports.index = (req, res) => {
    if(req.session.user) return res.render('conta')
    res.render('login')
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/agenda/login/');
            })
            return
        }

        req.flash('success', 'Usuário cadastrado com sucesso. Faça login.')
        req.session.save(() => {
            return res.redirect('/agenda/login/');
        })
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.signin = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/agenda/login/');
            })
            return
        }

        req.flash('success', 'Você agora está logado.')
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/agenda/login/');
        })
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/agenda/login/')
}