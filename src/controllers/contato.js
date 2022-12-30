const Contato = require('../models/Contato');

exports.index = (req, res) => {
    res.render('cadastrarContato', {
        contato: {}
    })
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/'))
            return
        }

        req.flash('success', 'Contato registrado com sucesso!')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e);
        return res.render('404')
    }
}

exports.edit = async (req, res) => {
    if (!req.params.id) return res.render('404')

    try {
        const contato = await Contato.buscaPorId(req.params.id)
        if (!contato) return res.render('404')
        return res.render('cadastrarContato', {contato})
    } catch (e) {
        console.log(e)
        return res.render('404')
    }

}