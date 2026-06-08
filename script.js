/* ================================================
   MUNDO PELUCHE — Lógica JavaScript
   Archivo: script.js
   ================================================

   Este archivo le da vida a la página:
   hace que cosas se muevan, aparezcan y reaccionen
   a lo que hace el usuario.

   ÍNDICE DE FUNCIONES:
   ─────────────────────────────────────────────
   1. productos          → Los datos de los productos
   2. generarProductos() → Crea las tarjetas en el HTML
   3. cursorePersonal()  → Mueve el emoji de peluche
   4. crearParticulas()  → Genera puntos flotantes de fondo
   5. controlarHeader()  → Oscurece la navbar al bajar
   6. controlarMenu()    → Abre/cierra el menú en celular
   7. animarContadores() → Cuenta los números del hero
   8. animarAlScroll()   → Revela elementos al hacer scroll
   9. controlarScrollTop()→ Muestra/oculta el botón subir
   10. init()            → Arranca todo cuando carga la página
   ─────────────────────────────────────────────
================================================ */


/* ====================================================
   1. DATOS DE PRODUCTOS
   ====================================================
   Un "array" (lista) de "objetos" (grupos de datos).
   Cada objeto representa un producto con sus datos.

   ¿Cómo modificar?
   ─ Para AGREGAR un producto: copia un bloque { } al final
     del array (antes del último ]) y cambia los valores.
   ─ Para ELIMINAR un producto: borra el bloque { } completo.
   ─ Para CAMBIAR el precio: edita el valor de "precio".
   ─ Los emojis son texto normal, puedes buscar más en:
     https://emojipedia.org
==================================================== */
const productos = [
  {
    emoji:       "🐻",
    nombre:      "Osito Clásico",
    descripcion: "El compañero peludo de siempre. Suave, amoroso y eterno.",
    precio:      "Desde $199"
  },
  {
    emoji:       "🐱",
    nombre:      "Gatito Mimoso",
    descripcion: "Tierno gatito de peluche con lazo incluido. ¡Irresistible!",
    precio:      "Desde $229"
  },
  {
    emoji:       "🦊",
    nombre:      "Zorrito Aventurero",
    descripcion: "Para los valientes. Un zorrito lleno de personalidad y ternura.",
    precio:      "Desde $249"
  },
  {
    emoji:       "🐰",
    nombre:      "Conejito de Pascua",
    descripcion: "Orejas largas y suavecito. El regalo ideal para toda ocasión.",
    precio:      "Desde $219"
  },
  {
    emoji:       "🐼",
    nombre:      "Panda Gigante",
    descripcion: "Gran tamaño, gran ternura. Perfecto para abrazar de noche.",
    precio:      "Desde $399"
  },
  {
    emoji:       "🦄",
    nombre:      "Unicornio Mágico",
    descripcion: "Colores pastel y cuerno brillante. Ideal para pequeñas soñadoras.",
    precio:      "Desde $299"
  }
];


/* ====================================================
   2. GENERAR TARJETAS DE PRODUCTOS
   ====================================================
   Lee el array "productos" de arriba y crea el HTML
   de cada tarjeta automáticamente.

   ¿Por qué hacerlo con JavaScript y no directo en HTML?
   Porque así solo editas los datos (el array de arriba)
   y no tienes que tocar el HTML. Más fácil de mantener.

   Conceptos usados:
   ─ document.getElementById(): busca un elemento por su id
   ─ .map(): recorre un array y devuelve uno nuevo
   ─ Template literals (backticks `...`): permiten HTML con
     variables usando ${variable}
   ─ .join(""): une todos los elementos del array en un string
   ─ .innerHTML: inserta HTML dentro de un elemento
==================================================== */
function generarProductos() {
  // Buscamos el contenedor en el HTML
  const contenedor = document.getElementById("productosGrid");

  // Seguridad: si no existe el contenedor, salimos
  if (!contenedor) return;

  // Creamos el HTML de todas las tarjetas de una vez
  contenedor.innerHTML = productos.map(producto => `
    <div class="tarjeta">
      <span class="tarjeta-emoji">${producto.emoji}</span>
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <span class="tarjeta-precio">${producto.precio}</span>
    </div>
  `).join(""); // join("") convierte el array en un solo texto HTML
}


