console.log("Administracion de usuario tipo profesor usuario de tipo 3");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();
var id_goblal = "";

const local_user = {
    name: "",
    email: "",
    photoUrl: "",
    uid: "",
    emailVerified: "",
    rfc: "",

    state: "",
    career: ""
};

//actualizacion de usuario (Profesor)
const updateProfessor = (id, prof_up) => fs.collection("users").doc(id).update(prof_up);

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
        local_user.rfc = user_active.rfc;
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
                var teacher = doc.data();
                local_user.name = teacher.Nombre;
                local_user.state = teacher.Estado;
                local_user.rfc = teacher.RFC;
                const say_N = document.querySelector('#title_admin');
                say_N.innerHTML = `Hola ${local_user.name}`;
                console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents xD: ", error);
        });
}

//variable del formulario 
const f_t_create = document.querySelector("#form_teacher_create");
//agregar escuha al evento submit 

f_t_create.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.querySelector("#email_form_teacher").value;
    const name = document.querySelector("#name_form_teacher").value;
    const rfc = document.querySelector("#rfc_form_teacher").value;
    const password = document.querySelector("#password_form_teacher").value;
    const password_c = document.querySelector("#password_2_form_teacher").value;
   //const state = document.querySelector("#state_form_student").value;
    if (password == password_c) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredencial => {
                fs.collection("users").add({
                    Nombre: name,
                    Correo: email.toLowerCase(),
                    RFC: rfc,
                    //Estado: state,
                    Tipo: 3
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        alert("Usuario: " + name + " ha sido registrado");
                        console.log("registrado");
                        f_t_create.reset();
                        window.location="menu_teach.html";
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
const form_teach_search = document.querySelector("#form_teach_search");
var container = document.querySelector("#result_teach");
var html_value = "undefineed DX";
form_teach_search.addEventListener('submit', async (e) => {
    e.preventDefault();
    const rfc_g = document.querySelector("#rfc_txtbox_teach").value;
    console.log(rfc_g);
    fs.collection("users").where("RFC", "==", rfc_g)
        .get()
        .then(function (querySnapshot) {
            var val1, val2, val3, val4, val5;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                var teach = doc.data();
                var id_bot = doc.id;
                id_goblal = id_bot;
                val1 = teach.Nombre;
                val2 = teach.RFC;
                val3 = teach.Correo;
                html_value = `
                        <form class="row g-3" id="form_teacher_update">
                        <div class="col-md-6"> 
                            <label for="name_form_teacher_update" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="name_form_teacher_update" required>
                            <label for="rfc_form_teacher_update" class="form-label">RFC</label>
                            <input type="text" class="form-control" id="rfc_form_teacher_update" required>
                        </div>
                        <div class="col-md-6">
                            <label for="email_form_teacher_update" class="form-label">Correo electronico</label>
                            <input type="email" class="form-control" id="email_form_teacher_update" disabled>
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
            /*const new_form = document.querySelector("#form_teacher_update");
            new_form['name_form_teacher_update'].value = val1;*/
            var name = document.querySelector("#name_form_teacher_update");
            name.value = val1;
            var rfc = document.querySelector("#rfc_form_teacher_update");
            rfc.value = val2;
            var email = document.querySelector("#email_form_teacher_update");
            email.value = val3;
            // actualizar profesor
            var form_update = document.querySelector("#form_teacher_update");
            form_update.addEventListener('submit', async e => {
                e.preventDefault();
                var name = document.querySelector("#name_form_teacher_update");
                var rfc = document.querySelector("#rfc_form_teacher_update");
                var email = document.querySelector("#email_form_teacher_update");
                await updateProfessor(id_goblal, {
                    Nombre: name.value,
                    RFC: rfc.value,
                    Correo: email.value
                });
                alert(name.value +" ha sido actualizado ");
                form_update.reset();
                id_goblal=null;
            });
        })
        .catch(function (error) {
            container.innerHTML = "NO se encontraron conincidencias";
            console.log("Error getting documents xD: ", error);
        });

});

// funcion de cierre de sesion 
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

auth.onAuthStateChanged((user) => {
    if (user) {
        setUser(user);
        console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
        //ID Sandra("BFhfhzXQvsHLQj6t1OQO") ID Rodrigo("hL4UJEsIITomzuuykJva");
    } else {
        console.log("no hay usuario activo");
    }
});