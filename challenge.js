let baseURL = 'https://ci-swapi.herokuapp.com/api/'

async function getData(type){
    let data;

    const response = await fetch(`${baseURL}${type +'/'}`)

    data = await response.json()

    return data
}

function getTableHeaders(obj){

    let tableHeaders = []

    Object.keys(obj).forEach((key) => {
        tableHeaders.push(`<th>${key}</th>`)
    })

    return `<tr>${tableHeaders}</tr>`
}

function writeToDocument(type){
    document.querySelector('#data').innerHTML = '' // empty div before new list

    getData(type)
    .then(data => {
        let allData = data.results
        let tableHeaders = getTableHeaders(allData[0])

        allData.map((each)=>{
            // return  document.querySelector('#data').innerHTML += `<p>${each.name}</p>`
        })

        document.querySelector('#data').innerHTML = `<table>${tableHeaders}</table>`
    })

}



let buttons = document.querySelectorAll('button')

buttons.forEach((button)=>{
    button.addEventListener('click', function(){

        let type = this.getAttribute('data-type')

        writeToDocument(type)
    })
})
