# Fase 2 — Verificaciones manuales en el dashboard de Supabase

Estos dos puntos **no se pueden arreglar desde el repositorio**: dependen de la
configuración del proyecto en Supabase. Sigue los pasos y confírmame el resultado.

---

## A. RLS en la tabla `certificates` (y `certificate_renewals`) — CRÍTICO

> **Actualización 2026-07-29:** ya está resuelto en el repo. Se reconstruyó el DDL +
> RLS en `database_migrations/migration_003_certificates_rls.sql` y se **verificó en
> staging** (`npm run sectest:certificates-rls` → 5/5: dueño ve solo lo suyo, anon
> nada, admin/service_role todo). Las rutas `certificate/[qrCode]` y
> `admin/certificates` GET se ajustaron para usar `service_role` server-side.
> **Lo que queda es aplicarlo en PRODUCCIÓN** (abajo), donde la tabla ya existe.

**Por qué importa:** el cliente consulta `certificates` directamente con la clave
anónima (`components/sections/ClientCertificatesSection.tsx:49`). Si RLS está
desactivada en producción, cualquier visitante anónimo puede volcar la tabla
(emails, nombres, `exam_score`).

### Aplicar en PRODUCCIÓN
1. Comprueba el estado actual (SQL Editor):
   ```sql
   SELECT relname, relrowsecurity FROM pg_class
   WHERE relname IN ('certificates','certificate_renewals');
   ```
2. Como la tabla **ya existe** en prod, NO ejecutes el `CREATE TABLE` de la
   migración. Aplica **solo la PARTE 2 (RLS)** de `migration_003_certificates_rls.sql`
   tras confirmar que las columnas (`user_id`, `issued_by_admin`, etc.) coinciden.
3. Reaplica el código de la rama (rutas ya usan `service_role`) al desplegar.

### (Legacy) Verificación manual si prefieres revisarlo a mano

### Pasos

1. Dashboard → **Table Editor** → tabla `certificates`.
2. Mira el indicador **"RLS"** en la cabecera de la tabla:
   - Si dice **"RLS disabled"** o **"Unrestricted"** → **está abierta. Actívala** (paso 3).
   - Si dice **"RLS enabled"** → comprueba que existan políticas (paso 4).
3. Para verificar por SQL (Dashboard → **SQL Editor**), ejecuta:

   ```sql
   SELECT relname AS tabla, relrowsecurity AS rls_activada
   FROM pg_class
   WHERE relname IN ('certificates', 'certificate_renewals');
   ```

   Ambas filas deben tener `rls_activada = true`.

4. Comprueba qué políticas existen:

   ```sql
   SELECT tablename, policyname, cmd, roles, qual, with_check
   FROM pg_policies
   WHERE tablename IN ('certificates', 'certificate_renewals');
   ```

### Qué debe haber (política mínima correcta)

Si falta, ejecuta esto en el SQL Editor:

```sql
ALTER TABLE public.certificates          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_renewals  ENABLE ROW LEVEL SECURITY;

-- El dueño ve sus certificados; el admin ve todos.
DROP POLICY IF EXISTS "cert: dueño ve el suyo" ON public.certificates;
CREATE POLICY "cert: dueño ve el suyo"
  ON public.certificates FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- Escritura solo admin (la creación real la hace el backend con service_role,
-- que hace bypass de RLS, así que no necesita política de INSERT permisiva).
DROP POLICY IF EXISTS "cert: admin gestiona" ON public.certificates;
CREATE POLICY "cert: admin gestiona"
  ON public.certificates FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Renovaciones: el dueño ve las suyas; admin todo.
DROP POLICY IF EXISTS "renov: dueño ve la suya" ON public.certificate_renewals;
CREATE POLICY "renov: dueño ve la suya"
  ON public.certificate_renewals FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());
```

> ⚠️ Verifica los nombres de columna reales (`user_id`, etc.) contra tu tabla antes
> de ejecutar. La verificación pública de certificados **no** usa esta tabla con
> anon: pasa por la API server-side (`/api/certificate/...`) que usa `service_role`.

### Confírmame
- [ ] `rls_activada = true` en ambas tablas.
- [ ] Existe una política de SELECT que restringe por `user_id`/admin.

---

## B. Confirmación de email obligatoria — ALTA

**Por qué importa:** el hallazgo #9 (apropiación de certificados por email en
`/api/assign-certificates`) y la vía de secuestro por email dependen de que un
atacante pueda registrarse con el email de otra persona **sin probar que es suyo**.
Si "Confirm email" está desactivado, el registro concede sesión inmediata con un
email no verificado.

### Pasos

1. Dashboard → **Authentication** → **Providers** → **Email**.
2. Comprueba **"Confirm email"**:
   - Debe estar **ACTIVADO** (ON).
3. Alternativamente, Dashboard → **Authentication** → **Sign In / Providers**,
   sección **Email**, opción *"Confirm email"* / *"Enable email confirmations"*.

### Confírmame
- [ ] "Confirm email" está **ON**.

> Nota: aun con confirmación activada, el endurecimiento del backend del hallazgo #8
> (Fase 3) añade una segunda barrera y no depende de esta opción.

---

## D. Bucket de storage `certificates` → PRIVADO

El repo ya define el bucket como privado (`database_schema.sql`) y el código genera
URLs firmadas (`uploadCertificate`). Si el bucket **ya existe** en tu proyecto como
público, cámbialo en el dashboard:

1. Dashboard → **Storage** → bucket `certificates` → **Configuration** → desmarca
   **"Public bucket"**.
2. Re-ejecuta la sección de políticas de `certificates` de `database_schema.sql`
   (elimina "Public certificates readable" y crea "Admins can read certificates").

### Confírmame
- [ ] El bucket `certificates` figura como **Private**.

---

## C. (Recomendado) Rotar el `service_role` si `.env.local` se compartió alguna vez

Si la `SUPABASE_SERVICE_ROLE_KEY` pudo quedar expuesta en algún momento, rótala en
Dashboard → **Settings** → **API** → **Reset service_role**. No hay evidencia de que
esté en git (verificado), pero es barato descartarlo.
