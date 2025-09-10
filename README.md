# VentasBronca

Tienda web enfocada en la venta de productos tácticos, militares, camping y accesorios. Este documento funciona como:
1. Manual de usuario funcional (cómo navegar y usar el sitio).
2. Manual técnico para nuevos integrantes del equipo (arquitectura, estructura de carpetas, scripts, buenas prácticas y futuros pasos).

---

## 1. Objetivos del Proyecto
- Proveer un catálogo navegable y escalable de productos tácticos.
- Permitir a los usuarios agregar productos a un carrito persistente (localStorage) y generar un pedido vía WhatsApp.
- Ofrecer formularios accesibles y validados (registro, login, contacto – pendiente de lógica backend).
- Base extensible para incorporar posteriormente: autenticación real, panel administrador dinámico, pasarela de pago e inventario.

---

## 2. Stack y Herramientas
- HTML5 semántico
- CSS3 + Bootstrap 5.3 (CDN)
- JavaScript ES6+ (sin frameworks por ahora)
- Iconografía: Font Awesome 6 (CDN)
- Almacenamiento: `localStorage` (carrito)
- Comunicación inicial de pedidos: Enlace a API pública de WhatsApp
- Control de versiones: Git / GitHub

Recomendado (no incluido todavía):
- Preprocesador SASS (futuro)
- Bundler (Vite / Webpack) si el proyecto escala
- ESLint + Prettier para consistencia

---

## 3. Estructura de Carpetas
```
Proyecto Fullstack /
	public/               -> Páginas visibles al usuario final (catálogo, index, login, etc.)
	Administrador/         -> Prototipo de vistas internas (HTML estático) para gestión
	src/
		css/                -> Estilos principales (`main.css`, `admin.css`)
		js/                 -> Lógica modular del sitio
			main.js           -> Núcleo: búsqueda, lazy load, smooth scroll, catálogo dinámico, validaciones base
			carrito.js        -> Sistema de carrito y checkout vía WhatsApp
			login.js          -> Validación de formulario de inicio de sesión (simulada)
			registro-chile.js -> Pobla regiones/comunas y valida registro
			admin.js          -> Inserción dinámica de usuarios en tabla admin
		assets/
			images/           -> Imágenes generales y productos
			icons/            -> Iconos SVG / PNG
README.md               -> Este manual
```

---

## 4. Flujo del Usuario (Frontend Actual)
1. Explora productos (index.html o producto.html).
2. Ajusta cantidades y pulsa “Agregar al carrito”.
3. Abre el modal del carrito (botón flotante o navbar).
4. Modifica cantidades | elimina items.
5. Pulsa “Finalizar pedido por WhatsApp” → Se abre un mensaje preformateado con el detalle.
6. (Opcional) Se registra (registro.html) o inicia sesión (login.html). Actualmente el login sólo redirige a vistas de administrador si el correo empieza con `admin@` y la contraseña tiene >= 4 caracteres.

---

## 5. Descripción de Scripts Clave

### 5.1 `main.js`
Componentes principales:
- `CONFIG`: Constantes globales (límite cantidades, claves, etc.).
- `Utils`: Utilidades (validación email, teléfono chileno, sanitización, formato CLP, debounce, IDs únicos).
- `FormValidator`: Clase reutilizable para validar formularios en tiempo real (agrega mensajes, estilos Bootstrap).
- `SearchSystem`: Indexa productos (clase CSS `.product-card`), busca por texto y resalta resultados con `<mark>`.
- `SmoothScroll`: Scroll suave para anchors internos.
- `LazyImageLoader`: Uso de `IntersectionObserver` para carga diferida de imágenes.
- `ProductCatalog`: Render dinámico de una grilla (`#catalog-grid`) basada en un array local (mock). Incluye lightbox personalizado.
- `App`: Orquestador; inicializa todos los subsistemas cuando el DOM está listo.

### 5.2 `carrito.js`
Responsable del flujo de carrito:
- Persiste en `localStorage` bajo la clave `ventasbronca_cart`.
- Operaciones: agregar, modificar cantidades, eliminar, sumar totales.
- Genera mensaje encodeado para WhatsApp con desglose de productos.
- Notificaciones con alertas Bootstrap dinámicas.

### 5.3 `login.js`
- Valida email y contraseña.
- Si el correo comienza con `admin@` y contraseña >= 4 → redirige a `Administrador/inicio.html`.
- Caso estándar: muestra modal de “login exitoso”.

### 5.4 `registro-chile.js`
- Pobla select de regiones y comunas (subset inicial) y valida coincidencia de correo, contraseñas y teléfono chileno.
- Muestra modal de confirmación.

### 5.5 `admin.js`
- Inserta filas de usuario en la tabla de `usuario.html` (prototipo sin backend).

---

## 6. Catálogo de Productos (Mock)
Definido dentro de `ProductCatalog.loadAdminProducts()` como un array estático. Cada objeto:
```js
{ sku, name, price, images: ["ruta1.jpg", "ruta2.jpg", ...] }
```
Para integrar backend futuro:
1. Sustituir por fetch a API (ej: `/api/products`).
2. Normalizar estructura de respuesta.
3. Agregar control de errores + loading states.

---

