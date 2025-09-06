//import message from "./message";

import { getElementIndex } from "./util.js";
import message from "./message.js";


const listEl = document.getElementById("list") as HTMLUListElement;

export {getElementIndex }

//Edit
function edit(el: HTMLElement) {
    //Don't edit element which has been editing
    if (el.contentEditable === "true") return;

    el.innerHTML = JSON.stringify({
        href: el.getAttribute("href"),
        name: el.textContent,
    });
    el.setAttribute("contentEditable", "true");
    (el.parentNode as HTMLElement).setAttribute("draggable", "false");
    el.focus();
    processEdit(el);
}

function processEdit(el: HTMLElement | null) {
    el?.addEventListener(
        "blur",
        () => {
            //Empty to remove
            if (!el?.textContent) {
                el?.parentElement?.remove();
                return;
            }

            //If is removing
            if (!el) return;

            try {
                //If formatted JSON
                const processedInput: { name: string; href: string } =
                    JSON.parse(el.textContent as string);

                //If there's already a same-named link
                document.querySelectorAll("#list a").forEach((value) => {
                    if (value.textContent == processedInput.name) {
                        throw new Error(
                            "There's already a same-named link! Please try a new name."
                        );
                    }
                });

                //Process userInput
                el.innerHTML = processedInput.name;
                el.setAttribute("href", processedInput.href);
                el.removeAttribute("contentEditable");
                (el.parentNode as HTMLElement).setAttribute(
                    "draggable",
                    "true"
                );

                //Save
                save();
            } catch (er) {
                processEdit(el);
                throw er;
            }
        },
        { once: true }
    );
}
window.edit = edit;
document.addEventListener("contextmenu", (event) => {
    const el = event.target as HTMLElement;
    if (el.childNodes.length > 1 || el.tagName !== "A") return;
    event.preventDefault();

    edit(el);
});

//Add
function add() {
    const a = document.createElement("a");
    const li = document.createElement("li");
    a.setAttribute("href", "https://");
    const textNode = document.createTextNode("Title");
    a.appendChild(textNode);
    li.appendChild(a);
    draggable(li);
    listEl.appendChild(li);

    edit(a);
}
window.add = add;
window.addEventListener("keyup", (e) => {
    if (e.code == "KeyA" && e.altKey) add();
});
const addEl = document.getElementById("add");
addEl?.addEventListener("click", add);

//Remove
const removeEl = document.getElementById("remove") as HTMLButtonElement;
function remove(e: DragEvent) {
    const index = e.dataTransfer?.getData("Index") as any;
    const liEl = document.querySelectorAll("#list li")[index] as HTMLElement;
    liEl.remove();
}
window.remove = remove;
removeEl.addEventListener("drop", remove);
removeEl.addEventListener("dragover", (e) => e.preventDefault());

//Save and load
window.addEventListener("beforeunload", (e) => {
    //If is editing
    const focusEl = document.querySelector("a[contentEditable]");
    if (focusEl) {
        e.preventDefault();
    }
    save();
});
function save() {
    const list:any = {};
    document.querySelectorAll("#list a").forEach((value) => {
        list[value.textContent || "nothing"] = value.getAttribute("href");
    });
    console.log(list);
    localStorage.setItem("list", JSON.stringify(list));

    message.add("Saved!", "success");
}

window.addEventListener("DOMContentLoaded", () => {
    //load
    const list: any = JSON.parse(localStorage.getItem("list") || "{}");

    for (const property in list) {
        const a = document.createElement("a");
        const li = document.createElement("li");
        a.setAttribute("href", list[property]);
        const textNode = document.createTextNode(property);
        a.appendChild(textNode);
        li.appendChild(a);
        draggable(li);
        listEl.appendChild(li);
    }
});

//Draggable
function draggable(li: HTMLLIElement) {
    const a = li.children[0] as HTMLLinkElement;
    a.setAttribute("draggable", "false");
    li.setAttribute("draggable", "true");
    li.addEventListener("dragstart", (e) => {
        e.dataTransfer?.setData(
            "Index",
            getElementIndex(e.target as HTMLElement).toString()
        );
        e.dataTransfer!.dropEffect = "move";
        //e.dataTransfer?.setDragImage((e.target as Element).children[0],0,0)
    });
}

declare const window: Window & {edit:Function,add:Function,remove:Function};