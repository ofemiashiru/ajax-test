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

    let tableRows = []

    document.querySelector('#data').innerHTML = '' // empty div before new list

    getData(type)
    .then(data => {
        let allData = data.results
        let tableHeaders = getTableHeaders(allData[0])

        allData.forEach((item)=>{
            let dataRow = []
            
            Object.values(item).forEach((value)=>{
                let rowData = value.toString()
                let truncatedData = rowData.substring(0, 15)
                dataRow.push(`<td>${truncatedData}</td>`)
            
            })

            tableRows.push(`<tr>${dataRow}</tr>`)
        })

        document.querySelector('#data').innerHTML = `<table>${tableHeaders}${tableRows}</table>`
        
    })

}



let buttons = document.querySelectorAll('button')

buttons.forEach((button)=>{
    button.addEventListener('click', function(){

        let type = this.getAttribute('data-type')

        writeToDocument(type)
    })
})
