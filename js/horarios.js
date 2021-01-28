console.log("Visualizacion de grupos");
var grupo_selec = "indefinido";
//crecion de los elementos FB
//crecion de los elementos FB
const auth = firebase.auth();
const fs = firebase.firestore();
var grupo_select = "";

const getGruop = (id) => fs.collection("groups").doc(id).get();
//objeto usuario 
const local_user = {
  name: "",
  email: "",
  photoUrl: "",
  uid: "",
  emailVerified: "",
  RFC: ""
};

//recopilar informacion 
const setUser = (user) => {
  if (user) {
    var user_active = auth.currentUser;
    local_user.email = user_active.email;
    local_user.uid = user_active.uid;
    local_user.photoUrl = user_active.photoURL;
    local_user.emailVerified = user_active.emailVerified;
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
        local_user.RFC = student.RFC;
        set_info_form_teachers(local_user.RFC);
        
        //set_info_form_teachers_2(grupo_select);
        console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email, "RFC " + local_user.RFC);
      });
    })
    .catch(function (error) {
      console.log("Error getting documents xD: ", error);
    });
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

// informacion del usuario
//Estado de usuario
auth.onAuthStateChanged((user) => {
  if (user) {
    setUser(user);
    //ID Sandra("BFhfhzXQvsHLQj6t1OQO") ID Rodrigo("hL4UJEsIITomzuuykJva");
  } else {
    console.log("no hay usuario activo");
  }
});


function Group(croom, key, credits, quota_res, days, no_group, id_teacher, name, teacher_name, semester) {
  this.Aula = croom;
  this.Clave = key;
  this.Creditos = credits,
    //this.Cupo = quota,
    this.Cupo_res = quota_res;
  this.Dias = days;
  this.Grupo = no_group;
  this.Id_profesor = id_teacher;
  this.Nombre = name;
  this.Profesor_nom = teacher_name;
  this.Semestre = semester;
}

function student_constrct(number_account, name, email) {
  this.NumCuenta = number_account;
  this.Nombre = name;
  this.Correo = email;
}

// evento de cambios en fs
const onGetGroup = (callback) => fs.collection("groups").onSnapshot(callback);
auth.onAuthStateChanged(user => {
    if (user) {
        onGetGroup((querySnapshot) => {
            //set_info_2(querySnapshot.docs);
        })
    } else {
        //set_info_2([]);
    }
})

function setActionButton() {
  const array_bot = document.querySelectorAll(".see_com");
  for (let index = 0; index < array_bot.length; index++) {
    array_bot[index].addEventListener('click', async ()=>{
      var id = array_bot[index].getAttribute("data-id");
      grupo_select = id;
      var doc = await getGruop(id);
      const grupo_a = doc.data();
      set_info_form_teachers_2(id);
      show_students_form_group(id);
      /*grupo_selec = id;
      set_info_form_teachers_2(id);
      console.log("1: "+ grupo_selec+ "2 " + id);
      window.location= "alumnos_inscritos.html";*/
    });

  }
}


//Mostrar los horarios a los alumnos en orden ascendente por el semestre
var table_groups_horarios = document.querySelector("#group_research_table");
function set_info() {
  fs.collection("groups").orderBy("Semestre", "asc").get().then(function (querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var info = doc.data();
      var id_bot = doc.id;
      //id_goblal = id_bot;
      var group_ac = new Group(info.Aula, info.Clave, info.Creditos, info.Cupo_res, info.Dias, info.Grupo, info.Id_profesor, info.Nombre, info.Profesor_nom, info.Semestre);
      table_groups_horarios.innerHTML = table_groups_horarios.innerHTML + `
            <tr>
            <td>${group_ac.Clave}</td>
            <td>${group_ac.Nombre}</td>
            <td>${group_ac.Semestre}</td>
            <td>${group_ac.Creditos}</td>
            <td>${group_ac.Cupo_res}</td>
            <td>${group_ac.Grupo}</td>
            <td>${group_ac.Aula}</td>
            <td>${group_ac.Profesor_nom}</td>
            <td>${group_ac.Dias[0]}</td>
            <td>${group_ac.Dias[1]}</td>
            <td>${group_ac.Dias[2]}</td>
            <td>${group_ac.Dias[3]}</td>
            <td>${group_ac.Dias[4]}</td>
            <td>${group_ac.Dias[5]}</td>
            </tr>                               
            `
    });
  });

}
//Mostrar a los profesores sus grupos asignados en específico
var table_groups = document.querySelector("#show_groups_form_teacher");

