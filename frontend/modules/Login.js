import validator from 'validator'

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const element = e.target
        const emailInput = element.querySelector('input[name="email"]')
        const passwordInput = element.querySelector('input[name="password"]')

        let error = false
        
        if(!validator.isEmail(emailInput.value)){
            error = true
            let p = document.createElement("p")
            p.innerHTML = "E-mail inválido"
            p.setAttribute('class', 'text-danger')
            emailInput.parentElement.appendChild(p)
        }
        
        if(passwordInput.value.length < 3 || passwordInput.value.length > 20){
            error = true
            let p = document.createElement("p")
            p.innerHTML = "Senha inválida. Precisa ter entre 3 e 20 caracteres."
            p.setAttribute('class', 'text-danger')
            passwordInput.parentElement.appendChild(p)
        }

        if(!error) element.submit()
    }
}