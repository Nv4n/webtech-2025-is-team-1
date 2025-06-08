# IssueTracker - Система за управление на задачи

## Съдържание
1. [Общо описание](#общо-описание)
2. [Функционално описание](#функционално-описание)
3. [Архитектура и структури на данни](#архитектура-и-структури-на-данни)
4. [Структура на проекта и добри практики](#структура-на-проекта-и-добри-практики)
5. [Реакция при грешки и стабилност](#реакция-при-грешки-и-стабилност)
6. [Подготовка на демо сървър](#подготовка-на-демо-сървър)
7. [Бонуси и подобрения](#бонуси-и-подобрения)
8. [Заключение](#заключение)

## Общо описание

IssueTracker е уеб-базирана система за управление на задачи и проекти, разработена с модерен технологичен стек, включващ .NET 9.0 за backend и React за frontend. Системата позволява на потребителите да създават проекти, управляват задачи (tickets), следят техния статус и работят в екипи.

### Технологичен стек

#### Backend
- **Backend Framework**: .NET 9.0 с ASP.NET Core Web API
- **Програмен език**: C# 
- **База данни**: PostgreSQL (хостната на Supabase)
- **ORM**: Entity Framework Core 9.0.3
- **Автентикация**: JWT Bearer токени
- **Хеширане на пароли**: BCrypt.Net-Next
- **Валидация**: FluentValidation
- **Архитектурен модел**: Clean Architecture

#### Frontend
- **UI Framework**: React
- **Build Tool**: Vite
- **State Management**: TanStack Query (react-query)
- **Routing**: TanStack Router
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Code Quality**: ESLint, Prettier
- **Архитектурен модел**: Feature-Based Folder Architecture

## 2. Функционално описание

### Потребители - регистрация, вход, права

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| Регистрация | Да | POST /api/auth/register - Регистрация с username, email, password |
| Вход | Да | POST /api/auth/login - Вход с username и password, връща JWT токен |
| Роли | Да | Admin, Manager, User |
| Управление на профил | Да | GET/PUT /api/users/me - преглед и редакция на профил |
| Смяна на парола | Да | POST /api/users/change-password |
| Администриране | Да | Admin може да редактира и трие всички потребители |

### Проекти - създаване, избор

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| Създаване | Да | POST /api/projects - създаване на нов проект |
| Преглед на всички | Да | GET /api/projects - списък с всички проекти |
| Преглед по ID | Да | GET /api/projects/{id} |
| Моите проекти | Да | GET /api/projects/my - проекти на текущия потребител |
| Детайли с билети | Да | GET /api/projects/{id}/details |
| Редактиране | Да | PUT /api/projects/{id} |
| Изтриване | Да | DELETE /api/projects/{id} |

### Билети - създаване, редакция, изтриване

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| Създаване | Да | POST /api/tickets - с валидация |
| Преглед на всички | Да | GET /api/tickets |
| Преглед по ID | Да | GET /api/tickets/{id} |
| Филтриране | Да | GET /api/tickets/filter - по статус, проект, assignee и др. |
| Редактиране | Да | PUT /api/tickets/{id} |
| Изтриване | Да | DELETE /api/tickets/{id} |
| Приоритети | Да | Low, Medium, High, Critical |
| Типове | Да | Bug, Feature, Task, Epic, Story, Improvement |

### Статуси и workflow

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| Статуси | Да | Open, InProgress, InReview, Testing, Done, Closed, Blocked, Cancelled |
| Workflow преходи | Да | WorkflowTransitions таблица за управление на позволени преходи |
| API за workflow | Да | /api/workflowtransitions ендпойнти |

```javascript
export const TicketStatuses = [
    "Open",
    "InProgress",
    "InReview",
    "Testing",
    "Done",
    "Closed",
    "Blocked",
    "Cancelled",
];

export const TicketPriorities = ["Low", "Medium", "High", "Critical"];
```

### Бележки и метаинформация

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| Описание на билет | Да | Поле Description в билетите |
| Автор на билет | Да | Author релация към Users |
| Assignee | Да | Възможност за назначаване на билет |
| Timestamps | Да | CreatedAt, UpdatedAt за всички entities |

### Изгледи

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| По проект | Да | GET /api/projects/{id}/details |
| По човек | Да | Филтриране по assignee |
| По статус | Да | Филтриране по статус |
| Комбинирани филтри | Да | GET /api/tickets/filter с множество параметри |

## 3. Архитектура и структури на данни

### 3.1 Архитектурна диаграма

![494891133_686750377668049_1203406313448752189_n](https://github.com/user-attachments/assets/5f2fa43e-58d1-4aa3-ab6e-9acb2e821df0)

### 3.2 База данни - ER диаграма

![image](https://github.com/user-attachments/assets/fc5cab98-dd7b-45c3-97c0-09f379363655)


### 3.3 Обяснение на слоевете

**Frontend слой**:
- Feature-Based Architecture за модулност и мащабируемост
- React компоненти организирани по функционалности
- TanStack Query за управление на асинхронни заявки и кеширане
- Type-safe routing с TanStack Router
- Zod за runtime валидация и type inference

**WebApi слой**:
- Отговаря за HTTP комуникацията
- Обработва заявки и връща отговори в JSON формат
- Управлява автентикацията чрез JWT middleware
- Валидира входните данни

**Core слой**:
- Съдържа бизнес логиката
- Дефинира домейн моделите и DTOs
- Имплементира сервисите (AuthService, TicketsService)
- Дефинира интерфейсите за repositories

**Infrastructure слой**:
- Управлява достъпа до данни чрез Entity Framework
- Имплементира repository pattern
- Съдържа database entities и mappings
- Управлява database migrations

## 4. Структура на проекта и добри практики

### Backend организация

```
IssueTracker/
├── IssueTracker.WebApi/          # API слой
│   ├── Controllers/              # API контролери
│   ├── Validators/               # FluentValidation валидатори
│   └── Program.cs               # Startup конфигурация
├── IssueTracker.Core/           # Бизнес логика
│   ├── DTOs/                    # Data Transfer Objects
│   ├── Interfaces/              # Repository интерфейси
│   ├── Models/                  # Домейн модели
│   ├── Services/                # Бизнес сервиси
│   └── Settings/                # Конфигурационни класове
├── IssueTracker.Infrastructure/ # Data слой
│   ├── Data/                    # DbContext
│   ├── Entities/                # Database entities
│   ├── Mappings/                # Entity mappings
│   └── Repositories/            # Repository имплементации
└── IssueTracker.Services/       # Допълнителни сервиси
```

### Frontend организация

```
src/
├── features/                    # Feature модули
│   ├── Feature/
│   │   ├── components/         # Feature-специфични компоненти
│   │   ├── hooks/             # Custom hooks
│   │   ├── service/           # API интеграция
│   │   ├── types/             # TypeScript типове
│   │   └── utils/             # Utility функции
├── components/                 # Споделени компоненти
├── config/                     # Конфигурация
├── hooks/                      # Глобални hooks
├── lib/                        # Външни библиотеки setup
└── routes/                     # Routing конфигурация
```

### Спазени добри практики

**Backend:**
- Separation of Concerns: Ясно разделение между слоевете
- DRY (Don't Repeat Yourself): Преизползване на код
- Repository Pattern: Абстракция на data access слоя
- Dependency Injection: Използване на DI навсякъде
- SOLID принципи: Single Responsibility, Interface Segregation
- Async/Await: Асинхронни операции за по-добра производителност
- Configuration: Използване на appsettings.json и IOptions pattern
- Validation: FluentValidation за входни данни
- Security: JWT tokens, password hashing с BCrypt

**Frontend:**
- Feature-Based Architecture: Модулност и мащабируемост
- Type Safety: TypeScript и Zod за runtime валидация
- State Management: TanStack Query за server state
- Component Reusability: Споделени компоненти и hooks
- Code Quality: ESLint и Prettier за консистентен код
- Utility-First CSS: Tailwind за бързо стилизиране
- Accessibility: ShadCN UI компоненти с вградена достъпност

### Документация на типовете

#### Backend DTOs

**AuthDTOs.cs:**
- LoginRequest: username, password
- RegisterRequest: username, email, password, firstName, lastName, role
- LoginResponse: token, username, email, role
- UserResponse: id, username, email, firstName, lastName, role, createdAt

**TicketDTOs.cs:**
- CreateTicketRequest: title, description, projectId, assigneeId, status, priority, issueType
- UpdateTicketRequest: title, description, assigneeId, status, priority, issueType
- TicketResponse: всички полета на ticket с релации

#### Frontend схеми

**UserSchema:**
```typescript
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

**LoginSchema:**
```typescript
type LoginUser = {
    username: string;
    password: string;
};
```

**RegisterSchema:**
```typescript
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

**TicketSchema с Zod:**
```javascript
export const TicketSchema = z.object({
    id: z.coerce.string().optional(),
    title: z.string().min(3).max(200),
    status: z.number(),
    priority: z.number(),
    description: z.string().min(10),
    assignee: z.coerce.string(),
    project: z.coerce.string(),
    author: z.coerce.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    updatedBy: z.coerce.string(),
});
```

**Project Schema:**
```typescript
type Project = {
    id?: string;
    name: string;
    description: string;
    createdAt: Date;
    workflowId: string;
    ownerId: string;
};
```

**Workflow Schema:**
```typescript
export type Workflow = {
    id?: string;
    project: string;
    fromStatus: "open" | "in_progress" | "closed";
    toStatus: "open" | "in_progress" | "closed";
};
```

## 5. Реакция при грешки и стабилност

### Обработка на грешки

**Backend:**
- Global Exception Middleware: Хваща всички неочаквани грешки
- Structured Error Responses: Consistent JSON error format
- Validation Errors: Детайлни съобщения при валидационни грешки
- HTTP Status Codes: Правилно използване (400, 401, 403, 404, 500)

**Frontend:**
- TanStack Query error handling: Автоматично управление на грешки
- Zod validation: Type-safe валидация с ясни съобщения
- Error boundaries: Хващане на React грешки
- User-friendly messages: Конвертиране на технически грешки

### Проверки за допустимост

- Автентикация изисквана за всички endpoints освен login/register
- Роля-базирани проверки (Admin-only операции)
- Проверка дали потребител може да редактира/трие само свои проекти
- Валидация на workflow transitions
- Frontend route guards за protected pages

### Примери за обработка на грешки

```csharp
// Backend - Невалидни входни данни
400 Bad Request: {
    "errors": {
        "Password": ["Password must be at least 6 characters"]
    }
}

// Backend - Неоторизиран достъп
401 Unauthorized: {
    "message": "Authentication required"
}

// Backend - Ресурс не е намерен
404 Not Found: {
    "message": "Ticket not found"
}
```

```javascript
// Frontend - Zod валидация
try {
    const validatedData = TicketSchema.parse(formData);
    // Обработка на валидни данни
} catch (error) {
    if (error instanceof z.ZodError) {
        // Показване на валидационни грешки
        console.error(error.errors);
    }
}
```

## 6. Подготовка на демо сървър

### Изисквания

**Backend:**
- .NET 9.0 SDK
- PostgreSQL база данни (или Supabase account)
- Git

**Frontend:**
- Node.js 18+ и npm/yarn
- Git

### Стъпки за стартиране

#### Backend

1. **Клониране на репозиторито**
```bash
git clone <repository-url>
cd issue-tracker-web-tech/IssueTracker
```

2. **Конфигуриране на база данни**
   - Отворете `IssueTracker.WebApi/appsettings.json`
   - Обновете connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=your-host;Database=your-db;Username=your-user;Password=your-pass"
  }
}
```

3. **Инсталиране на зависимости и миграции**
```bash
cd IssueTracker.WebApi
dotnet restore
dotnet ef database update
```

4. **Стартиране на сървъра**
```bash
dotnet run
```

Сървърът ще стартира на `https://localhost:5001` или `http://localhost:5000`

#### Frontend

1. **Навигиране до frontend директорията**
```bash
cd frontend
```

2. **Инсталиране на зависимости**
```bash
npm install
# или
yarn install
```

3. **Конфигуриране на API URL**
   - Обновете `.env` файла с правилния backend URL

4. **Стартиране на development сървър**
```bash
npm run dev
# или
yarn dev
```

Frontend приложението ще стартира на `http://localhost:5173`

### Тестови потребители

След първоначална миграция, можете да създадете тестови потребители чрез `/api/auth/register`:

```json
// Admin потребител
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "Admin123!",
  "firstName": "Admin",
  "lastName": "User",
  "role": "Admin"
}

// Обикновен потребител
{
  "username": "testuser",
  "email": "test@example.com", 
  "password": "Test123!",
  "firstName": "Test",
  "lastName": "User",
  "role": "User"
}
```

### API Документация

API endpoints могат да бъдат тествани с:
- **Postman**: Импортирайте endpoints от секция 2
- **curl**: Примери за основни операции
- **Swagger**: Може да се добави за интерактивна документация
- **Frontend UI**: Интерактивен интерфейс за всички операции

### Примерни API извиквания

**Login:**
```bash
curl -X POST https://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123!"}'
```

**Създаване на проект:**
```bash
curl -X POST https://localhost:5001/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","description":"Test project"}'
```

## 7. Бонуси и подобрения

### Реализирани подобрения

| Функционалност | Статус | Описание |
|----------------|---------|-----------|
| Async операции | Да | Всички database операции са асинхронни |
| Валидация | Да | FluentValidation (backend) и Zod (frontend) |
| Филтриране | Да | Разширено филтриране на билети |
| Workflow management | Да | Управление на позволени статус преходи |
| Role-based access | Да | Детайлен контрол на достъпа |
| Password security | Да | BCrypt хеширане + валидация на сложност |
| Error handling | Да | Global exception handling |
| CORS support | Да | За frontend интеграция |
| Timestamps | Да | Автоматично следене на CreatedAt/UpdatedAt |
| Type safety | Да | TypeScript и Zod за frontend |
| State management | Да | TanStack Query за ефективно кеширане |
| Responsive UI | Да | Tailwind CSS за адаптивен дизайн |
| Dark mode ready | Частично | ShadCN UI поддържа dark mode |

### Потенциални бъдещи подобрения

**Backend:**
- CI/CD Pipeline: GitHub Actions за автоматични тестове и deployment
- Swagger/OpenAPI: Интерактивна API документация
- Real-time updates: SignalR за нотификации
- File attachments: Прикачени файлове към билети
- Comments system: Коментари към билети
- Email notifications: Известия при промени
- Activity log: История на всички промени
- Bulk operations: Масови операции върху билети
- Export functionality: Експорт в CSV/Excel

**Frontend:**
- Progressive Web App: Offline поддръжка
- Real-time updates: WebSocket интеграция
- Advanced filtering: По-сложни филтри и търсене
- Drag & drop: За промяна на статуси
- Keyboard shortcuts: За по-бърза навигация
- Internationalization: Многоезична поддръжка
- Analytics dashboard: Визуализация на данни
- Mobile app: React Native версия
- E2E testing: Cypress или Playwright

## 8. Заключение

### Какво научихме от проекта

**Backend разработка:**
1. Clean Architecture принципи: Как правилното разделение на слоевете улеснява поддръжката
2. Modern .NET разработка: Използване на най-новите възможности на .NET 9.0
3. Security best practices: JWT автентикация, password hashing, role-based authorization
4. RESTful API design: Правилно структуриране на endpoints и HTTP методи
5. Async programming: Важността на асинхронните операции за производителност
6. Validation patterns: Как FluentValidation подобрява code quality
7. Repository pattern: Абстракция на data access за по-лесно тестване
8. Деплой на база данни на външен provider

**Frontend разработка:**
1. Feature-Based Architecture: Организация за мащабируемост
2. Modern React patterns: Hooks, composition, custom hooks
3. Type safety: TypeScript и runtime валидация със Zod
4. State management: Ефективно кеширане с TanStack Query
5. UI/UX best practices: Достъпни и красиви компоненти
6. Build optimization: Бързо development с Vite
7. Code quality: Автоматизация с ESLint и Prettier

### Какво бихме подобрили с повече време

1. **Testing coverage**: Comprehensive unit, integration и E2E тестове
2. **Performance optimization**: Caching, lazy loading, code splitting
3. **DevOps**: Пълна CI/CD pipeline с автоматичен deployment
4. **Monitoring**: Application insights и error tracking
5. **Documentation**: Подробна техническа документация и user guides
6. **Accessibility**: WCAG 2.1 AA compliance
7. **Security**: Penetration testing и security audits
8. **Scalability**: Microservices архитектура при нужда
9. **User experience**: User research и usability testing
10. **Platform expansion**: Mobile apps и desktop clients
