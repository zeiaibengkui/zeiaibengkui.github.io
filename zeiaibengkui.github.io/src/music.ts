import message from "./message";

if (localStorage.getItem("dvp")) {
    message.add("Develop mode enabled. ","No music embed. Press E and reload to disable it.")
} else {
    document
        .querySelector("#musicFr")
        ?.setAttribute(
            "src",
            "//music.163.com/outchain/player?type=2&id=34341364&auto=0&height=66"
        );
}

window.addEventListener("keypress", (e) => {
    if (e.code === "KeyD") localStorage.setItem("dvp", "true");
    if (e.code === "KeyE") localStorage.setItem("dvp", "");
});