/* ====================================================
   3. CURSOR PERSONALIZADO
   ====================================================
   Reemplaza el cursor del mouse por el emoji 🧸.

   ¿Cómo funciona?
   ─ "mousemove" es un evento que se dispara CADA VEZ
     que el mouse se mueve un pixel.
   ─ El objeto "evento" contiene la posición actual del
     mouse en clientX (horizontal) y clientY (vertical).
   ─ Con eso, movemos el elemento .cursor del HTML.

   Para cambiar el emoji del cursor:
   ─ Ve al HTML y busca <div class="cursor" id="cursor">
     y cambia el emoji que está adentro.
==================================================== */
function cursorPersonal() {
  const cursor = document.getElementById("cursor");

  // No ejecutar en celulares (no tienen mouse)
  if (!cursor || window.matchMedia("(pointer: coarse)").matches) {
    if (cursor) cursor.style.display = "none";
    return;
  }

  // Escuchamos cada movimiento del mouse
  document.addEventListener("mousemove", (evento) => {
    // Movemos el div del cursor a la posición del mouse
    cursor.style.left = evento.clientX + "px";
    cursor.style.top  = evento.clientY + "px";
  });

  // Efecto: cuando el mouse presiona, el cursor crece
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
}


/* ====================================================
   4. CREAR PARTÍCULAS DE FONDO
   ====================================================
   Genera puntos pequeños que flotan de abajo hacia arriba,
   creando un efecto de "estrellas cayendo al revés".

   Conceptos usados:
   ─ createElement(): crea un nuevo elemento HTML con JS
   ─ style.setProperty(): define variables CSS directamente
   ─ appendChild(): agrega un elemento dentro de otro
   ─ Math.random(): número aleatorio entre 0 y 1

   Para cambiar la cantidad de partículas:
   ─ Cambia el número 25 en el bucle "for"
==================================================== */
function crearParticulas() {
  const contenedor = document.getElementById("particles");
  if (!contenedor) return;

  const CANTIDAD = 25; // ← Cambia este número para más/menos partículas

  for (let i = 0; i < CANTIDAD; i++) {
    // Creamos un elemento <div> para cada partícula
    const particula = document.createElement("div");
    particula.classList.add("particle");

    // Tamaño aleatorio entre 2 y 6 píxeles
    const tamano = Math.random() * 4 + 2;
    particula.style.width  = tamano + "px";
    particula.style.height = tamano + "px";

    // Posición horizontal aleatoria (de 0% a 100% del ancho)
    particula.style.left = Math.random() * 100 + "%";

    // Duración de animación aleatoria entre 6 y 14 segundos
    // --duracion y --delay son variables CSS que usa el @keyframes en style.css
    particula.style.setProperty("--duracion", (Math.random() * 8 + 6) + "s");
    particula.style.setProperty("--delay",    (Math.random() * 8)     + "s");

    // Agregamos la partícula al contenedor en el HTML
    contenedor.appendChild(particula);
  }
}


/* ====================================================
   5. CONTROLAR EL HEADER AL HACER SCROLL
   ====================================================
   Cuando el usuario baja la página, el header cambia
   de transparente a oscuro (clase .scrolled en CSS).

   Conceptos usados:
   ─ window.addEventListener("scroll", fn): ejecuta fn
     cada vez que el usuario hace scroll
   ─ window.scrollY: cuántos píxeles bajó el usuario
   ─ classList.toggle(clase, condicion): agrega la clase
     si la condición es verdadera, la quita si es falsa
==================================================== */
function controlarHeader() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    // toggle con condición: agrega/quita .scrolled según si bajó 50px
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}


/* ====================================================
   6. CONTROLAR MENÚ HAMBURGUESA (celular)
   ====================================================
   Al hacer click en el botón de 3 líneas, el menú
   se desliza desde el lado derecho.

   Conceptos usados:
   ─ classList.toggle(): alterna una clase (la pone o la quita)
   ─ forEach(): recorre todos los elementos de una lista
   ─ querySelectorAll(): devuelve TODOS los elementos
     que coincidan con un selector CSS
==================================================== */
function controlarMenu() {
  const hamburger = document.getElementById("hamburger");
  const nav       = document.getElementById("nav");

  // Click en el botón hamburguesa
  hamburger.addEventListener("click", () => {
    // Alterna las clases .activo (en hamburger) y .abierto (en nav)
    hamburger.classList.toggle("activo");
    nav.classList.toggle("abierto");
  });

  // Al hacer click en cualquier enlace del menú → cierra el menú
  const enlaces = nav.querySelectorAll("a");
  enlaces.forEach(enlace => {
    enlace.addEventListener("click", () => {
      hamburger.classList.remove("activo");
      nav.classList.remove("abierto");
    });
  });
}


