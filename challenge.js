let baseURL = 'https://ci-swapi.herokuapp.com/api/'

async function getData(type){
    let data;

    const response = await fetch(`${baseURL}${type +'/'}`)

    data = await response.json()

    return data
}

function writeToDocument(type){
    document.querySelector('#data').innerHTML = '' // empty div before new list

    getData(type)
    .then(data => {
        let allData = data.results
        
        allData.map((each)=>{
            
            return  document.querySelector('#data').innerHTML += `<p>${each.name}</p>`
        })
        
    })

}

let buttons = document.querySelectorAll('button')

buttons.forEach((button)=>{
    button.addEventListener('click', function(e){

        let type = this.getAttribute('data-type')

        writeToDocument(type)
    })
})
