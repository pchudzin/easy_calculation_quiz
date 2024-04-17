// https://bernii.github.io/gauge.js/
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}
function generateUniqueRandomNumber(min, max){
    let arr = [];
    while (arr.length < 10) {
        let num = Math.floor(Math.random() * (max - min + 1) + min); 
        if (!isInArray(num, arr) && num % 10 !== 0 ) {
            arr.push(num); 
        }
    }
    return arr;
}
function getRandomDivisibleNumbers() {
    const min = 20;
    const max = 199;
    const min_2 = 2;
    const max_2 = 19;
    const result = [];
    
    while (result.length < 10) { 
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        const num_2 = Math.floor(Math.random() * (max_2 - min_2 + 1)) + min_2;
        if (num % num_2 === 0 && num !== num_2 && num % 10 !== 0 && num_2 % 10 !== 0 ) {
            result.push(num);
            result.push(num_2);
        }
    }
    return result;
}
const numbers = generateUniqueRandomNumber(11,99); 
const numbers_2 = generateUniqueRandomNumber(11,499);
const numbers_multiply = generateUniqueRandomNumber(9,19);
const numbers_multiply_2 = [];
const diffNumbers = [];
const addNumbers = [];
const multNumbers = [];
const multNumbers_2 = [];
const divideNumbers = [];
const divisionNumbers = getRandomDivisibleNumbers();

for( let i=0; i<5; i++){
    diffNumbers[i] = numbers[2*i] - numbers[2*i+1];
    addNumbers[i] = numbers_2[2*i] + numbers_2[2*i+1];
    multNumbers[i] = numbers_multiply[2*i] * numbers_multiply[2*i+1];
    divideNumbers[i] = divisionNumbers[2*i] / divisionNumbers[2*i+1];
}

const ingredients = document.getElementsByClassName("ingredients");
const ingredients_2 = document.getElementsByClassName("ingredients_2");
const ingredients_3 = document.getElementsByClassName("ingredients_3");
const ingredients_4 = document.getElementsByClassName("ingredients_4");

const inputs = document.querySelectorAll("input");

const subtractInputs = document.getElementsByClassName("subtractInput");
const additionInputs = document.getElementsByClassName("additionInput");
const multiplyInputs = document.getElementsByClassName("multiplyInput");
const multiplyInputs_2 = document.getElementsByClassName("multiplyInput_2");
let scoreSpan = document.querySelector("#scoreSpan");

for( let i=0; i<5; i++){
    ingredients[i].innerHTML += numbers[2*i] + " - " + numbers[2*i+1]; 
    ingredients_2[i].innerHTML += numbers_2[2*i] + " + " + numbers_2[2*i+1]; 
    ingredients_3[i].innerHTML += numbers_multiply[2*i] + " &times; " + numbers_multiply[2*i+1]; 
    ingredients_4[i].innerHTML += divisionNumbers[2*i] + " &divide; " + divisionNumbers[2*i+1]; 
}

let goodAnswer = 0;
for( let i=0; i<subtractInputs.length; i++){
    subtractInputs[i].addEventListener("change", function(){
        if( subtractInputs[i].value == diffNumbers[i] ){
            subtractInputs[i].style.color='#00c300';
            goodAnswer++;
            scoreSpan.innerHTML = goodAnswer;
        }else{
            subtractInputs[i].style.color='red';
            scoreSpan.innerHTML = goodAnswer;
        }
        subtractInputs[i].readOnly = true;
        
    });
    additionInputs[i].addEventListener("change", function(){
        if( additionInputs[i].value == addNumbers[i] ){
            additionInputs[i].style.color='#00c300';
            goodAnswer++;
            scoreSpan.innerHTML = goodAnswer;
        }else{
            additionInputs[i].style.color='red';
            scoreSpan.innerHTML = goodAnswer;
        }
        additionInputs[i].readOnly = true;
    });
    multiplyInputs[i].addEventListener("change", function(){
        if( multiplyInputs[i].value == multNumbers[i] ){
            multiplyInputs[i].style.color='#00c300';
            goodAnswer++;
            scoreSpan.innerHTML = goodAnswer;
        }else{
            multiplyInputs[i].style.color='red';
            scoreSpan.innerHTML = goodAnswer;
        }
        multiplyInputs[i].readOnly = true;
    });
    
    multiplyInputs_2[i].addEventListener("change", function(){
        if( multiplyInputs_2[i].value == divideNumbers[i] ){
            multiplyInputs_2[i].style.color='#00c300';
            goodAnswer++;
            scoreSpan.innerHTML = goodAnswer;
        }else{
            multiplyInputs_2[i].style.color='red';
            scoreSpan.innerHTML = goodAnswer;
        }
        multiplyInputs_2[i].readOnly = true;
    });
}

const markSpeed = document.getElementById("markSpeed");

const score = document.getElementById("score");
const speed = document.getElementById("speed");

const start = Date.now();
const percentageScoreSpan = document.getElementById("percentageScoreSpan");
const scoreTimeSpan = document.getElementById("scoreTimeSpan");
    let readOnlyCounter = 0;
    let score_2 = 0;
    const span_20 = document.getElementById("span_20");
    for(let i=0; i<inputs.length; i++){
        inputs[i].addEventListener("change", function(){
            span_20.innerHTML = "/20";
            
            if( inputs[i].hasAttribute("readonly") ){
                readOnlyCounter++;
            }
            if(readOnlyCounter === 20){
                score_2 = scoreSpan.innerHTML;

                score.style.visibility="visible";
                speed.style.visibility="visible";

                percentageScoreSpan.innerHTML = (score_2 / 20) * 100 + "%";

                const end = Date.now();
                const elapsed = Math.floor( (end - start) / 1000 );
                const seconds = elapsed % 60;
                const minutes = Math.floor( elapsed / 60 );
                const hours = Math.floor( elapsed / 3600 );
                if(hours===0){
                    if(minutes===0){
                        scoreTimeSpan.innerHTML = seconds + "s";
                    }else{
                        scoreTimeSpan.innerHTML = minutes + "m " + seconds + "s";
                    }
                }else{
                    if(minutes===0){
                        scoreTimeSpan.innerHTML = hours + "h " + seconds + "s";
                    } else{
                        scoreTimeSpan.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
                    }
                }
                var opts = {
                angle: 0.15, 
                lineWidth: 0.44, 
                radiusScale: 1, 
                pointer: {
                    length: 0.6, 
                    strokeWidth: 0.035, 
                    color: '#000000' 
                },
                limitMax: false,    
                limitMin: false,    
                colorStart: '#00C300',
                colorStop: '#00C300', 
                strokeColor: '#E0E0E0',
                generateGradient: true,
                highDpiSupport: true,     
                };
                var target = document.getElementById('gaugeChart'); 
                var gauge = new Gauge(target).setOptions(opts); 
                gauge.maxValue = 1000/60; 
                gauge.setMinValue(0);  
                gauge.animationSpeed = 27; 
                gauge.set(1000/elapsed); 

                if(elapsed > 0 && elapsed < 70){
                    markSpeed.innerHTML = "excellent";
                }else if(elapsed >= 70 && elapsed <= 100){
                    markSpeed.innerHTML = "good";
                }else if(elapsed > 100 && elapsed <= 166){
                    markSpeed.innerHTML = "fair";
                }else if(elapsed > 166 && elapsed <= 222){
                    markSpeed.innerHTML = "poor";
                }else if(elapsed > 222 ){
                    markSpeed.innerHTML = "very poor";
                }
                
            }
        });
        
    }

window.onload = function() {
    document.getElementById('quizForm').reset()
}