import { comments, initLikeButtonsListeners, initEditButtonListeners, answers, token, } from "./index.js"
import { loginForm, } from "./loginForm.js";



export const renderComments = () => {
  const appEl = document.getElementById("app");
  if (!token) {
    loginForm();
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
                  <p>Что бы добавить коментарий,<button class="authorization" id="authorization">авторизируйтесь</button></p>
                </div>
                <div class="loader-bottom">
                    <p class="loader-bottom-text" id="loader-bottom"></p>
                </div>
            </div>`

  appEl.innerHTML = appHtml;
  const auth = document.getElementById("authorization")
  auth.addEventListener('click',() => {
    loginForm();
  });


  // const buttonElement = document.getElementById("add-button");
  // const listElement = document.getElementById("list");
  // const nameInputElement = document.getElementById("name-input");
  // const commentInputElement = document.getElementById("comment-input");

  initLikeButtonsListeners();
  initEditButtonListeners();
  answers();
};
};