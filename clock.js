
if(window.addEventListener) {
    window.addEventListener("load", startScript, false);
}
else if(window.attachEvent) {
    window.attachEvent("onload", startScript);
}

function startScript() {
    try {
        alert("По заданому времени находим угол между стрелками");
        var hours = inputTimeValue("часы", 12, 1);
        var minutes = inputTimeValue("минуты", 59, 0);
        var degreesMinutes = calculateDegreesMinute(minutes);
        var degreesHours = calculateDegreesHours(minutes, hours);
        var degreesBetweenArrows = 0;
        
        if(degreesHours >= degreesMinutes) {
            degreesBetweenArrows = degreesHours - degreesMinutes;
        }
        else if (degreesHours < degreesMinutes) {
            degreesBetweenArrows = degreesMinutes - degreesHours;
        }
        else {
            console.error("Something went wrong");
        }
        console.log("degreesBetweenArrows = " + degreesBetweenArrows);
        canvasDraw(degreesHours, degreesMinutes, degreesBetweenArrows);
    }
    catch (exception) {
        console.info("Closed window");
    }
}

function inputTimeValue(translatedString, maxValue, minValue) {
    do {
        var inputValueFromUser = prompt("Введите желаемые " + translatedString , "");
        if(inputValueFromUser === null){
            throw "User closed window";
        }
        else {
            inputValueFromUser = parseInt(inputValueFromUser);
            if (inputValueFromUser <= maxValue && inputValueFromUser >= minValue) {
                return inputValueFromUser;
            }
            else {
                console.log("Not entered the correct data");
            }
        }
    }while(true);
}

function calculateDegreesMinute(userMinutes) {
    return (userMinutes * 6);
}

function calculateDegreesHours(userMinutes, userHours) {
    if(userHours === 12) {
        userHours = 0;
    }
    return (userHours * 30 + userMinutes * 0.5);
}

function drawCircle(x, y, radius, color, context) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = radius;
    context.strokeStyle = color;
    context.stroke();
}
function drawLine(x1, y1, radiusCLock, lineLength, angle, color, lineWidth, context) {
    var radians = (angle - 90) / 180 * Math.PI;
    var x2 = (radiusCLock + (lineLength * Math.cos(radians)));
    var y2 = (radiusCLock + (lineLength * Math.sin(radians)));
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}
function drawField(radiusCLock, lenghtFromCenterOfMark, clockWidth, radiusMinutesMark, radiusHoursMark, colorFill, colorClock, colorHours, colorMinutes, context) {
    
    context.fillStyle = colorFill;   
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(radiusCLock, radiusCLock, radiusCLock, 0, 2*Math.PI);
    context.strokeStyle = colorClock;
    context.lineWidth = clockWidth;
    context.stroke();
    var degrees = 0;
    var x = 0;
    var y = 0;

    for (var i = 0; i < 12; i++){                   // Рисуем часовые метки
        degrees = 360 / 12 * i;
        x = radiusCLock + (lenghtFromCenterOfMark * Math.cos((degrees - 90) / 180 * Math.PI));
        y = radiusCLock + (lenghtFromCenterOfMark * Math.sin((degrees - 90) / 180 * Math.PI));
        drawCircle(x, y, radiusHoursMark, colorHours, context);
    }
    for (var i = 0; i < 60; i++){                   // Рисуем минутные метки
        degrees = 360 / 60 * i;
        x = radiusCLock + (lenghtFromCenterOfMark * Math.cos((degrees - 90) / 180 * Math.PI));
        y = radiusCLock + (lenghtFromCenterOfMark * Math.sin((degrees - 90) / 180 * Math.PI));
        drawCircle(x, y, radiusMinutesMark, colorMinutes, context);
    }
}
function drawDegrees(x, y, radius, color, lineAngleWidth, context, degreesHours, degreesMinutes) {
    context.beginPath();
    var from = (degreesHours - 90) / 180 * Math.PI;
    var to =  (degreesMinutes - 90) / 180 * Math.PI;
    if(degreesHours > degreesMinutes) {
        from = (degreesMinutes - 90) / 180 * Math.PI;
        to = (degreesHours - 90) / 180 * Math.PI;
    }
    context.arc(x, y, radius, from, to);
    context.lineWidth = lineAngleWidth;
    context.strokeStyle = color;
    context.stroke();
}
function showText(x, y, context, degreesBetweenArrows, colorText, fontText) {
    context.fillStyle = colorText;
    context.font = fontText;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(degreesBetweenArrows + "°", x, y);
}
function canvasDraw(degreesHours, degreesMinutes, degreesBetweenArrows) {
    var degreesMinutes = degreesMinutes;
    var degreesHours = degreesHours;
    var colorHours = "#363646"; 
    var colorMinutes = "#1C2578";
    var colorFill = "rgba(0, 0, 0, 0)";
    var colorClock = "#4F6D93"; 
    var colorAngle = "#FF0000";
    var colorText = "#fff";
    var colorCenterMark = "#7686AB";
    var fontText = "bold 18px sans-serif";
    var sizeFill = 280;
    var clockWidth = 20;
    var lineHoursWidth = 7;
    var lineMinutesWidth = 5;
    var lineAngleWidth = 3;
    var radiusCLock = sizeFill / 2;
    var radiusMinutesMark = 1;
    var radiusHoursMark = 3;
    var radiusCenterMark = 17;
    var radiusAngle = 35;
    var lenghtFromCenterOfMark = radiusCLock - 15;
    var lenghtMinutes = lenghtFromCenterOfMark * 0.8;
    var lenghtHours = lenghtFromCenterOfMark * 0.55;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.save();
    context.translate(10, 10);
    
    drawField(radiusCLock, lenghtFromCenterOfMark, clockWidth, radiusMinutesMark, radiusHoursMark, colorFill, colorClock, colorHours, colorMinutes, context);
    drawLine(radiusCLock, radiusCLock, radiusCLock, lenghtHours, degreesHours, colorHours, lineHoursWidth, context);
    drawLine(radiusCLock, radiusCLock, radiusCLock, lenghtMinutes, degreesMinutes, colorMinutes, lineMinutesWidth, context);
    drawCircle(radiusCLock, radiusCLock, radiusCenterMark, colorCenterMark, context);
    drawDegrees(radiusCLock, radiusCLock, radiusAngle, colorAngle, lineAngleWidth, context, degreesHours, degreesMinutes, degreesBetweenArrows);
    showText(radiusCLock, radiusCLock, context, degreesBetweenArrows, colorText, fontText);

    context.restore();
}