## 7. Accesibilidad y Usabilidad
- Uso de `aria-label`, `role` y `alt` en navegación y carruseles.
- Inputs numéricos limitados (min/max) para prevenir errores de cantidad.
- Scroll suave mejora orientación.
- Recomendado a futuro: Foco manejado tras apertura de modales + soporte teclado completo en carruseles.

---

## 8. Buenas Prácticas Adoptadas
- Separación por responsabilidad en clases JS.
- Comentarios explicativos al inicio de cada archivo y en métodos clave.
- Reutilización de utilidades (email, teléfono, formato CLP).
- Debounce en búsqueda para performance.
- Lazy loading de imágenes.

Pendiente / sugerido:
- Modularizar en ES Modules cuando se use bundler.
- Pruebas unitarias (Jest) para `Utils` y `FormValidator`.
- Linter / formateador consistente.

---

## 9. Cómo Ejecutar Localmente
No requiere build: sólo abrir `public/index.html` en un navegador moderno.

Opcional (servidor estático recomendado para rutas relativas más robustas):
1. Instalar Node.js.
2. Crear un servidor rápido (ej.: `npx serve public` o usar extensiones VS Code como Live Server).

---

## 10. Flujo de Desarrollo Recomendado
Ramas sugeridas:
- `main`: estable.
- `dev`: integración continua.
- `feature/<nombre>`: nuevas funcionalidades.

Pasos para contribución:
1. Crear rama feature.
2. Implementar cambios (respetar estilos existentes).
3. Probar manualmente carrito, búsqueda y formularios.
4. Crear PR → revisión por un compañero.
5. Merge squash si procede.

Convenciones básicas:
- Archivos JS en camelCase.
- Clases en PascalCase.
- Constantes globales en MAYÚSCULAS.
- Comentarios JSDoc en métodos públicos.

---

## 11. Plan de Evolución (Roadmap)
Prioridad Alta:
- API REST (productos, usuarios, pedidos).
- Autenticación (JWT / OAuth2).
- Panel administrador real (CRUD productos, usuarios, stock).

Prioridad Media:
- Pasarela de pagos (Webpay / MercadoPago / PayPal).
- Filtros avanzados (categorías, rango de precio, disponibilidad).
- Paginación virtual o lazy loading progresivo para catálogos grandes.

Prioridad Baja:
- Internacionalización (i18n).
- Tema oscuro (dark mode toggle).
- Indexación SEO avanzada (microdatos / structured data).

---

## 12. Seguridad (Estado Actual y Futuro)
Actual:
- Sin backend → no hay almacenamiento de credenciales reales.
- Validación del lado cliente (no suficiente para producción).

Futuro:
- Sanitización y validación server-side.
- Rate limiting / protección CSRF.
- Hash de contraseñas (bcrypt / argon2).

---

## 13. Errores / Edge Cases Considerados
- Imágenes que fallan → imagen inline base64 fallback.
- Búsqueda con término < 2 caracteres → limpia resultados.
- Cantidad fuera de rango → reajuste a 1–10.
- Carrito vacío → botón de checkout desactivado.

Sugerido mejorar:
- Prevención de duplicados por SKU (unificación de lógica en un solo archivo fuente).
- Sincronizar catálogo estático y productos mostrados en index.

---

## 14. Cómo Agregar un Nuevo Producto (Manual Rápido)
1. Añadir imagen en `src/assets/images/productos/<categoria>/`.
2. Editar array en `ProductCatalog.loadAdminProducts()` (archivo `main.js`).
3. (Opcional) Agregar tarjeta manual en `public/index.html` si se mantiene estático.
4. Verificar búsqueda y carrito.

---

## 15. Cómo Extender el Sistema de Carrito a Backend
1. Reemplazar `localStorage` por endpoints `/api/cart`.
2. Mantener estado local para UX optimista.
3. Sincronizar en segundo plano (retry en fallos de red).
4. Añadir identificador de usuario autenticado.

---

## 16. Checklist de Calidad Antes de Merge
- [ ] Navegación funciona (sin enlaces rotos).
- [ ] Carrito: agregar / modificar / eliminar / checkout.
- [ ] Búsqueda resalta y filtra correctamente.
- [ ] Formularios: validaciones visuales sin errores en consola.
- [ ] Imágenes principales cargan y lazy load se activa.
- [ ] No hay errores JS en consola.

---

## 17. Preguntas Frecuentes (FAQ)
P: ¿Por qué no se ven nuevos productos en la búsqueda?
R: Asegúrate de que tengan clase `.product-card` y que el script `main.js` se ejecute después de renderizar.

P: ¿El login guarda sesión?
R: No todavía. Es sólo demostrativo.

P: ¿Se puede cambiar el número de WhatsApp del checkout?
R: Sí, editar la constante `phoneNumber` en `carrito.js`.

---

## 18. Créditos
Equipo VentasBronca (2025). Inspirado en mejores prácticas de UX para e-commerce básico.

---

## 19. Licencia
Proyecto educativo / interno. Definir una licencia (ej: MIT) si se hará público.

---

## 20. Próximo Paso Inmediato Recomendado
Unificar origen de productos (evitar duplicar definiciones en HTML y JS) -> migrar a JSON o endpoint.

---

Si eres nuevo en el equipo: lee secciones 3, 5, 6 y 14 primero; luego revisa el roadmap y crea tu primera rama feature. ¡Bienvenido!

