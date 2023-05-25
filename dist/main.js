/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./API.js":
/*!****************!*\
  !*** ./API.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authoriz: () => (/* binding */ authoriz),\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   fetchCommentAPI: () => (/* binding */ fetchCommentAPI),\n/* harmony export */   getComment: () => (/* binding */ getComment),\n/* harmony export */   getCommentAPI: () => (/* binding */ getCommentAPI),\n/* harmony export */   register: () => (/* binding */ register),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./index.js\");\n\n\n\nconst host =  'https://webdev-hw-api.vercel.app/api/v2/:bovda';\n\nlet token = null;\nlet comments = [];\n\n\n(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)();\n;\n\n\nfunction getCommentAPI() {\n    return fetch(host + \"/comments\",\n        {\n            method: \"GET\",\n\n        })\n        .then((response) => {\n            if (response === 401) {\n                throw new Error(\"Нет авторизации\")\n            }\n\n            return response.json();\n        });\n}\n\nconst getComment = (name) => {\n    return getCommentAPI()\n    .then((responseData) => {\n        comments = responseData.comments.map((comment) => {\n            return {\n                name: comment.author.name,\n                commentText: comment.text,\n                time: new Date(comment.date).toLocaleString().slice(0, -3),\n                like: comment.likes,\n                likeStatus: comment.isLiked ? true : false,\n            };\n        });\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(name);\n        const loadingElement = document.querySelector(\".loader\")\n        if (loadingElement) {\n            loadingElement.style.display = \"none\";\n        }\n    });\n  };\n\ngetComment();\n\n\nfunction fetchCommentAPI(text, token,name) {\n\n    return fetch(host + \"/comments\", {\n        method: \"POST\",\n        body: JSON.stringify({\n            // name: nameInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),\n            text\n            // forceError: true,\n        }), headers: {\n            Authorization: `Bearer ${token}`,\n        }\n    })\n        .then((response) => checkResponseStatus(response))\n        .then(() => {\n            return getComment(name);\n        })\n        .then(() => {\n            _render_js__WEBPACK_IMPORTED_MODULE_0__.loadingElementBottom.style.display = \"none\";\n            // nameInputElement.value = \"\";\n            // commentInputElement.value = \"\";\n        })\n        .catch((error) => {\n            _render_js__WEBPACK_IMPORTED_MODULE_0__.buttonElement.disabled = false;\n            parseError(error,[text,name])\n            if (_render_js__WEBPACK_IMPORTED_MODULE_0__.loadingElementBottom) {\n                _render_js__WEBPACK_IMPORTED_MODULE_0__.loadingElementBottom.style.display = \"none\";\n            }\n            console.warn(error);\n        }).then(()=>{\n            _render_js__WEBPACK_IMPORTED_MODULE_0__.loadingElementBottom.style.display = \"block\";\n        })\n\n};\n\nfunction checkResponseStatus(response) {\n    if (response.status === 500) {\n        throw new Error(\"Ошибка сервера\");\n    }\n\n    if (response.status === 400) {\n        throw new Error(\"Неверный запрос\");\n    }\n\n    else {\n        return response.json();\n    }\n};\n\nfunction parseError(error, elements ) {\n    if (error.message === \"Ошибка сервера\") {\n        alert(\"Что-то с сервером\");\n        return;\n    }\n    if (error.message === \"Неверный запрос\") {\n        alert(\"Введи больше 3х символов\");\n        elements.forEach((element) => element.classList)\n        return;\n    }\n    alert(\"Отсутствует интернет\");\n}\n\nfunction authoriz(login, password,name) {\n    return fetch(\"https://webdev-hw-api.vercel.app/api/user/login\", {\n    method: \"POST\",\n    body: JSON.stringify({\n        login: login,\n        password: password,\n    }),    \n}).then((response) => {\n    return response.json()})\n    .then((data) => {\n        token=data.user.token;\n        name=data.user.name;\n        console.log(name);\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(name);\n    })\n}\n\nfunction register(login, password,name) {\n    return fetch(\"https://webdev-hw-api.vercel.app/api/user\", {\n    method: \"POST\",\n    body: JSON.stringify({\n        login: login,\n        password: password,\n        name: name,\n    }),    \n}).then((response) => {\n    return response.json()})\n    .then((data) => {\n        token=data.user.token;\n        console.log(name);\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)(name);\n    })\n\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./API.js?");

/***/ }),

