# VentasBronca - Tienda de Productos Tácticos

## 📋 Descripción del Proyecto

VentasBronca es una tienda en línea especializada en productos tácticos, militares, camping y accesorios relacionados. El sitio web está desarrollado con tecnologías modernas y sigue las mejores prácticas de desarrollo web.

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos personalizados con diseño responsivo
- **JavaScript ES6+**: Funcionalidades interactivas y validaciones
- **Bootstrap 5**: Framework CSS para componentes responsivos
- **Font Awesome**: Iconografía moderna
- **LocalStorage API**: Persistencia de datos del carrito

## 📁 Estructura del Proyecto

```
VentasBronca/
├── Tienda/
│   ├── index.html          # Página principal
│   ├── css/
│   │   └── estilo.css      # Hoja de estilos personalizada
│   ├── js/
│   │   └── main.js         # Script principal con funcionalidades
│   └── IMG/
│       ├── Logo tienda.jpg # Logo de la empresa
│       ├── 5803438.jpg     # Imagen del carrusel
│       ├── icons8-*.svg    # Iconos de redes sociales
│       ├── Fondo/
│       │   └── FondoTactico.svg # Imagen de fondo
│       └── Productos/      # Imágenes de productos organizadas por categoría
│           ├── Camping/
│           ├── Militar/
│           ├── Tactico/
│           └── Otros/
└── README.md               # Documentación del proyecto
```

## ✨ Características Principales

### 🏠 Página de Inicio (Home)
- **Navegación responsiva** con menú hamburguesa para móviles
- **Carrusel principal** con imágenes destacadas y call-to-actions
- **Grid de productos** adaptable a diferentes tamaños de pantalla
- **Footer informativo** con enlaces y redes sociales

### 🛒 Sistema de Carrito de Compras
- **Agregar productos** con selección de cantidad
- **Modificar cantidades** directamente en el carrito
- **Eliminar productos** con confirmación
- **Persistencia de datos** usando localStorage
- **Integración con WhatsApp** para finalizar pedidos

### 📱 Diseño Responsivo
- **Mobile-first approach**
- **Breakpoints optimizados** para diferentes dispositivos
- **Imágenes adaptativas** con lazy loading
- **Navegación táctil** optimizada para móviles

### 🔍 Funcionalidades Avanzadas
- **Búsqueda en tiempo real** de productos
- **Validación de formularios** con JavaScript
- **Scroll suave** entre secciones
- **Notificaciones** de usuario
- **Efectos visuales** y animaciones

## 🛠️ Funcionalidades Técnicas

### HTML Semántico
- Uso de etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Atributos de accesibilidad (`aria-label`, `role`, `aria-expanded`)
- Meta tags optimizados para SEO
- Estructura clara y organizada

### CSS Moderno
- Variables CSS para fácil mantenimiento
- Flexbox y CSS Grid para layouts
- Media queries para responsividad
- Animaciones y transiciones suaves
- Optimización para impresión

### JavaScript ES6+
- Clases y módulos organizados
- Async/await para operaciones asíncronas
- Event delegation para mejor rendimiento
- Validación en tiempo real
- Manejo de errores robusto

### Bootstrap 5
- Componentes responsivos
- Sistema de grid flexible
- Utilidades spacing y tipográficas
- Modales y dropdowns interactivos

## 📋 Requisitos Cumplidos

### ✅ Estructura y Etiquetado HTML
- [x] Contenido web con HTML5 actual
- [x] Estructura semántica clara
- [x] Secciones, encabezados, párrafos y listas
- [x] Comentarios explicativos en el código

### ✅ Navegación y Elementos Interactivos
- [x] Hipervínculos para navegación entre páginas
- [x] Imágenes y botones interactivos
- [x] Menús de navegación y barras laterales
- [x] Formularios para ingreso de datos
- [x] Elementos accesibles

### ✅ Diseño con CSS
- [x] Hoja de estilos CSS personalizada externa
- [x] Diseño consistente y atractivo
- [x] Diseño responsivo implementado
- [x] Selectores CSS y propiedades personalizadas
- [x] Comentarios detallados en CSS

