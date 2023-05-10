export function loginForm() {
    const appEl = document.getElementById("app");
    
    const loginForm = 
`  <div class="login-form">
        <b class="heading">Форма входа</b>
        <input id="login-input" type="text" class="login-form-login" placeholder="Введите логин" />
        <input id="password-input" type="password" class="login-form-password" placeholder="Введите пароль" />
        <button class="login-button">Войти</button>
        <button class="authorization-button">Зарегистрироваться</button>
    </div>   
     
`
appEl.innerHTML = loginForm;

};

// export const addForm = 
// `                <div class="add-form">
// <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
// <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
//     rows="4"></textarea>
// <div class="add-form-row">
//   <button id="add-button" disabled="true" class="add-form-button">Написать</button>
// </div>
// </div>`;

{/* <div class="delite">
<button class="delite-button" id="delite-comment">Удалить последний комментарий</button>
</div>  */}