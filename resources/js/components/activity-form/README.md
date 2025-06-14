# Activity Form Architecture

This directory contains a reusable activity form system that eliminates code duplication between different user roles (Admin, Lembaga, Kader) while maintaining role-specific business logic.

## Architecture Overview

### 1. **Shared Components**
- `ActivityFormBase.tsx` - Main UI component containing all form fields and sections
- `types/ActivityFormTypes.ts` - Shared TypeScript types and interfaces

### 2. **Business Logic Hooks**
- `hooks/useAdminActivityForm.ts` - Admin-specific form logic (approval, invoice sending)
- `hooks/useLembagaActivityForm.ts` - Lembaga-specific form logic (creation, editing)
- `hooks/useKaderActivityForm.ts` - Future kader-specific logic

### 3. **Role Configurations**
- `config/roleConfigs.ts` - Role-based permissions and UI behavior

## How to Use

### For Admin Pages
```typescript
import { useAdminActivityForm, getAdminConfig, ActivityFormBase } from '@/components/activity-form';

const AdminActivityForm = ({ activity, breadcrumbs }) => {
    const formLogic = useAdminActivityForm(activity);
    const config = getAdminConfig(activity);
    
    return (
        <ActivityFormBase
            activity={activity}
            breadcrumbs={breadcrumbs}
            config={config}
            formLogic={formLogic}
            title="Detail Kegiatan"
            description="Verifikasi formulir pengajuan pelatihan"
        />
    );
};
```

### For Lembaga Pages
```typescript
import { useLembagaActivityForm, getLembagaConfig, ActivityFormBase } from '@/components/activity-form';

const LembagaActivityForm = ({ activity, breadcrumbs, title, description }) => {
    const formLogic = useLembagaActivityForm(activity);
    const config = getLembagaConfig(activity);
    
    return (
        <ActivityFormBase
            activity={activity}
            breadcrumbs={breadcrumbs}
            config={config}
            formLogic={formLogic}
            title={title}
            description={description}
        />
    );
};
```

## Benefits

1. **Single Source of Truth**: UI changes only need to be made in `ActivityFormBase`
2. **Maintainable**: Business logic is separated and testable in custom hooks
3. **Scalable**: Easy to add new roles without duplicating UI code
4. **Type Safe**: Shared types ensure consistency across all implementations
5. **Performance**: Only role-specific logic is loaded per component

## Adding New Roles

To add a new role (e.g., Kader):

1. Create `hooks/useKaderActivityForm.ts` with the specific business logic
2. Update `config/roleConfigs.ts` with `getKaderConfig()` function
3. Create the page component following the same pattern
4. Export the new hook and config from `index.ts`

## Current Implementation Status

- ✅ Base architecture created
- ✅ Admin and Lembaga hooks implemented
- ✅ Role configurations defined
- ⏳ ActivityFormBase UI implementation (in progress)
- 🔄 Integration with existing pages (pending)

## Migration Plan

1. Complete the ActivityFormBase UI implementation
2. Test the refactored forms
3. Replace existing form components with the new architecture
4. Remove old duplicate code 