### ✅ Validación de Formularios con JavaScript
- [x] Validaciones de formularios en tiempo real
- [x] Mensajes de error personalizados
- [x] Sugerencias dinámicas para el usuario
- [x] Funciones organizadas y comentadas

### ✅ Utilización de Bootstrap
- [x] Interfaz responsiva desarrollada
- [x] Barras funcionales para múltiples dispositivos
- [x] Componentes aptos para todo tipo de dispositivos
- [x] Experiencia de usuario optimizada

## 🚀 Instalación y Uso

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/FelipeNorambuena/VentasBronca.git
   ```

2. Navegar al directorio del proyecto:
   ```bash
   cd VentasBronca/Tienda
   ```

3. Abrir `index.html` en un navegador web o usar un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (usando live-server)
   npx live-server
   ```

### Uso
1. **Navegación**: Utiliza el menú superior para navegar entre secciones
2. **Búsqueda**: Usa la barra de búsqueda para encontrar productos específicos
3. **Carrito**: Agrega productos al carrito y gestiona tu pedido
4. **Pedido**: Finaliza tu compra enviando el pedido por WhatsApp

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1200px+)
- ✅ Laptop (992px - 1199px)
- ✅ Tablet (768px - 991px)
- ✅ Mobile (576px - 767px)
- ✅ Small Mobile (hasta 575px)

## 🔧 Configuración

### Variables de Configuración (js/main.js)
```javascript
const CONFIG = {
    WHATSAPP_NUMBER: '56961790214',    // Número de WhatsApp
    CART_STORAGE_KEY: 'ventasbronca_cart',  // Clave de localStorage
    MAX_QUANTITY: 10,                  // Cantidad máxima por producto
    MIN_QUANTITY: 1,                   // Cantidad mínima por producto
    ANIMATION_DURATION: 300,           // Duración de animaciones (ms)
    NOTIFICATION_DURATION: 3000        // Duración de notificaciones (ms)
};
```

### Personalización de Estilos
Los colores y estilos principales se pueden modificar en `css/estilo.css` usando las variables CSS:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
}
```

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Las imágenes no cargan**
   - Verificar que las rutas de las imágenes sean correctas
   - Asegurar que los archivos existan en la carpeta IMG

2. **El carrito no guarda datos**
   - Verificar que localStorage esté habilitado en el navegador
   - Comprobar que no haya errores de JavaScript en la consola

3. **Problemas de responsividad**
   - Verificar que el viewport meta tag esté presente
   - Asegurar que Bootstrap CSS esté cargando correctamente

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Gestión de inventario
- [ ] Sistema de pagos en línea
- [ ] Historial de pedidos
- [ ] Wishlist de productos
- [ ] Sistema de reviews y ratings
- [ ] Chat en vivo con soporte

### Mejoras Técnicas
- [ ] PWA (Progressive Web App)
- [ ] Optimización SEO avanzada
- [ ] Tests automatizados
- [ ] Compresión de imágenes automática
- [ ] CDN para recursos estáticos

## 👥 Equipo de Desarrollo

- **Felipe Norambuena** - Desarrollador Full Stack
- **Juan Pablo** - Colaborador

## 📞 Contacto y Soporte

### Información de Contacto
- **WhatsApp**: +56 9 6179 0214
- **Instagram**: [@ventas_bronca](https://www.instagram.com/ventas_bronca/)
- **GitHub**: [FelipeNorambuena](https://github.com/FelipeNorambuena)

### Reportar Problemas
Si encuentras algún problema o tienes sugerencias:
1. Crea un issue en GitHub
2. Contacta por WhatsApp
3. Envía un mensaje por Instagram

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Bootstrap Team** por el excelente framework CSS
- **Font Awesome** por los iconos
- **Comunidad Open Source** por las herramientas y recursos

---

**Desarrollado con ❤️ para profesionales que requieren equipamiento de calidad**

*Última actualización: Septiembre 2025*
Desarrollo de pagina web para tienda dedicada a ventas de articulos tacticos
