console.log("CRUD GRUPOS");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();
var id_goblal = "";
//Informacion de usuario activo

const local_group = {
    classroom: "",
    key: "",
    credits: "",
    quota: "",
    reamining_quota: "",
    days: "",
    no_group: "",
    name: "",
    id_teacher: "",
    teacher_name: "",
    semester: ""
};

//recopilar informacion 
const setGroup = (group) => {
    if (group) {
        var group_active = auth.currentUser;
        //local_group.name = group_active.displayName;
        local_group.classroom = group_active.classroom;
        local_group.key = group_active.key;
        local_group.credits = group_active.credits;
        local_group.quota = group_active.quota;
        local_group.reamining_quota = group_active.reamining_quota;
        local_group.days = group_active.days;
        local_group.no_group = group_active.no_group;
        local_group.name = group_active.name;
        local_group.id_teacher = group_active.id_teacher;
        local_group.teacher_name = group_active.teacher_name;
        local_user.semester = group_active.semester;
        //showUserByEmail(local_group.email.toLowerCase());
    } else {
        local_group.name = "Unknowed";
    }
};
// recopilar informacion 2, tomamos correo como conexion entre BD_firestrore y BD_ususarios 
// consulta por email 
/*
const showUserByEmail = async (email) => {
    fs.collection("users").where("Correo", "==", email)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                var student = doc.data();
                local_user.name = student.Nombre;
                local_user.career = student.Carrera;
                local_user.account_numer = student.NumCuenta;
                local_user.state = student.Estado;
                const say_N = document.querySelector('#title_admin');
                say_N.innerHTML = `Hola ${local_user.name}`;
                console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents xD: ", error);
        });
}*/
//Actualizacion de usuario (Alumno)
const updateGroup = (id, group_up) => fs.collection("groups").doc(id).update(group_up);

/*Alta de un grupo primero intentando el registro de 
un grupo y luego manando la informacion del formulario a la DB de firestore*/

const form_group_create = document.querySelector("#form_group_create");

