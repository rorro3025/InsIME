console.log("CRUD ALUMNOS");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();
var id_goblal = "";
//Informacion de usuario activo

const local_user = {
    name: "",
    email: "",
    photoUrl: "",
    uid: "",
    emailVerified: "",
    state: "",
    career: ""
};

//recopilar informacion 
const setUser = (user) => {
    if (user) {
        var user_active = auth.currentUser;
        //local_user.name = user_active.displayName;
        local_user.email = user_active.email;
        local_user.uid = user_active.uid;
        local_user.photoUrl = user_active.photoURL;
        local_user.emailVerified = user_active.emailVerified;
        local_user.state = user_active.state;
        showUserByEmail(local_user.email.toLowerCase());
    } else {
        local_user.name = "Unknowed";
    }
};
// recopilar informacion 2, tomamos correo como conexion entre BD_firestrore y BD_ususarios 
// consulta por email 
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
}
//Actualizacion de usuario (Alumno)
const updateStudent = (id, student_up) => fs.collection("users").doc(id).update(student_up);

/*Alta de un estudiante primero intentando el registro de 
un usuario y luego manando la informacion del formulario a la DB de firestore*/

const form_student_create = document.querySelector("#form_student_create");

form_student_create.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector("#email_form_student").value;
    const name = document.querySelector("#name_form_student").value;
    const no_account = document.querySelector("#no_cuenta_form_student").value;
    const career = document.querySelector("#career_form_student").value;
    const password = document.querySelector("#password_form_student").value;
    const password_c = document.querySelector("#password_2_form_student").value;
    if (password == password_c) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredencial => {

                fs.collection("users").add({
                    Nombre: name,
                    Correo: email.toLowerCase(),
                    Carrera: career,
                    NumCuenta: no_account,
                    Tipo: 2
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        alert("Usuario: " + name + " ha sido registrado");
                        console.log("registrado");
                        form_student_create.reset();
                        window.location = "menu_student.html";
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/email-already-in-use') {
                    alert('El correo ya ha sido utilizado');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    } else {
        alert("las contraseñas no coinciden");
    }
});
// busqueda de usuario (alumnos) con numero de cuenta
const form_student_search = document.querySelector("#form_student_search");
var container = document.querySelector("#result_student");
var html_value = "undefineed DX";
form_student_search.addEventListener('submit', async (e) => {
    e.preventDefault();
    const no_account = document.querySelector("#no_account_txtbox_student").value;
    console.log(no_account);
    fs.collection("users").where("NumCuenta", "==", no_account)
        .get()
        .then(function (querySnapshot) {
            var val1, val2, val3, val4, val5;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                var student = doc.data();
                var id_bot = doc.id;
                id_goblal = id_bot;
                val1 = student.Nombre;
                val4 = student.NumCuenta;
                val2 = student.Carrera;
                val3 = student.Correo;
                val5 = student.Estado;
                html_value = `
                        <form class="row g-3" id="form_student_update">
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
                    </form>
                        `;
            });
            container.innerHTML = html_value;
            /*const new_form = document.querySelector("#form_student_update");
            new_form['name_form_student_update'].value = val1;*/
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