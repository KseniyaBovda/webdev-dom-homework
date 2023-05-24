import { initLikeButtonsListeners, initEditButtonListeners, answers, } from "./index.js"
import { loginForm, } from "./loginForm.js";
import { fetchCommentAPI, token, comments,} from "./API.js";


export let text = null;
export let buttonElement;
export const loadingElementBottom = document.createElement("span");



export const renderComments = (name) => {

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
      <p class="loader-top-text" id="loader">Пожалуйста подождите, комментарии загружаются...</p>
      </div>
            <div class="container">
                <ul class="ul-list" id="list">
                <!-- Список рендерится из JS -->
                ${commentsHtml}
                </ul>
                <div class="login">
                  <p>Что бы добавить коментарий, <a href="#" class="authorization" id="authorization" href="">авторизируйтесь</a></p>
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
   <div class="loader-bottom" id="loader-bottom">
   <p class="loader-bottom-text" ></p>
    </div>
    <div class="add-form">
      <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        value="${name}"
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
    buttonElement = document.getElementById("add-button");

    const commentInputElement = document.getElementById("text-input")
    commentInputElement.addEventListener('input', () => {
      text = commentInputElement.value;
    })

    buttonElement.addEventListener('click', () => {
      loadingElementBottom.textContent = "Пожалуйста подождите, комментарии загружаются...";
      document.getElementById("loader-bottom").appendChild(loadingElementBottom);
      fetchCommentAPI(text, token, name);
    })

    // Через кнопку
    document.addEventListener('keyup', function (event) {
      if (event.code == 'Enter' || event.code == 'NumpadEnter')
      fetchCommentAPI(text, token, name);
      return;
    });
  }

  initLikeButtonsListeners();
  initEditButtonListeners();
  answers();
};