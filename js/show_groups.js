console.log("Visualizacion de grupos");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();
const getGruop = (id) => fs.collection("groups").doc(id).get();

const deleteGroup = (id) => fs.collection("groups").doc(id).delete();

function Group(croom, key, credits, quota, days, no_group, id_teacher, name, teacher_name, semester) {
    this.Aula = croom;
    this.Clave = key;
    this.Creditos = credits,
        this.Cupo = quota,
        this.Cupo_res = quota;
    this.Dias = days;
    this.Grupo = no_group;
    this.Id_profesor = id_teacher;
    this.Nombre = name;
    this.Profesor_nom = teacher_name;
    this.Semestre = semester;
}

var table_groups = document.querySelector("#group_research_table");

const set_info = (data) => {
    if (data.length) {
        let html = `
        <tr>
        <th>Clave</th>
        <th>Semestre</th>
        <th>Laboratorio</th>
        <th>CR</th>
        <th>Grupo</th>
        <th>Aula</th>
        <th>Consultar</th>
        <th>Actualizar</th>
        <th>Eliminar</th>
        </tr>
        `
        data.forEach((doc) => {
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            var group_ac = new Group(info.Aula, info.Clave, info.Creditos, info.Cupo, info.Dias, info.Grupo, info.Id_profesor, info.Nombre, info.Profesor_nom, info.Semestre);
            const li_element = `
            <tr>
            <td>${group_ac.Clave}</td>
            <td>${group_ac.Semestre}</td>
            <td>${group_ac.Nombre}</td>
            <td>${group_ac.Creditos}</td>
            <td>${group_ac.Grupo}</td>
            <td>${group_ac.Aula}</td>
            <td><button type="button" class="clave see_com" data-bs-toggle="modal" data-id="${id_bot}" data-bs-target="#staticBackdrop"></button></td>
            <td><button type="button" class="actualizar" data-id="${id_bot}"></button></td>
            <td><button type="button" class="eliminar dl-bot" data-id="${id_bot}"></button></td>
            </tr>                               
            `;
            html += li_element
        });
        table_groups.innerHTML = html;
    } else {
        console.log("No se encontraron grupos");
    }
}

// evento de cambios en fs
const onGetGroup = (callback) => fs.collection("groups").onSnapshot(callback);
auth.onAuthStateChanged(user => {
    if (user) {
        onGetGroup((querySnapshot) => {
            set_info(querySnapshot.docs);
            setActionDelete();
            setActionUpdate();
            setActionShow();
        })
    } else {
        set_info([]);
    }
})

// asignacion de funcion a botones de eliminar 
function setActionDelete() {
    const array_bot = document.querySelectorAll(".dl-bot");
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', () => {
            var id = array_bot[index].getAttribute('data-id');
            deleteGroup(id);
            console.log("Se elimino el grupo");
        });

    }
}
// asignacion de funcion a botones de actualizar 
function setActionUpdate() {
    const array_bot = document.querySelectorAll(".actualizar");
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', () => {
            var id = array_bot[index].getAttribute('data-id');
            alert(id);
        });

    }
}
var list = document.querySelector("#staticBackdropLabel");
// asignacion de funcion a botones de mostar 
function setActionShow() {
    const array_bot = document.querySelectorAll(".see_com");
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', async() => {
            var id = array_bot[index].getAttribute('data-id');
            var doc = await getGruop(id);
            const grupo_a = doc.data();
            list.innerHTML = grupo_a.Nombre;
            
        });
       
    }
}

// Cerrar sesion 
const logout = document.querySelector('#logout-btn');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth
        .signOut()
        .then(() => {
            console.log("Cerraste sesion");
            $('#close-question').modal('hide');
            window.location = "index.html";
        });
});