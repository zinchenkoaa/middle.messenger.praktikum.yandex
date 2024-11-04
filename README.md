Sparkit messanger

Netlify - [https://sparkit-messanger.netlify.app]

Макет проекта за основу взят макет Яндекс Практикум: https://www.figma.com/file/X9BGH23POw0LJj99qr6Sl8/messenger

Для запуска проекта: 
npm run start

Запуск локально: 
npm run start
Чтобы собрать проект: 
npm run build
Запуск eslint
npm run lint -- --fix

Внесённые изменения
Проект переведён на TypeScript
Добавлены ESLint и Stylelint для проверки кода и стилей
Компоненты Input и Button теперь наследуются от базового класса Block и используют EventBus для управления событиями
Реализована валидация для страниц авторизации, регистрации и настройки профиля
Добавлена валидация полей ввода на события blur, focus, input
Валидация всей формы на событие submit с выводом введённых данных в консоль

Страницы: 
/ 
/registration 
/chat
/profile
/profile-edit 
/password-edit
/500  
/404
