# Vue Starter Kit

A modern starter kit for building full-stack applications with **Laravel**, **Inertia.js**, and **Vue 3**.

Pre-configured with dark mode, flash toasts, state management, and a clean project structure — ready to build on top of.

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Laravel, PHP 8.3+ |
| **Frontend** | Vue 3, JavaScript |
| **Routing** | Inertia.js v3 |
| **Styling** | Tailwind CSS v4 |
| **State** | Pinia + pinia-plugin-persistedstate |
| **Toasts** | vue-sonner |
| **Icons** | @lucide/vue |
| **Date** | dayjs (Russian locale) |

## Features

- **Dark Mode** — light / dark / system with OS-level listener, persisted in localStorage
- **Flash Toasts** — Laravel `session('flash')` messages automatically shown as toasts
- **Confirm Dialog** — programmatic `await confirm()` pattern via Promise
- **Auth Helpers** — `useUser()` composable with roles, permissions, `can()`/`cannot()`, `is()`/`isNot()`
- **Auth Components** — `<Authenticated>` and `<Guest>` render-slot components
- **Scope Component** — inline reactive state without a store
- **Utility Helpers** — `plural()`, `truncate()`, `formatNumber()`, `formatCurrency()`, `formatDate()`, `copyToClipboard()`, `dataGet()`, `uid()`, `sleep()`
- **Pinia Persistence** — app and theme stores persisted out of the box
- **CSS Architecture** — split into `theme.css`, `base.css`, `components.css`, `utilities.css`

## Requirements

- PHP 8.3+
- Composer
- Node.js 20+
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/larastash/vue.git my-app
cd my-app

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Configure environment
cp .env.example .env
php artisan key:generate

# Run database migrations
php artisan migrate

# Start development servers
composer run dev
```

> The `VITE_APP_NAME` variable in `.env` controls the page `<title>`.

## Project Structure

```
resources/js/
├── app.js                    # Entry point: Inertia, Pinia, dayjs setup
├── components/
│   ├── Scope.vue             # Inline reactive state via scoped slot
│   ├── Toaster.vue           # Pre-styled vue-sonner toaster
│   └── auth/
│       ├── Authenticated.vue # Renders slot only for authenticated users
│       └── Guest.vue         # Renders slot only for guests
├── composables/
│   ├── useApp.js             # Access to the app store
│   ├── useConfirm.js         # Programmatic confirm dialog (Promise-based)
│   ├── useFlash.js           # Flash messages + auto-toast watcher
│   ├── usePageProps.js       # Access to Inertia page props
│   ├── useTheme.js           # Theme toggle (light/dark/system cycle)
│   └── useUser.js            # Current user, roles, permissions, guards
├── layouts/
│   ├── Application.vue       # Main app layout (with Toaster)
│   └── Guest.vue             # Guest layout (with Toaster)
├── lib/
│   ├── helpers.js            # Utility functions (plural, truncate, format...)
│   └── utils.js              # cn() — Tailwind class merger
├── pages/
│   └── Welcome.vue           # Demo page with theme toggle & Scope example
└── stores/
    ├── appStore.js           # Global app state (extend as needed)
    └── themeStore.js         # Theme state with system preference listener
```

## Composables

### `useUser()`

Access the authenticated user from Inertia shared props. Returns a `reactive` object — always access properties through the object, do not destructure.

```js
const user = useUser();

// user.data        — raw user object (or null)
// user.isAuthenticated
// user.can('edit-posts')
```

| Property | Description |
|---|---|
| `data` | Current user object (or `null`) |
| `id` | User ID |
| `isAuthenticated` | Whether the user is logged in |
| `isGuest` | Whether the user is a guest |
| `isEmailVerified` | Whether the email is verified |
| `initials(length?)` | User name initials |
| `roles` | User roles array |
| `permissions` | User permissions array |
| `hasRole(...roles)` | Has any of the given roles |
| `hasAnyRole(...roles)` | Has any of the given roles |
| `hasAllRoles(...roles)` | Has all of the given roles |
| `can(permission)` | Has the permission |
| `cannot(permission)` | Does not have the permission |
| `is(otherUser)` | Same user by ID |
| `isNot(otherUser)` | Different user by ID |
| `get(path, default?)` | Dot-notation access to user fields |
| `has(path)` | Check existence via dot-notation |

### `useTheme()`

Cycle through light → dark → system themes.

```js
const { currentTheme, isDark, toggleTheme, setTheme } = useTheme();
```

### `useConfirm()`

Promise-based confirm dialog.

```js
const { confirm } = useConfirm();

const ok = await confirm({
  title: 'Delete record?',
  message: 'This action cannot be undone.',
  variant: 'danger',
});

if (ok) {
  // proceed
}
```

### `useFlash()` / `useFlashToasts()`

Access Laravel flash messages. Call `useFlashToasts()` once in your layout to auto-show toasts.

```js
// In a layout:
useFlashToasts();

// In a component:
const { has, get, flash } = useFlash();
if (has('success')) console.log(get('success'));
```

Laravel side:
```php
return back()->with('flash', ['success' => 'Saved!']);
```

### `usePageProps()`

Access to Inertia page props.

```js
const { prop } = usePageProps();
const appName = prop('appName', 'Laravel');
```

## Components

### `<Scope>`

Inline reactive state without creating a store or ref in the parent.

```vue
<Scope :data="{ count: 0 }" v-slot="{ data }">
  <button @click="data.count++">{{ data.count }}</button>
</Scope>
```

### `<Authenticated>` / `<Guest>`

Conditional rendering based on auth state. Slot props are the full `useUser()` reactive object.

```vue
<Authenticated v-slot="{ data }">
  <p>Hello, {{ data.name }}</p>
</Authenticated>

<Guest>
  <p>Please log in</p>
</Guest>
```

## CSS Architecture

Styles are split into focused files imported in `resources/css/app.css`:

| File | Purpose |
|---|---|
| `theme.css` | Theme variables and custom animations |
| `base.css` | Global base styles (body, scrollbar, focus resets) |
| `components.css` | Component-level styles (NProgress bar) |
| `utilities.css` | Custom Tailwind utilities (`scrollbar-none`) |

## PHP Helpers

Global helper functions available server-side (via `app/helpers.php`):

- `user($guard?)` — get the authenticated user
- `plural($n, $forms, $includeNumber)` — Russian pluralization

## License

Open-source under the [MIT license](https://opensource.org/licenses/MIT).
