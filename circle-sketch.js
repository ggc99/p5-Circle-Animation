//height and width of the canvas
let height, width;

//Number of Circles that is wanted
let numberOfCircles = 40;
//Size of the Circles
let circleSize = 50;

//Global variables
var circles = [];
let allColors = [];
//A General speed for circles (def: 0.5)
let generalVelocity = 0.5;

let menu;
let menuPosition = {};

$(document).ready(function(){
    // Set height and width to the size of the top display 
    width = $(document).width();
    height = $(document).height();
});


function setup(){
    createCanvas(width, height).parent('canvas');
    //Pick possible colors for the circles
    let color1 = color(179, 255, 0, 40);
    let color2 = color(0, 191, 255, 40);

    allColors.push(color1,color2);

    //Create Circles
    for(let i=0; i<numberOfCircles; i++){
        //Define random position and color from colro array for each circle
        let randX = Math.floor(Math.random() * (width));
        let randY = Math.floor(Math.random() * (height));
        let randColor = allColors[Math.floor(random(0,2))];
        circles.push(new Circle(randX, randY, randColor));
    }
}


function draw(){
    background(26, 38, 37);
    noStroke();
    if(circles.length > 0){
        //Draw all  circles in circles array
        currentCarIndex = 0
        for(let i=0; i<circles.length; i++){
            currentCircleIndex = i;
            let cir = circles[i];
            cir.update();
            cir.draw();
        }
    }
}

function windowResized() {
    width = $(document).width();
    height = $(document).height();
    resizeCanvas(width, height);
    buttonPosY = (height/2) +25;
    buttonPosX = width /2;
}


class Circle{
    constructor(posX, posY, color){
        this.x = posX;
        this.y = posY;
        this.color = color;
        this.velocity = random(0.5,1.2);
        this.direction = {x:randomDirection(-2,2), y:randomDirection(-2,2)};
        this.size = circleSize;
    }

    update = function(){
        this.x += this.direction.x*this.velocity* generalVelocity;
        this.y += this.direction.y*this.velocity* generalVelocity;
        if(this.x >= width-2 || this.x <= 0){
            this.changeDirectionX();
        }
        else if(this.y >= height-2 || this.y <= 0){
            this.changeDirectionY();
        }
    }
    draw = function(){
        fill(this.color);
        circle(this.x, this.y, this.size);
    }
    changeDirectionY = function(){
        this.direction = {x:this.direction.x, y:this.direction.y*(0-1)};
    }
    changeDirectionX = function(){
        this.direction = {x:this.direction.x*(0-1), y:this.direction.y};
    }
}

//Return random color form allColors array
function randomColor(){
    randIndex = Math.floor(Math.random() * (allColors.length));
    return (allColors[randIndex]);
}

//Return a random direction for circle to move in
function randomDirection(min, max){
    rand = Math.floor(Math.random() * (max-min)) + min;
    if (rand==0){
        return rand+1;
    }
    else{
        return rand;
    }
}