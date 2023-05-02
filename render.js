import{comments,listElement,initLikeButtonsListeners,initEditButtonListeners,answers} from "./index.js"
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
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

    listElement.innerHTML = commentsHtml;

    initLikeButtonsListeners();
    initEditButtonListeners();
    answers();
  };
export{renderComments};