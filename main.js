let hobbies =[
    {
        name : "guitar",
        category : "music",
        description : "The guitar was the firt instrument I learnt by myself",
        img: "./img/guitar.png"
    },
    {
        name : "read",
        category : "entertainment",
        description : "I enjoy reading fiction, finances, technology and filosophy/religius",
        img: "./img/read.png"
    },
    {
        name : "gym",
        category : "sport",
        description : "I like going to the gym to clear up my mind",
        img: "./img/gym.png"
    },
    {
        name : "videogames",
        category : "technology",
        description : "I have fun playing videogames with friends",
        img: "./img/videogames.png"
    },
    {
        name : "programming",
        category : "technology",
        description : "It has always have been part of my life, making fun webpages or projects",
        img: "./img/programming.png"
    },
    {
        name : "piano",
        category : "music",
        description : "The second instrument I learnt by myself",
        img: "./img/piano.png"
    },
    {
        name : "series",
        category : "entertainment",
        description : "I enjoy watching a lot of series",
        img: "./img/series.png"
    },
]

//Collection
const collection = document.getElementById("collection");

//collection body
const collection_body = document.getElementById("collection-body");
collection_body.innerHTML = "";

//Collection header
const head = document.createElement("div");
head.classList.add("collection-head");
collection.prepend(head);

//Title collection header
const title_collection = document.createElement("h2");
title_collection.textContent = "Hobbies";
head.appendChild(title_collection);

//Barra buscqueda
const busqueda = document.createElement("div");
busqueda.classList.add("busqueda");

const input = document.createElement("input");
input.type = "text";
input.id = "buscar";
input.placeholder = "Buscar...";

//Filtro categorias
const select = document.createElement("select");
select.id = "filtro-tag";

const opciones = [
    { value: "todas", text: "Todas" },
    { value: "music", text: "music" },
    { value: "entertainment", text: "entertainment" },
    { value: "sport", text: "sport" },
    { value: "technology", text: "technology" }
];

opciones.forEach(opcion => {
    const option = document.createElement("option");

    option.value = opcion.value;
    option.textContent = opcion.text;

    select.appendChild(option);
});

busqueda.appendChild(input);
busqueda.appendChild(select);

head.appendChild(busqueda);

//Agregar hobbies
hobbies.forEach(hobbie => {

    const card = document.createElement("div");
    card.classList.add("hobbies");

    const linea = document.createElement("div");
    linea.classList.add("paper-lines");

    const tag = document.createElement("div");
    tag.classList.add("tag", hobbie.category);
    tag.textContent = hobbie.category;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = hobbie.img;
    img.alt = hobbie.name;

    figure.appendChild(img);

    const content = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = hobbie.name;

    const description = document.createElement("p");
    description.textContent = hobbie.description;

    content.appendChild(title);
    content.appendChild(description);

    card.appendChild(linea);
    linea.appendChild(tag);
    linea.appendChild(figure);
    linea.appendChild(content);

    collection_body.appendChild(card);

});


//Mostrar hobbies
function mostrarHobbies(datos) {
  collection_body.innerHTML = "";
  datos.forEach(hobbie => {

    const card = document.createElement("div");
    card.classList.add("hobbies");

    const linea = document.createElement("div");
    linea.classList.add("paper-lines");

    const tag = document.createElement("div");
    tag.classList.add("tag", hobbie.category);
    tag.textContent = hobbie.category;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = hobbie.img;
    img.alt = hobbie.name;

    figure.appendChild(img);

    const content = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = hobbie.name;

    const description = document.createElement("p");
    description.textContent = hobbie.description;

    content.appendChild(title);
    content.appendChild(description);

    card.appendChild(linea);
    linea.appendChild(tag);
    linea.appendChild(figure);
    linea.appendChild(content);

    collection_body.appendChild(card);

});
}

//Filtrar hobbies
function filtrarHobbies() {

    const texto = input.value.toLowerCase();
    const categoria = select.value;

    const resultados = hobbies.filter(hobbie => {

        const coincideTexto = hobbie.name
            .toLowerCase()
            .includes(texto);

        const coincideCategoria =
            categoria === "todas" ||
            hobbie.category === categoria;

        return coincideTexto && coincideCategoria;
    });

    mostrarHobbies(resultados);
}

input.addEventListener("input", filtrarHobbies);
select.addEventListener("change", filtrarHobbies);