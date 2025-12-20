
export default class LiComponent extends HTMLLIElement {
    constructor(key:string) {
        super();
        this.key = key
    }

    a: HTMLAnchorElement = document.createElement("a");
    li: HTMLLIElement = document.createElement("li");
    key:string

    connectedCallback() {
        console.log("Created LiComponent",this);
        this.appendChild(this.a);
        console.log(this.a);
        
    }

    disconnectedCallback() {
        //implementation
    }

    static observedAttributes = ["key","href"];
    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        if (name.includes("key")) {
            this.a.textContent = newVal;
        }
        if (name === "href") {
            this.a.setAttribute("href", newVal);
            this.a.textContent = newVal;
            console.log(this.a.textContent );
            
        }
        console.log("li component attr ",name,newVal);
    }

    adoptedCallback() {
        //implementation
    }

    edit() {
    }
}
console.log(LiComponent);

window.customElements.define("li-component", LiComponent, { extends:"li" }); //Edit
