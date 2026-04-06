// Obtener el canvas del HTML
const canvas = document.getElementById("canvas");

// Obtener el contexto 2D (donde dibujamos)
const ctx = canvas.getContext("2d");

// Definir el origen en el centro del canvas
// (esto simula un plano cartesiano)
const origen = { x: 200, y: 200 };


// FUNCIÓN PARA DIBUJAR UN VECTOR
function dibujarVector(x, y, color) {
    ctx.beginPath();

    // Punto inicial (origen)
    ctx.moveTo(origen.x, origen.y);

    // Punto final (ten en cuenta que en canvas el eje Y va hacia abajo)
    ctx.lineTo(origen.x + x, origen.y - y);

    // Color del vector
    ctx.strokeStyle = color;

    // Dibujar línea
    ctx.stroke();
}


function limpiar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// OBTENER LOS VALORES DE LOS INPUTS
function obtenerVectores() {
    return {
        // Convertimos a número con parseFloat
        ax: parseFloat(document.getElementById("ax").value),
        ay: parseFloat(document.getElementById("ay").value),
        bx: parseFloat(document.getElementById("bx").value),
        by: parseFloat(document.getElementById("by").value)
    };
}


// DIBUJAR LOS VECTORES INGRESADOS
function dibujar() {
    limpiar(); // limpiar antes de dibujar

    const { ax, ay, bx, by } = obtenerVectores();

    // Dibujar vector A (azul)
    dibujarVector(ax, ay, "blue");

    // Dibujar vector B (rojo)
    dibujarVector(bx, by, "red");

    // Calcular datos (producto punto y ángulo)
    calcular(ax, ay, bx, by);
}


// SUMA DE VECTORES
function sumar() {
    limpiar();

    const { ax, ay, bx, by } = obtenerVectores();

    // Fórmula de suma: (x1+x2, y1+y2)
    let rx = ax + bx;
    let ry = ay + by;

    // Dibujar vectores originales
    dibujarVector(ax, ay, "blue");
    dibujarVector(bx, by, "red");

    // Dibujar vector resultante (verde)
    dibujarVector(rx, ry, "green");
}


// ESCALAMIENTO DE VECTOR
function escalar() {
    limpiar();

    const { ax, ay } = obtenerVectores();

    // Obtener valor del slider
    let n = document.getElementById("escala").value;

    // Multiplicar vector por escalar
    dibujarVector(ax * n, ay * n, "purple");
}


// CÁLCULOS MATEMÁTICOS
function calcular(ax, ay, bx, by) {

    // Producto punto: A·B = x1*x2 + y1*y2
    let productoPunto = ax * bx + ay * by;

    // Magnitud de A
    let magA = Math.sqrt(ax * ax + ay * ay);

    // Magnitud de B
    let magB = Math.sqrt(bx * bx + by * by);

    // Ángulo entre vectores (en grados)
    let angulo = Math.acos(productoPunto / (magA * magB)) * (180 / Math.PI);

    // Mostrar resultados en la "consola"
    document.getElementById("consola").innerHTML = `
        Producto Punto: ${productoPunto} <br>
        Ángulo: ${angulo.toFixed(2)}°
    `;
}
