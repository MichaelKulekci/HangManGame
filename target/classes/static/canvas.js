var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
$(document).ready(function() {


	//Lets resize the canvas to occupy the full page
	var W = 300;
	var H = 300;
	canvas.width = W;
	canvas.height = H;
  context.fillStyle = "red";
  //drawHangman();

  function drawHangman() {

    //draw rope
    drawRope();
    //draw head
    drawFace();
    //draw body
    drawBody();
    //draw 1 leg
    drawLeg1();
    //draw 2nd leg
    drawLeg2();
    //draw 1 arm
    drawArm1();
    //draw 2nd arm
    drawArm2();
    //draw deathface
  }

});

function drawRope() {
    for (var y = 1; y < 20; y += 10) {
        context.moveTo(200, y);
        context.lineTo(200, 50);
    }
    context.stroke();
    for (var y = 110; y < 120; y += 10) {
        context.moveTo(190, y);
        context.lineTo(210, 110);
    }
    context.stroke();
    for (var y = 110; y < 115; y++) {
        context.moveTo(190, y);
        context.lineTo(210, 110);
    }
    context.stroke();
}
function drawArm1() {
    for (var y = 120; y < 130; y += 10) {
        context.moveTo(200, y);
        context.lineTo(230, 150);
    }
    context.stroke();
}

function drawArm2() {
    for (var y = 120; y < 130; y += 10) {
        context.moveTo(200, y);
        context.lineTo(170, 150);
    }
    context.stroke();
}

function drawBody() {
    for (var y = 110; y < 120; y += 10) {
        context.moveTo(200, y);
        context.lineTo(200, 150);
    }
    context.stroke();
}

function drawLeg1() {
    for (var y = 150; y < 160; y += 10) {
        context.moveTo(200, y);
        context.lineTo(230, 200);
    }
    context.stroke();
}

function drawLeg2() {
    for (var y = 150; y < 160; y += 10) {
        context.moveTo(200, y);
        context.lineTo(170, 200);
    }
    context.stroke();
}

function drawFace() {
    context.beginPath();
    context.arc(200,80,30,0,2*Math.PI);
    context.stroke();
    for (var y = 90; y < 95; y++) {
        context.moveTo(195, 90);
        context.lineTo(205, 90);
        context.moveTo(195, 91);
        context.lineTo(205, 91);
        context.moveTo(195, 92);
        context.lineTo(205, 92);
        context.moveTo(194, 93);
        context.lineTo(206, 93);
    }
    context.stroke();
    context.beginPath();
    context.arc(185,80,3,0,2*Math.PI);
    context.stroke();
    context.beginPath();
    context.arc(215,80,3,0,2*Math.PI);
    context.stroke();
}