async function getData(url){
    let data;

    const response = await fetch(`${url}`)

    data = await response.json()

    return data
}

/** generates headers from the object that we pass in*/
function getTableHeaders(obj){

    let tableHeaders = []

    Object.keys(obj).forEach((key) => {
        tableHeaders.push(`<th>${key}</th>`)
    })

    return `<tr>${tableHeaders}</tr>`
}

/** Creates pagination if the next or prev properties are available in the data*/
function generatePaginationBtns(next, prev){
    if(next && prev){
        return `
            <button onclick="writeToDocument('${prev}')">Previous</button>
            <button onclick="writeToDocument('${next}')">Next</button>
        `
    } else if(next && !prev){
        return `<button onclick="writeToDocument('${next}')">Next</button>`
    } else if(!next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`
    } 
}

function writeToDocument(url){

    let tableRows = []
    document.querySelector('#data').innerHTML = '' // empty div before new list

    getData(url)
    .then(data => {
        let allData = data.results
        let pagination;
        if(data.next || data.previous ){ // if previous and next properties exist then generate pagination 
            pagination = generatePaginationBtns(data.next, data.previous)
        }
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

        document.querySelector('#data').innerHTML = `<table>${tableHeaders}${tableRows}</table> ${pagination === undefined ? '': pagination}`.replace(/,/g,'')
        
    })

}



let buttons = document.querySelectorAll('button')

buttons.forEach((button)=>{
    button.addEventListener('click', function(){
        let endPoint = "https://ci-swapi.herokuapp.com/api/"
        let type = this.getAttribute('data-type')

        writeToDocument(`${endPoint}${type}/`)
    })
})
