import { getElementIndex } from "./util.js";


const toastBox = document.getElementById("toast-box") as HTMLElement;
const toastExample = document.getElementById("toast-example");

const message = {
    add: (
        text: string,
        detail:string = "",
        type: "info" | "error" | "warn" | "success" = "info"
    ) => {
        const toast = toastExample!.cloneNode(true) as HTMLElement;
        toast.setAttribute(
            "id",
            "toast-" + type + "-" + (Math.random().toFixed(8) as any) * 10e8
        );

        //CSS Selector :>> #toast-id > text
        Array.from(toast.children).forEach((el) => {
            if (el.classList.contains("text")) {
                el.textContent = text;
            } else if (el.classList.contains("img")) {
                el.classList.add(type);
            } else if (el.classList.contains("detail")) {
                el.textContent = detail;
            }
        });

        toast.addEventListener("click", () => {
            //fadeout
            toast.style.opacity = "0";
            if (
                getElementIndex(toast) + 1 == toastBox.children.length &&
                toastBox.scrollHeight > window.innerHeight
            ) {
                toast.style.marginTop = `${-toast.clientHeight - 5}px`;
            } else {
                toast.style.marginBottom = `${-toast.clientHeight - 5}px`;
            }

            setTimeout(() => {
                toast.remove();
            }, 500);
        });

        toastBox?.appendChild(toast);
        toastBox?.scroll({
            top: toastBox.scrollHeight,
            behavior: "smooth",
        });
    },
};

(window as any).message = message;
 export default message;

window.addEventListener("error", (event) => {
    message.add(`${event.message}\n`, "error");
});
