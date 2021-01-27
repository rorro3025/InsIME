console.log("inscripcion");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();

//consulta grupo
const getGroup = (id) => fs.collection("groups").doc(id).get();

const local_user = {
    name: "",
    email: "",
    num_account: "",
    photoUrl: "",
    uid: "",
    emailVerified: "",
    career: "",
    semester: ""
};

const setUser = (user) => {
    if (user) {
        var user_active = auth.currentUser;
        //local_user.name = user_active.displayName;
        local_user.email = user_active.email;
        local_user.uid = user_active.uid;
        local_user.photoUrl = user_active.photoURL;
        local_user.emailVerified = user_active.emailVerified;
        showUserByEmail(local_user.email.toLowerCase());
    } else {
        local_user.name = "Unknowed";
    }
};

const showUserByEmail = async (email) => {
    fs.collection("users").where("Correo", "==", email)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                var student = doc.data();
                local_user.name = student.Nombre;
                local_user.career = student.Carrera;
                local_user.num_account = student.NumCuenta;
                local_user.semester = student.Semestre;
                console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
                setInfo();
                setGroupAvalible(local_user.semester);
                // funciones de alta, baja y terminar
                //Para alta
                var btn_up = document.querySelector("#btn-up");
                btn_up.addEventListener('click', async () => {
                   var asignature = document.querySelector("#name_form_groups").value;
                   var doc = await getGroup(asignature);
                   var asignature_info = doc.data(); 
                    var table = document.querySelector("#table_inscription");
                    var know = table.innerHTML.search(asignature_info.Nombre);
                    if (know==-1) {
                    table.innerHTML = table.innerHTML + `
                    <tr>
                        <td>${asignature_info.Clave}</td>
                        <td>${asignature_info.Nombre}</td>
                        <td>${asignature_info.Creditos}</td>
                    </tr>
                    `   }else{
                        alert("Ya lo has agregado");
                    }
                });
                //Para baja

                //Para terminar
                /*var btn_finish = document.querySelector('#btn-finish');
                btn_finish.addEventListener('click', asyn () =>{
                    var array_groups = document.querySelector("#table_inscription").value;
                    console.log(array_groups);
                });*/
                
            });
        })
        .catch(function (error) {
            console.log("Error getting documents xD: ", error);
        });
}

// cerrar sesion
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
    } else {
        console.log("no hay usuario activo");
    }
});

/// correcciones 
//llenado del formulario
function setInfo() {
    var name = document.querySelector("#name_form_student");
    name.value = local_user.name;
    var account_number = document.querySelector("#no_cuenta_form_student");
    account_number.value = local_user.num_account;
    var career = document.querySelector("#carrer_form_student");
    career.value = local_user.career;
    var email = document.querySelector("#email_form_student");
    email.value = local_user.email;
    var semester = document.querySelector("#semester_form_student");
    semester.value = local_user.semester;

}

function setGroupAvalible(semester) {
    var cb = document.querySelector("#name_form_groups");
    var set_html = "no cambio";
    var cadena = semester.toString();
    console.log(cadena);
    fs.collection("groups").where("Semestre", "==", cadena).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var materia_id = doc.id;
            var materia_info = doc.data();
            var html = `
          <option value="${materia_id}">${materia_info.Nombre}</option>
          `;
            set_html = set_html + html;
        });
        cb.innerHTML = set_html;
    });
}

function addOptions(domElement, array) {
    var select = document.getElementById(domElement)[0];

    for (value in array) {
        var option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }
}
//name_form_groups