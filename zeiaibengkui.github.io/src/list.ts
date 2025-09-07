import LiComponent from "./liComponent";
import message from "./message";

//Database
const data = JSON.parse(localStorage.getItem("list") || "{}");
export const list = new Proxy(data, {
    set(target, p, newValue, receiver) {
        console.log("list edited :>>", target, p, newValue, receiver);
        target[p] = newValue;
        return true;
    },
});
window.list = list;

const listEl = document.getElementById("list") as HTMLUListElement;

//Save and load
window.addEventListener("beforeunload", (e) => {
    //If is editing
    const focusEl = document.querySelector("a[contentEditable]");
    if (focusEl) {
        e.preventDefault();
    }
    save();
});
export function save() {
    /* const list: any = {};
    document.querySelectorAll("#list a").forEach((value) => {
        list[value.textContent || "nothing"] = value.getAttribute("href");
    });
    console.log(list); */
    localStorage.setItem("list", JSON.stringify(list));

    message.add("Saved!", "success");
}

//load
window.addEventListener("DOMContentLoaded", () => {
    for (const key in list) {
        const li = new LiComponent(key);
        li.setAttribute("is", "li-component");
        listEl.appendChild(li);
        li.setAttribute("key", key);
    }
});
