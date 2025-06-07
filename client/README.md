# Документация на Front-end

## Архитектура на проекта

### Структура на папките: Feature-Based Architecture

Проектът е организиран по модела **Feature-Based Folder Architecture**. Това означава, че функционалностите са разделени в отделни директории (feature модули), като всяка папка съдържа собствените си компоненти, hook-ове, стилове, тестове и логика. Това спомага за по-добра модулност, мащабируемост и поддръжка на кода.

### Основни цели на подхода:

- Разделяне на отговорностите по функционалности, а не по типове файлове
- По-лесна навигация в проекта
- Подобрена възможност за рефакторинe и мащабиране

### Примерна структура:

```
src/
│
├── features/
│ ├── Feature/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── service/
│ │ ├── types/
│ │ └── utils/
│
├── components/
│
├── config/
│
├── hooks/
│
├── lib/
│
├── routes/
│
```

## 📦 Технологии и инструменти

Проектът е изграден с помощта на съвременен frontend стек с акцент върху модулност, бързина на разработка и добър DX (developer experience).

---

### ⚛️ React

Използваме **React** като основна библиотека за изграждане на потребителския интерфейс. Компонентите са организирани по feature-based структура с цел по-добра мащабируемост и повторна използваемост.

---

### ⚡ Vite

Проектът е създаден с **Vite**, модерен и бърз build tool, който предлага:

- Мигновен стартиране на dev сървър
- Поддръжка на ES модули
- По-бързо hot module replacement (HMR)

---

### 🔄 TanStack Query

Използваме **TanStack Query (react-query)** за управление на асинхронни заявки и кеширане на данни. Предимства:

- Управление на състояние на заявки (loading, error, success)
- Автоматично кеширане и повторно извличане на данни
- Background refetching

---

### 🧭 TanStack Router

Проектът използва **TanStack Router**, модерен и typesafe router за React. Предимства:

- Type-safe маршрутизация
- File-based или програмно дефиниране на маршрути
- Интеграция с TanStack Query за data loading

---

### 🎨 ShadCN UI

Използваме **shadcn/ui**, който предоставя:

- Красиви и достъпни компоненти, базирани на Radix UI и TailwindCSS
- Пълна персонализация чрез Tailwind теми
- Консистентен UI/UX

---

### 💨 Tailwind CSS

**Tailwind CSS** се използва за стилизиране:

- Utility-first подход
- Поддръжка на dark mode, responsive и hover състояния
- Пълна интеграция със ShadCN UI

---

### 🧾 React Hook Form

Използваме **React Hook Form** за валидиране и управление на формови състояния:

- По-малко ререндери
- Интеграция с Zod (ако се използва)
- Подобрена производителност при големи форми

---

### 🧪 Zod

В проекта използваме **Zod** като schema validation библиотека за типизация и валидация на входни данни. Zod предоставя декларативен начин за дефиниране на типове, които са едновременно runtime-валидатори и TypeScript типове:

- **Type inference** – автоматично извеждане на TypeScript типове от схемите
- **Runtime validation** – валидиране на външни данни (форми, API отговори и др.)
- **Интеграция с React Hook Form** – чрез адаптери като `@hookform/resolvers/zod`

---

### 🧼 Prettier

**Prettier** се използва за автоматично форматиране на кода:

- Единен стил в целия кодовbase
- Автоматично форматиране при запис чрез editor integration

---

### 🧹 ESLint

**ESLint** се използва за анализ и поддържане на качеството на JavaScript/TypeScript кода:

- Предотвратяване на често срещани грешки
- Поддръжка на TypeScript и React плъгини
- Съвместимост с Prettier чрез `eslint-config-prettier

## 📦 Документация на типовете във фронтенда

### 👤 UserSchema

> Тип на пълния потребителски обект.

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
};
```

### 🔐 LoginSchema

> Тип за вход, използвана във формата за логване.

```ts
type LoginUser = {
	username: string;
	password: string;
};
```

### 📝 RegisterSchema

> Тип за регистрация, използвана във формата за регистрация на потребители. Включва валидация за потвърждение на парола.

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
};
```

### 👤 ProfileSchema

> Олекотена схема за визуализация/редакция на профил в интерфейса.

```ts
type Profile = {
	id?: string;
	fname: string;
	lname: string;
	username: string;
};
```

### 🧑‍💼 UserHoverCardProps

> Тип за hover карта на потребител, използвана в UI компоненти като значки или popover-и.

```ts
type UserHoverCardProps = {
	labelContent: string;
	initials: string;
	fullName: string;
	email: string;
};
```

### 🎫 TicketSchema

> Тип за тикет обекти, използвана при създаване и редактиране на тикети.

```ts
type Ticket = {
	id?: string;
	title: string;
	status: "not-started" | "in-progress" | "completed";
	priority: "Low" | "Medium" | "High";
	description: string;
	assignee: string; // User ID
	project: string; // Project ID
	author: string; // User ID
	createdAt: Date;
	updatedAt: Date;
	updatedBy: string; // User ID
};
```

### 📅 TicketDate

> ТИп за дата на билета, използвана за показване на информация за създаване или актуализация.

```ts
type TicketDate = {
	labelContent: string;
	date: Date;
};
```

---

### Project

```ts
type Project = {
	id?: string;
	name: string;
	description: string;
	createdAt: Date;
	workflowId: string;
	ownerId: string;
};
```

### ReactFlow

> Схеми на типовете за възли и връзки в workflow

```ts
type ZodNode = {
	id: string;
	type: string;
	position: {
		x: number;
		y: number;
	};
	data: {
		label: string;
	};
};
```

```ts
type ZodEdge = {
	id: string;
	source: string;
	target: string;
	label?: string;
	sourceHandle?: string | null;
	targetHandle?: string | null;
};
```

> Тип за workflow на проектите

```ts
export type Workflow = {
	id?: string;
	project: string; //идентификатор на проекта
	fromStatus: "open" | "in_progress" | "closed";
	toStatus: "open" | "in_progress" | "closed";
};
```
