//test conexion de script 
console.log("Estas en el inicio de sesion");

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
      window.location = "CRUD_1.html";
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