console.log("Visualizacion de grupos");

//crecion de los elementos FB
//crecion de los elementos FB
const auth = firebase.auth();
const fs = firebase.firestore();

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
          set_info_form_teachers_2(local_user.RFC);
          console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email, "RFC; " + local_user.RFC);
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

//Mostrar los horarios a los alumnos en orden ascendente por el semestre
var table_groups_horarios = document.querySelector("#group_research_table");
function set_info() {
    fs.collection("groups").orderBy("Semestre","asc").get().then(function(querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            var group_ac = new Group(info.Aula,info.Clave,info.Creditos,info.Cupo,info.Dias,info.Grupo,info.Id_profesor,info.Nombre,info.Profesor_nom,info.Semestre);
            table_groups_horarios.innerHTML = table_groups_horarios.innerHTML + `
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
            `
        });
    });
  
}
//Mostrar a los profesores sus grupos asignados en específico
var table_groups = document.querySelector("#show_groups_form_teacher");

function set_info_form_teachers(id_teacher_act) {
    fs.collection("groups").where("Id_profesor", "==", id_teacher_act).get().then(function(querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            var group_ac = new Group(info.Aula,info.Clave,info.Creditos,info.Cupo,info.Dias,info.Grupo,info.Id_profesor,info.Nombre,info.Profesor_nom,info.Semestre);
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
            <td><a href="alumnos_inscritos.html"><button type="button" class="clave" id="${id_bot}"></button></a></td>
            </tr>                               
            `
        });
    });
  
}
//Para mostrar los alumnos inscritos en cada grupo
var table_students = document.querySelector("#show_students_form_teacher");

function show_students_form_group(id_button_form_group){
    
    fs.collection("inscription").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const id_grupos = [doc.IDGrupos];
            for(var i=0; i < id_grupos.length; i++) {
                if(id_grupos[i] == id_button_form_group){
                    var number_account = doc.NumCuenta;
                    fs.collection("users").where("NumCuenta","==", number_account).get().then(function(querySelector){
                        querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        var info = doc.data();
                        var id_bot = doc.id;
                        //id_goblal = id_bot;
                        var student_ac = new student(info.NumCuenta,info.Nombre,info.Correo);
                        table_students.innerHTML = table_students.innerHTML + `
                        <tr>
                        <td>${student_ac.NumCuenta}</td>
                        <td>${student_ac.Nombre}</td>
                        <td>${student_ac.Correo}</td>
                        </tr>                               
                        `
                        });
                    });
                }
            }
        });
    });

}

//Mostrar a los profesores sus grupos asignados en específico
var table_groups_2 = document.querySelector("#show_groups_form_teacher_2");

function set_info_form_teachers_2(id_button_form_group) {
    fs.collection("groups").get().then(function(querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            if(doc.id == id_button_form_group){
                var group_ac = new Group(info.Aula,info.Clave,info.Creditos,info.Cupo,info.Dias,info.Grupo,info.Id_profesor,info.Nombre,info.Profesor_nom,info.Semestre);
                table_groups_2.innerHTML = table_groups_2.innerHTML + `
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
                `
            }
        });
    });
}