// Script para agregar usuarios a la tabla de usuarios en usuario.html

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addUserForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const usuarioSistema = document.getElementById('usuarioSistema').value.trim();
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const rut = document.getElementById('rut').value.trim();
        const correo = document.getElementById('correo').value.trim();
        if (!usuarioSistema || !nombre || !apellido || !rut || !correo) return;
        const tbody = document.querySelector('#tablaUsuarios tbody');
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${usuarioSistema}</td><td>${nombre}</td><td>${apellido}</td><td>${rut}</td><td>${correo}</td>`;
        tbody.appendChild(tr);
        this.reset();
    });
});
