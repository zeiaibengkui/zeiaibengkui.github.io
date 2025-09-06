//import message from "./message";

import { getElementIndex } from "./util.js";
import Swal from "sweetalert2";
import LiComponent from "./liComponent.js";
import { list } from "./list.js";

export { getElementIndex };

/* export function processEdit(el: HTMLElement | null) {
    el?.addEventListener(
        "blur",
        () => {
            //Empty to remove
            if (!el?.textContent) {
                el?.parentElement?.remove();
                return;
            }

            //If it has been already removing
            if (!el) return;

            try {
                //If formatted JSON
                const processedInput: { name: string; href: string } = JSON.parse(el.textContent as string);

                //If there's already a same-named link
                document.querySelectorAll("#list a").forEach((value) => {
                    if (value.textContent == processedInput.name) {
                        throw new Error("There's already a same-named link! Please try a new name.");
                    }
                });

                //Process userInput
                el.innerHTML = processedInput.name;
                el.setAttribute("href", processedInput.href);
                el.removeAttribute("contentEditable");
                (el.parentNode as HTMLElement).setAttribute("draggable", "true");

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
}); */

const listEl = document.getElementById("list") as HTMLUListElement;

//Add
function add() {
    const key = (Math.random() * 100).toFixed(20);
    list[key] = "https://";
    const li = new LiComponent();
    li.setAttribute("is", "li-component");
    li.setAttribute("key", key);
    listEl.appendChild(li);

    //edit(li);
}
window.add = add;
window.addEventListener("keyup", (e) => {
    if (e.code == "KeyA" && e.altKey) add();
});
const addEl = document.getElementById("add");
addEl?.addEventListener("click", add);

//Remove
const removeEl = document.getElementById("remove") as HTMLButtonElement;
async function remove(e: DragEvent) {
    const confirm = await Swal.fire({
        title: "Confirm?",
        showCancelButton: true,
        theme: "dark",
    });
    if (confirm.isDismissed) return;

    const index = e.dataTransfer?.getData("Index") as any;
    const liEl = document.querySelectorAll("#list li")[index] as HTMLElement;
    liEl.remove();
}
window.remove = remove;
removeEl.addEventListener("drop", remove);
removeEl.addEventListener("dragover", (e) => e.preventDefault());
