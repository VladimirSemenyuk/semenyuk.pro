---
type: website-build
status: published
published: 2026-11-14
created: 2026-11-11
language: ru
visibility: private
---

# Сайт — сборка RU

Статический одностраничник по [[Practice/Context|Позиционирование и метод]] и [[Practice/BRAND|BRAND.md]]; описание — в [[Practice/website/PRODUCT|PRODUCT.md]]. Пересобран 2026-11-14 под метод «Право управлять»: компактная версия на 7 экранов в визуальной территории «Доска после разбора» ([DESIGN.md](../DESIGN.md)). Только русская версия.

## Состав

- `index.html` — вся страница: разметка и стили в одном файле, немного JS для шапки и маркерных пометок.
- `talks/index.html` — страница выступлений для организаторов: слайды, темы, форматы. Стили — подмножество `index.html`, JS только для шапки (как на главной). Новое выступление: добавить `<article class="talk">`, PDF положить в `assets/files/`, обновить `llms.txt` и `lastmod` в `sitemap.xml`.
- `forum/index.html` — страница форума «Равные» (с 2026-11-24): закрытая peer-группа технических руководителей, Владимир — модератор. Отдельный продукт со своим знаком «=»; материалы и карточка продукта — `Practice/products/forum/` в vault. Стили и разметка — в одном файле, JS только для шапки и пометок маркером. Из главной ведёт подвал.
- `assets/img/og-cover.jpg` — обложка для ссылок, 1200×630; исходник — [`../og-cover.html`](../og-cover.html). Пересборка из папки `website/`:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=5000 --screenshot=og.png "file://$PWD/og-cover.html"`, затем `sips -s format jpeg -s formatOptions 88 og.png --out site/assets/img/og-cover.jpg`.
- `favicon.ico`, `site.webmanifest`, `assets/icons/` — фавикон «ВС» (Montserrat SemiBold, белое на #121212), иконки 32, 180, 192, 512.
- `assets/img/vladimir-semenyuk.jpg` — чёрно-белый портрет 880×1100 (из `Talks/2026-11-12-upskill-week/img/me.jpeg`).
- `assets/img/reviews/` — фото авторов отзывов (вырезаны из скриншота, 124×124; заменить исходниками).
- `assets/files/metanavyki-i-instrumenty.pdf` — раздатка к pmclub Upskill Week.
- `assets/files/vostrebovannost-menedzhera-v-krizis.pdf` — слайды pmclub Upskill Week (из `Talks/2026-11-12-upskill-week/v2/slides.pdf`).
- `assets/files/kogda-komanda-rastyot.pdf` — слайды воркшопа в Стратоплане 31.03.2026 (из `Talks/2026-03-31-stratoplan/slides.pdf`).
- `assets/files/kak-it-organizacii-stanovyatsya-ai-native.pdf` — слайды выступления на TechRec, разрешение на публикацию есть. С 2026-11-17 показываются на странице `talks/`; на главной нет: тема относится к технологическому консалтингу.

- `tests/` — тесты для руководителей (с 2026-11-19). Проект — [`../paei-test.md`](../paei-test.md), тексты — [`../paei-texts.md`](../paei-texts.md).
  - `tests/index.html` — список тестов. Общий код тестов в `tests/assets/`, каждое правило записано один раз, и сайт, и сборка берут его оттуда:
    - `scoring.js` — подсчёт: баллы за ответы, уровни ролей, код профиля, имя папки результата;
    - `profile.js` — показ профиля: подписи и описания, начертание кода, красная обводка, картинка для сторис и превью `og.jpg` (одни и те же функции рисования);
    - `tests.css` — оформление и цвета; картинки берут цвета из его переменных;
    - `crypto.js` — закрытая часть ссылки на результат: упаковка имени, контакта и ответов, шифрование и расшифровка;
    - `tests.js` — работа страниц: вопросы с пометками маркером, «Поделиться», страница ключа.
  - Автотесты — в `website/test/`, запуск из `website/`: `node --test 'test/*.test.mjs'`, около 5 секунд. Их же прогоняет `deploy-site.sh`. Подсчёт, шифрование, подписи, сборка `data.js` и собранные страницы проверяются в Node; страницы целиком — в Google Chrome без окна (`test/pages.test.mjs`, без Chrome пропускается). Какие кейсы чем покрыты — [`../test-cases.md`](../test-cases.md).
  - `tests/paei/` — тест PAEI: `index.html` (вступление, вопросы, контакт), `data.js` (вопросы, роли, тексты и заголовок для превью, пороги, открытый ключ), `og.jpg`.
  - `tests/paei/r/<код>/` — 65 страниц результатов с превью. Не править руками: после изменения `data.js` пересобрать из папки `website/` командой `node tools/tests-build.mjs paei` (несколько секунд, нужен Chrome) — и после правки `scoring.js`, `profile.js` или цветов в `tests.css`.
  - `tests/positions/` — тест «Из какой позиции вы управляете» (с 2026-11-21). Проект — [`../positions-test.md`](../positions-test.md). `data.js` не править руками: он собирается из [`../positions-texts.md`](../positions-texts.md) командой `node tools/positions-data.mjs`, затем `node tools/tests-build.mjs positions` — 26 страниц `r/<адрес>/`.
  - `tests/key/` — служебная страница: Владимир вставляет закрытый ключ один раз в своём браузере, после этого ссылки на результаты показывают имя, контакт и ответы. Закрытый ключ на сайт не попадает: он хранится в приватном репозитории `semenyuk.pro-src` (`keys/`), вне папки `site/`. Потерян ключ — сгенерировать новую пару, заменить `publicKey` в `data.js`; старые ссылки останутся без расшифровки.
  - Ссылки на тесты — только в подвалах (с 2026-11-21). В меню и в основном содержании главной их нет: главный вход — прямая ссылка из соцсетей.

## Подвал

Подвал одинаковый на всех страницах, кроме служебной `tests/key/` — там его нет. Правила с 2026-11-22:

1. **Три группы с подписями** — по тому, зачем человек ищет ссылку: «Сайт» → «Написать» → «Читать». Под ними копирайт «© 2026 Владимир Семенюк». На широком экране группы стоят колонками, до 560 px — друг под другом.
2. **Сайт:** Главная → Тесты → Выступления → Форум «Равные», всегда в этом порядке (форум — с 2026-11-24, адрес `/forum/` с 2026-11-25). Ссылки на текущую страницу нет. С теста и страницы результата «Тесты» ведут на список тестов.
3. **Написать:** Telegram → vladimir@semenyuk.pro. Только личная связь.
4. **Читать:** Канал «Управление и Счастье» → Instagram → LinkedIn. Для тех, кто пока не готов написать. Канал — на всех страницах (до 2026-11-22 был строкой только на главной).
5. Набор ссылок один на всех страницах. Ссылки текстовые, без логотипов.
6. **Метрика:** у каждой ссылки «Написать» и «Читать» своя цель (`tg_write`, `email_write`, `tg_channel`, `ig_profile`, `li_profile`) и место `<страница>-footer`: `home`, `talks`, `forum`, `tests` (список), `test` (тест), `result` (результат).

Где подвал задан: вручную в `index.html` (внутри финального блока `<footer>`), `talks/index.html`, `forum/index.html`, `tests/index.html`, `tests/paei/index.html`, `tests/positions/index.html`; страницы результатов — функция `footer()` в `../tools/tests-build.mjs`. Меняете правило — меняйте все семь мест, пересоберите результаты (`node tools/tests-build.mjs paei` и `positions`) и обновите проверку в `../test/pages-built.test.mjs`: она сверяет группы, состав, порядок, цели и места на каждой странице. Новая страница получает подвал по этим правилам и добавляется в ту же проверку.

## Типографика

- Неразрывные пробелы после предлогов, союзов и частиц, между числом и словом, перед тире, в «им. Баумана».
- Кавычки «ёлочки», неразрывный дефис в «ТОП‑3».
- `lang="ru"`, `text-wrap: balance` для заголовков и `pretty` для абзацев; автоматические переносы выключены.
- Шрифт: Onest (Google Fonts, кириллица). Трекинг: заголовки −3…−4%, текст −1%.

## Публикация: GitHub Pages + домен GoDaddy

Опубликован на https://semenyuk.pro 2026-11-14. Обновление: закоммитить изменения в репозитории `semenyuk.pro-src` (папка `Practice/website` vault) и запустить `./deploy-site.sh` — он выкладывает папку `site/` в репозиторий `semenyuk.pro`. Настройка ниже нужна только при переносе на новый репозиторий или домен.

**Версии файлов.** Скрипты и стили подключаются с версией по содержимому: `tests.js?v=886532d0`. Изменился файл — изменилась версия, и браузеры не берут старую копию из кеша. Версии проставляет `node tools/stamp-assets.mjs` из папки `website/` (сборка тестов делает это сама). Правили `.js` или `.css` и не пересобирали тесты — запустите эту команду перед коммитом. Если версии устарели, `deploy-site.sh` остановит публикацию и подскажет команду. Новую страницу можно писать с обычными адресами (`src="../assets/tests.js"`): версию допишет та же команда.

Домен: `semenyuk.pro` (заменяет прежний advisory-сайт). В папке уже есть `CNAME` и `.nojekyll`.

### GitHub

1. Создать публичный репозиторий, например `semenyuk.pro`.
2. Add file → Upload files → перетащить **содержимое** этой папки (не саму папку; `.DS_Store` не нужен). Скрытые `CNAME` и `.nojekyll` в Finder: Cmd+Shift+.
3. Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save.
4. Custom domain: `semenyuk.pro` → Save.

### GoDaddy → DNS → Manage DNS

Удалить старые A-записи `@` и CNAME `www`, а также Forwarding, если включён. **MX и TXT для почты не трогать.**

| Тип | Имя | Значение |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<github-логин>.github.io` |

