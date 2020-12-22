//test conexion de script 
console.log("Estas en la pantalla de usuario");

//crecion de los elementos FB
const auth = firebase.auth();
const fs = firebase.firestore();

//objeto usuario 
const local_user = {
    name: "",
    email: "",
    photoUrl: "",
    uid: "",
    emailVerified: ""
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
auth.onAuthStateChanged(user => {
    if (user) {
      setUser(user);
      console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
      const say_N = document.querySelector('#title_admin');
      const user_info = document.querySelector('#info_user');
      say_N.innerHTML = `Hola usuario`;
      let html_value = `
                        <li> id ${local_user.uid} </li>
                        <li> nombre ${local_user.name} </li>
                        <li> email ${local_user.email} </li>
                        <li> link ${local_user.photoUrl} </li>
                        <li> emal ver ${local_user.emailVerified} </li>
                        `;
      user_info.innerHTML = html_value;
    } else {
      console.log("no hay usuario activo");
    }
  });