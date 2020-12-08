console.log("Estas en el inicio del script");

//crecion de los elementos FB
const auth = firebase.auth();
const fs = firebase.firestore();

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
        $('#singin-window').modal('hide');
      } else {
        alert(errorMessage);
        $('#singin-window').modal('hide');
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
var user_active = auth.currentUser;
var name, email, photoUrl, uid, emailVerified;
if (user_active != null){
  name = user_active.displayName;
  email = user_active.email;
  photoUrl = user_active.photoURL;
  emailVerified = user_active.emailVerified;
  uid = user_active.uid;
}
//Estado de usuario
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("Existe usuario activo user: " + uid);
  } else {
    console.log("no hay usuario activo");
  }
});