### После

- Через 10 минут — несколько часов GitHub проверит DNS. Включить **Enforce HTTPS** в Settings → Pages.
- Рекомендуется подтвердить домен: GitHub → Settings (профиль) → Pages → Add a domain → добавить выданную TXT-запись в GoDaddy.
- Если старый сайт был в Framer, отвязать там кастомный домен.

## Аналитика: Яндекс.Метрика

Счётчик `114369053` стоит в `index.html`, `talks/index.html`, `forum/index.html` и на всех страницах `tests/` (на `tests/key/` — без Вебвизора и карты кликов, поля имени, контакта и ключа скрыты от Вебвизора классами `ym-disable-keys ym-hide-content`): код в `<head>`, `<noscript>` сразу после `<body>`. Включены Вебвизор, карта кликов, точный показатель отказов и учёт внешних ссылок. Проверено локально 2026-11-19: просмотр и цели доходят.

Кнопки Telegram в основном содержании ведут на ссылки Telegram с готовым первым сообщением (с 2026-11-24): главная (`home-nav`, `home-hero`, `home-cases`, `home-final`) — `https://t.me/m/vhmSdM8_ZGRi`, сообщение про разбор; «Равные» (`forum-nav`, `forum-hero`, `forum-pilot`, `forum-final`) — `https://t.me/m/B6ALIm6YOTIy`, сообщение про форум. Ссылки создаются в Telegram и там же меняется текст. Подвал, выступления и тесты ведут на личный профиль `https://t.me/vladimirsemenyuk` без готового текста.

