import { Authoriz, Register, token } from "./API.js";

export function loginForm() {
    const appEl = document.getElementById("app");

    let islodinMode = true;

    const renderForm = () => {
        const loginForm = 
        `<div class="login-form">
            <b class="heading">Форма ${islodinMode ? "входа" : "регистрации"}</b>
            ${islodinMode ? '' : 
            '<input id="name-input" type="text" class="reg-form-name" placeholder="Введите имя" />'}
            <input id="login-input" type="text" class="login-form-login" placeholder="Введите логин" />
            <input id="password-input" type="password" class="login-form-password" placeholder="Введите пароль" />
            <button class="login-button">${islodinMode ? "войти" : "зарегистроваться"}</button>
            <button id="authorization-button" class="authorization-button">${islodinMode ? "зарегистроваться" : "войти"}</button>
        </div>`
        appEl.innerHTML = loginForm;
    
        document.querySelector(".login-button").addEventListener("click", () => {
            if (islodinMode) {
                let login=document.getElementById("login-input").value;
                let password=document.getElementById("password-input").value;
                if (!login) {
                    alert("Введите логин");
                    return;
                }
                if (!password) {
                    alert("Введите пароль")
                    return;
                }
                Authoriz(login, password,)
            } else {
                let name=document.getElementById("name-input").value;
                let login=document.getElementById("login-input").value;
                let password=document.getElementById("password-input").value;
                if (!name) {
                    alert("Введите имя");
                    return;
                }
        
                if (!login) {
                    alert("Введите логин");
                    return;
                }

                if (!password) {
                    alert("Введите пароль")
                    return;
                }
                Register(login, password, name)
            }

        });
    
        document.querySelector(".authorization-button").addEventListener("click", () => {
            islodinMode = !islodinMode;
            renderForm();
        });
    };

    renderForm();
};

