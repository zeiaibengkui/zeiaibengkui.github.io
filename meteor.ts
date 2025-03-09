let defTime = 16;
const canvas = document.getElementById("meteorCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
let time = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Meteor {
    length: number;
    angle: number = Math.PI / 6;
    x: number;
    y: number;
    color: Array<string>;
    speed: number;

    constructor() {
        this.init();
    }

    randomColor() {
        var a = Math.ceil(255 - 240 * Math.random());
        //中段颜色
        return "rgba(" + a + "," + a + "," + a + ",1)";
    }

    init() {
        this.length = (Math.random() * 50 + 50) * vmin;
        this.x = Math.random() * -5 * window.innerWidth;
        this.y = Math.random() * -5 * window.innerHeight;

        this.color = ["white", this.randomColor(), "transparent"];

        this.speed = (Math.random() * 0.15 + 0.7) * defTime;
        //console.log(this.speed);
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        if (
            this.x + this.length > canvas.width &&
            this.y - this.length > canvas.height
        ) {
            this.init(); // 重新初始化
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        var lingrad = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x - this.width(),
            this.y - this.height()
        );

        lingrad.addColorStop(0, this.color[0]);
        lingrad.addColorStop(0.3, this.color[1]);
        lingrad.addColorStop(0.6, this.color[2]);
        ctx.strokeStyle = lingrad;

        ctx.lineTo(this.x - this.width(), this.y - this.height());

        ctx.lineWidth = 3;
        ctx.stroke();
    }

    height() {
        return this.length * Math.sin(this.angle);
    }

    width() {
        return this.length * Math.cos(this.angle);
    }
}

class Star {
    x: number = window.innerWidth * Math.random();
    y: number = window.innerHeight * Math.random();
    baseOpacity: number = (Math.random().toFixed(2) as unknown as number) - 0;
    opacity: number | string;
    color: string;
    speed: number = Math.random();

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillText(".", this.x, this.y);
    }

    update() {
        this.opacity = Math.cos(
            this.baseOpacity * 360 + time * 0.002 * this.speed
        );
        this.color = `rgb(255,255,255,${this.opacity})`;
    }

    constructor() {
        //console.log(this);
    }
}

let meteors: Array<Meteor> = [];
let stars: Array<Star> = [];
initArray();

function initArray() {
    meteors = stars = [];
    for (let i = 0; i < vmin / 50 + 3; i++) {
        meteors.push(new Meteor());
        for (let index = 0; index < Math.random() * 20 + 20; index++) {
            stars.push(new Star());
        }
    }
}

/* const img = new Image();
img.src =
    "//ts1.cn.mm.bing.net/th/id/R-C.e8561073a98557c2fd30c80f8db75c8a?rik=oGbmcGIrPg65sw&riu=http%3a%2f%2fstatics.888ppt.com%2fUpload%2fphotothumb%2f20171121%2f88192.jpg!w800&ehk=uG43ZPV77TeV17p2tCXilsvMAaxaD61yTKhtECTKQqM%3d&risl=&pid=ImgRaw&r=0";
function moon() {
    ctx.drawImage(img, 0, 0);
} */

function animate(newTimestamp: number) {
    defTime = newTimestamp - time;
    time = newTimestamp;
    /*     if (time >= 360) {
        time = 0;
        console.log("360!");
    } */

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //moon();
    meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
    });
    stars.forEach((star) => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}
animate(time);

window.addEventListener("resize", () => {
    vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initArray();
});
