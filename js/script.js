const jokeList = document.getElementById("jokeList");
const fetchJoke = document.getElementById("fetchJoke");

const registroChiste = JSON.parse(localStorage.getItem("registroChiste")) || {}
let contador = localStorage.getItem("contador") || 0

let botonesEliminar = []

printuser()

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
            console.log("helo")
            const chisteEliminado = boton.dataset.chiste;
            console.log(chisteEliminado)
            delete registroChiste[chisteEliminado]
            localStorage.setItem("registroChiste", JSON.stringify(registroChiste))
            printuser()
        })
    })
}
