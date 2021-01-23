console.log("CRUD GRUPOS");

var id_goblal = "";
//Informacion de usuario activo

const local_group = {
    classroom: "",
    key: "",
    credits: "",
    quota: "",
    reamining_quota: "",
    days: "",
    no_group: "",
    name: "",
    id_teacher: "",
    teacher_name: "",
    semester: ""
};

//recopilar informacion 
const setGroup = (group) => {
    if (group) {
        var group_active = auth.currentUser;
        //local_group.name = group_active.displayName;
        local_group.classroom = group_active.classroom;
        local_group.key = group_active.key;
        local_group.credits = group_active.credits;
        local_group.quota = group_active.quota;
        local_group.reamining_quota = group_active.reamining_quota;
        local_group.days = group_active.days;
        local_group.no_group = group_active.no_group;
        local_group.name = group_active.name;
        local_group.id_teacher = group_active.id_teacher;
        local_group.teacher_name = group_active.teacher_name;
        local_user.semester = group_active.semester;
        //showUserByEmail(local_group.email.toLowerCase());
    } else {
        local_group.name = "Unknowed";
    }
};

//Actualizacion de usuario (Alumno)
const updateGroup = (id, group_up) => fs.collection("groups").doc(id).update(group_up);

/*Alta de un grupo primero intentando el registro de 
un grupo y luego manando la informacion del formulario a la DB de firestore*/

const form_group_create = document.querySelector("#form_group_create");

form_group_create.addEventListener('submit', (e) => {
    e.preventDefault();
    const classroom = document.querySelector("#classroom_form_group").value;
    const key = document.querySelector("#key_form_group").value;
    const credits = document.querySelector("#credits_form_group").value;
    const quota = document.querySelector("#quota_form_group").value;
    const reamining_quota = document.querySelector("#reamining_quota_form_group").value;
    /*const days = document.querySelector("#monday_form_group","monday_hour_form_group","tuesday_form_group",
        "tuesday_hour_form_group","wednesday_form_group","wednesday_hour_form_group","thursday_form_group",
        "thursday_hour_form_group","friday_form_group","friday_hour_form_group","saturday_form_group",
        "saturday_hour_form_group").value;*/
    const days = [document.querySelector("#monday_hour_form_group").value, document.querySelector("#tuesday_hour_form_group").value,
        document.querySelector("#wednesday_hour_form_group").value, document.querySelector("#thursday_hour_form_group").value,
        document.querySelector("#friday_hour_form_group").value, document.querySelector("#saturday_hour_form_group").value];
    const no_group = document.querySelector("#no_group_form_group").value;
    const name = document.querySelector("#name_form_group").value;
    const id_teacher = document.querySelector("#id_teacher_form_group").value;
    const teacher_name = document.querySelector("#teacher_name_form_group").value;
    const semester = document.querySelector("#semester_form_group").value;
    fs.collection("groups").add({
                    Aula: classroom,
                    Clave: key,
                    Creditos: credits,
                    Cupo: quota,
                    Cupo_res: reamining_quota,
                    Dias: days,
                    Grupo: no_group,
                    Id_profesor: id_teacher,
                    Nombre: name,
                    Profesor_nom: teacher_name,
                    Semestre: semester
                })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        alert("Grupo: " + name + " ha sido registrado");
                        console.log("registrado");
                        form_group_create.reset();
                        window.location = "crear_grupo.html";
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
});
















