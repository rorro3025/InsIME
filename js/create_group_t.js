console.log("CRUD GRUPOS");

//crecion de los elementos FB
const fs = firebase.firestore();
const auth = firebase.auth();
var id_goblal = "";

function Group(croom, key, credits, quota, res_quota, days, no_group, id_teacher, name, teacher_name, semester) {
    this.Aula = croom;
    this.Clave = key;
    this.Creditos = credits,
    this.Cupo = quota,
    this.Cupo_res = res_quota;
    this.Dias = days;
    this.Grupo = no_group;
    this.Id_profesor = id_teacher;
    this.Nombre = name;
    this.Profesor_nom = teacher_name;
    this.Semestre = semester;
}

var group_1 = new Group()