/***/ "./formatDate.js":
/*!***********************!*\
  !*** ./formatDate.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatDateToRu: () => (/* binding */ formatDateToRu),\n/* harmony export */   formatDateToUs: () => (/* binding */ formatDateToUs)\n/* harmony export */ });\nconst formatDateToRu = (date) => {\n    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;\n  };\n  \nconst formatDateToUs = (date) => {\n    return `${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}-${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;\n  };\n\n//# sourceURL=webpack://webdev-dom-homework/./formatDate.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   answers: () => (/* binding */ answers),\n/* harmony export */   commentInputElement: () => (/* binding */ commentInputElement),\n/* harmony export */   initEditButtonListeners: () => (/* binding */ initEditButtonListeners),\n/* harmony export */   initLikeButtonsListeners: () => (/* binding */ initLikeButtonsListeners),\n/* harmony export */   nameInputElement: () => (/* binding */ nameInputElement),\n/* harmony export */   renderComments: () => (/* reexport safe */ _render_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)\n/* harmony export */ });\n/* harmony import */ var _API_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API.js */ \"./API.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./render.js\");\n/* harmony import */ var _formatDate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatDate.js */ \"./formatDate.js\");\n// Код писать здесь\n\n\n\n\n\n// Константы input\n\nconst nameInputElement = document.getElementById(\"name-input\");\nconst commentInputElement = document.getElementById(\"text-input\");\n\n\n// Обработчик клика лайка\n\nfunction initLikeButtonsListeners() {\n    const likeElements = document.querySelectorAll('.likes');\n\n    for (const likeElement of likeElements) {\n\n        const index = likeElement.dataset.button;\n        const heart = likeElement.dataset.counter;\n\n        likeElement.addEventListener(\"click\", (event) => {\n            event.stopPropagation();\n\n            if (_API_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].likeStatus === false) {\n                _API_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].like += 1;\n                _API_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].likeStatus = true;\n            } else {\n                _API_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].like -= 1;\n                _API_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].likeStatus = false;\n            }\n\n            (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)(name);\n        });\n    };\n};\n\n// Редактирование комментария\n\nfunction initEditButtonListeners() {\n    const editButtons = document.querySelectorAll('.edit-button');\n    editButtons.forEach(button => {\n        button.addEventListener('click', handleEditButtonClick);\n    });\n}\n\nfunction handleEditButtonClick(event) {\n    event.stopPropagation();\n    const commentItem = event.target.closest('.comment');\n    const commentText = commentItem.querySelector('.comment-text');\n    const editButton = commentItem.querySelector('.edit-button');\n\n    const textarea = document.createElement('textarea');\n    textarea.value = commentText.textContent;\n    textarea.classList.add('comment-textarea');\n\n    commentText.replaceWith(textarea);\n\n    const saveButton = document.createElement('button');\n    saveButton.textContent = 'Сохранить';\n    saveButton.classList.add('save-button');\n\n    editButton.replaceWith(saveButton);\n\n    saveButton.addEventListener('click', (event) => {\n        event.stopPropagation();\n        const newText = textarea.value;\n        commentText.textContent = newText;\n        textarea.replaceWith(commentText);\n        saveButton.replaceWith(editButton);\n    });\n};\n\n// Ответы на комментарии\n\nfunction answers() {\n\n    const userComments = document.querySelectorAll('.comment');\n\n    for (const userComment of userComments) {\n\n        userComment.addEventListener(\"click\", (event) => {\n            event.stopPropagation();\n\n            if (event.target.classList.contains('comment-textarea')) {\n                return;\n            }\n\n            const nameComment = userComment.dataset.name;\n            const textComment = userComment.dataset.comment;\n\n            commentInputElement.value = `>${textComment} \\n ${nameComment},`;\n\n        })\n    }\n};\n(0,_render_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\n\n\n// Блок кнопки\n\nfunction checkValue() {\n    // if (nameInputElement.value.trim() === '') {\n    //     buttonElement.disabled = true;\n    //     return;\n    // }\n\n    if (commentInputElement.value.trim() === '') {\n        _render_js__WEBPACK_IMPORTED_MODULE_1__.buttonElement.disabled = true;\n        return;\n    }\n\n    _render_js__WEBPACK_IMPORTED_MODULE_1__.buttonElement.disabled = false;\n}\n\n// nameInputElement.addEventListener('input', checkValue);\n// commentInputElement.addEventListener('input', checkValue);\n\n\n\n\nconsole.log(\"It works!\");\n\n\n//# sourceURL=webpack://webdev-dom-homework/./index.js?");

/***/ }),

/***/ "./loginForm.js":
/*!**********************!*\
  !*** ./loginForm.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loginForm: () => (/* binding */ loginForm)\n/* harmony export */ });\n/* harmony import */ var _API_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API.js */ \"./API.js\");\n\n\nfunction loginForm() {\n    const appEl = document.getElementById(\"app\");\n\n    let islodinMode = true;\n\n    const renderForm = () => {\n        const loginForm = \n        `<div class=\"login-form\">\n            <b class=\"heading\">Форма ${islodinMode ? \"входа\" : \"регистрации\"}</b>\n            ${islodinMode ? '' : \n            '<input id=\"name-input\" type=\"text\" class=\"reg-form-name\" placeholder=\"Введите имя\" />'}\n            <input id=\"login-input\" type=\"text\" class=\"login-form-login\" placeholder=\"Введите логин\" />\n            <input id=\"password-input\" type=\"password\" class=\"login-form-password\" placeholder=\"Введите пароль\" />\n            <button class=\"login-button\">${islodinMode ? \"войти\" : \"зарегистроваться\"}</button>\n            <button id=\"authorization-button\" class=\"authorization-button\">${islodinMode ? \"зарегистроваться\" : \"войти\"}</button>\n        </div>`\n        appEl.innerHTML = loginForm;\n    \n        document.querySelector(\".login-button\").addEventListener(\"click\", () => {\n            if (islodinMode) {\n                let login=document.getElementById(\"login-input\").value;\n                let password=document.getElementById(\"password-input\").value;\n                if (!login) {\n                    alert(\"Введите логин\");\n                    return;\n                }\n                if (!password) {\n                    alert(\"Введите пароль\");\n                    return;\n                }\n                (0,_API_js__WEBPACK_IMPORTED_MODULE_0__.authoriz)(login, password,)\n            } else {\n                let name=document.getElementById(\"name-input\").value;\n                let login=document.getElementById(\"login-input\").value;\n                let password=document.getElementById(\"password-input\").value;\n                if (!name) {\n                    alert(\"Введите имя\");\n                    return;\n                }\n        \n                if (!login) {\n                    alert(\"Введите логин\");\n                    return;\n                }\n\n                if (!password) {\n                    alert(\"Введите пароль\")\n                    return;\n                }\n                (0,_API_js__WEBPACK_IMPORTED_MODULE_0__.register)(login, password, name)\n            }\n\n        });\n    \n        document.querySelector(\".authorization-button\").addEventListener(\"click\", () => {\n            islodinMode = !islodinMode;\n            renderForm();\n        });\n    };\n\n    renderForm();\n};\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./loginForm.js?");

