
status = "";
images = [];


function preload(){
    song = loadSound("danger_warning.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();
    camera1 = createCapture(VIDEO);
    camera1.size(500, 400);
    camera1.hide();

    load = ml5.objectDetector("cocoSSD", modelLoaded);
    document.getElementById("status").innerHTML = "Object detection is started"
}

function modelLoaded(){
    console.log("model_loaded");
    status = true;
   
}

function gotAns(error, result){
    if(error){
    console.log(error);
    }

    else{
        console.log(result);
        images = result;
    }
}

function draw(){
 image(camera1, 0, 0, 500, 400);

 /*fill("green")
 text("dog", 110, 90)
 noFill()
 rect(100, 70, 200, 300)


 fill("red")
 text("cat", 260, 90)
 noFill()
 rect(250, 60, 200, 200)*/
 
if(status != ""){
// console.log("status");

r = random(255);
g = random(255);
b = random(255);

load.detect(camera1, gotAns);
for(i = 0; i<images.length; i++){

    document.getElementById("status").innerHTML = "object detected"
    
    fill(r,g,b);
    percentage = ceil(images[i].confidence*100) + " %"
    text(images[i].label + " " + percentage, images[i].x , images[i].y )

    noFill();
    stroke(r,g,b);
    rect( images[i].x ,images[i].y ,images[i].width, images[i].height);

    if(images[0].label == "person"){
     document.getElementById("baby_found").innerHTML = "Baby found";
     document.getElementById("status").innerHTML = "object detected";
     song.stop();
    }
    else if(images[0].label != "") 
    {
            console.log("else");
            document.getElementById("baby_found").innerHTML = "Baby not found";
            document.getElementById("status").innerHTML = "object detected";
            song.play();
        }
    
    
}
}

}