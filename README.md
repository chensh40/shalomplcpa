# שלום פרץ ולינה רואי חשבון - אתר תדמית

אתר תדמית מקצועי למשרד רואי חשבון שלום פרץ ולינה, חיפה.

## טכנולוגיה
- HTML5 + CSS3 + Vanilla JavaScript
- ללא frameworks
- RTL מלא
- Dark/Light mode
- רספונסיבי לכל מסך

## מבנה הפרויקט
```
├── index.html          # עמוד ראשי
├── style.css           # עיצוב
├── script.js           # פונקציונליות
├── assets/
│   ├── images/         # תמונות
│   │   └── logo.png    # לוגו המשרד
│   └── icons/          # אייקונים
├── sitemap.xml         # מפת אתר
├── robots.txt          # הנחיות לבוטים
└── README.md           # קובץ זה
```

## לפני דפלוי

### 1. הגדרת טופס צור קשר
בקובץ `index.html`, החליפו את `YOUR_FORM_ID` ב-action של הטופס:
- **Formspree**: נרשמו ב-[formspree.io](https://formspree.io), צרו טופס, והחליפו את ה-ID
- **Netlify Forms**: הוסיפו `data-netlify="true"` לתגית `<form>` והסירו את ה-action

### 2. מפת Google
החליפו את ה-iframe src של המפה בקוד embed אמיתי מ-Google Maps עם הכתובת המדויקת.

### 3. תמונות
- שמרו את הלוגו כ-`assets/images/logo.png`
- החליפו placeholders בתמונות אמיתיות

---

## דפלוי ב-Cloudflare Pages

### שלב 1: העלאה ל-GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/shalomplcpa.git
git push -u origin main
```

### שלב 2: חיבור Cloudflare Pages
1. היכנסו ל-[dash.cloudflare.com](https://dash.cloudflare.com)
2. לכו ל-**Workers & Pages** > **Create application** > **Pages**
3. בחרו **Connect to Git** וחברו את ה-repository
4. הגדרות Build:
   - **Framework preset**: None
   - **Build command**: (השאירו ריק)
   - **Build output directory**: `/`
5. לחצו **Save and Deploy**

### שלב 3: חיבור דומיין מ-Porkbun
1. ב-Cloudflare Pages, לכו ל-**Custom domains** > **Set up a domain**
2. הזינו `www.shalomplcpa.com` ואת `shalomplcpa.com`
3. ב-Porkbun, שנו את ה-Nameservers ל-Cloudflare:
   - `NS1: xxx.ns.cloudflare.com`
   - `NS2: xxx.ns.cloudflare.com`
   (הערכים המדויקים יופיעו ב-Cloudflare)
4. לחלופין, הוסיפו CNAME record ב-Porkbun:
   - **Type**: CNAME
   - **Host**: www
   - **Answer**: `shalomplcpa.pages.dev`
   - **Type**: CNAME
   - **Host**: @ (root)
   - **Answer**: `shalomplcpa.pages.dev`

### SSL
Cloudflare Pages מספק SSL אוטומטית - אין צורך בהגדרה נוספת.

---

## דפלוי ב-Netlify

### שלב 1: העלאה
1. היכנסו ל-[app.netlify.com](https://app.netlify.com)
2. גררו את תיקיית הפרויקט לאזור ה-deploy (או חברו GitHub)

### שלב 2: חיבור דומיין
1. ב-Netlify, לכו ל-**Domain settings** > **Add custom domain**
2. הזינו `shalomplcpa.com`
3. ב-Porkbun, הוסיפו:
   - **CNAME**: `www` → `YOUR-SITE.netlify.app`
   - **A record**: `@` → `75.2.60.5`
4. הפעילו **HTTPS** ב-Netlify (אוטומטי עם Let's Encrypt)

### טפסים ב-Netlify
הוסיפו `data-netlify="true"` לתגית הטופס:
```html
<form class="contact-form" data-netlify="true" name="contact">
```

---

## דפלוי ב-GitHub Pages

1. ב-GitHub, לכו ל-**Settings** > **Pages**
2. בחרו **Source**: Deploy from a branch
3. בחרו **Branch**: main, **Folder**: / (root)
4. הוסיפו Custom domain ב-Settings

---

## רישיון
כל הזכויות שמורות © שלום פרץ ולינה רואי חשבון
