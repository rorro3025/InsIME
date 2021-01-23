console.log("Funciones basicas");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();


const local_user = {
    name: "",
    email: "",
    photoUrl: "",
    uid: "",
    emailVerified: "",
    career: ""
};

const setUser = (user) => {
    if (user) {
        var user_active = auth.currentUser;
        //local_user.name = user_active.displayName;
        local_user.email = user_active.email;
        local_user.uid = user_active.uid;
        local_user.photoUrl = user_active.photoURL;
        local_user.emailVerified = user_active.emailVerified;
        showUserByEmail(local_user.email.toLowerCase());
    } else {
        local_user.name = "Unknowed";
    }
};

const showUserByEmail = async (email) => {
    fs.collection("users").where("Correo", "==", email)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                var student = doc.data();
                local_user.name = student.Nombre;
                console.log("Existe usuario activo name: " + local_user.name, "Email: " + local_user.email);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents xD: ", error);
        });
}

// cerrar sesion
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
    } else {
      console.log("no hay usuario activo");
    }
  });