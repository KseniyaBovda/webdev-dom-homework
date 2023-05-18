// Функция отображает комментарий



// function showComment() {

//     // // nameInputElement.classList.remove("error");
//     // if (nameInputElement.value.trim() === '') {
//     //     nameInputElement.classList.add("error");
//     //     return;
//     // }

//     commentInputElement.classList.remove("error");
//     if (commentInputElement.value.trim() === '') {
//         commentInputElement.classList.add("error");
//         return;
//     }

//     function dateElement() {
//         let date = new Date();
//         let monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
//         let minute = String(date.getMinutes().length < 2 ? '0' + date.getMinutes() : date.getMinutes());
//         let hour = String(date.getHours().length < 2 ? '0' + date.getHours() : date.getHours());
//         let day = String(date.getDate().length < 2 ? '0' + date.getDate() : date.getDate());
//         let month = monthArray[+date.getMonth()]
//         let year = String(date.getFullYear()).slice(2)
//         let str = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
//         return str;
//     }

//     fetchComment();
//     renderComments();

//     // nameInputElement.value = "";
//     // commentInputElement.value = "";
// };

// Удаление последнего элемента


 //const listElement = document.getElementById("list");
 // const buttonDeliteElement = document.getElementById("delite-comment");

//   buttonDeliteElement.addEventListener("click", () => {
//     const listElements = document.querySelector('ul');
//     const lastCommentIndex = listElements.innerHTML.lastIndexOf(`<li class="comment"`);
//     listElements.innerHTML = listElements.innerHTML.substring(0, lastCommentIndex);
//     initLikeButtonsListeners();
//     initEditButtonListeners();
//     answers();
//   });

// API

// export const getComment = () => {
//     return getCommentAPI()
//     .then((responseData) => {
//         comments = responseData.comments.map((comment) => {
//             return {
//                 name: comment.author.name,
//                 commentText: comment.text,
//                 time: new Date(comment.date).toLocaleString().slice(0, -3),
//                 like: comment.likes,
//                 likeStatus: comment.isLiked ? true : false,
//             };
//         });
//         renderComments();
//         loadingElement.style.display = "none";
//     });
//   };

// getComment();