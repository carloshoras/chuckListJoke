const jokeList = document.getElementById("jokeList");
const fetchJoke = document.getElementById("fetchJoke");
fetchJoke.insertAdjacentHTML('afterend', '<button id="deleteJokes">Borrar chistes</button>')
const deleteJokes = document.getElementById("deleteJokes")

let registroChiste = JSON.parse(localStorage.getItem("registroChiste")) || {}
let contador = localStorage.getItem("contador") || 0

let botonesEliminar = []

printuser()

deleteJokes.addEventListener('click', () => {
    localStorage.clear()
    registroChiste = {}
    contador = 0
    printuser()
})

fetchJoke.addEventListener("click", ()=>{
    fetch("https://api.chucknorris.io/jokes/random")
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error ("Error");
        }
        return respuesta.json() 
    })
    .then ((data) => {
    contador ++;
    localStorage.setItem("contador", contador)
    registroChiste[`chiste${contador}`] = data.value
    localStorage.setItem("registroChiste", JSON.stringify(registroChiste))
    printuser()
    })
})

function printuser () {
    jokeList.innerHTML = ""
    const claveChistes = Object.keys(registroChiste)
    claveChistes.forEach ((llave) => {
        jokeList.innerHTML += `<li data-chiste="${llave}"><p>${registroChiste[llave]}</p><button id="eliminar" data-chiste="${llave}">Eliminar</button></li>`
    })
    botonesEliminar = document.querySelectorAll('#eliminar')
    Eliminar()
}

function Eliminar() {
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
            const chisteEliminado = boton.dataset.chiste;
            delete registroChiste[chisteEliminado]
            localStorage.setItem("registroChiste", JSON.stringify(registroChiste))
            printuser()
        })
    })
}