/***/ }),

/***/ "./render.js":
/*!*******************!*\
  !*** ./render.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buttonElement: () => (/* binding */ buttonElement),\n/* harmony export */   loadingElementBottom: () => (/* binding */ loadingElementBottom),\n/* harmony export */   renderComments: () => (/* binding */ renderComments),\n/* harmony export */   text: () => (/* binding */ text)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./index.js\");\n/* harmony import */ var _loginForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginForm.js */ \"./loginForm.js\");\n/* harmony import */ var _API_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./API.js */ \"./API.js\");\n\n\n\n\n\nlet text = null;\nlet buttonElement;\nconst loadingElementBottom = document.createElement(\"span\");\n\n\n\nconst renderComments = (name) => {\n\n  const appEl = document.getElementById(\"app\");   \n  if (!_API_js__WEBPACK_IMPORTED_MODULE_2__.token) {\n    const commentsHtml = _API_js__WEBPACK_IMPORTED_MODULE_2__.comments.map((comment, index) => {\n        return `<li class=\"comment\" data-indx=\"${index}\" data-comment=\"${comment.commentText}\" data-name=\"${comment.name}\">\n          <div class=\"comment-header\">\n            <div>${comment.name}</div>\n            <div>${comment.time}</div>\n          </div>\n          <div class=\"comment-body\">\n            <div class=\"comment-text\">\n              ${comment.commentText}\n            </div>\n          </div>\n          <div class=\"comment-footer\">\n            <div class=\"edit\">\n                <button class=\"edit-button\" data-edit=\"${index}\">Редактировать</button>\n              </div>\n            <div class=\"likes\" data-button=\"${index}\" data-counter=\"${comment.like}\">\n              <span class=\"likes-counter\" data-counter=\"${comment.like}\">${comment.like}</span>\n              <button class = \"like-button ${(comment.likeStatus === true) ? '-active-like' : ''}\" data-button=\"${index}\"></button>\n            </div>\n          </div>\n        </li>`\n      }).join(\"\");\n\n    const appHtml =\n      `<div class=\"loader\">\n      <p class=\"loader-top-text\" id=\"loader\">Пожалуйста подождите, комментарии загружаются...</p>\n      </div>\n            <div class=\"container\">\n                <ul class=\"ul-list\" id=\"list\">\n                <!-- Список рендерится из JS -->\n                ${commentsHtml}\n                </ul>\n                <div class=\"login\">\n                  <p>Что бы добавить коментарий, <a href=\"#\" class=\"authorization\" id=\"authorization\" href=\"\">авторизируйтесь</a></p>\n                </div>\n            </div>`\n\n    appEl.innerHTML = appHtml;\n    const auth = document.getElementById(\"authorization\")\n    auth.addEventListener('click', () => {\n      ;(0,_loginForm_js__WEBPACK_IMPORTED_MODULE_1__.loginForm)();\n    });\n  } else {\n    const commentsHtml = _API_js__WEBPACK_IMPORTED_MODULE_2__.comments.map((comment, index) => {\n        return `<li class=\"comment\" data-indx=\"${index}\" data-comment=\"${comment.commentText}\" data-name=\"${comment.name}\">\n    <div class=\"comment-header\">\n      <div>${comment.name}</div>\n      <div>${comment.time}</div>\n    </div>\n    <div class=\"comment-body\">\n      <div class=\"comment-text\">\n        ${comment.commentText}\n      </div>\n    </div>\n    <div class=\"comment-footer\">\n      <div class=\"edit\">\n          <button class=\"edit-button\" data-edit=\"${index}\">Редактировать</button>\n        </div>\n      <div class=\"likes\" data-button=\"${index}\" data-counter=\"${comment.like}\">\n        <span class=\"likes-counter\" data-counter=\"${comment.like}\">${comment.like}</span>\n        <button class = \"like-button ${(comment.likeStatus === true) ? '-active-like' : ''}\" data-button=\"${index}\"></button>\n      </div>\n    </div>\n  </li>`\n      }).join(\"\");\n\n    const appHtml = `\n   ${commentsHtml}                \n   <div class=\"loader-bottom\" id=\"loader-bottom\">\n   <p class=\"loader-bottom-text\" ></p>\n    </div>\n    <div class=\"add-form\">\n      <input\n        type=\"text\"\n        class=\"add-form-name\"\n        placeholder=\"Введите ваше имя\"\n        value=\"${name}\"\n        disabled\n      />\n      <textarea\n        type=\"textarea\"\n        class=\"add-form-text\"\n        placeholder=\"Введите ваш коментарий\"\n        id=\"text-input\"\n        rows=\"4\"\n      ></textarea>\n    <div class=\"add-form-row\">\n      <button class=\"add-form-button\" id=\"add-button\">Написать</button>\n    </div>\n    </div>`\n    appEl.innerHTML = appHtml;\n\n  \n    // Через клик \n    buttonElement = document.getElementById(\"add-button\");\n\n    const commentInputElement = document.getElementById(\"text-input\")\n    commentInputElement.addEventListener('input', () => {\n      text = commentInputElement.value;\n    })\n\n    buttonElement.addEventListener('click', () => {\n      loadingElementBottom.textContent = \"Пожалуйста подождите, комментарии загружаются...\";\n      document.getElementById(\"loader-bottom\").appendChild(loadingElementBottom);\n      (0,_API_js__WEBPACK_IMPORTED_MODULE_2__.fetchCommentAPI)(text, _API_js__WEBPACK_IMPORTED_MODULE_2__.token, name);\n    })\n\n    // Через кнопку\n    document.addEventListener('keyup', function (event) {\n      if (event.code == 'Enter' || event.code == 'NumpadEnter')\n      (0,_API_js__WEBPACK_IMPORTED_MODULE_2__.fetchCommentAPI)(text, _API_js__WEBPACK_IMPORTED_MODULE_2__.token, name);\n      return;\n    });\n  }\n\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.initLikeButtonsListeners)();\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.initEditButtonListeners)();\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.answers)();\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;