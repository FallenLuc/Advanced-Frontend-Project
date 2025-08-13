# 📝 Blog Platform 

👨💻 **Автор**: Кувашов Никита

## Description
**Blog Platform** - проект по результатам курса продвинутого Frontend от автора [Ulbi TV](https://www.youtube.com/@UlbiTV).

Backend находится в [Github репозитории](https://github.com/FallenLuc/Back-Custom-Habr)

### Функционал приложения
Проект представляет собой **архитектурно выстроенное веб-приложение**, выполненное по принципам **Feature-Sliced Design (FSD)**.  

- авторизации пользователя,
- отображения и редактирования профиля,
- просмотр статей,
- поиск статей,
- взаимодействия с комментариями,
- оценки материалов (звёздочный рейтинг),
- получения уведомлений

## 🛡️ Project Status
![Deploy](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/deploy.yml/badge.svg?branch=dev)
![Lint](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/lint.yml/badge.svg?branch=dev)
![Unit Test](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/unit.yml/badge.svg?branch=dev)
![Ui Test](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/ui.yml/badge.svg?branch=dev)

[![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://dev--67f5ebfcaecd9917d7475e3a.chromatic.com)  <- **LINK**

[![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://fallenluc.github.io/Advanced-Frontend-Project/)  <- **LINK**


## 🚀 Технологический стек

### Основные технологии
- **React**: Библиотека для создания пользовательских интерфейсов
- **TypeScript**: Типизированный JavaScript для повышения надежности кода
- **Redux Toolkit**: Управление состоянием приложения
- **React Router**: Маршрутизация в приложении
- **i18next**: Интернационализация
- **Webpack**: Сборка проекта
- **SCSS**: Стилизация компонентов
- **Jest**: Модульное тестирование
- **Storybook**: Документация компонентов и UI-тестирование

### Дополнительные библиотеки
- **axios**: HTTP-клиент для выполнения запросов к API
- **react-redux**: Интеграция Redux с React
- **@headlessui/react**: UI-компоненты
- **@react-spring/web**: Анимации
- **react-i18next**: Интеграция i18next с React

## 🚀 Начало работы

### Установка зависимостей
```bash
pnpm install
```

### Запуск в режиме разработки
```bash
pnpm run build:start
```

### Сборка для продакшн
```bash
pnpm run build:prod
```

## 📋 Требования

- Node.js 14+
- pnpm

## 🚀 All Scripts

* 🏗️ `pnpm run build:start` - Запуск Webpack dev server (http://localhost:8081)
* 📦 `pnpm run build:dev` - Сборка в development режиме
* 📦 `pnpm run build:prod` - Продакшн сборка с минификацией
* 📦 `pnpm run build:prod:analyze` - Продакшн сборка с анализом бандла м помощью bundle-analyzer
* 🔍 `pnpm run lint:ts` - Проверка TypeScript кода
* 🔧 `pnpm run lint:ts:fix` - Автоисправление TS ошибок
* 🎨 `pnpm run lint:style` - Проверка SCSS стилей
* 🖌️ `pnpm run lint:style:fix` - Автоисправление стилей
* 💅 `pnpm run lint:prettier` - Форматирование кода Prettier
* 🧪 `pnpm run test:unit` - Запуск unit-тестов
* 📸 `pnpm run test:ui` - Скриншотные тесты в Chromatic
* 📚 `pnpm run storybook:start` - Запуск Storybook (http://localhost:6006)
* 📚 `pnpm run storybook:build` - Сборка Storybook

## 🏗️ Architecture

[![Feature Sliced Design](https://img.shields.io/badge/Architecture-Feature_Sliced_Design-007EC6?style=flat-square&logo=typescript&logoColor=white)](https://feature-sliced.github.io/documentation/docs)

Проект реализован по методологии **Feature Sliced Design** 🧩

Собственные модификации методологии:  
🔹 Слои именуются как `Number_FSD_NameFolder`, где Number - это уровень слоя по FSD, а NameFolder - название слоя по FSD.  
🔹 Для UI компонентов используется public API  
🔹 Сложные компоненты могут иметь собственную папку ui, в которых будут храниться более мелки части компонента. Именно верстка без логики.  
🔹 Папка `store` вместо `model`  
🔹 Типы хранятся в `storeTypes`

📚 [Документация FSD](https://feature-sliced.github.io/documentation/docs)

Приложение разделено на FSD-слои:

| Слой       | Назначение                                 |
|------------|---------------------------------------------|
| `entities` | Сущности: бизнес-сущности в изоляции        |
| `features` | Фичи: объединяют несколько сущностей        |
| `widgets`  | Виджеты: готовые части интерфейса (лента, формы) |
| `pages`    | Страницы приложения                         |
| `processes`| Сквозная логика (напр., авторизация)        |
| `shared`   | Общие компоненты, стили, утилиты            |

## 🔗 Aliases & Configs

### 📂 Aliases
В проекте используются алиасы. Алиасы указаны в [tsconfig.paths.json](/tsconfig.paths.json)

Для добавления нового алиса, достаточно указать его в tsconfig.paths.json и он будет сразу же работать, так как в webpack, storybook, jest настроено автоматическое распознавание алиасов на основе tsconfig.paths.json.
Алиасы настроены на все папки в корне проекта, и на все папки в слое shared и app.

<details open>
<summary><h4>📁 Алиасы слоя App</h4></summary>

| Алиас | Путь |
|-------|------|
| `@app/*` | `./src/1_FSD_app/` |
| `@providers/*` | `./src/1_FSD_app/providers/` |
| `@store/*` | `./src/1_FSD_app/store/` |
| `@styles/*` | `./src/1_FSD_app/styles/` |

</details>

<details open>
<summary><h4>📁 Алиасы слоев FSD</h4></summary>

| Алиас | Путь |
|-------|------|
| `@pages/*` | `./src/2_FSD_pages/` |
| `@widgets/*` | `./src/3_FSD_widgets/` |
| `@features/*` | `./src/4_FSD_features/` |
| `@entities/*` | `./src/5_FSD_entities/` |

</details>

<details open>
<summary><h4>📁 Алиасы слоя Shared</h4></summary>

| Алиас | Путь |
|-------|------|
| `@ui/*` | `./src/6_FSD_shared/ui/` |
| `@constants/*` | `./src/6_FSD_shared/constants/` |
| `@api/*` | `./src/6_FSD_shared/api/` |
| `@assets/*` | `./src/6_FSD_shared/assets/` |
| `@config/*` | `./src/6_FSD_shared/config/` |
| `@customTypes/*` | `./src/6_FSD_shared/types/` |
| `@sharedProviders/*` | `./src/6_FSD_shared/providers/` |

</details>

<details open>
<summary><h4>📁 Алиасы для lib в Shared</h4></summary>

| Алиас | Путь |
|-------|------|
| `@decorators/*` | `./src/6_FSD_shared/lib/decorators/` |
| `@helpers/*` | `./src/6_FSD_shared/lib/helpers/` |
| `@mocks/*` | `./src/6_FSD_shared/lib/mocks/` |
| `@hooks/*` | `./src/6_FSD_shared/lib/hooks/` |

</details>

### ⚙️ Configs
Для разработки проекта используется сборщик Webpack. Конфигурация написана на typescript и разделена на модули.

* [Вызов конфигурационной функции](/webpack.config.ts)
* [Основной конфиг](/config/webpack/config.webpack.ts) - конфигурационная функция, которая принимает параметры запуска сборки и агрегирует в себя все модули.
* [Resolvers](/config/webpack/resolvers.webpack.ts) - модуль, отвечающий за резолверы webpack.
* [Plugins](/config/webpack/plugins.webpack.ts) - модуль, отвечающий за все плагины webpack.
* [Loaders](/config/webpack/loaders.webpack.ts) - модуль, отвечающий за лоадеры webpack.
* [Optimization](/config/webpack/optimization.webpack.ts) - модуль, отвечающий за минимизацию кода в webpack.
* [DevServer](/config/webpack/devServer.webpack.ts) -  модуль отвечающий за dev server.

Для babel был написан собственный [плагин](/plugins/babel/removeAttributePlugin.babel.ts), который удаляет тестовые props компонентов при production сборке.

Для тестирования используется jest.
* [Конфиг](/config/jest/jest.config.ts) jest

Для скриншотных тестов используется storybook и chromatic.
* [Конфиг](/chromatic.config.json) chromatic
* [Конфиг](/config/storybook/main.ts) storybook

## 🧪🧹 Testing & Linting

### 🧪 Тесты

- Storybook + Chromatic: визуальное покрытие UI компонентов.
- Jest/RTL: юнит-тесты бизнес-логики.
- ESLint/Prettier/Stylelint: контроль качества кода.
- Husky + lint-staged: защита репозитория от плохих коммитов.

```bash
# Unit тесты - unit тесты, для тестирования helpers, slices, selectors. Тесты написаны на базе jest.
$ pnpm run test:unit

# RTL тесты - тесты на компоненты. Также написаны на базе Jest, запускаются вместе с остальными unit тестами.
$ pnpm run test:unit

# Скриншотные тесты - ui тесты, скриншотные тесты на основе storybook и chromatic
$ pnpm run test:ui
```

### 🧹 Линтеры
| Инструмент | Конфигурация                            |
|------------|-----------------------------------------|
| ESLint     | [`.eslintrc.json`](/.eslintrc.json)     |
| Stylelint  | [`.stylelintrc.js`](/.stylelintrc.js)   |
| Prettier   | [`.prettierrc.json`](/.prettierrc.json) |

## 🔄 Управление состоянием

Для управления состоянием в приложении используется **Redux Toolkit** - современная библиотека для управления состоянием React-приложений, которая упрощает работу с Redux.

<details open>
<summary><h4>📊 Архитектура Redux</h4></summary>

Архитектура Redux в проекте разделена на статические и динамические редьюсеры:

| Тип редьюсера | Описание |
|---------------|----------|
| **Статические** | Загружаются при инициализации приложения |
| **Динамические** | Загружаются асинхронно по мере необходимости (code splitting) |

</details>

<details open>
<summary><h4>🔒 Статические редьюсеры</h4></summary>

| Редьюсер | Описание | Путь |
|----------|----------|------|
| `user` | Управление данными пользователя | [src/5_FSD_entities/User](src/5_FSD_entities/User) |
| `scrollPosition` | Сохранение позиций скролла | [src/4_FSD_features/ScrollSave](src/4_FSD_features/ScrollSave) |
| `rtkBaseApi` | RTK Query API для работы с сервером | [src/6_FSD_shared/api](src/6_FSD_shared/api) |

</details>

## 🌐 Интернационализация

Проект поддерживает многоязычность с использованием библиотеки **i18next** и её интеграции с React через **react-i18next**.

<details open>
<summary><h4>🗣️ Поддерживаемые языки</h4></summary>

| Язык | Код | Статус |
|------|-----|--------|
| Английский | `en` | Основной (по умолчанию) |
| Русский | `ru` | Поддерживается |

</details>

<details open>
<summary><h4>📂 Структура переводов</h4></summary>

Переводы организованы по следующей структуре:

```
/locales/
  ├── en/
  │   ├── translation.json
  │   ├── about.json
  │   ├── profile.json
  │   └── ...
  └── ru/
      ├── translation.json
      ├── about.json
      ├── profile.json
      └── ...
```

Каждый файл соответствует определенному namespace (пространству имен), что позволяет организовать переводы по функциональным областям.

</details>

## 🎨 Темы оформления

Проект поддерживает несколько тем оформления для персонализации пользовательского интерфейса. Система тем реализована с использованием CSS-переменных и контекста React.

<details open>
<summary><h4>🌈 Доступные темы</h4></summary>

| Тема | Константа | Описание | Превью |
|------|-----------|----------|--------|
| 🌙 Темная | `THEMES.DARK` | Темная тема с приглушенными цветами | `app-dark-theme` |
| ☀️ Светлая | `THEMES.LIGHT` | Светлая тема с яркими цветами | `app-light-theme` |
| 🌿 Зеленая | `THEMES.GREEN` | Зеленая тема с акцентами на зеленых оттенках | `app-green-theme` |

</details>

## 🚫 Защита маршрутов

Маршруты защищены с помощью компонента `RequireAuth`, который проверяет:

1. Авторизован ли пользователь
2. Имеет ли пользователь необходимые роли для доступа к странице
3. Перенаправляет на страницу авторизации или страницу с ошибкой доступа при необходимости

Конфигурация защищенных маршрутов определена в файле [routeConfig](src/6_FSD_shared/config/router/config/route.config.ts). Для защищенных маршрутов указываются параметры:

- `isRequireAuth: true` - требуется авторизация
- `requiredRoles: [UserRoles.ADMIN, UserRoles.MANAGER]` - требуемые роли для доступа

Для управления состоянием авторизации используется [userReducer](src/5_FSD_entities/User/store/user.slice.ts), который хранит информацию о текущем пользователе и его ролях.

## 🔄 Непрерывная интеграция

Тесты автоматически запускаются в CI/CD пайплайне при каждом pull-request в Master:

- Unit-тесты: GitHub Actions workflow `unit.yml`
- UI-тесты: GitHub Actions workflow `ui.yml`
- Lint: GitHub Actions workflow `lint.yml`
- Deploy: GitHub Actions workflow `delpoy.yml` (Деплой на Gihub Pages)
- Create Release: GitHub Actions workflow `release.yml` (Создаение Релизной версии при пуше нового тэга в Master)

## 📚 Документация компонентов

Для документации компонентов используется Storybook - инструмент для разработки и тестирования UI компонентов в изоляции.

### 📖 Возможности Storybook

- Просмотр компонентов в различных состояниях
- Интерактивное изменение props
- Документация API компонентов
- Автоматические тесты доступности
- Интеграция с Chromatic для скриншотных тестов

Каждый компонент имеет свои истории (stories), которые демонстрируют его использование в различных состояниях и с разными параметрами.

### 🔗 Доступ к Storybook

Storybook доступен по ссылке: [Storybook](https://dev--67f5ebfcaecd9917d7475e3a.chromatic.com)


## 🧩 Структура слоев:

<details open>
<summary><h4>1️⃣ <b>1_FSD_app</b>: Инициализация приложения</h4></summary>

| Компонент | Описание |
|-----------|----------|
| [providers](src/1_FSD_app/providers) | Провайдеры (Store, Router, Error) |
| [store](src/1_FSD_app/store) | Конфигурация Redux |
| [styles](src/1_FSD_app/styles) | Глобальные стили |
| [types](src/1_FSD_app/types) | Типы на уровне приложения |

</details>

<details open>
<summary><h4>2️⃣ <b>2_FSD_pages</b>: Страницы приложения</h4></summary>

| Компонент | Описание |
|-----------|----------|
| [MainPage](src/2_FSD_pages/MainPage) | Главная страница |
| [AboutPage](src/2_FSD_pages/AboutPage) | Страница "О проекте" |
| [ProfilePage](src/2_FSD_pages/ProfilePage) | Страница профиля |
| [ArticlesPage](src/2_FSD_pages/ArticlesPage) | Страница со списком статей |
| [ArticleDetailsPage](src/2_FSD_pages/ArticleDetailsPage) | Страница с детальной информацией о статье |
| [ArticleDetailsEditPage](src/2_FSD_pages/ArticleDetailsEditPage) | Страница редактирования статьи |
| [AdminPanelPage](src/2_FSD_pages/AdminPanelPage) | Панель администратора |
| [ForbiddenPage](src/2_FSD_pages/ForbiddenPage) | Страница с ошибкой доступа |
| [NotFoundPage](src/2_FSD_pages/NotFountPage) | Страница 404 |

</details>

<details open>
<summary><h4>3️⃣ <b>3_FSD_widgets</b>: Композиционные компоненты</h4></summary>

| Компонент | Описание |
|-----------|----------|
| [Header](src/3_FSD_widgets/Header) | Шапка сайта |
| [SideBar](src/3_FSD_widgets/SideBar) | Боковая панель |
| [ArticlesList](src/3_FSD_widgets/ArticlesList) | Список статей |
| [CommentsArticleDetails](src/3_FSD_widgets/CommentsArticleDetails) | Комментарии к статье |
| [ErrorPage](src/3_FSD_widgets/ErrorPage) | Страница с ошибкой |
| [Page](src/3_FSD_widgets/Page) | Обертка для страниц |
| [PageLoader](src/3_FSD_widgets/PageLoader) | Индикатор загрузки страницы |
| [Hello](src/3_FSD_widgets/Hello) | Приветственный компонент |

</details>

<details open>
<summary><h4>4️⃣ <b>4_FSD_features</b>: Бизнес-функции</h4></summary>

| Компонент | Описание |
|-----------|----------|
| [AddArticleComment](src/4_FSD_features/AddArticleComment) | Добавление комментария к статье |
| [ArticleRating](src/4_FSD_features/ArticleRating) | Рейтинг статьи |
| [ArticlesRecommendation](src/4_FSD_features/ArticlesRecommendation) | Рекомендации статей |
| [AuthByUserName](src/4_FSD_features/AuthByUserName) | Авторизация по имени пользователя |
| [AvatarDropdown](src/4_FSD_features/AvatarDropdown) | Выпадающее меню аватара |
| [ChangeViewArticlesList](src/4_FSD_features/ChangeViewArticlesList) | Изменение вида списка статей |
| [EditableProfileCard](src/4_FSD_features/EditableProfileCard) | Редактируемая карточка профиля |
| [FilterArticlesList](src/4_FSD_features/FilterArticlesList) | Фильтрация списка статей |
| [NotifiacationButton](src/4_FSD_features/NotifiacationButton) | Кнопка уведомлений |
| [Registration](src/4_FSD_features/Registration) | Регистрация |
| [ScrollSave](src/4_FSD_features/ScrollSave) | Сохранение позиции скролла |
| [SwitchLang](src/4_FSD_features/SwitchLang) | Переключение языка |
| [SwitchTheme](src/4_FSD_features/SwitchTheme) | Переключение темы |

</details>

<details open>
<summary><h4>5️⃣ <b>5_FSD_entities</b>: Бизнес-сущности</h4></summary>

| Компонент | Описание |
|-----------|----------|
| [Article](src/5_FSD_entities/Article) | Статья |
| [Comment](src/5_FSD_entities/Comment) | Комментарий |
| [Country](src/5_FSD_entities/Country) | Страна |
| [Currency](src/5_FSD_entities/Currency) | Валюта |
| [Notification](src/5_FSD_entities/Notification) | Уведомление |
| [Profile](src/5_FSD_entities/Profile) | Профиль |
| [Rating](src/5_FSD_entities/Rating) | Рейтинг |
| [User](src/5_FSD_entities/User) | Пользователь |

</details>

<details open>
<summary><h4>6️⃣ <b>6_FSD_shared</b>: Переиспользуемый код</h4></summary>

| Компонент | Описание |
|-----------|----------|
| [api](src/6_FSD_shared/api) | API-клиенты и конфигурация |
| [assets](src/6_FSD_shared/assets) | Статические ресурсы |
| [config](src/6_FSD_shared/config) | Конфигурации |
| [constants](src/6_FSD_shared/constants) | Константы |
| [lib](src/6_FSD_shared/lib) | Утилиты и хелперы |
| [providers](src/6_FSD_shared/providers) | Провайдеры |
| [types](src/6_FSD_shared/types) | Общие типы |
| [ui](src/6_FSD_shared/ui) | UI-компоненты |

</details>
