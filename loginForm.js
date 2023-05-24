import { Authoriz, token } from "./API.js";

export function loginForm() {
    const appEl = document.getElementById("app");
    
    const loginForm = 
    `<div class="login-form">
        <b class="heading">Форма входа</b>
        <input id="login-input" type="text" class="login-form-login" placeholder="Введите логин" />
        <input id="password-input" type="password" class="login-form-password" placeholder="Введите пароль" />
        <button class="login-button">Войти</button>
        <button id="authorization-button" class="authorization-button">Зарегистрироваться</button>
    </div>`
    appEl.innerHTML = loginForm;

    document.querySelector(".login-button").addEventListener("click", () => {
        let name=document.getElementById("login-input").value;
        let password=document.getElementById("password-input").value;
        Authoriz(name, password,)
    })

};



export function RegForm() {
    const appEl = document.getElementById("app");

    const regForm = 
    `<div class="reg-form">
        <b class="heading">Форма регистрации</b>
        <input id="name-input" type="text" class="reg-form-name" placeholder="Введите логин" />
        <input id="login-input" type="text" class="login-form-login" placeholder="Введите логин" />
        <input id="password-input" type="password" class="login-form-password" placeholder="Введите пароль" />
        <button class="login-button">Войти</button>
        <button class="authorization-button">Зарегистрироваться</button>
    </div>`;
    appEl.innerHTML = regForm;

    document.querySelector(".authorization-button").addEventListener("click", () => {
        let name=document.getElementById("login-input").value;
        let password=document.getElementById("password-input").value;
        Authoriz(name, password,)
    })
};
