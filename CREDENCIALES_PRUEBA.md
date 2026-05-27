# 🔐 Credenciales de Prueba - AECMI

## Acceder a los Dashboards

### Panel de ADMINISTRACIÓN

**Email:** admin@aecmi.com  
**Contraseña:** Admin@123456

**Acceso:** [https://tu-dominio.com/auth/signin](https://tu-dominio.com/auth/signin)

**Funcionalidades:**
- ✅ Gestión completa de solicitudes
- ✅ Gestión de usuarios
- ✅ Control de pagos
- ✅ Responder contactos
- ✅ Gestión de exámenes
- ✅ Reportes y estadísticas
- ✅ Configuración del sistema

---

### Panel de CLIENTE

**Email:** usuario@aecmi.com  
**Contraseña:** Cliente@123456

**Acceso:** [https://tu-dominio.com/auth/signin](https://tu-dominio.com/auth/signin)

**Funcionalidades:**
- ✅ Ver mis solicitudes de certificación
- ✅ Ver mis certificaciones obtenidas
- ✅ Gestionar documentos
- ✅ Historial de pagos
- ✅ Configuración de perfil

---

## 🧪 Flujo de Prueba Recomendado

### 1. Prueba como CLIENTE
1. Abre [https://tu-dominio.com/auth/signin](https://tu-dominio.com/auth/signin)
2. Email: `usuario@aecmi.com`
3. Contraseña: `Cliente@123456`
4. Accederás a `/dashboard/client`

### 2. Prueba como ADMIN
1. Logout (botón en dashboard)
2. Ve a [https://tu-dominio.com/auth/signin](https://tu-dominio.com/auth/signin)
3. Email: `admin@aecmi.com`
4. Contraseña: `Admin@123456`
5. Accederás a `/dashboard/admin`

### 3. Flujo de Solicitud de Certificación
1. Inicia como CLIENTE
2. Ve a cualquier página de certificación (IDM, BDM, BCM)
3. Haz click en "Solicitar Certificación"
4. Te redirigirá a `/auth/signin`
5. Si ya estás logueado, podrás acceder al dashboard
6. Desde el dashboard > "Mis Solicitudes" > "Nueva Solicitud"

---

## ⚠️ Notas

- ⚠️ Estas son credenciales **SOLO PARA PRUEBAS**
- 🔒 Cambiar antes de producción
- 🗑️ Eliminar el script `scripts/seed-users.js` antes de desplegar
- 📋 Guardar esta información en un lugar seguro (no en GitHub)

---

## 🌐 URLs Útiles

| Página | URL |
|--------|-----|
| Inicio | `/` |
| Certificaciones | `/certifications` |
| IDM | `/certifications/information-delivery-manager` |
| BDM | `/certifications/bim-design-manager` |
| BCM | `/certifications/bim-construction-manager` |
| Sign In | `/auth/signin` |
| Sign Up | `/auth/signup` |
| Dashboard Client | `/dashboard/client` |
| Dashboard Admin | `/dashboard/admin` |

---

## 📞 Contacto

Para más información sobre las certificaciones, visita:
- [Página de Certificaciones](/certifications)
- [Página de Contacto](/contact)
