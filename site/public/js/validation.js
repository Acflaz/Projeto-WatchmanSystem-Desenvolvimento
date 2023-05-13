function mostrar_requisitos() {
    requisitos.style.display = 'flex'
    requisitos.style.flexDirection = 'column'
    input_senha.style.marginBottom = '10px'

}

function requisitos_senha() {
    var senha = input_senha.value;
    const regex_upper = /[A-Z\d&Ñ]/;
    const regex_special = /[!@#$%^&*()_+]/;

    if (!(senha.length >= 8 && regex_upper.test(senha) && regex_special.test(senha))) {
        botao_cadastrar.style.backgroundColor = 'gray'
        botao_cadastrar.style.cursor = 'unset'
    } else {
        botao_cadastrar.style.backgroundColor = '#007DFA'
        botao_cadastrar.style.cursor = 'pointer'
    }

    if (senha.length >= 8) {
        min_char.style.color = 'green'
        min_char.style.fontWeight = 'bold'
        min_char.innerHTML = min_char.innerHTML.replace("➢", "✔")
    } else {
        min_char.style.color = 'gray'
        min_char.style.fontWeight = '400'
        min_char.innerHTML = min_char.innerHTML.replace("✔", "➢")
    };

    if (regex_upper.test(senha)) {
        char_maiusculo.style.color = 'green'
        char_maiusculo.style.fontWeight = 'bold'
        char_maiusculo.innerHTML = char_maiusculo.innerHTML.replace("➢", "✔")
    } else {
        char_maiusculo.style.color = 'gray'
        char_maiusculo.style.fontWeight = '400'
        char_maiusculo.innerHTML = char_maiusculo.innerHTML.replace("✔", "➢")
    };

    if (regex_special.test(senha)) {
        char_special.style.color = 'green'
        char_special.style.fontWeight = 'bold'
        char_special.innerHTML = char_special.innerHTML.replace("➢", "✔")
    } else {
        char_special.style.color = 'gray'
        char_special.style.fontWeight = '400'
        char_special.innerHTML = char_special.innerHTML.replace("✔", "➢")
    };
}

function cadastrar_usuario() {
    select_user = select_user.value;
    console.log(select_user);
    var email = input_email.value;
    var senha = input_senha.value;
    var confirmar_senha = input_confirmar_senha.value;
    const regex_upper = /[A-Z\d&Ñ]/;
    const regex_special = /[!@#$%^&*()_+]/;
    
    if (email.includes('@') == true && senha.length >= 8 && regex_upper.test(senha) && regex_special.test(senha) && senha == confirmar_senha) {
        alert('Cadastro realizado!')
    } else {
        if (regex_upper.test(senha) == false && regex_special.test(senha) == false) {
            alert('A senha deve conter todos os requisitos mínimos.')
        } else if (senha != confirmar_senha) {
            alert('As senhas não coincidem.')
        } else {
            alert('Digite um e-mail válido.')
        }
    }
}