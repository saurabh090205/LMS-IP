# Start Here

## Why frontend first?

We first establish:
- information architecture
- navigation
- role-specific screens
- UI design system
- responsive behavior

Then we design the backend around the real screens and actions.

## What is real and what is not?

The current login and dashboard screens are a frontend prototype.

The demo-role buttons only navigate between pages. They do not authenticate against a database.

Real authentication comes after:
Frontend UI → backend → database → API integration.

## Initial roles

- Student
- Teacher
- Parent
- Admin

The full product specification contains many more roles; the backend role/permission model will be extensible.

## Next

1. Finish and approve frontend shell
2. Build course/LMS frontend screens
3. Design backend schema/API
4. Implement authentication/RBAC
5. Connect frontend to backend