form_group_create.addEventListener('submit', (e) => {
    e.preventDefault();
    const classroom = document.querySelector("#classroom_form_group").value;
    const key = document.querySelector("#key_form_group").value;
    const credits = document.querySelector("#credits_form_group").value;
    const quota = document.querySelector("#quota_form_group").value;
    const reamining_quota = document.querySelector("#reamining_quota_form_group").value;
    /*const days = document.querySelector("#monday_form_group","monday_hour_form_group","tuesday_form_group",
        "tuesday_hour_form_group","wednesday_form_group","wednesday_hour_form_group","thursday_form_group",
        "thursday_hour_form_group","friday_form_group","friday_hour_form_group","saturday_form_group",
        "saturday_hour_form_group").value;*/
    const days = [document.querySelector("#monday_hour_form_group").value, document.querySelector("#tuesday_hour_form_group").value,
        document.querySelector("#wednesday_hour_form_group").value, document.querySelector("#thursday_hour_form_group").value,
        document.querySelector("#friday_hour_form_group").value, document.querySelector("#saturday_hour_form_group").value];
    const no_group = document.querySelector("#no_group_form_group").value;
    const name = document.querySelector("#name_form_group").value;
    const id_teacher = document.querySelector("#id_teacher_form_group").value;
    const teacher_name = document.querySelector("#teacher_name_form_group").value;
    const semester = document.querySelector("#semester_form_group").value;
    fs.collection("groups").add({
                    Aula: classroom,
                    Clave: key,
                    Creditos: credits,
                    Cupo: quota,
                    Cupo_res: reamining_quota,
                    Dias: days,
                    Grupo: no_group,
                    Id_profesor: id_teacher,
                    Nombre: name,
                    Profesor_nom: teacher_name,
                    Semestre: semester
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        alert("Grupo: " + name + " ha sido registrado");
                        console.log("registrado");
                        form_group_create.reset();
                        window.location = "crear_grupo.html";
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
});

















/*
// busqueda de grupo con clave
const form_group_search = document.querySelector("#form_group_search");
var container = document.querySelector("#result_group");
var html_value = "undefineed DX";
form_group_search.addEventListener('submit', async (e) => {
    e.preventDefault();
    const key = document.querySelector("#key_txtbox_group").value;
    console.log(key);
    fs.collection("groups").where("Clave", "==", key)
        .get()
        .then(function (querySnapshot) {
            var val1, val2, val3, val4, val5, val6, val7, val8, val9, val10;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                var group = doc.data();
                var id_bot = doc.id;
                id_goblal = id_bot;
                val1 = group.classroom;
                val2 = group.key;
                val3 = group.credits;
                val4 = group.quota;
                val5 = group.reamining_quota;
                val6 = group.days;
                vaL7 = group.no_group;
                val8 = group.name;
                val9 = group.id_teacher;
                val10 = group.teacher_name;
                /* A PARTIR DE AQUÍ, NO SE AH MODIFICADO CON RESPECTO A LOS GRUPOS (DISEÑO, PASAR DATOS, ETC) */
                




















                /*html_value = `
                        <div>
        <div>
            <div>
                <div style= "padding: 5px; float: left; margin-left: 5%;">Aula:</div>
                <input type="text" id="classroom_form_group" style= "padding: 5px; height: 30px; width: 100px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Clave:</div>
                <input type="text" id="key_form_group" style= "padding: 5px; height: 30px; width: 40px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Creditos:</div>
                <input type="text" id="credits_form_group" style= "padding: 5px; height: 30px; width: 40px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Semestre:</div>
                <input type="text" id="semester_form_group" style= "padding: 5px; height: 30px; width: 40px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Cupo:</div>
                <input type="text" id="quota_form_group" style= "padding: 5px; height: 30px; width: 40px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Cupo restante:</div>
                <input type="text" id="reaming_quota_form_group" style= "padding: 5px; height: 30px; width: 40px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Grupo:</div>
                <input type="text" id="no_group_form_group" style= "padding: 5px; height: 30px; width: 50px; float: left;" value=""></input>
                <div style= "padding: 5px; float: left; margin-left: 2%;">Nombre:</div>
                <input type="text" id="name_form_group" style= "padding: 5px; height: 30px; width: 130px;" value=""></input>
            </div>
            <br>
            <div>
                <div style= "padding: 5px; float: left; margin-left: 12%;">RFC del profesor:</div>
                <input type="text" id="id_teacher_form_group" style= "padding: 5px; height: 30px; width: 250px; float: left;" value=""></input>
                <div style= "padding: 5px; margin-left: 14%; float: left;">Nombre del Profesor:</div>
                <input type="text" style= "padding: 5px; height: 30px; width: 260px;" value=""></input>
            </div>
        </div>
    </div>
    <br>
    <br>
    <div class="cotainer">
        <div class="container">
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade show active" id="sec1">
                        <table style="width: 100%">
                            <tr>
                                <th id="monday_form_group">Lunes</th>
                                <th id="tuesday_form_group">Martes</th>
                                <th id="wednesday_form_group">Miercoles</th>
                                <th id="thursday_form_group">Jueves</th>
                                <th id="friday_form_group">Viernes</th>
                                <th id="saturday_form_group">Sabado</th>
                            </tr>
                            <tr>
                                <td id="monday_hour_form_group"></td>
                                <td id="tuesday_hour_form_group"></td>
                                <td id="wednesday_hour_form_group"></td>
                                <td id="thursday_hour_form_group"></td>
                                <td id="friday_hour_form_group"></td>
                                <td id="saturday_hour_form_group"></td>
                            </tr>
                        </table>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div>
            <div>
                <div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>







                        <!-- <form class="row g-3" id="form_student_update">
                        <div class="col-md-6"> 
                            <label for="name_form_student_update" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="name_form_student_update" required>
                            <label for="no_cuenta_form_student_update" class="form-label">Numero de cuenta</label>
                            <input type="number" class="form-control" id="no_cuenta_form_student_update" required>
                            <label for="carrer_form_student_update" class="form-label">Carrera</label>
                            <input type="text" class="form-control" id="career_form_student_update" required>
                        </div>
                        <div class="col-md-6">
                            <label for="email_form_student_update" class="form-label">Correo electronico</label>
                            <input type="email" class="form-control" id="email_form_student_update" disabled>
                            <label for="state_form_student_update" class="form-label">Estado</label>
                            <input type="text" class="form-control" id="state_form_student_update" disabled>
                            <br>
                            <select class="form-control" id="state_form_student_update" required>
                                <option value="value1" selected disabled>Ingrese un estado</option>
                                <option value="value2">Aceptado</option>
                                <option value="value3">Rechazado</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-sm-12" style="color:white;">
                                <h6> Espaciado discreto</h6>
                            </div>
                        </div>
                        <div class="col-12">
                        <button id="" class="btn btn-primary update_bot" data-id="${id_bot}">Actualizar</button>
                        </div>
                    </form> -->
                        `;
            });
            container.innerHTML = html_value;
            /*const new_form = document.querySelector("#form_student_update");
            new_form['name_form_student_update'].value = val1;*/

















            /*
            var name = document.querySelector("#name_form_student_update");
            name.value = val1;
            var account_number = document.querySelector("#no_cuenta_form_student_update");
            account_number.value = val4;
            var career = document.querySelector("#career_form_student_update");
            career.value = val2;
            var email = document.querySelector("#email_form_student_update");
            email.value = val3;
            var state = document.querySelector("#state_form_student_update");
            state.value = val5;
            // actualizar estudiante
            var form_update = document.querySelector("#form_student_update");
            form_update.addEventListener('submit', async e => {
                e.preventDefault();
                var name = document.querySelector("#name_form_student_update");
                var account_number = document.querySelector("#no_cuenta_form_student_update");
                var career = document.querySelector("#career_form_student_update");
                var email = document.querySelector("#email_form_student_update");
                var state = document.querySelector("#state_form_student_update");
                await updateStudent(id_goblal, {
                    Nombre: name.value,
                    NumCuenta: account_number.value,
                    Carrera: career.value,
                    Correo: email.value,
                    Estado: state.value
                });
                alert(name.value +" ha sido actualizado "+state.value);
                form_update.reset();
                id_goblal=null;
            });
        })
        .catch(function (error) {
            container.innerHTML = "NO se encontraron conincidencias";
            console.log("Error getting documents xD: ", error);
        });

});

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

// informacion del usuario
//Estado de usuario
auth.onAuthStateChanged((user) => {
    if (user) {
        setUser(user);
        console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
        //ID Sandra("BFhfhzXQvsHLQj6t1OQO") ID Rodrigo("hL4UJEsIITomzuuykJva");
    } else {
        console.log("no hay usuario activo");
    }
});
*/