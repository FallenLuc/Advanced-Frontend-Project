# 📝 Blog Platform 

## Description
**Blog Platform** - проект по результатам курса продвинутого Frontend от автора [Ulbi TV](https://www.youtube.com/@UlbiTV).

👨💻 **Автор**: Кувашов Никита

## 🛡️ Project Status
![Build](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/build.yml/badge.svg?branch=dev)
![Lint](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/lint.yml/badge.svg?branch=dev)
![Unit Test](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/testUnit.yml/badge.svg?branch=dev)
![Ui Test](https://github.com/FallenLuc/Advanced-Frontend-Project/actions/workflows/testUi.yml/badge.svg?branch=dev)
[![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://dev--67f5ebfcaecd9917d7475e3a.chromatic.com)

## 🚀 Scripts

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

## 🔗 Aliases & Configs

### 📂 Aliases
В проекте используются алиасы. Алиасы указаны в [tsconfig.paths.json](/tsconfig.paths.json)

Для добавления нового алиса, достаточно указать его в tsconfig.paths.json и он будет сразу же работать, так как в webpack, storybook, jest настроено автоматическое распознавание алиасов на основе tsconfig.paths.json.
Алиасы настроены на все папки в корне проекта, и на все папки в слое shared и app.

```json
{
  "paths": {
    "@/*": ["./*"],
    "@public/*": ["./public/*"],
    "@_storybook/*": ["./config/storybook/*"],
    "@_jest/*": ["./config/jest/*"],
    "@_webpack/*": ["./config/webpack/*"],
    "@src/*": ["./src/*"],
	
    "@app/*": ["./src/1_FSD_app/*"],
    "@providers/*": ["./src/1_FSD_app/providers/*"],
    "@store/*": ["./src/1_FSD_app/store/*"],
    "@styles/*": ["./src/1_FSD_app/styles/*"],
    
    "@pages/*": ["./src/2_FSD_pages/*"],
    "@widgets/*": ["./src/3_FSD_widgets/*"],
    "@features/*": ["./src/4_FSD_features/*"],
    "@entities/*": ["./src/5_FSD_entities/*"],
    
    "@ui/*": ["./src/6_FSD_shared/ui/*"],
    "@constants/*": ["./src/6_FSD_shared/constants/*"],
    "@api/*": ["./src/6_FSD_shared/api/*"],
    "@assets/*": ["./src/6_FSD_shared/assets/*"],
    "@config/*": ["./src/6_FSD_shared/config/*"],
    "@customTypes/*": ["./src/6_FSD_shared/types/*"],
    "@sharedProviders/*": ["./src/6_FSD_shared/providers/*"],
    
    "@decorators/*": ["./src/6_FSD_shared/lib/decorators/*"],
    "@helpers/*": ["./src/6_FSD_shared/lib/helpers/*"],
    "@mocks/*": ["./src/6_FSD_shared/lib/mocks/*"],
    "@hooks/*": ["./src/6_FSD_shared/lib/hooks/*"]
  }
}
```

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

```bash
# Unit тесты - unit тесты, для тестирования helpers, slices, selectors. Тесты написаны на базе jest.
$ pnpm run test:unit

# RTL тесты - тесты на компоненты. Также написаны на базе Jest, запускаются вместе с остальными unit тестами.
$ pnpm run test:unit

# Скриншотные тесты - ui тесты, скриншотные тесты на основе storybook компонентов на базе приложения 
$ pnpm run test:ui
```

### 🧹 Линтеры
| Инструмент | Конфигурация                            |
|------------|-----------------------------------------|
| ESLint     | [`.eslintrc.json`](/.eslintrc.json)     |
| Stylelint  | [`.stylelintrc.js`](/.stylelintrc.js)   |
| Prettier   | [`.prettierrc.json`](/.prettierrc.json) |
