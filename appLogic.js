// global variables for that html controls
let outPutBox = document.getElementById("outPutBox");
let resolveHandler = document.getElementById("resolveHandler");
let rejectHandler = document.getElementById("rejectHandler");
let resolveHandlerCatch = document.getElementById("resolveHandlerCatch");
let rejectHandlerCatch = document.getElementById("rejectHandlerCatch");

// event handlers for button clicks
resolveHandler.addEventListener("click", () => {
    showResult(1,false);
});

rejectHandler.addEventListener("click", () => {
    showResult(2, false);
});

resolveHandlerCatch.addEventListener("click", () => {
    showResult(1, true);
});

rejectHandlerCatch.addEventListener("click", () => {
    showResult(2, true);
});





// High Level Function resolves promise and outputs result
let showResult = (whatToDoInPromise, callCatch) => {
    
    promiseFunction(whatToDoInPromise).then(
        //Resolve Callback
        (goodPartValue) => {
            // Check if error should be thrown
            if(callCatch) {
                throw("Exception in resolve callback");
            }

            // Hand over to output builder and use the submitted value from the promise
            outPutResult(`Resolve callback was executed and got value: "${goodPartValue}"`, whatToDoInPromise, callCatch);
        },
        //Reject Callback
        (badPartValue) => {
            // Check if error should be thrown
            if(callCatch) {
                throw("Exception in reject callback");
            }

            // Hand over to output builder and use the submitted value from the promise
            outPutResult(`Reject callback was executed and got value: "${badPartValue}"`, whatToDoInPromise, callCatch);
        }
    ).catch(
        (errorMessage) => {
            outPutResult(`Catch callback was executed and got value: "${errorMessage}"`, whatToDoInPromise, callCatch);
        }
    ).finally(
        () => {
            console.log("Yes this works, too");  
        }
    );

}

// Just a simple Promise. Resolves on whatToDo 1, Rejects on any other Value (Buttons hand over 1 or 2)
function promiseFunction(whatToDo) {
    return new Promise((resolve, reject) => {
        if(whatToDo == 1) {
            // The value (in this case "good" will be passed through)
            resolve("Promise resolved");    
        }
        else {
            // The value (in this case "bad will be passed through")
            reject("Promise rejected");
        }
    })
}

// Output
let outPutResult = (errorText, whatToDoInPromise, callCatch) =>  {
    let output = `
        <p>
        <b>${errorText}</b>
        <br> 
        Execution with: 
        </p>
        <ul>
            <li>whatToDoInPromise: ${whatToDoInPromise}</li>
            <li>callCatch: ${callCatch}</li>
        </ul>
    `;
    outPutBox.innerHTML = output;
}
