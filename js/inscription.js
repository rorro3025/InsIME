

var semester = "", nombre="";
//Para el diseño de inscripción
//const inicio_diseño_inscripcion = document.querySelector("#inicio_inscripcion_diseño");
function inicio_inscripcion(num_account){
	var container = document.querySelector("#inicio_inscripcion_diseño");
	fs.collection("users").where("NumCuenta", "==", num_account)
        .get()
        .then(function (querySnapshot) {
            var val1, val2, val3, val4, val5, val6;
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());

                var student = doc.data();
                var id_bot = doc.id;
                id_goblal = id_bot;
                semester = student.Semestre;
                val1 = student.Nombre;
                val2 = student.NumCuenta;
                val3 = student.Carrera;
                val4 = student.Correo;
                val5 = student.Semestre;
                html_value = `
                    <form class="row g-3" id="inicio_inscripcion_diseño">
                      	<br>
                <div class="row">
                   <div class="col-md-6">
                        <label for="name_form_student" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="name_form_student" disabled>
                        <label for="no_cuenta_form_student" class="form-label">Numero de cuenta</label>
                        <input type="number" class="form-control" id="no_cuenta_form_student" disabled>
                        <label for="carrer_form_student" class="form-label">Carrera</label>
                        <input type="text" class="form-control" id="carrer_form_student" disabled>
                    </div>
                    <div class="col-md-6"> 
                        <label for="email_form_student" class="form-label">Correo electronico</label>
                        <input type="email" class="form-control" id="email_form_student" disabled>
                        <label for="semester_form_student" class="form-label">Semestre</label>
                        <input type="number" class="form-control" id="semester_form_student" disabled>
                    </div>
                </div>
                <br>
                <table style="width: 100%" id="table_inscription">
                    <tr>
                        <th>Clave</th>
                        <th>Nombre del laboratorio</th>
                        <th>Creditos</th>
                        <th>Semestre</th>
                        <th>Grupo</th>
                        <th>Movimiento</th>
                    </tr>
                </table>
                <br>
                <div>
                    <div class="row" id="combo">
                        <div class="col-sm-8">
                            <select id="name_form_groups">
                                <option>Laboratorio de Sistemas</option>
                                <option>Laboratorio de Mecánica</option>
                                <option>Laboratorio de Eléctricidad</option>
                            </select>
                        </div>
                        <div class="col-sm-4" id="alta_baja_fin">
                            <button type="button" class="Alta">Alta</button>
                            <button type="button" class="Baja">Baja</button>
                            <a href="#"></a><button type="button" class="Terminar">Terminar</button>
                        </div>
                    </div>
                </div>
                <br>
                    </form>
                `;
            });
            container.innerHTML = html_value;
            /*const new_form = document.querySelector("#form_student_update");
            new_form['name_form_student_update'].value = val1;*/
            var name = document.querySelector("#name_form_student");
            name.value = val1;
            var account_number = document.querySelector("#no_cuenta_form_student");
            account_number.value = val2;
            var career = document.querySelector("#carrer_form_student");
            career.value = val3;
            var email = document.querySelector("#email_form_student");
            email.value = val4;
            var semester = document.querySelector("#semester_form_student");
            semester.value = val5;
/*
            // actualizar estudiante
            var form_update = document.querySelector("#form_student_update");
            form_update.addEventListener('submit', async e => {
                e.preventDefault();
                var name = document.querySelector("#name_form_student_update");
                var account_number = document.querySelector("#no_cuenta_form_student_update");
                var career = document.querySelector("#career_form_student_update");
                var semester = document.querySelector("#semester_form_student_update");
                var email = document.querySelector("#email_form_student_update");
                var state = document.querySelector("#state_form_student_update");//tomando el dato del input
                //Tomando el dato del combo:
                var combo_state = document.querySelector("#state_form_student_update_combo").value;
                var selected_state = state;//por si no mueve el combo rescatamos el valor del input (el que ya se tenia)
                //Se agrego en cada uno ya que no obedecia a una función aunque esta se declarará desde antes
                
                if (combo_state=="Aceptado") {
                    selected_state = combo_state;
                    await updateStudent(id_goblal, {
                        Nombre: name.value,
                        NumCuenta: account_number.value,
                        Carrera: career.value,
                        Semestre: semester.value,
                        Correo: email.value,
                        Estado: selected_state//va sin value si SI se selecciona algo del combo
                    });
                } else {
                    if (combo_state=="Rechazado") {
                        selected_state = combo_state;
                        await updateStudent(id_goblal, {
                            Nombre: name.value,
                            NumCuenta: account_number.value,
                            Carrera: career.value,
                            Semestre: semester.value,
                            Correo: email.value,
                            Estado: selected_state//va sin value si SI se selecciona algo del combo
                        });
                    }else{
                        await updateStudent(id_goblal, {
                            Nombre: name.value,
                            NumCuenta: account_number.value,
                            Carrera: career.value,
                            Semestre: semester.value,
                            Correo: email.value,
                            Estado: selected_state.value//va con value si NO se selecciona algo del combo
                        });
                    }
                }
                
                alert(name.value +" ha sido actualizado ");
                form_update.reset();
                id_goblal=null;
            });*/
        })
        /*
        .catch(function (error) {
            container.innerHTML = "NO se encontraron conincidencias";
            console.log("Error getting documents xD: ", error);
        });
        */
}

function form_combo_groups(semester){
    fs.collection("groups").where("Semestre","==",semester).get().then(function(querySnapshot){
        querySnapshot.forEach(function (doc) {
            var semester_g = [doc.Nombre];
            
            semester_g.short();

            addOptions("Laboratorios", semester_g);
        });
    });
}

function addOptions(domElement, array){
    var select = document.getElementById(domElement)[0];

    for(value in array){
        var option = document.createElement("option");
        option.text = array[value];
        select.add(option);
    }
}