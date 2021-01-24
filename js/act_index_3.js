//test conexion de script 
console.log("Estas en la pantalla principal de profesor");

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
        const say_N = document.querySelector('#title_admin');
        const user_info = document.querySelector('#info_user');
        say_N.innerHTML = `Hola ${local_user.name}`;
        let html_value = `
                        <li class="list-group-item list-group-item-action">
                        <h5>Correo electronico: ${local_user.email}</h5>
                        <p>RFC: ${local_user.RFC}</p>
                        <p>Verifico email: ${local_user.emailVerified} </p>
                        </li>
                        `;
        user_info.innerHTML = html_value;
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