/* ====================================================
   7. ANIMAR CONTADORES
   ====================================================
   Los números en el hero (500+ clientes, etc.) cuentan
   desde 0 hasta el valor final con una animación suave.

   ¿Cómo funciona?
   ─ Cada elemento .contador tiene data-target="número" en HTML
   ─ Leemos ese número con getAttribute("data-target")
   ─ setInterval() repite una función cada X milisegundos
   ─ Aumentamos el número actual en pequeños pasos
   ─ clearInterval() detiene el intervalo cuando llega al final

   Para cambiar los números finales:
   ─ Ve al HTML y edita los atributos data-target="..."
==================================================== */
function animarContadores() {
  // Buscamos todos los elementos con clase .contador
  const contadores = document.querySelectorAll(".contador");

  contadores.forEach(el => {
    const objetivo   = parseInt(el.getAttribute("data-target")); // Número final
    const duracion   = 2000;  // Duración total en milisegundos (2 segundos)
    const pasos      = 60;    // Cuántas veces actualiza el número
    const incremento = objetivo / pasos; // Cuánto suma en cada paso
    let actual       = 0;     // Empieza en cero

    const intervalo = setInterval(() => {
      actual += incremento;

      if (actual >= objetivo) {
        // Llegamos al final: mostramos el número exacto y detenemos
        el.textContent = objetivo + "+";
        clearInterval(intervalo); // Detiene el setInterval
      } else {
        // Todavía no: mostramos el número redondeado hacia abajo
        el.textContent = Math.floor(actual);
      }
    }, duracion / pasos); // Intervalo = 2000ms / 60 pasos ≈ 33ms por paso
  });
}


/* ====================================================
   8. ANIMAR ELEMENTOS AL HACER SCROLL
   ====================================================
   Los elementos con clase .reveal aparecen suavemente
   cuando el usuario llega a verlos al hacer scroll.

   Usa la API moderna "IntersectionObserver":
   ─ Es más eficiente que el viejo truco de detectar
     la posición del scroll manualmente
   ─ Observa elementos y llama a una función cuando
     entran o salen del área visible de la pantalla

   ¿Cómo marcar un elemento para animarlo?
   ─ Agrega class="reveal" al elemento en el HTML
   ─ JS lo detecta y le agrega .visible cuando es visto
   ─ CSS en style.css controla la animación visual
==================================================== */
function animarAlScroll() {
  // Todos los elementos que queremos animar
  const elementos = document.querySelectorAll(".reveal, .tarjeta, .valor");

  // Creamos un "observador"
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach(entrada => {
        // ¿El elemento está en pantalla ahora?
        if (entrada.isIntersecting) {
          // Sí → le agregamos .visible para activar la animación CSS
          entrada.target.classList.add("visible");
          // Dejamos de observarlo (ya no necesitamos saber si aparece)
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15 // El elemento debe ser 15% visible para activarse
    }
  );

  // Le decimos al observador qué elementos debe vigilar
  elementos.forEach(el => observador.observe(el));
}


/* ====================================================
   9. CONTROLAR BOTÓN SCROLL TOP
   ====================================================
   El botón de flecha ↑ aparece cuando el usuario bajó
   suficiente, y al hacer click regresa al inicio.

   Conceptos:
   ─ classList.toggle(clase, condicion): igual que antes
   ─ window.scrollTo(): desplaza la página a una posición
     behavior: "smooth" hace el movimiento suave
==================================================== */
function controlarScrollTop() {
  const boton = document.getElementById("scrollTop");

  // Mostrar u ocultar según el scroll
  window.addEventListener("scroll", () => {
    // Muestra el botón cuando bajó más de 400 píxeles
    boton.classList.toggle("visible", window.scrollY > 400);
  });

  // Click en el botón → sube al inicio suavemente
  boton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* ====================================================
   10. FUNCIÓN PRINCIPAL — init()
   ====================================================
   Esta función llama a todas las demás en orden.

   "DOMContentLoaded" es el evento que se dispara cuando
   el navegador terminó de leer todo el HTML.
   Es IMPORTANTE esperar este evento para que los
   elementos del HTML ya existan antes de manipularlos.

   Piénsalo así: primero construyes la casa (HTML),
   luego la amueblas (JavaScript).
==================================================== */
function init() {
  generarProductos();    // 1. Crea las tarjetas de productos
  cursorPersonal();      // 2. Activa el cursor emoji
  crearParticulas();     // 3. Genera los puntos del fondo
  controlarHeader();     // 4. Efecto del header al scroll
  controlarMenu();       // 5. Menú hamburguesa en celular
  animarContadores();    // 6. Contadores del hero
  animarAlScroll();      // 7. Animación de aparición al scroll
  controlarScrollTop();  // 8. Botón volver arriba
}

// Esperamos a que el HTML esté listo, luego arrancamos todo
document.addEventListener("DOMContentLoaded", init);
