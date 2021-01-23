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

var group_1 = new Group("A17", 17, 12, 20, ["-", "15:20-16:20", "-"], 1751, "asdadasd", "Laboratorio de computo", "Paola G", 6);
var group_2 = new Group("A18", 18, 13, 21, ["-", "15:20-16:20", "-"], 1752, "id_prof", "Laboratorio de antenas", "Abby", 7);
var group_3 = new Group("A19", 19, 14, 22, ["-", "15:20-16:20", "-"], 1752, "id_prof", "Laboratorio de antenas", "Abby", 7);
var array = [group_1, group_2,group_3];
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
            <td>${group_ac.Semestre}</td>
            <td>${group_ac.Nombre}</td>
            <td>${group_ac.Creditos}</td>
            <td>${group_ac.Grupo}</td>
            <td>${group_ac.Aula}</td>
            <td><a href="consultar_grupos.html"><button type="button" class="clave"></button></a></td>
            <td><a href="actualizar_grupos.html"><button type="button" class="actualizar"></button></a></td>
            <td><button type="button" class="eliminar dl-bot" data-id="${id_bot}"></button></td>
            </tr>                               
            `
        });
        setActionDelete();
    });
  
}

function setActionDelete() {
    const array_bot = document.querySelectorAll(".dl-bot");
    for (let index = 0; index < array_bot.length; index++) {
        array_bot[index].addEventListener('click', ()=>{
            var id = array_bot[index].getAttribute('data-id');
            alert ("se presiono el id: "+ id);
        });
        
    } 
}
