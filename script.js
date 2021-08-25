const dob = document.querySelector("#birth-date");
const submitBtn = document.querySelector("#submit-btn");
const outputDiv = document.querySelector("#output");
const imgDiv = document.querySelector('.img-div');


submitBtn.addEventListener("click", function(){
    if(dob.value===""){
        alert("Enter a date");
        return;
    }
    imgDiv.style.display="block";
    outputDiv.style.display="none";
    setTimeout(checkPalindrome,3000);
});

function checkPalindrome() {
    imgDiv.style.display="none";
    outputDiv.style.display="block";
    let dobValueArray = dob.value.split("-");
    let year = dobValueArray[0];
    let month = dobValueArray[1];
    let day = dobValueArray[2];
    console.log(day,month,year);
    let result = palindrome(day, month, year);
    if (result){
        outputDiv.innerText="Wow!!! Your birthday is a Palindrome."
    }
    else {
        console.log("not a palindrome");
        let nextDate = getNextDate(day, month, year);

        let fwdCount = 0;
        while (true) {
            result = palindrome(String(nextDate[0]), String(nextDate[1]), String(nextDate[2]));
            console.log(String(nextDate[0]), String(nextDate[1]), String(nextDate[2]));
            fwdCount++;
            if (result) {
                console.log("the next date is " + fwdCount + " days away and it is " + nextDate);
                break;
            }
            nextDate = getNextDate(nextDate[0], nextDate[1], nextDate[2]);
        }

        let bwdCount = 0;
        let prevDate = getPreviousDate(Number(day), Number(month), Number(year));
        while (true) {
            
            result = palindrome(String(prevDate[0]), String(prevDate[1]), String(prevDate[2]));
            bwdCount++;

            if (result) {
                console.log("the prev date is " + bwdCount + " days away and it is " + prevDate);
                break;

            }
            prevDate = getPreviousDate(prevDate[0], prevDate[1], prevDate[2]);
        }

        
            outputDiv.innerHTML = "<h2>Oops! Your BirthDay is not a Palindrome</h2>The nearest palindrome date in future is " + fwdCount + " days ahead and it is " + nextDate[0] + "-" + nextDate[1] + "-" + nextDate[2]+".<br>"+
            "The nearest palindrome date in past is " + bwdCount + " days in past and it is " + prevDate[0] + "-" + prevDate[1] + "-" + prevDate[2]+".";

        
        

        

    }

}



function palindrome(day, month, year) {
    let formatArray = formatGenerator(day, month, year);
    // console.log(formatArray);
    for (let i = 0; i < formatArray.length; i++) {
        let isPalindrome = validatePalindrome(formatArray[i]);
        if (isPalindrome) {
            return true;
        }
    }


    return false;
}

// console.log(getNextDate(31, 12, 2020));

function getNextDate(dd, mm, yy) {

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    dd++;
    if (mm == 2) {
        if (leapYear(Number(yy))) {
            if (dd > 29) {
                dd = 1;
                ++mm;
            }
        } else if (dd > 28) {
            dd = 1
                ++mm;
        }
    } else if (dd > daysInMonth[mm - 1]) {
        dd = 1;
        ++mm;
    }


    if (mm > 12) {
        mm = 1;
        ++yy;
    }

    if(dd<10)
        dd= '0'+dd;
    if(mm<10){

        mm='0'+parseInt(mm);
    }
       

    return [dd, mm, yy];


}


function getPreviousDate(dd, mm, yy) {

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    dd--;
    if (dd === 0) {
        mm--;
        if (mm === 2) {
            if (leapYear(yy)) {
                dd = 29;
            } else {
                dd = 28;
            }

        } else if (mm == 0) {
            mm = 12;
            dd = daysInMonth[mm - 1];
            yy--;
        } else {
            dd = daysInMonth[mm-1];
        }

    }

    if(dd<10)
        dd= '0'+dd;
    if(mm<10)
        mm='0'+Number(mm);


    return [(dd), (mm),(yy)];


}



function leapYear(yy) {
    if (yy % 400 === 0)
        return true;

    if (yy % 100 === 0)
        return false;
    if (yy % 4 === 0)
        return true;
    return false;
}

// console.log(getNextDate(31, 12, 2021));

function validatePalindrome(str) {
    let rev = "";
    let i = str.length - 1;
    while (i >= 0) {
        rev += str[i];
        --i;
    }

    if (str === rev)
        return true;

    return false;
}


function formatGenerator(day, month, year) {
    var ddmmyyyy = day + month + year;
    var mmddyyyy = month + day + year;
    var yyyymmdd = year + month + day;
    var ddmmyy = day + month + year.slice(2);
    var mmddyy = month + day + year.slice(2);
    var yymmdd = year.slice(2) + month + day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}