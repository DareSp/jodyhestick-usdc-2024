/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    //Outer loop iterates through all objects in scannedTextObj
    for (let i=0; i<scannedTextObj.length; i++){
        //Inner loop iterates through contents of current book object
        for(let j=0; j<scannedTextObj[i].Content.length; j++){
            //if search term is found in current book and current content text
            if(scannedTextObj[i].Content[j].Text.split(" ").includes(searchTerm)) {
                //Assemble an object from the current book and content item
                let resultObj = Object.assign({}, {"ISBN":scannedTextObj[i].ISBN}, 
                {"Page":scannedTextObj[i].Content[j].Page}, 
                {"Line": scannedTextObj[i].Content[j].Line});
                //Add created object to results
                result.Results.push(resultObj);
            }
        }
    }        

    result.SearchTerm = searchTerm;

    return result; 
}

/*Input opjects for testing*/

//Input object with 2 books with contents
const booksIn = [
    {
        "Title": "The book of TMBG",
        "ISBN": "9780000528545",
        "Content": [
            {
                "Page": 23,
                "Line": 12,
                "Text": "Like a ghostwriter\'s ending she will send you down"
            },
            {
                "Page": 23,
                "Line": 13,
                "Text": "She\'s in love with her broken heart she\'s in love with the dark"
            },
            {
                "Page": 23,
                "Line": 14,
                "Text": "where your eyes don\'t go a filthy scarecrow waves its broomstick arms"
            } 
        ] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
//Empty input object
const emptyObj = [];

//Input object where one book has no content
const booksOneHasContent = [
    {
        "Title": "The book of TMBG",
        "ISBN": "9780000528545",
        "Content": [
            {
                "Page": 23,
                "Line": 12,
                "Text": "Like a ghostwriter\'s ending she will send you down"
            },
            {
                "Page": 23,
                "Line": 13,
                "Text": "She\'s in love with her broken heart she\'s in love with the dark"
            },
            {
                "Page": 23,
                "Line": 14,
                "Text": "where your eyes don\'t go a filthy scarecrow waves it\'s broomstick arms"
            } 
        ] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [ 
        ] 
    }
]


/** Output objects for testing */

//output when searching "the" in 2 books
const booksOutThe = {
    SearchTerm: 'the',
    Results: [
      { ISBN: '9780000528545', Page: 23, Line: 13 },
      { ISBN: '9780000528531', Page: 31, Line: 9 }
    ]
  }

//Empty object output
const booksOutEmpty = { SearchTerm: 'the', Results: [] }

//Output when only 1 book has contents
const booksOutOneHasContent = {
  SearchTerm: 'the',
  Results: [ { ISBN: '9780000528545', Page: 23, Line: 13 } ]
}

//output when there is no match
const booksOutNoMatch = { SearchTerm: 'purple', Results: [] }

//Output when capitalization is different
const booksOutNoMatchCaps = { SearchTerm: 'Love', Results: [] }




/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** Positive test: Check for a match in both books (Example test adapted). */
const test1result = findSearchTermInBooks("the", booksIn);
if (JSON.stringify(booksOutThe) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", booksOutThe);
    console.log("Received:", test1result);
}

/** Check for correct number of results (Example test adapted). */
const test2result = findSearchTermInBooks("the", booksIn); 
if (test2result.Results.length == 2) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", booksOutThe.Results.length);
    console.log("Received:", test2result.Results.length);
}

/*Negative test: Check that if the input object is empty we get no matches*/
const test3result = findSearchTermInBooks("the", emptyObj);
if (JSON.stringify(booksOutEmpty) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", booksOutEmpty);
    console.log("Received:", test3result);
}

/* Positive test: Check that if only one of the books has content, search still happens correctly*/
const test4result = findSearchTermInBooks("the", booksOneHasContent);
if (JSON.stringify(booksOutOneHasContent) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", booksOutOneHasContent);
    console.log("Received:", test4result);
}

/* Negative test: Check output for no match*/
const test5result = findSearchTermInBooks("purple", booksIn);
if (JSON.stringify(booksOutNoMatch) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", booksOutNoMatch);
    console.log("Received:", test5result);
}

/* Case sensitive test: Check output for no match because of capitalization*/
const test6result = findSearchTermInBooks("Love", booksIn);
if (JSON.stringify(booksOutNoMatchCaps) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", booksOutNoMatchCaps);
    console.log("Received:", test6result);
}
