function verificarNome() {
    const nome = document.getElementById("nome");
    const nomeValue = nome.value;
    const regexCheck = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
    const aviso = document.querySelector("#avisoNome");

    if (nomeValue != '' && !regexCheck.test(nomeValue)) {
        nome.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        nome.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarSobrenome() {
    const sobrenome = document.getElementById("sobrenome");
    const sobrenomeValue = sobrenome.value;
    const regexCheck = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    const aviso = document.querySelector("#avisoSobrenome");

    if (sobrenomeValue != '' && !regexCheck.test(sobrenomeValue)) {
        sobrenome.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        sobrenome.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarEmail() {
    emailValue = email.value;
    const aviso = document.querySelector("#avisoEmail");

    if (emailValue == "") {
        email.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        email.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}


function verificarSenha() {
    const senha = document.getElementById("senha");
    const senhaValue = senha.value;
    const regexCheck = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{10,}$/;
    const aviso = document.querySelector("#avisoSenha");

    if (senhaValue != '' && !regexCheck.test(senhaValue)) {
        senha.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        senha.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }

    confirmaSenha();
}

function confirmaSenha() {
    const senha = document.getElementById("senha");
    const senhaValue = senha.value;
    const confirmarSenha = document.getElementById("confirmarSenha");
    const confirmarSenhaValue = confirmarSenha.value;
    const aviso = document.querySelector("#avisoConfirmaSenha");

    if (confirmarSenhaValue != '' && senhaValue != confirmarSenhaValue) {
        confirmarSenha.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        confirmarSenha.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }

}

const dataMinima = new Date();
dataMinima.setFullYear(dataMinima.getFullYear() - 15);

const ano = dataMinima.getFullYear();
const mes = (dataMinima.getMonth() + 1).toString().padStart(2, "0");
const dia = dataMinima.getDate().toString().padStart(2, "0");
const dataMinimaFormatada = `${ano}-${mes}-${dia}`;

document.getElementById("data").setAttribute("max", dataMinimaFormatada);

function verificarData() {
    const data = document.getElementById("data");
    const dataValue = data.value;
    const idadeMinima = 15;

    if (dataValue) {
        const dataNascimento = new Date(dataValue);
        const dataAtual = new Date();

        const anosDif = dataAtual.getFullYear() - dataNascimento.getFullYear();
        const mesesDif = dataAtual.getMonth() - dataNascimento.getMonth();
        const diasDif = dataAtual.getDate() - dataNascimento.getDate() - 1;
        const aviso = document.querySelector("#avisoData");

        if (
            anosDif < idadeMinima ||
            (anosDif === idadeMinima && (mesesDif < 0 || (mesesDif === 0 && diasDif < 0)))
        ) {
            data.classList.add("is-invalid");
            aviso.classList.remove("d-none");
        } else {
            data.classList.remove("is-invalid");
            aviso.classList.add("d-none");
        }
    }
}

function verificarTelefone() {
    const telefone = document.getElementById("fone");
    const telefoneValue = telefone.value;
    const regexCheck = /^[0-9]{13}$/;
    const aviso = document.querySelector("#avisoFone");

    if (telefoneValue != '' && !regexCheck.test(telefoneValue)) {
        telefone.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        telefone.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarCpf() {
    const cpf = document.getElementById("cpf");
    const cpfValue = cpf.value;
    const regexCheck = /^\d{11}$/;
    const aviso = document.querySelector("#avisoCpf");

    if (cpfValue != '' && !regexCheck.test(cpfValue)) {
        cpf.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        cpf.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

const cep = document.getElementById("cep");

function verificarCep() {
    const cepValue = cep.value;
    const regexCheck = /^[0-9]{8}$/;;
    const aviso = document.querySelector("#avisoCep");

    if (cepValue != '' && !regexCheck.test(cepValue)) {
        cep.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        cep.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

cep.addEventListener("keyup", (e) => {
    const cepValue = e.target.value;

    if (cepValue.length === 8) {
        getAddress(cepValue);
        return;
    }
});

const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");

const getAddress = async (cep) => {

    const apiUrl = `https://cep.awesomeapi.com.br/json/${cep}`

    const resposta = await fetch(apiUrl);

    const info = await resposta.json();

    console.log(info);

    if (info.code === 'not_found') {
        alert('CEP não encontrado, tente novamente!');
        const aviso = document.querySelector("#avisoCep");
        this.cep.classList.add("is-invalid");
        aviso.classList.remove("d-none");
        rua.value = '';
        cidade.value = '';
        bairro.value = '';
        uf.value = '';
        return;
    } else {
        rua.value = info.address;
        cidade.value = info.city;
        bairro.value = info.district;
        uf.value = info.state;
    }
}

function verificarRua() {
    ruaValue = rua.value;
    const aviso = document.querySelector("#avisoRua");

    if (ruaValue == "") {
        rua.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        rua.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarNumero() {
    numeroValue = numero.value;
    const aviso = document.querySelector("#avisoNumero");

    if (numeroValue == "") {
        numero.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        numero.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarComplemento() {
    complementoValue = complemento.value;
    const aviso = document.querySelector("#avisoComplemento");

    if (complementoValue == "") {
        complemento.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        complemento.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}


function verificarBairro() {
    const bairro = document.getElementById("bairro");
    const bairroValue = bairro.value;
    const regexCheck = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    const aviso = document.querySelector("#avisoBairro");

    if (bairroValue != '' && !regexCheck.test(bairroValue)) {
        bairro.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        bairro.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarCidade() {
    const cidade = document.getElementById("cidade");
    const cidadeValue = cidade.value;
    const regexCheck = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    const aviso = document.querySelector("#avisoCidade");

    if (cidadeValue != '' && !regexCheck.test(cidadeValue)) {
        cidade.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        cidade.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function verificarUF() {
    const uf = document.getElementById("uf");
    const ufValue = uf.value;
    const regexCheck = /^[A-Z]{2}$/;
    const aviso = document.querySelector("#avisoUF");

    if (ufValue != '' && !regexCheck.test(ufValue)) {
        uf.classList.add("is-invalid");
        aviso.classList.remove("d-none");
    } else {
        uf.classList.remove("is-invalid");
        aviso.classList.add("d-none");
    }
}

function atualizarBotao() {
    const camposInvalidos = document.querySelectorAll(".is-invalid");
    const botaoCadastro = document.getElementById("cadastrar");
    if (camposInvalidos.length === 0) {
        botaoCadastro.removeAttribute("disabled");
    } else {
        botaoCadastro.setAttribute("disabled");
    }
}

const formulario = document.querySelector(".formCadastro");
const inputs = formulario.querySelectorAll("input");
const botaoCadastro = document.getElementById("cadastrar");

inputs.forEach(function (input) {
    input.addEventListener("input", verificarCamposPreenchidos);
});

function verificarCamposPreenchidos() {
    let todosCamposPreenchidos = true;
    let algumCampoInvalido = false;

    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            todosCamposPreenchidos = false;
        }
        if (input.classList.contains("is-invalid")) {
            algumCampoInvalido = true;
        }
    });

    if (todosCamposPreenchidos && !algumCampoInvalido) {
        botaoCadastro.removeAttribute("disabled");
    } else {
        botaoCadastro.setAttribute("disabled", "disabled");
    }
}