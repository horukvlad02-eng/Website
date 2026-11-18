# Centurion Roofing — сайт

Сайт покрівельної компанії Centurion Roofing (Маямі): 3 мови (EN `/`, ES `/es/`, FR `/fr/`),
калькулятор ціни, тест даху, форма огляду, чат із записом на огляд. Усі фото — у `public/img`.

## Запуск

Потрібен Node.js 22 (https://nodejs.org).

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # продакшн-збірка
npm test         # перевірки
```

## Vercel

1. Завантажте цю папку в репозиторій GitHub (файли мають лежати в корені репозиторію).
2. На vercel.com → **Add New → Project** → оберіть репозиторій → **Deploy**.
   Нічого міняти не треба: налаштування вже у `vercel.json`, а збірка сама робить версію для Vercel.

Деталі — у `PERENOS.md`.
