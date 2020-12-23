//test conexion de script 
console.log("Estas en la pantalla de usuario");

//crecion de los elementos FB
const auth = firebase.auth();
const fs = firebase.firestore();
const getStudent = (email) => fs.collection("students").doc(email).get();

//objeto usuario 
const local_user = {
  name: "",
  email: "",
  photoUrl: "",
  uid: "",
  emailVerified: "",
  career: "",
  account_numer: ""
};

//recopilar informacion 
const setUser = (user) => {
  if (user) {
    var user_active = auth.currentUser;
    local_user.name = user_active.displayName;
    local_user.email = user_active.email;
    local_user.uid = user_active.uid;
    local_user.photoUrl = user_active.photoURL;
    local_user.emailVerified = user_active.emailVerified;
  } else {
    local_user.name = "Unknowed";
  }
};
// recopilar informacion 2 tomamos correo como conexion entre BD_firestrore y BD_ususarios 
const setUserFromFiresore = async (email) => {
  var doc = await getStudent(email);
  var student = doc.data();
  local_user.name = student.Nombre;
  local_user.career = student.Carrera;
  local_user.account_numer = student.No_cuenta;
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
auth.onAuthStateChanged (async (user) => {
  if (user) {
    setUser(user);
    await setUserFromFiresore("hL4UJEsIITomzuuykJva");
    console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
    //ID Sandra("BFhfhzXQvsHLQj6t1OQO") ID Rodrigo("hL4UJEsIITomzuuykJva");
    const say_N = document.querySelector('#title_admin');
    const user_info = document.querySelector('#info_user');
    say_N.innerHTML = `Hola usuario`;
    let html_value = `
                        <li> Numero de cuenta ${local_user.account_numer} </li>
                        <li> Nombre completo ${local_user.name} </li>
                        <li> Correo electronico ${local_user.email} </li> 
                        <li> Carrera: ${local_user.career} </li>
                        <li> Verifico email: ${local_user.emailVerified} </li>
                        `;
    user_info.innerHTML = html_value;
  } else {
    console.log("no hay usuario activo");
  }
});