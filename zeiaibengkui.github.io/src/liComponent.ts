import { getElementIndex } from "./util";

export default class LiComponent extends HTMLLIElement {
    constructor() {
        super();
    }

    a: HTMLAnchorElement = document.createElement("a");
    li: HTMLLIElement = document.createElement("li");

    connectedCallback() {
        console.log("Created LiComponent",this);

        this.a = document.createElement("a");
        this.li = this;
        this.a.setAttribute("href", "https://");
        const textNode = document.createTextNode("Title");
        this.a.appendChild(textNode);
        this.li.appendChild(this.a);

        //Draggable
        function draggable(li: HTMLLIElement) {
            const a = li.children[0] as HTMLLinkElement;
            a.setAttribute("draggable", "false");
            li.setAttribute("draggable", "true");
            li.addEventListener("dragstart", (e) => {
                e.dataTransfer?.setData("Index", getElementIndex(e.target as HTMLElement).toString());
                e.dataTransfer!.dropEffect = "move";
                //e.dataTransfer?.setDragImage((e.target as Element).children[0],0,0)
            });
        }
        draggable(this.li);
    }

    disconnectedCallback() {
        //implementation
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "key") {
            this.a.setAttribute("href", window.list[newVal]);
            this.a.textContent = newVal;
        }
        console.log(name);
    }

    adoptedCallback() {
        //implementation
    }

    edit(el: HTMLAnchorElement) {
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
}

window.customElements.define("li-component", LiComponent, { extends: "li" }); //Edit
