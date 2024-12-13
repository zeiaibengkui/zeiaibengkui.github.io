const toastBox = document.getElementById("toast-box") as HTMLElement;
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
// export default message;

window.addEventListener("error", (event) => {
    message.add(`${event.message}\n`, "error");
});
