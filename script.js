const dob = document.querySelector("#birth-date");
const submitBtn = document.querySelector("#submit-btn");


submitBtn.addEventListener("click", checkPalindrome);

function checkPalindrome() {
    let dobValueArray = dob.value.split("-");
    let year = dobValueArray[0];
    let month = dobValueArray[1];
    let day = dobValueArray[2];
    let result = palindrome(day, month, year);
    if (result)
        console.log("it is a palindrome");
    else {
        console.log("not a palindrome");
        let nextDate = getNextDate(day, month, year);

        let count =0;
        while (true) {
            result = palindrome(String(nextDate[0]), String(nextDate[1]),String(nextDate[2]));
            count++;
            if(result){
                console.log("the next date is "+count+" days away and it is "+nextDate);
                break;
            }
            nextDate = getNextDate(nextDate[0],nextDate[1],nextDate[2]);
        }

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
    } else {
        ++mm;
    }


    if (mm > 12) {
        mm = 1;
        ++yy;
    }

    return [dd, mm, yy];


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