Цели — JS-события. Места в подвале — по правилам раздела «Подвал». Ссылка с атрибутами `data-goal` и `data-place` при клике отправляет цель с параметром `place`:

- `tg_write` — «Написать в Telegram»: `home-nav`, `home-hero`, `home-cases`, `home-final`, `talks-nav`, `talks-final`, `forum-nav`, `forum-hero`, `forum-pilot`, `forum-final`, `*-footer`;
- `tg_channel` — переход в канал «Управление и Счастье»: `*-footer`;
- `email_write` — письмо: `home-hero`, `forum-join`, `*-footer`;
- `ig_profile` — переход в профиль Instagram: `*-footer`. Ссылка текстовая, без логотипа Instagram или Meta;
- `li_profile` — переход в профиль LinkedIn: `*-footer` (с 2026-11-22). Цель нужно создать в Метрике: JS-событие `li_profile`;
- тесты: `tg_write` с местами `test-nav`, `result-nav`, `tests-nav`; события из `tests.js` — `test_start`, `test_finish`, `test_tg_send`, `test_share`, `test_story`, `test_copy` (параметр `test` — идентификатор теста).

**Новая страница** получает счётчик сразу: скопировать из `index.html` блок от комментария `<!-- Яндекс.Метрика ... -->` до `</script>` перед `</head>` и строку `<noscript>` сразу после `<body>`. Без этого `deploy-site.sh` остановит публикацию и назовёт страницу без счётчика.

Новая кнопка связи получает те же атрибуты. В интерфейсе Метрики цели создаются вручную: «Цели → JavaScript-событие», идентификатор как выше.

Ссылки для профилей (источник визита):

- Instagram: `https://semenyuk.pro/?utm_source=instagram&utm_medium=profile`
- LinkedIn: `https://semenyuk.pro/?utm_source=linkedin&utm_medium=profile`
- Threads: `https://semenyuk.pro/?utm_source=threads&utm_medium=profile`
- Telegram-канал: `https://semenyuk.pro/?utm_source=telegram&utm_medium=channel`
- YouTube, шапка канала: `https://semenyuk.pro/?utm_source=youtube&utm_medium=profile`
- YouTube, описание выпуска: `https://semenyuk.pro/?utm_source=youtube&utm_medium=video&utm_campaign=<дата-тема>`
- Ссылка в конкретном посте: добавить `&utm_campaign=<дата-тема>`, например `2026-11-23-delegirovanie`.

Ссылка `t.me/vladimirsemenyuk` не передаёт источник, поэтому на вводном звонке спрашивать «откуда узнали» и записывать ответ в карточку лида.

## Открытые вопросы

- EN-версия — позже.
