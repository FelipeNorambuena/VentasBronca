/**
 * VentasBronca - registro-chile.js
 * Autor: VentasBronca Team
 * Fecha: 2025
 * Descripción: Lógica para poblar regiones y comunas de Chile y validar el formulario de registro.
 * Buenas prácticas: Código comentado, validación robusta y separación de lógica.
 */

// Chile: regiones y comunas (solo las principales para ejemplo, puedes expandir)
const regionesYComunas = {
    "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte"],
    "Región de Antofagasta": ["Antofagasta", "Mejillones", "Taltal", "Calama", "Tocopilla"],
    "Región Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura"],
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "Quillota", "San Antonio", "Los Andes", "San Felipe"]
    // ...agrega el resto de regiones y comunas si lo deseas
};

// Llenar el combo de regiones al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    // Poblar el select de regiones
    Object.keys(regionesYComunas).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });

    // Al cambiar la región, poblar el select de comunas correspondiente
    regionSelect.addEventListener('change', () => {
        comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
        comunaSelect.disabled = true;
        const comunas = regionesYComunas[regionSelect.value];
        if (comunas) {
            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
            comunaSelect.disabled = false;
        }
    });
});

// Validación de formulario de registro
const form = document.getElementById('registroForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
    // Validación básica de campos requeridos (nombre, correo, contraseña, región, comuna)
        form.querySelectorAll('input, select').forEach(input => {
            if (input.required && !input.value) {
                input.classList.add('is-invalid');
                valid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
    // Validar que el correo y la confirmación coincidan
        const correo = form.correo.value.trim();
        const confirmarCorreo = form.confirmarCorreo.value.trim();
        if (correo !== confirmarCorreo) {
            form.confirmarCorreo.classList.add('is-invalid');
            valid = false;
        } else {
            form.confirmarCorreo.classList.remove('is-invalid');
        }
    // Validar que la contraseña y la confirmación coincidan y sea segura
        const pass = form.password.value;
        const pass2 = form.confirmarPassword.value;
        if (pass !== pass2 || pass.length < 8) {
            form.confirmarPassword.classList.add('is-invalid');
            valid = false;
        } else {
            form.confirmarPassword.classList.remove('is-invalid');
        }
    // Teléfono (opcional, pero si se ingresa debe ser válido para Chile)
        const tel = form.telefono.value.trim();
        if (tel && !/^((\+?56)?[2-9]\d{8})$/.test(tel)) {
            form.telefono.classList.add('is-invalid');
            valid = false;
        } else {
            form.telefono.classList.remove('is-invalid');
        }
        // Si todo es válido, mostrar mensaje y limpiar formulario
        if (valid) {
                        // Mostrar modal de éxito moderno (requiere Bootstrap 5)
                        let modal = document.getElementById('registroExitosoModal');
                        if (!modal) {
                                modal = document.createElement('div');
                                modal.className = 'modal fade';
                                modal.id = 'registroExitosoModal';
                                modal.tabIndex = -1;
                                modal.innerHTML = `
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header bg-success text-white">
                                                <h5 class="modal-title">¡Bienvenido a VentasBronca!</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                                            </div>
                                            <div class="modal-body text-center">
                                                <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                                                <p class="mb-0">Tu registro fue exitoso.<br>¡Ya eres parte de nuestra comunidad 2025!</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-success w-100" data-bs-dismiss="modal">¡Genial!</button>
                                            </div>
                                        </div>
                                    </div>`;
                                document.body.appendChild(modal);
                        }
                        // Usar Bootstrap Modal
                        const bsModal = new bootstrap.Modal(modal);
                        bsModal.show();
                        form.reset();
                        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
                        document.getElementById('comuna').disabled = true;
        }
    });
}
