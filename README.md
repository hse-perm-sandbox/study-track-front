# study-track-front
Клиентская часть web-приложения для управления задачами

Study Track — web-приложение, ориентированное на студентов, с функциями, специально адаптированными под учебный процесс: задачи, категории, приоритеты.

## Функции приложения

- Регистрация и вход в аккаунт
- Создание, редактирование, просмотр и удаление задач
- Классификация задач по категориям
- Установка дедлайнов

## 📌 Оглавление
1. [Технологии](#технологии)
2. [Требования](#требования)
3. [Установка](#установка)
4. [Запуск](#запуск)
5. [Структура проекта](#структура-проекта)
6. [Работа с API](#работа-с-api)
7. [Как это работает](#как-это-работает)

---

## 🛠 Технологии

### Frontend:
- **React 18**
- **TypeScript**
- **Vite** (быстрый сборщик проектов)
- **React Router** (навигация между страницами)
- **Axios** (HTTP-клиент для работы с API)

### Backend:
- **REST API** - серверная часть приложения из репозитория [study-track-api](https://github.com/hse-perm-sandbox/study-track-api/tree/main)

---

## 📋 Требования

Для работы с проектом необходимо установить:
- **Node.js** (версия 16.x или выше)
- **npm** (обычно устанавливается вместе с Node.js)
- **Git** (для клонирования репозитория)

---

## ⚙️ Установка

1. Клонируйте репозиторий:
  ```bash
  git clone https://github.com/hse-perm-sandbox/study-track-front.git
  ```

2. Перейдите в папку проекта:
  ```bash
  cd study-track-front
  ```

3. Установите зависимости:
  ```bash
  npm install
  ```

---

## 🚀 Запуск

1. Запустите приложение в режиме разработки:
  ```bash
  npm run dev
  ```

2. Откройте браузер по адресу:
  ```
  http://localhost:5173
  ```

3. Для сборки production-версии:
  ```bash
  npm run build
  ```

4. Для запуска production-сборки:
  ```bash
  npm run preview
  ```

---

## 📂 Структура проекта

```plaintext
src/
├── components/       # Компоненты приложения
│   ├── UserForm.tsx  # Форма добавления пользователя
│   └── UserList.tsx  # Список пользователей|
|   ├── TaskForm.tsx  # форма создания задачи
│   └── TaskCard.tsx  # карточка одной задачи
├── hooks/
│   └── useUsers.ts   # Кастомный хук для работы с пользователями
├── pages/            # Страницы приложения
│   ├── Home.tsx      # Главная страница
│   ├── UsersPage.tsx # Страница управления пользователями
│   ├── TasksPage.tsx # список задач
│   └── TaskDetailPage.tsx # подробности одной задачи
├── services/         # Работа с API
│   ├── api-client.ts # Настройка HTTP-клиента
│   ├── tasks-api.ts # API для работы с задачами
│   └── users-api.ts  # API для работы с пользователями
├── types/            # Типы TypeScript
│   ├── task.interface.ts # описание типа Task
│   └── user.interface.ts # Интерфейс пользователя
├── App.tsx           # Главный компонент приложения
└── main.tsx          # Точка входа
```

---

## 🌐 Работа с API

### Настройка подключения к API

1. Создайте файл `.env` в корне проекта.
2. Добавьте переменную с адресом API:
  ```
  VITE_API_BASE_URL=http://ваш-api-сервер.com
  ```
  Например:
  ```
  VITE_API_BASE_URL=http://localhost:3000
  ```

### Доступные API-методы

Приложение использует следующие API-эндпоинты:
- `GET /api/users` - получить список пользователей
- `POST /api/users` - добавить нового пользователя
- `DELETE /api/users/:id` - удалить пользователя
- `PATCH /api/users/:id` - обновить данные пользователя

---

## 🤔 Как это работает

### Клиент-серверное взаимодействие

1. **Получение данных:**
  - При загрузке страницы `UsersPage` вызывается хук `useUsers`.
  - Хук делает `GET`-запрос к `/api/users`.
  - Полученные данные сохраняются в состоянии.

2. **Добавление пользователя:**
  - При отправке формы в `UserForm` вызывается функция `addUser`.
  - Отправляется `POST`-запрос с данными нового пользователя.
  - После успешного добавления список пользователей обновляется.

3. **Удаление пользователя:**
  - При клике на кнопку `Delete` вызывается `removeUser`.
  - Отправляется `DELETE`-запрос с ID пользователя.
  - После успешного удаления список обновляется.

### Основные концепции React

- **Компоненты:**
  - `UserForm` и `UserList` - функциональные компоненты.
  - Используют хуки для управления состоянием.

- **Хуки:**
  - `useState` - для локального состояния.
  - `useEffect` - для side-эффектов (загрузка данных).
  - `useUsers` - кастомный хук для работы с API.

- **Маршрутизация:**
  - `React Router` управляет переходами между страницами:
   - Главная страница (`/`)
   - Страница пользователей (`/users`)

---
