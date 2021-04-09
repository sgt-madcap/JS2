class Form {
    constructor() {
        this.inputPatterns = {
            name: /^([a-z]|[а-я])+$/i,
            phone: /\+\d\(\d{3}\)\d{3}-\d{4}/,
            email: /(\w+|\w+\.\w+|\w+-\w+)@\w+\.[a-z]{2,3}/i
        }
        this._init()
    }

    _init() {
        document.querySelector(".webform .submitBtn").addEventListener('click', (event) => {
            this._validateInputs(event)
        })
    }

    _validateInputs(event) {
        this.inputs = event.target.parentNode.querySelectorAll('input')
        this.inputs.forEach(input => {
            if (!input.value.match(this.inputPatterns[input.name])) {
                input.classList.add('error')
            } else {
                input.classList.remove('error')
            }
        });
    }
}

let registrationForm = new Form;
