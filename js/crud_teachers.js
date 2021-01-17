console.log("creacion de profesor usuario de tipo 3");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();

//variable del formulario 
const f_t_create = document.querySelector("#form_teacher_create");
//agregar escuha al evento submit 

f_t_create.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.querySelector("#email_form_teacher").value;
    const name = document.querySelector("#name_form_teacher").value;
    const rfc = document.querySelector("#rfc_form_teacher").value;
    const password = document.querySelector("#password_form_teacher").value;
    const password_c = document.querySelector("#password_2_form_teacher").value;
   //const state = document.querySelector("#state_form_student").value;
    if (password == password_c) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredencial => {
                fs.collection("users").add({
                    Nombre: name,
                    Correo: email,
                    RFC: rfc,
                    //Estado: state,
                    Tipo: 3
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        alert("Usuario: " + name + " ha sido registrado");
                        console.log("registrado");
                        f_t_create.reset();
                        window.location="menu_teach.html";
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/email-already-in-use') {
                    alert('El correo ya ha sido utilizado');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    } else {
        alert("las contraseñas no coinciden");
    }
});
