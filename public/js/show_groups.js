console.log("Visualizacion de grupos");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();
const getGruop = (id) => fs.collection("groups").doc(id).get();

const deleteGroup = (id) => fs.collection("groups").doc(id).delete();

//Actualizacion de (Grupo)
const updateGroup = (id, group_up) => fs.collection("groups").doc(id).update(group_up);

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
            <td><button type="button" class="clave see_com" data-id="${id_bot}" data-bs-target="#staticBackdrop"></button></td>
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
const onGetGroup = (callback) => fs.collection("groups").orderBy("Semestre", "asc").onSnapshot(callback);
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
            alert("¿seguro?")
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
            //window.location = "actualizar_grupos.html";
            const id_group = id;
            updateFunction(id_group);
        });
    }
}
//var list = document.querySelector("#staticBackdropLabel");
// asignacion de funcion a botones de mostar 
function setActionShow() {
    const array_bot = document.querySelectorAll(".see_com");
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', async() => {
            var id = array_bot[index].getAttribute('data-id');
            var doc = await getGruop(id);
            const grupo_a = doc.data();
            searchFunction(id);
            /*list.innerHTML = `<p>Laboratorio: ${grupo_a.Nombre}</p><p>Aula: ${grupo_a.Aula}</p><p>Creditos: ${grupo_a.Creditos}</p>
                                <p>Semestre: ${grupo_a.Semestre}</p><p>Cupo: ${grupo_a.Cupo}</p><p>Cupo restante: ${grupo_a.Cupo_res}</p>
                                <p>Clave: ${grupo_a.Clave}</p><p>Grupo: ${grupo_a.Grupo}</p><p>RFC del profesor: ${grupo_a.Id_profesor}</p>
                                <p>Nombre del profesor: ${grupo_a.Profesor_nom}</p><br><p>Horario: </p><p>Lunes: ${grupo_a.Dias[0]}</p>
                                <p>Martes: ${grupo_a.Dias[1]}</p><p>Miércoles: ${grupo_a.Dias[2]}</p><p>Jueves: ${grupo_a.Dias[3]}</p>
                                <p>Viernes: ${grupo_a.Dias[4]}</p><p>Sabado: ${grupo_a.Dias[5]}</p>`;*/
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

//Para buscar grupo
function searchFunction(id_g){
//const form_group_search = document.querySelector('#form_group_search');
var container = document.querySelector("#result_group");
var html_value = "";
//Parece que de aquí esta el problema porque después de esto ya no salen los alerts
//form_group_search.addEventListener('submit', async (e) => {
    //e.preventDefault();
    fs.collection("groups").get().then(function(querySnapshot){
        var val1, val2, val3, val4, val5, vla6, val7, val8, val9, val10, val11, val12, val13, val14, val15, val16;
        querySnapshot.forEach(function (doc){
            
            if(doc.id == id_g){
                var group = doc.data();
                var id_bot = doc.id;
                id_goblal = id_bot;
                val1 = group.Aula;
                val2 = group.Creditos;
                val3 = group.Semestre;
                val4 = group.Cupo;
                val5 = group.Cupo_res;
                val6 = group.Clave;
                val7 = group.Grupo;
                val8 = group.Nombre;
                val9 = group.Id_profesor;
                val10 = group.Profesor_nom;
                val11 = group.Dias[0];
                val12 = group.Dias[1];
                val13 = group.Dias[2];
                val14 = group.Dias[3];
                val15 = group.Dias[4];
                val16 = group.Dias[5];
                html_value = `
                    <form class="row g-3" id="form_group_update">
                        <div class="col-md-6">
                            <label for="classroom_form_group_update" class="form-label">Aula:</label>
                            <input type="text" class="form-control" id="classroom_form_group_update" disabled>
                            <label for="credits_form_group_update" class="form-label">Créditos:</label>
                            <input type="number" class="form-control" id="credits_form_group_update" disabled>
                            <label for="semester_form_group_update" class="form-label">Semestre:</label>
                            <input type="number" class="form-control" id="semester_form_group_update" disabled>
                            <label for="quota_form_group_update" class="form-label">Cupo:</label>
                            <input type="number" class="form-control" id="quota_form_group_update" disabled>
                            <label for="reamining_quota_form_group_update" class="form-label">Cupo restante:</label>
                            <input type="number" class="form-control" id="reamining_quota_form_group_update" disabled>
                        </div>
                        <div class="col-md-6">
                            <label for="key_form_group_update" class="form-label">Clave:</label>
                            <input type="number" class="form-control" id="key_form_group_update" disabled>
                            <label for="no_group_form_group_update" class="form-label">Grupo:</label>
                            <input type="number" class="form-control" id="no_group_form_group_update" disabled>
                            <label for="name_form_group_update" class="form-label">Nombre del laboratorio:</label>
                            <input type="text" class="form-control" id="name_form_group_update" disabled>
                            <label for="id_teacher_form_group_update" class="form-label">RFC del profesor:</label>
                            <input type="text" class="form-control" id="id_teacher_form_group_update" disabled>
                            <label for="teacher_name_form_group_update" class="form-label">Nombre del profesor:</label>
                            <input type="text" class="form-control" id="teacher_name_form_group_update" disabled>
                        </div>
                        <h3 style="color: white">"UNAM -FESC</h3>
                        <div class="row">
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="monday_form_group" disabled value="Lunes">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="tuesday_form_group" disabled value="Martes">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="wednesday_form_group" disabled value="Miércoles">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="thursday_form_group" disabled value="Jueves">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="friday_form_group" disabled value="Viernes">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="saturday_form_group" disabled value="Sabado">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="monday_hour_form_group_update" disabled>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="tuesday_hour_form_group_update"  disabled>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="wednesday_hour_form_group_update" disabled>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="thursday_hour_form_group_update" disabled
                                >
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="friday_hour_form_group_update" disabled>
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="saturday_hour_form_group_update" disabled>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-sm-12" style="color:white;">
                                    <h6> Espaciado discreto</h6>
                                </div>
                            </div>
                        </div>
                    </form>
                `;
            }
        });
        container.innerHTML = html_value;

        var delete_table = document.querySelector("#group_research_table");
        delete_table.innerHTML = "";
        var classroom = document.querySelector("#classroom_form_group_update");
        classroom.value = val1;
        var credits = document.querySelector("#credits_form_group_update");
        credits.value = val2;
        var semester = document.querySelector("#semester_form_group_update");
        semester.value = val3;
        var quota = document.querySelector("#quota_form_group_update");
        quota.value = val4;
        var reamining_quota = document.querySelector("#reamining_quota_form_group_update");
        reamining_quota.value = val5;
        var key = document.querySelector("#key_form_group_update");
        key.value = val6;
        var no_group = document.querySelector("#no_group_form_group_update");
        no_group.value = val7;
        var name = document.querySelector("#name_form_group_update");
        name.value = val8;
        var id_teacher = document.querySelector("#id_teacher_form_group_update");
        id_teacher.value = val9;
        var teacher_name = document.querySelector("#teacher_name_form_group_update");
        teacher_name.value = val10;
        var monday_hour = document.querySelector("#monday_hour_form_group_update");
        monday_hour.value = val11;
        var tuesday_hour = document.querySelector("#tuesday_hour_form_group_update");
        tuesday_hour.value = val12;
        var wednesday_hour = document.querySelector("#wednesday_hour_form_group_update");
        wednesday_hour.value = val13;
        var thursday_hour = document.querySelector("#thursday_hour_form_group_update");
        thursday_hour.value = val14;
        var friday_hour = document.querySelector("#friday_hour_form_group_update");
        friday_hour.value = val15;
        var saturday_hour = document.querySelector("#saturday_hour_form_group_update");
        saturday_hour.value = val16;
    });
}

//Para buscar y actualizar grupo
function updateFunction(id_g){
//const form_group_search = document.querySelector('#form_group_search');
var container = document.querySelector("#result_group");
var html_value = "";
//Parece que de aquí esta el problema porque después de esto ya no salen los alerts
//form_group_search.addEventListener('submit', async (e) => {
    //e.preventDefault();
    fs.collection("groups").get().then(function(querySnapshot){
        var val1, val2, val3, val4, val5, vla6, val7, val8, val9, val10, val11, val12, val13, val14, val15, val16;
        querySnapshot.forEach(function (doc){
            
            if(doc.id == id_g){
                var group = doc.data();
                var id_bot = doc.id;
                id_goblal = id_bot;
                val1 = group.Aula;
                val2 = group.Creditos;
                val3 = group.Semestre;
                val4 = group.Cupo;
                val5 = group.Cupo_res;
                val6 = group.Clave;
                val7 = group.Grupo;
                val8 = group.Nombre;
                val9 = group.Id_profesor;
                val10 = group.Profesor_nom;
                val11 = group.Dias[0];
                val12 = group.Dias[1];
                val13 = group.Dias[2];
                val14 = group.Dias[3];
                val15 = group.Dias[4];
                val16 = group.Dias[5];
                html_value = `
                    <form class="row g-3" id="form_group_update">
                        <div class="col-md-6">
                            <label for="classroom_form_group_update" class="form-label">Aula:</label>
                            <input type="text" class="form-control" id="classroom_form_group_update" required>
                            <label for="credits_form_group_update" class="form-label">Créditos:</label>
                            <input type="number" class="form-control" id="credits_form_group_update" required>
                            <label for="semester_form_group_update" class="form-label">Semestre:</label>
                            <input type="number" class="form-control" id="semester_form_group_update" required>
                            <label for="quota_form_group_update" class="form-label">Cupo:</label>
                            <input type="number" class="form-control" id="quota_form_group_update" required>
                            <label for="reamining_quota_form_group_update" class="form-label">Cupo restante:</label>
                            <input type="number" class="form-control" id="reamining_quota_form_group_update" required>
                        </div>
                        <div class="col-md-6">
                            <label for="key_form_group_update" class="form-label">Clave:</label>
                            <input type="number" class="form-control" id="key_form_group_update" required>
                            <label for="no_group_form_group_update" class="form-label">Grupo:</label>
                            <input type="number" class="form-control" id="no_group_form_group_update" required>
                            <label for="name_form_group_update" class="form-label">Nombre del laboratorio:</label>
                            <input type="text" class="form-control" id="name_form_group_update" required>
                            <label for="id_teacher_form_group_update" class="form-label">RFC del profesor:</label>
                            <input type="text" class="form-control" id="id_teacher_form_group_update" required>
                            <label for="teacher_name_form_group_update" class="form-label">Nombre del profesor:</label>
                            <input type="text" class="form-control" id="teacher_name_form_group_update" required>
                        </div>
                        <h3 style="color: white">"UNAM -FESC</h3>
                        <div class="row">
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="monday_form_group" disabled value="Lunes">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="tuesday_form_group" disabled value="Martes">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="wednesday_form_group" disabled value="Miércoles">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="thursday_form_group" disabled value="Jueves">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="friday_form_group" disabled value="Viernes">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="saturday_form_group" disabled value="Sabado">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="monday_hour_form_group_update">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="tuesday_hour_form_group_update"  >
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="wednesday_hour_form_group_update" >
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="thursday_hour_form_group_update"
                                >
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="friday_hour_form_group_update">
                            </div>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="saturday_hour_form_group_update">
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-sm-12" style="color:white;">
                                    <h6> Espaciado discreto</h6>
                                </div>
                            </div>
                        </div>
                        <div>
                            <br>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary" onclick="updateNowYes()">Actualizar grupo</button>
                            </div>
                        </div>
                    </form>
                `;
            }
        });

        container.innerHTML = html_value;
        var delete_table = document.querySelector("#group_research_table");
        delete_table.innerHTML = "";
        var classroom = document.querySelector("#classroom_form_group_update");
        classroom.value = val1;
        var credits = document.querySelector("#credits_form_group_update");
        credits.value = val2;
        var semester = document.querySelector("#semester_form_group_update");
        semester.value = val3;
        var quota = document.querySelector("#quota_form_group_update");
        quota.value = val4;
        var reamining_quota = document.querySelector("#reamining_quota_form_group_update");
        reamining_quota.value = val5;
        var key = document.querySelector("#key_form_group_update");
        key.value = val6;
        var no_group = document.querySelector("#no_group_form_group_update");
        no_group.value = val7;
        var name = document.querySelector("#name_form_group_update");
        name.value = val8;
        var id_teacher = document.querySelector("#id_teacher_form_group_update");
        id_teacher.value = val9;
        var teacher_name = document.querySelector("#teacher_name_form_group_update");
        teacher_name.value = val10;
        var monday_hour = document.querySelector("#monday_hour_form_group_update");
        monday_hour.value = val11;
        var tuesday_hour = document.querySelector("#tuesday_hour_form_group_update");
        tuesday_hour.value = val12;
        var wednesday_hour = document.querySelector("#wednesday_hour_form_group_update");
        wednesday_hour.value = val13;
        var thursday_hour = document.querySelector("#thursday_hour_form_group_update");
        thursday_hour.value = val14;
        var friday_hour = document.querySelector("#friday_hour_form_group_update");
        friday_hour.value = val15;
        var saturday_hour = document.querySelector("#saturday_hour_form_group_update");
        saturday_hour.value = val16;
    });
        
    
}

function updateNowYes(){
    // actualizar estudiante
        var form_update = document.querySelector("#form_group_update");
        form_update.addEventListener('submit', async e => {
            e.preventDefault();
            var classroom = document.querySelector("#classroom_form_group_update");
            var credits = document.querySelector("#credits_form_group_update");
            var semester = document.querySelector("#semester_form_group_update");
            var quota = document.querySelector("#quota_form_group_update");
            var reamining_quota = document.querySelector("#reamining_quota_form_group_update");
            var key = document.querySelector("#key_form_group_update");
            var no_group = document.querySelector("#no_group_form_group_update");
            var name = document.querySelector("#name_form_group_update");
            var id_teacher = document.querySelector("#id_teacher_form_group_update");
            var teacher_name = document.querySelector("#teacher_name_form_group_update");
            var monday_hour = document.querySelector("#monday_hour_form_group_update");
            var tuesday_hour = document.querySelector("#tuesday_hour_form_group_update");
            var wednesday_hour = document.querySelector("#wednesday_hour_form_group_update");
            var thursday_hour = document.querySelector("#thursday_hour_form_group_update");
            var friday_hour = document.querySelector("#friday_hour_form_group_update");
            var saturday_hour = document.querySelector("#saturday_hour_form_group_update");
               
        await updateGroup(id_goblal, {
            Aula: classroom.value,
            Clave: key.value,
            Creditos: credits.value,
            Cupo: quota.value,
            Cupo_res: reamining_quota.value,
            Dias: [monday_hour.value,
            tuesday_hour.value,
            wednesday_hour.value,
            thursday_hour.value,
            friday_hour.value,
            saturday_hour.value],
            Grupo: no_group.value,
            Id_profesor: id_teacher.value,
            Nombre: name.value,
            Profesor_nom: teacher_name.value,
            Semestre: semester.value
        });
        form_update.reset();
        window.location = "crud_grupos.html";
        alert(name.value +" ha sido actualizado ");
        id_goblal=null;    
    });
}