# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
	extends: [
		// Remove ...tseslint.configs.recommended and replace with this
		...tseslint.configs.recommendedTypeChecked,
		// Alternatively, use this for stricter rules
		...tseslint.configs.strictTypeChecked,
		// Optionally, add this for stylistic rules
		...tseslint.configs.stylisticTypeChecked,
	],
	languageOptions: {
		// other options...
		parserOptions: {
			project: ["./tsconfig.node.json", "./tsconfig.app.json"],
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
	plugins: {
		// Add the react-x and react-dom plugins
		"react-x": reactX,
		"react-dom": reactDom,
	},
	rules: {
		// other rules...
		// Enable its recommended typescript rules
		...reactX.configs["recommended-typescript"].rules,
		...reactDom.configs.recommended.rules,
	},
});
```

---

# 📘 Part 1: Documentation for the Frontend Schemas
## 📦 Frontend Schema Documentation

> This document outlines the frontend schemas used in the ticketing system application.

### 👤 UserSchema

> Schema for the full user object.

```ts
type User = {
  id?: string;
  fname: string;
  lname: string;
  username: string;
  password: string;
  createdAt: Date;
  email: string;
  role: string;
}
```

### 🔐 LoginSchema
> Login schema is used for user login form.

```ts
type LoginUser = {
  username: string;
  password: string;
}
```

### 📝 RegisterSchema
> Register schema is used for user registration form. Includes password confirmation validation.

```ts
type RegisterUser = {
  fname: string;
  lname: string;
  username: string;
  password: string;
  rePassword: string;
  createdAt: Date;
  email: string;
  role: string;
}
```

### 👤 ProfileSchema
> Lightweight schema for profile view/edit UI.

```ts
type Profile = {
  id?: string;
  fname: string;
  lname: string;
  username: string;
}
```

### 🧑‍💼 UserHoverCardProps
> User hover card schema is used in UI components like user badges or popovers.

```ts
type UserHoverCardProps = {
  labelContent: string;
  initials: string;
  fullName: string;
  email: string;
}
```

### 🎫 TicketSchema
> Ticket schema is for ticket object used in creation and editing.

```ts
type Ticket = {
  id?: string;
  title: string;
  status: "not-started" | "in-progress" | "completed";
  priority: "Low" | "Medium" | "High";
  description: string;
  assignee: string; // User ID
  project: string; // Project ID
  author: string;  // User ID
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string; // User ID
}
```

### 📅 TicketDate
> Ticket date schema is used for displaying ticket creation or update metadata.

```ts
type TicketDate = {
  labelContent: string;
  date: Date;
}
```

---

# 📊 Part 2: Backend & Data Analyst Requirements

## 🔧 Backend Field Requirements

> Based on our Zod schemas and ERD, here's what the backend needs to expect:

### User Table (`users`)
- `id` (int, PK)
- `fname` (string)
- `lname` (string)
- `username` (varchar(50))
- `password` (hashed)
- `created_at` (timestamp)
- `email` (varchar(100))
- `role` (varchar(20))

### Ticket Table (`tickets`)
- `id` (int, PK)
- `title` (varchar(200))
- `status_id` (int, FK to `ticket_statuses.id`)
- `priority` (varchar(20))
- `description` (text)
- `assignee_id` (int, FK to `users.id`)
- `project_id` (int, FK to `projects.id`)
- `author_id` (int, FK to `users.id`)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `updated_by` (int, FK to `users.id`) ← **Missing in your ERD** but present in frontend schema

### Additional Table Notes:
- Consider adding `updated_by` in the `tickets` table to align with frontend schema.
- The `status` and `priority` fields in the `tickets` table should either be plain string values (if treated as enumerations) or foreign keys referencing `ticket_statuses` and `ticket_priorities` tables (if treated as lookup tables).

> **Note**: The types of the fields above are examples.

## 📈 Data Analyst Needs

> Here’s what analysts might want to ensure the database supports detailed insights:

### Suggestions:
1. **Audit Fields**:
   - Add `updated_by` (as above) to track change responsibility.
   - Consider `deleted_at` for soft deletes.

2. **Historical Changes**:
   - A `ticket_history` or `ticket_audit_log` table with changes over time (who changed what and when).

3. **Metrics Support**:
   - Keep timestamps accurate: `created_at`, `updated_at`
   - Track status changes through the `workflow_transitions` table — this is a good structure already present.

4. **Categorical Mapping**:
   - Map frontend enums (`"not-started"`, `"in-progress"`, `"completed"` for `statuses` and `"Low"`, `"Medium"`, `"High"` for `priorities` fields) to fixed values or foreign keys for normalization.