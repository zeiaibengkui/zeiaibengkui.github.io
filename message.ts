const messageBox = document.getElementById("toast-box");
const toastExample = document.getElementById("toast-example");

const message = {
    add: (
        text: string,
        type: "info" | "error" | "warn" | "success" = "info"
    ) => {
        const toast = toastExample!.cloneNode(true) as HTMLElement;
        toast.setAttribute(
            "id",
            "toast-" + type + "-" + (Math.random().toFixed(8) as any) * 10e8
        );
        Array.from(toast.children).forEach((value) => {
            if (value.classList.contains("text")) {
                value.textContent = text;
            } else if (value.classList.contains("img")) {
                value.classList.add(type);
            }
        });

        toast.addEventListener("click", (e) => {
            toast.style.opacity = "0";
            if (getElementIndex(toast) == 1) { // getElementIndex(toast) == 0 is the example                
                toast.style.marginBottom = `${-toast.clientHeight - 5}px`;
            } else {
                toast.style.marginTop = `${-toast.clientHeight - 5}px`;
            }

            setTimeout(() => {
                toast.remove();
            }, 500);
        });

        messageBox?.appendChild(toast);
        messageBox?.scroll({
            top: messageBox.scrollHeight,
            behavior: "smooth",
        });
    },
};
(window as any).message = message;
// export default message;

window.addEventListener("error", (event) => {
    message.add(`${event.message}\n`, "error");
});
