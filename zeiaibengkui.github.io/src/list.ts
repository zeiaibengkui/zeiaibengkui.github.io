import message from "./message";

//Database
const data = JSON.parse(localStorage.getItem("list") || "{}");
export const list = new Proxy(data,{})
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
    localStorage.setItem("list", JSON.stringify(window.list));

    message.add("Saved!", "success");
}

window.addEventListener("DOMContentLoaded", () => {
    //load
    const list = new Proxy(window.list, {});

    for (const key in list) {
        const li = document.createElement("li-component");
        li.setAttribute("is", "li-component");
        li.setAttribute("key", key);
        listEl.appendChild(li);
    }
});
