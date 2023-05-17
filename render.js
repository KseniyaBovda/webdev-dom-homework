import { comments, initLikeButtonsListeners, initEditButtonListeners, answers, fetchComment } from "./index.js"
import { loginForm, } from "./loginForm.js";
import { token, } from "./API.js";




export const renderComments = ({ user } = {}) => {
  const appEl = document.getElementById("app");
  if (!token) {
    const commentsHtml = comments
      .map((comment, index) => {
        return `<li class="comment" data-indx="${index}" data-comment="${comment.commentText}" data-name="${comment.name}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.time}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.commentText}
      </div>
    </div>
    <div class="comment-footer">
      <div class="edit">
          <button class="edit-button" data-edit="${index}">Редактировать</button>
        </div>
      <div class="likes" data-button="${index}" data-counter="${comment.like}">
        <span class="likes-counter" data-counter="${comment.like}">${comment.like}</span>
        <button class = "like-button ${(comment.likeStatus === true) ? '-active-like' : ''}" data-button="${index}"></button>
      </div>
    </div>
  </li>`
      }).join("");

    const appHtml =
      `<div class="loader">
                <p class="loader-top-text" id="loader"></p>
      </div>
            <div class="container">
                <ul class="ul-list" id="list">
                <!-- Список рендерится из JS -->
                ${commentsHtml}
                </ul>
                <div class="login">
                  <p>Что бы добавить коментарий, <a href="#" class="authorization" id="authorization" href="">авторизируйтесь</a></p>
                </div>
                <div class="loader-bottom">
                    <p class="loader-bottom-text" id="loader-bottom"></p>
                </div>
            </div>`

    appEl.innerHTML = appHtml;
    const auth = document.getElementById("authorization")
    auth.addEventListener('click', () => {
      loginForm();
    });
  } else {
    const commentsHtml = comments
      .map((comment, index) => {
        return `<li class="comment" data-indx="${index}" data-comment="${comment.commentText}" data-name="${comment.name}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.time}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.commentText}
      </div>
    </div>
    <div class="comment-footer">
      <div class="edit">
          <button class="edit-button" data-edit="${index}">Редактировать</button>
        </div>
      <div class="likes" data-button="${index}" data-counter="${comment.like}">
        <span class="likes-counter" data-counter="${comment.like}">${comment.like}</span>
        <button class = "like-button ${(comment.likeStatus === true) ? '-active-like' : ''}" data-button="${index}"></button>
      </div>
    </div>
  </li>`
      }).join("");

    const appHtml = `
   ${commentsHtml}
    <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      value="${user.name}"
      disabled
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      id="text-input"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="add-button">Написать</button>
    </div>
  </div>`
    appEl.innerHTML = appHtml;

    // Через клик 
    const buttonElement = document.getElementById("add-button");
    buttonElement.addEventListener('click', () => {
      fetchComment(buttonElement);
    })

    // Через кнопку
    document.addEventListener('keyup', function (event) {
      if (event.code == 'Enter' || event.code == 'NumpadEnter') fetchComment(buttonElement);
      return;
    });
  }


  initLikeButtonsListeners();
  initEditButtonListeners();
  answers();
};
