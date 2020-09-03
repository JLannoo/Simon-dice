$bloques = document.querySelectorAll(".bloque");
$boton = document.querySelector("button[type='button']");
$titulo = document.querySelector("#titulo");

$boton.onclick = iniciar;

$bloques.forEach(bloque => {
    bloque.onclick = clickHandler;
});

var secuenciaPC = [];
var secuenciaJugador = [];

function encenderBloque(bloque){
    bloque.classList.add("activado")
    setTimeout(() => {
        bloque.classList.remove("activado");
    }, 500);
}

function iniciar(){
    let turno = 1;

    reiniciar();
    secuenciaPC.push(getBloqueAleatorio());
    reproducirSecuenciaPC();
    desbloquearInput();
}

function reiniciar(){
    secuenciaJugador = [];
    secuenciaPC = [];

    $titulo.classList.remove("alert-danger");
    $titulo.classList.add("alert-primary");
    $titulo.innerHTML = "Comienza";
}

function getBloqueAleatorio(){
    let rand = Math.floor(Math.random()*$bloques.length);

    return $bloques[rand];
}

function reproducirSecuenciaPC(){
    bloquearInput();
    desbloquearInput();
    let i = 0;
    secuenciaPC.forEach(bloque => {
        setTimeout(() => {
            encenderBloque(bloque);
        }, i*1000);
        i++;
    });
}

function clickHandler(e){
    secuenciaJugador.push(e.target);
    encenderBloque(e.target)
    compararSecuencias();
}

function bloquearInput(){
    $bloques.forEach(bloque => {
        bloque.onclick = function(){};
    });
}

function desbloquearInput(){
    setTimeout(() => {
        $bloques.forEach(bloque => {
            bloque.onclick = clickHandler;
        });
    }, secuenciaPC.length*1000);
    
}

function compararSecuencias(){
    for (let i = 0; i < secuenciaJugador.length; i++) {
        if(secuenciaPC[i].id !== secuenciaJugador[i].id){
            $titulo.classList.remove("alert-primary");
            $titulo.classList.add("alert-danger");
            $titulo.innerHTML = "UH OH! Te equivocaste! Apreta en \"Empezar a jugar para volver a empezar\"";
            bloquearInput();
            return false;
        }
    }

    if(secuenciaJugador.length === secuenciaPC.length){
        siguienteTurno();
    }
}

function siguienteTurno(){
    secuenciaJugador = [];
    setTimeout(() => {
        secuenciaPC.push(getBloqueAleatorio())
        reproducirSecuenciaPC();
    }, 1000);
}