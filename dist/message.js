import { getElementIndex } from "./edit.js";
var toastBox = document.getElementById("toast-box");
var toastExample = document.getElementById("toast-example");
var message = {
    add: function (text, type) {
        if (type === void 0) { type = "info"; }
        var toast = toastExample.cloneNode(true);
        toast.setAttribute("id", "toast-" + type + "-" + Math.random().toFixed(8) * 10e8);
        Array.from(toast.children).forEach(function (value) {
            if (value.classList.contains("text")) {
                value.textContent = text;
            }
            else if (value.classList.contains("img")) {
                value.classList.add(type);
            }
        });
        toast.addEventListener("click", function (e) {
            //fadeout
            toast.style.opacity = "0";
            if (getElementIndex(toast) + 1 == toastBox.children.length &&
                toastBox.scrollHeight > window.innerHeight) {
                toast.style.marginTop = -toast.clientHeight - 5 + "px";
            }
            else {
                toast.style.marginBottom = -toast.clientHeight - 5 + "px";
            }
            setTimeout(function () {
                toast.remove();
            }, 500);
        });
        toastBox === null || toastBox === void 0 ? void 0 : toastBox.appendChild(toast);
        toastBox === null || toastBox === void 0 ? void 0 : toastBox.scroll({
            top: toastBox.scrollHeight,
            behavior: "smooth"
        });
    }
};
window.message = message;
export default message;
window.addEventListener("error", function (event) {
    message.add(event.message + "\n", "error");
});
