//Using promises to return data
async function getData(){
    let data;

    const resposne = await fetch('https://ci-swapi.herokuapp.com/api/')

    data = await resposne.json()

    return data //return a promise so when we run the getData() function it must be follow with a .then

}


async function getSpecific(id){
    let data;

    const resposne = await fetch(`https://ci-swapi.herokuapp.com/api/people/${id}`)

    data = await resposne.json()

    return data //return a promise so when we run the getData() function it must be follow with a .then

}


let btn = document.querySelector('#btn')

btn.addEventListener('click', function(){

    getData()
    .then(data => { // this has to be used as the function is return a promise
        document.querySelector('#data').innerHTML += `<li>${data.people}</li>`
    })

    getSpecific(20)
    .then( data => {
        document.querySelector('#specific').innerHTML = `
            <p>${data.name}</p>
            <p>${data.gender}</p>
            <p>${data.species}</p>
            <p>${data.skin_color}</p>
        `
        console.log(data)
    })
    
})





