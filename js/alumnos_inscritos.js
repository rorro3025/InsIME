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

function student(num_account, name, email) {
    this.NumCuenta = num_account;
    this.Nombre = name;
    this.Correo = email;
}

//Mostrar a los profesores sus grupos asignados en específico
var table_groups = document.querySelector("#show_groups_form_teacher");

function set_info_form_teachers(id_button_form_group) {
    fs.collection("groups").get().then(function(querySnapshot) {
    //fs.collection("groups").get().then(function(querySnapshot) {    
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            if(doc.id == id_button_form_group){
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
            }
        });
    });
}

//Para mostrar los alumnos inscritos en cada grupo
var table_students = document.querySelector("#show_students_form_teacher");

function show_students_form_group(id_button_form_group){
    
    fs.collection("inscription").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const id_grupos = [doc.IDGrupos];
            for(var i=0; i < id_grupos.length; i++) {
                if(id_grupos[i] == id_button_form_group){
                    var number_account = doc.NumCuenta;
                    fs.collection("users").where("NumCuenta","==", number_account).get().then(function(querySelector){
                        querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        var info = doc.data();
                        var id_bot = doc.id;
                        //id_goblal = id_bot;
                        var student_ac = new student(info.NumCuenta,info.Nombre,info.Correo);
                        table_students.innerHTML = table_students.innerHTML + `
                        <tr>
                        <td>${student_ac.NumCuenta}</td>
                        <td>${student_ac.Nombre}</td>
                        <td>${student_ac.Correo}</td>
                        </tr>                               
                        `
                        });
                    });
                }
            }
        });
    });

    /*
    fs.collection("groups").where("ID", "==", id_button_form_group).get().then(function(querySnapshot) {
    fs.collection("inscription").where("IDGrupos", "==", id_button_form_group).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            var number_account = doc.NumCuenta;
        fs.collection("users").where("NumCuenta","==", number_account).get().then(function(querySnapshot) {    
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var info = doc.data();
            var id_bot = doc.id;
            //id_goblal = id_bot;
            var student_ac = new student(info.NumCuenta,info.Nombre,info.Correo);
            table_students.innerHTML = table_students.innerHTML + `
            <tr>
            <td>${student_ac.NumCuenta}</td>
            <td>${student_ac.Nombre}</td>
            <td>${student_ac.Correo}</td>
            </tr>                               
            `
        });
        });
        });
    });
    });
    */
}