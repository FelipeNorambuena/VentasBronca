document.addEventListener('DOMContentLoaded', function() {

// Utilidad para obtener y guardar usuarios en localStorage
function getUsuariosStorage() {
    return JSON.parse(localStorage.getItem('vb_usuarios') || '[]');
}
function setUsuariosStorage(arr) {
    localStorage.setItem('vb_usuarios', JSON.stringify(arr));
}

// Para usuario.html: mostrar usuarios desde localStorage
document.addEventListener('DOMContentLoaded', function() {
    const tabla = document.getElementById('tablaUsuarios');
    if (tabla) {
        const tbody = tabla.querySelector('tbody');
        // Limpiar y cargar usuarios guardados
        const usuarios = getUsuariosStorage();
        tbody.innerHTML = '';
        // Ejemplo fijo
        tbody.innerHTML += `<tr><td>admin01</td><td>Juan</td><td>Pérez</td><td>12.345.678-9</td><td>juan.perez@email.com</td></tr>`;
        tbody.innerHTML += `<tr><td>user02</td><td>María</td><td>González</td><td>9.876.543-2</td><td>maria.gonzalez@email.com</td></tr>`;
        // Usuarios agregados
        usuarios.forEach(u => {
            tbody.innerHTML += `<tr><td>${u.usuarioSistema}</td><td>${u.nombre}</td><td>${u.apellido}</td><td>${u.rut}</td><td>${u.correo}</td></tr>`;
        });
    }

    // Para usuario.html: agregar usuario desde el formulario
    const form = document.getElementById('addUserForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const usuarioSistema = document.getElementById('usuarioSistema').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const rut = document.getElementById('rut').value.trim();
            const correo = document.getElementById('correo').value.trim();
            if (!usuarioSistema || !nombre || !apellido || !rut || !correo) return;
            // Guardar en localStorage
            const usuarios = getUsuariosStorage();
            usuarios.push({ usuarioSistema, nombre, apellido, rut, correo });
            setUsuariosStorage(usuarios);
            // Agregar a la tabla
            const tbody = document.querySelector('#tablaUsuarios tbody');
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${usuarioSistema}</td><td>${nombre}</td><td>${apellido}</td><td>${rut}</td><td>${correo}</td>`;
            tbody.appendChild(tr);
            this.reset();
        });
    }

    // Para creacion-usuario.html: guardar usuario desde el formulario vertical
    const formCrear = document.getElementById('formCrearUsuario');
    if (formCrear) {
        formCrear.addEventListener('submit', function(e) {
            e.preventDefault();
            const usuarioSistema = document.getElementById('usuarioSistema').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const rut = document.getElementById('rut').value.trim();
            // No se guarda la contraseña por seguridad
            const correo = '';
            if (!usuarioSistema || !nombre || !apellido || !rut) return;
            const usuarios = getUsuariosStorage();
            usuarios.push({ usuarioSistema, nombre, apellido, rut, correo });
            setUsuariosStorage(usuarios);
            this.reset();
            alert('Usuario creado correctamente. Ahora aparecerá en la lista de usuarios.');
        });
    }
});