function set_info_form_teachers(id_teacher_act) {
  fs.collection("groups").where("Id_profesor", "==", id_teacher_act).get().then(function (querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var info = doc.data();
      var id_bot = doc.id;
      //id_goblal = id_bot;
      var group_ac = new Group(info.Aula, info.Clave, info.Creditos, info.Cupo, info.Dias, info.Grupo, info.Id_profesor, info.Nombre, info.Profesor_nom, info.Semestre);
      table_groups.innerHTML = table_groups.innerHTML + `
            <tr>
            <td>${group_ac.Clave}</td>
            <td>${group_ac.Nombre}</td>
            <td>${group_ac.Semestre}</td>
            <td>${group_ac.Creditos}</td>
            <td>${group_ac.Grupo}</td>
            <td>${group_ac.Aula}</td>
            <td>${group_ac.Profesor_nom}</td>
            <td>${group_ac.Dias[0]}</td>
            <td>${group_ac.Dias[1]}</td>
            <td>${group_ac.Dias[2]}</td>
            <td>${group_ac.Dias[3]}</td>
            <td>${group_ac.Dias[4]}</td>
            <td>${group_ac.Dias[5]}</td>
            <td><button type="button" class="clave see_com" data-id="${id_bot}"></button></td>
            </tr>                               
            `
    });
    setActionButton();
  });
}

//Esta función aún no sirve
//Mostrar a los profesores sus grupos asignados en específico
var table_groups_2 = document.querySelector("#show_groups_form_teacher_2");
var table_one_es_clean = document.querySelector("#show_groups_form_teacher");
function set_info_form_teachers_2(id_button_form_group) {
  fs.collection("groups").get().then(function (querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var info = doc.data();
      var id_bot = doc.id;
      //id_goblal = id_bot;
      table_one_es_clean.innerHTML = ""; 
      if (doc.id == id_button_form_group) {
        var group_ac = new Group(info.Aula, info.Clave, info.Creditos, info.Cupo, info.Dias, info.Grupo, info.Id_profesor, info.Nombre, info.Profesor_nom, info.Semestre);
        table_groups_2.innerHTML = table_groups_2.innerHTML + ` 
        <tr> 
          <th>Clave</th>
          <th>Laboratorio</th>
          <th>Semestre</th>
          <th>CR</th>
          <th>Grupo</th>
          <th>Aula</th>
          <th>Profesor</th>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miercoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
          <th>Sabado</th>
        </tr>
                <tr>
                <td>${group_ac.Clave}</td>
                <td>${group_ac.Nombre}</td>
                <td>${group_ac.Semestre}</td>
                <td>${group_ac.Creditos}</td>
                <td>${group_ac.Grupo}</td>
                <td>${group_ac.Aula}</td>
                <td>${group_ac.Profesor_nom}</td>
                <td>${group_ac.Dias[0]}</td>
                <td>${group_ac.Dias[1]}</td>
                <td>${group_ac.Dias[2]}</td>
                <td>${group_ac.Dias[3]}</td>
                <td>${group_ac.Dias[4]}</td>
                <td>${group_ac.Dias[5]}</td>
                </tr>                               
                `;
      }
    });
  });
}


//Para mostrar los alumnos inscritos en cada grupo
var table_students = document.querySelector("#show_students_form_teacher");

async function show_students_form_group (id_button_form_group) {
  var group_c = await getGruop(id_button_form_group);
  const group = group_c.data();
  var array_students = group.Alumnos_Ins;
  table_students.innerHTML = `
    <tr>
      <th>Número de Cuenta</th>
      <th>Nombre</th>
      <th>Correo</th>
    </tr>  
    `;
  var new_array = [];
  var array_students_2 = [];
  var array_name = [];
  var array_email = [];
  var info = "";
  fs.collection("users").where("Tipo","==",2).get().then(function (querySnapshot){
    querySnapshot.forEach(function (doc) {
      var students_g = doc.data();
      info = doc.data();
            var id_bot = doc.id;
      array_students_2.push(students_g.NumCuenta);
      array_name.push(students_g.Nombre);
      array_email.push(students_g.Correo);
      });
    for (var i = 0; i < array_students.length; i++) {
        for (var m = 0; m < array_students_2.length; m++) {
          if(array_students[i] == array_students_2[m]){
            table_students.innerHTML = table_students.innerHTML + `      
            <tr>
              <td>${array_students_2[m]}</td>
              <td>${array_name[m]}</td>
              <td>${array_email[m]}</td>
            </tr>                               
            `
            }
          }
        }
    });
}