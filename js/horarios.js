console.log("Visualizacion de grupos");

//crecion de los elementos FB

function Group(croom, key, credits, quota, days, no_group, id_teacher, name, teacher_name, semester) {
    this.Aula = croom;
    this.Clave = key;
    this.Creditos = credits,
    this.Cupo = quota,
    this.Cupo_res = quota;
    this.Dias = days;
    this.Grupo = no_group;
    this.Id_profesor = id_teacher;
    this.Nombre = name;
    this.Profesor_nom = teacher_name;
    this.Semestre = semester;
}

var table_groups = document.querySelector("#group_research_table");

function set_info() {
    fs.collection("groups").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            var group_ac = new Group(info.Aula,info.Clave,info.Creditos,info.Cupo,info.Dias,info.Grupo,info.Id_profesor,info.Nombre,info.Profesor_nom,info.Semestre);
            table_groups.innerHTML = table_groups.innerHTML + `
            <tr>
            <td>${group_ac.Clave}</td>
            <td>${group_ac.Nombre}</td>
            <td>${group_ac.Semestre}</td>
            <td>${group_ac.Creditos}</td>
            <td>${group_ac.Grupo}</td>
            <td>${group_ac.Aula}</td>
            <td>${group_ac.Profesor_nom}</td>
            <td>${group_ac.Dias[0]}</td>
            <td>${group_ac.Dias[1]}</td>
            <td>${group_ac.Dias[2]}</td>
            <td>${group_ac.Dias[3]}</td>
            <td>${group_ac.Dias[4]}</td>
            <td>${group_ac.Dias[5]}</td>
            </tr>                               
            `
        });
    });
  
}
