let baseURL = 'https://ci-swapi.herokuapp.com/api/'

async function getData(type){
    let data;

    const response = await fetch(`${baseURL}${type +'/'}`)

    data = await response.json()

    return data
}

getData('people')
.then(data => {
    document.querySelector('#data').innerHTML = data
    console.log(data)
})