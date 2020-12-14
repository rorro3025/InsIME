//test conexion de script 
console.log("Estas en el inicio del script");

//crecion de los elementos FB
const auth = firebase.auth();
const fs = firebase.firestore();

//objeto usuario 
var local_user = {
  name: "",
  email: "",
  photoUrl: "",
  uid: "",
  emailVerified: ""
};
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
const sing_in = document.querySelector("#login-form");

sing_in.addEventListener('submit', (e) => {
  e.preventDefault();
  const singin_email = document.querySelector('#InputEmail1').value;
  const singin_pass = document.querySelector('#InputPassword1').value;
  console.log("usuario " + singin_email + " pass " + singin_pass);
  // uso de los elementos de firebase
  auth
    .signInWithEmailAndPassword(singin_email, singin_pass)
    .then(function () {
      alert("Haz iniciado sesion");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/user-not-found') {
        alert('Usuario no registrado');
      } else if (errorCode == 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      } else {
        alert(errorMessage);
      }
      console.log(error);
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
    });
});
// informacion del usuario
//Estado de usuario
auth.onAuthStateChanged(user => {
  if (user) {
    setUser(user);
    console.log("Existe usuario activo user: " + local_user.name, "URL: " + local_user.photoUrl+ "otro: "+ local_user.uid);
  } else {
    console.log("no hay usuario activo");
  }
});