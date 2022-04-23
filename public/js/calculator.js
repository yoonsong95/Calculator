
function enterNumber(elem) {
    let numEntry = $(elem).val();
    let currentNum = $("#num-display").text();
    let newNum = "";
    if (currentNum == 0) {
        newNum = numEntry;
    } else {
        newNum = currentNum + numEntry;
    }
    $("#num-display").text(newNum);
}

function backspaceNumber() {
    let currentNum = $("#num-display").text();
    if (currentNum != 0) {
        let newNum = currentNum.slice(0, currentNum.length - 1);
        if (newNum == "") {
            newNum = "0";
        }
        $("#num-display").text(newNum);
    }
}

function clearNumber() {
    $("#num-display").text("0");
}

function clearAll() {
    clearNumber();
    $("#equation-display").text("");
}

function arithmeticOperation(leftNum, rightNum, operator) {
    if (operator == "/") {
        return leftNum / rightNum;
    } else if (operator == "x") {
        return leftNum * rightNum;
    } else if (operator == "+") {
        return leftNum + rightNum;
    } else if (operator == "-") {
        return leftNum - rightNum;
    }
}


$(document).ready(function () {

    // on clicking num-pad numbers
    $("#num-pad input").on("click", function () {
        enterNumber(this);
    });

    // on clicking backspace button
    $("#backspace").on("click", function () {
        backspaceNumber();
    });

    // on clicking clear button  (clears just the numbers)
    $("#clear").on("click", function () {
        clearNumber();
    });

    // on clicking clear-all button (clears all - numbers & operators)
    $("#clear-all").on("click", function () {
        clearAll();
    });


    // on clicking operator-pad operators
    $("#operator-pad input").on("click", function () {
        let equationStr = "";
        if ($("#equation-display").text() == "") {
            equationStr = $("#num-display").text() + " " + $(this).val();
        } else {
            if ($("#equation-display").text().slice(-1) == "=") {
                equationStr = $("#num-display").text() + " " + $(this).val();
            } else {
                equationStr = $("#equation-display").text() + " " + $("#num-display").text() + " " + $(this).val();
            }
        }
        $("#equation-display").text(equationStr);
        clearNumber();
    });


    // on clicking equals (=) return button
    $("#return").on("click", function () {
        let equationStr = $("#equation-display").text();
        let componentList = equationStr.split(' ');
        console.log(componentList);
        let result = parseFloat(componentList[0]);
        for (let i = 1; i < componentList.length - 1; i++) {
            if (isNaN(componentList[i])) {
                let operator = componentList[i];
                let rightNum = parseFloat(componentList[i + 1]);
                result = arithmeticOperation(result, rightNum, operator);
                console.log(result);
            }
        }
        $("#num-display").text(result);
    });


});