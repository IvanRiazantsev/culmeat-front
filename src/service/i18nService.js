import i18n from '../i18n'

export default function switchLanguage() {
    const currentLang = i18n.language;
    switch (currentLang) {
        case 'en':
            localStorage.setItem("currentLanguage", "ua");
            i18n.changeLanguage('ua');
            break;
        case 'ua':
            localStorage.setItem("currentLanguage", "en");
            i18n.changeLanguage('en');
            break;
    }
}
