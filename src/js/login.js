// src/js/login.js - Lógica de validación para inicio de sesión VentasBronca (2025)
// Buenas prácticas: validación, feedback visual, comentarios claros

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
        // Validar correo
        const email = form.email.value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            form.email.classList.add('is-invalid');
            valid = false;
        } else {
            form.email.classList.remove('is-invalid');
        }
        // Validar contraseña
        const password = form.password.value.trim();
        if (!password) {
            form.password.classList.add('is-invalid');
            valid = false;
        } else {
            form.password.classList.remove('is-invalid');
        }
        // Si es válido, mostrar modal de bienvenida (puedes conectar lógica real después)
        if (valid) {
            let modal = document.getElementById('loginExitosoModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.className = 'modal fade';
                modal.id = 'loginExitosoModal';
                modal.tabIndex = -1;
                modal.innerHTML = `
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">¡Bienvenido de vuelta!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                      </div>
                      <div class="modal-body text-center">
                        <i class="fas fa-user-check fa-3x text-success mb-3"></i>
                        <p class="mb-0">Inicio de sesión exitoso.<br>¡Disfruta tu experiencia en VentasBronca!</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-success w-100" data-bs-dismiss="modal">Continuar</button>
                      </div>
                    </div>
                  </div>`;
                document.body.appendChild(modal);
            }
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
            form.reset();
        }
    });
});
