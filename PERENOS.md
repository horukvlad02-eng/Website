# Перенос сайту Centurion Roofing (GitHub + Vercel)

Це повна копія сайту: код + усі 34 фотографії (`public/img`). Сайт не тягне нічого з Lovable,
крім пересилання заявок (див. нижче).

## 1. GitHub

- Створіть новий репозиторій і завантажте **вміст** цієї папки (щоб `package.json` лежав у корені,
  а не всередині ще однієї папки).
- Через сайт GitHub: **Add file → Upload files** → перетягніть усі файли й папки.
- Або з комп'ютера:
  ```sh
  git init
  git add .
  git commit -m "Centurion Roofing v16"
  git branch -M main
  git remote add origin https://github.com/ВАШ-ЛОГІН/centurion-roofing.git
  git push -u origin main
  ```

## 2. Vercel

- vercel.com → **Add New → Project** → **Import** ваш репозиторій → **Deploy**.
- Нічого не змінюйте в налаштуваннях: команда встановлення `npm install`, збірка `npm run build`
  (вже прописано у `vercel.json`). Збірка сама готує версію для Vercel.
- Змінні середовища вписувати не потрібно.

## Заявки й пошта

Форма огляду, калькулятор і запис через чат на Vercel працюють так: сайт пересилає заявку на
основний сайт `https://roofingcenturionmiami.lovable.app`, там вона зберігається в базі й
приходить листом на **horukvlad02@gmail.com**.

- Тому основний сайт на Lovable має бути **опублікований** з останньою версією.
- Якщо адреса основного сайту зміниться — на Vercel у **Settings → Environment Variables**
  додайте `LEADS_API_URL` з новою адресою і зробіть **Redeploy**.

## Локальний запуск

Потрібен Node.js 22.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build
npm test
npm run lint
```

## Що де лежить

- `src/routes/{-$locale}/` — сторінки; `src/routes/api/public/` — прийом заявок
- `src/content/` — усі тексти трьома мовами (слова, ціни, телефони)
- `src/components/` — блоки сторінок; `src/components/motion/` — анімації
- `src/lib/site.ts` — телефон, графік, адреса сайту; `src/lib/notify.server.ts` — пошта
- `public/img/` — фото, `public/og/` — картинки для соцмереж, `public/sitemap.xml`, `public/robots.txt`

## Якщо зміните домен

Правте `SITE.url` у `src/lib/site.ts`, домени в `src/lib/seo.ts`, `public/sitemap.xml`
і `src/content/meta.ts`.

## Що додано у версії 16.2 (Vercel)

- **Швидкість:** сторінки кешуються на CDN Vercel (5 хв + фонове оновлення), фото й іконки — у
  кеші браузера на тиждень. Усе «живе» (відчинено зараз, днів до кінця сезону) рахується в браузері,
  тож кеш нічого не ламає.
- **Безпека:** заголовки HSTS, nosniff, захист від вбудовування в чужі сайти, Referrer/Permissions-Policy.
- **Аналітика:** Vercel Web Analytics + Speed Insights (без cookie). Увімкніть у проєкті Vercel
  вкладки **Analytics** та **Speed Insights** → Enable. Рахуються кліки по телефону (`phone_click`)
  і заявки (`generate_lead`) — власні події видно на тарифі Pro.
- **Доступність:** посилання «Перейти до вмісту» для клавіатури, рівні переноси в заголовках.
- **SEO:** виправлено посилання на картинку в розмітці Schema.org. Індексація пошуковиками вимкнена,
  доки сайт на тимчасовій адресі; на власному домені — `indexable: true` у `src/lib/site.ts` і
  `Allow: /` у `public/robots.txt`.

## Режим «концепт» (до домовленості з Centurion Roofing)

- `demo: true` у `src/lib/site.ts`: зверху плашка «концепт редизайну — не офіційний сайт;
  заявки з демо отримує розробник, а не компанія». Форми й чат-запис працюють: заявка йде на
  Lovable-сайт і приходить листом на horukvlad02@gmail.com (тому сайт на Lovable має бути опублікований).
- Коли компанія погодиться і сайт стане їхнім: `demo: false`, отримувач листів — їхня пошта
  (`src/lib/notify.server.ts`), база — їхня (або власний LEADS_API_URL), потім Redeploy.
