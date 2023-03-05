
var xhr = new XMLHttpRequest //XMLHttpRequest allows us to consume APIs by opening, sending and closing connections

xhr.open('GET', 'https://ci-swapi.herokuapp.com/api/')
xhr.send()


xhr.onreadystatechange = function(){ // when the state changes

    if(this.readyState == 4 && this.status == 200) { // we want to check whether our state changes 
        // 4 means the operation is complete - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        // 200 means request succeeded content delivered

        // if the state changes after performing a check then update the div with id data with the response we get 
        // back (respsonseText)
        document.querySelector('#data').innerHTML = xhr.responseText
    
    } 
}

