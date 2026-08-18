let hobbies = [
    {
        name: "guitar",
        category: "music",
        description: "The guitar was the fist instrument I learned by myself",
        img: "./img/guitar.png"
    },
    {
        name: "read",
        category: "entertainment",
        description: "I enjoy reading fiction, finances, technology and philosophy/religion",
        img: "./img/read.png"
    },
    {
        name: "gym",
        category: "sport",
        description: "I like going to the gym to clear my mind",
        img: "./img/gym.png"
    },
    {
        name: "videogames",
        category: "technology",
        description: "I have fun playing videogames with friends",
        img: "./img/videogames.png"
    },
    {
        name: "programming",
        category: "technology",
        description: "It has always been part of my life, making fun webpages or projects",
        img: "./img/programming.png"
    },
    {
        name: "piano",
        category: "music",
        description: "The second instrument I learned by myself",
        img: "./img/piano.png"
    },
    {
        name: "series",
        category: "entertainment",
        description: "I enjoy watching a lot of series",
        img: "./img/series.png"
    }
];


//COLLECTION
const collection = document.getElementById("collection");

//collection body
const collection_body = document.getElementById("collection-body");

collection_body.innerHTML = "";


//Collection header
const head = document.createElement("div");
head.classList.add("collection-head");
collection.prepend(head);


//Title
const title_collection = document.createElement("h2");
title_collection.textContent = "Hobbies";
head.appendChild(title_collection);


//Search and filter
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
function mostrarHobbies(datos) {

    collection_body.innerHTML = "";

    if (datos.length === 0) {
        const no = document.createElement("div");

        no.textContent = "No options found";
        no.classList.add("no-options");

        collection_body.appendChild(no);
    }

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

        const title_hobby = document.createElement("h3");
        title_hobby.textContent = hobbie.name;

        const description = document.createElement("p");
        description.textContent = hobbie.description;

        const expandButton = document.createElement("button");
        expandButton.type = "button";
        expandButton.classList.add("expand");
        expandButton.textContent = "More";


        content.appendChild(title_hobby);
        content.appendChild(description);
        content.appendChild(expandButton);

        linea.appendChild(tag);
        linea.appendChild(figure);
        linea.appendChild(content);

        card.appendChild(linea);

        collection_body.appendChild(card);
    });


    //Agregar hobby
    const addContainer = document.createElement("div");
    addContainer.classList.add("add-hobby-container");

    const add_button = document.createElement("button");
    add_button.type = "button";
    add_button.classList.add("add-hobby");
    add_button.textContent = "+ Add hobby";

    addContainer.appendChild(add_button);
    collection_body.appendChild(addContainer);

    crearFormulario(add_button, addContainer);
}



//HOBBY FORM

function crearFormulario(add_button, addContainer) {

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const form = document.createElement("form");
    form.classList.add("add-form");


    const title = document.createElement("h2");
    title.textContent = "Add a hobby";


    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Hobby name";
    nameInput.required = true;


    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.placeholder = "Category";
    categoryInput.required = true;


    const descriptionInput = document.createElement("textarea");
    descriptionInput.placeholder = "Description";
    descriptionInput.required = true;


    const imageInput = document.createElement("input");
    imageInput.type = "url";
    imageInput.placeholder = "Image URL";
    imageInput.required = true;


    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add";


    form.appendChild(title);
    form.appendChild(nameInput);
    form.appendChild(categoryInput);
    form.appendChild(descriptionInput);
    form.appendChild(imageInput);
    form.appendChild(submitButton);

    modal.appendChild(form);
    addContainer.appendChild(modal);

    add_button.addEventListener("click", () => {
        modal.classList.add("show");
    });


    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });


    form.addEventListener("submit", event => {

        event.preventDefault();

        const nuevoHobby = {
            name: nameInput.value,
            category: categoryInput.value,
            description: descriptionInput.value,
            img: imageInput.value
        };

        hobbies.push(nuevoHobby);

        filtrarHobbies();

        form.reset();
        modal.classList.remove("show");
    });
}



//Filtrp

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

mostrarHobbies(hobbies);

//Expandir hobby

collection_body.addEventListener("click", event => {

    if (event.target.classList.contains("expand")) {

        const card = event.target.closest(".hobbies");

        const description = card.querySelector("p");
        const title = card.querySelector("h3");

        description.classList.toggle("big");
        title.classList.toggle("big");
    }
});


//Form validacion

const contactForm = document.getElementById("contact-form");

const fullnameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const formSuccess = document.getElementById("form-success");


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    let valid = true;

    if (fullnameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    const email = emailInput.value.trim();

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "Please enter a valid email.";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter a message.";
        valid = false;
    } else {
        messageError.textContent = "";
    }

    if (valid) {
        formSuccess.textContent = "Message sent successfully!";
        contactForm.reset();
    } else {
        formSuccess.textContent = "";
    }
});


//Currently listening
const musicToggle = document.getElementById("music-toggle");
const musicPanel = document.getElementById("music-panel");


musicToggle.addEventListener("click", () => {

    musicPanel.classList.toggle("open");

    const expanded = musicPanel.classList.contains("open");

    musicToggle.setAttribute("aria-expanded", expanded);
});