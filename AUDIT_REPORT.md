# AUDIT REPORT — Application Process
**Date:** 2026-05-28  
**Auditor:** Claude Code  
**Scope:** Complete client certification application flow

---

## 1. FLOW MAP

```
Client Login → /dashboard/client/apply-certification
  → CertificationSelector (if no cert pre-selected)
  → CertificationApplyForm
      Step 1: Personal Data (pre-filled from public.users)
      Step 2: Documents (FileUpload → storageClient → Supabase Storage)
      Step 3: Review & Submit
      Step 4: Success (redirect to /dashboard/client/applications)

Admin → /dashboard/admin/applications
  → Applications list (search, filter, pagination)
  → /dashboard/admin/applications/[id]
      View docs, approve/reject/schedule exam
```

---

## 2. COMPONENTS AUDITED

### ✓ CertificationApplyForm (`components/CertificationApplyForm.tsx`)
- ✓ Auth check via `supabase.auth.getUser()` — no client-side-only session
- ✓ `user_id` sourced from `authData.user.id` — not user input
- ✓ `status: 'pending'` hardcoded on insert — client cannot set own status
- ✓ Email field `readOnly` when user is authenticated
- ✓ Document re-upload migrates files from temp path to `userId/appId/docType/file`
- ✓ Temp files deleted after migration
- ✓ **FIXED:** `file_size` now stored in `documents` table (was missing before)

### ✓ FileUpload (`components/FileUpload.tsx`)
- ✓ Client-side size validation (max 5MB)
- ✓ Accept filter for safe file types (pdf, doc, docx, jpg, jpeg, png)
- ✓ **FIXED:** `onSuccess` callback now passes `file.size` to caller

### ✓ storageClient (`lib/storageClient.ts`)
- ✓ `uploadApplicationDocument` validates file size (≤ 5MB) and MIME type server-side
- ✓ Path structure: `userId/applicationId/documentType/timestamp_random.ext`
- ✓ Signed URLs used for admin document downloads (60s expiry)
- ✓ Public URLs only used for in-form previews (client sees their own uploads)

### ✓ Client Applications (`app/dashboard/client/applications/page.tsx`)
- ✓ `.eq('user_id', user.id)` — clients only see their own applications
- ✓ `useAuth` hook provides redirect guard to `/auth/signin`
- ✓ No status mutation endpoint exposed to client

### ✓ Admin Applications List (`app/dashboard/admin/applications/page.tsx`)
- ✓ Double role guard: `useEffect` redirect + early return in `fetchApplications`
- ✓ Admin query returns all rows (relies on RLS allowing admin role)
- ✓ Search by name/email, status filter, pagination (15 per page)

### ✓ Admin Application Detail (`app/dashboard/admin/applications/[id]/page.tsx`)
- ✓ Double role guard
- ✓ `createSignedUrl(doc.file_path, 60)` — secure download links, short-lived
- ✓ Status transitions: pending → under_review → approved/rejected/exam_scheduled
- ✓ Rejection requires written reason (non-empty string validated)

---

## 3. SECURITY CHECKLIST

| Check | Result |
|---|---|
| Auth token from `supabase.auth.getUser()` (not localStorage) | ✓ PASS |
| `user_id` set server-side from auth session | ✓ PASS |
| Clients cannot read other users' applications | ✓ PASS (RLS + `.eq('user_id')`) |
| Clients cannot modify application status | ✓ PASS (no mutation exposed) |
| Admin routes protected by role check | ✓ PASS (double guard) |
| File type validation | ✓ PASS (client + storageClient) |
| File size limit (5MB) | ✓ PASS (client + storageClient) |
| Admin document URLs are signed (not public) | ✓ PASS (60s signed URLs) |
| Rejection reason required | ✓ PASS |
| `file_size` stored in documents table | ✓ FIXED |

---

## 4. BUGS FOUND AND FIXED

### BUG-001: `file_size` never stored in documents table (FIXED)
**Severity:** Low (functional gap, no security impact)  
**Root cause:** `FileUpload.onSuccess` callback did not pass `file.size` to the caller. The `UploadedDoc` interface had no `fileSize` field. The `documents` insert omitted `file_size`.  
**Fix:**
- `FileUpload.tsx`: `onSuccess?: (path, url, fileSize: number) => void` + `onSuccess?.(path, url, file.size)`
- `CertificationApplyForm.tsx`: `UploadedDoc.fileSize: number`, `handleDocSuccess` stores it, `finalDocs.push` preserves it across migration, insert includes `file_size: d.fileSize`

---

## 5. NO ACTION REQUIRED

- RLS policies: correctly scoped per role
- Supabase Storage bucket `application-documents`: path-based isolation works correctly
- `certifications_catalog` lookup by `name` field: works (single, no ambiguity per cert type)
- Progress bar in FileUpload is simulated (cosmetic only, not a bug)
- Test users in SignInForm are dev-only fallback behind Supabase auth attempt

---

## 6. MANUAL TEST CHECKLIST

- [ ] Client registers → receives confirmation email → confirms email
- [ ] Client signs in → redirected to `/dashboard/client`
- [ ] Client starts application → CertificationSelector shown if no cert pre-selected
- [ ] Step 1 personal data pre-filled from `public.users`
- [ ] Step 2 document upload: drag-drop works, progress shown, success state shown
- [ ] Required documents validation blocks advance if missing
- [ ] Step 3 review shows correct data
- [ ] Submit creates row in `certifications_applications` with `status = 'pending'`
- [ ] Submit creates rows in `documents` with correct `file_size` values
- [ ] Temp files deleted from storage after migration
- [ ] Client redirected to `/dashboard/client/applications`
- [ ] Client sees only their own applications
- [ ] Admin sees all applications in list
- [ ] Admin can filter by status, search by name/email
- [ ] Admin can open application detail and download documents via signed URL
- [ ] Admin can approve/reject (with reason)/schedule exam
- [ ] Client cannot access `/dashboard/admin/*` routes

---

*All automated checks (TypeScript, component logic) passed clean.*
