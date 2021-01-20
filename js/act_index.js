//test conexion de script 
console.log("Estas en el inicio de sesion");

// colecciones de datos
let collections = ["students","teachers","admins"];
var collection = "";

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
      /* comprobacion del tipo de usuario consultando las tres colecciones de datos 
            (students, teachers, admins) y asi determinar el tipo de usuario y la pagina donde sera redirigido*/
            fs.collection("users").where("Correo", "==", singin_email.toLowerCase())
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                var user = doc.data();
                if(user.Tipo == 1){
                  console.log(user.Nombre + " "+ "Administrador");
                  window.location = "menu_admin.html";
                }else{
                  if(user.Tipo == 2){
                    console.log(user.Nombre + " "+ "Estudiante");
                    window.location = "menu_student.html";
                  }else{
                    console.log(user.Nombre + " "+ "Profesor");
                    window.location = "menu_teach.html";
                  }
                }
                
              });
            })
            .catch(function (error) {
               
            });
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
      window.location = "index.html";
    });
});