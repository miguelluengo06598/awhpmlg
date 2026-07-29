// Test de la lógica de resolución de idioma (lib/locale.ts).
//   node --experimental-strip-types scripts/sectests/i18n_locale.test.mjs
import {
  resolveLocale, countryToLocale, acceptLanguageToLocale, coerceLocale,
  isLocale, localizePath, stripLocalePrefix, localeFromPath,
} from '../../lib/locale.ts'

let pass = 0, fail = 0
const eq = (name, got, exp) => {
  const ok = JSON.stringify(got) === JSON.stringify(exp)
  console.log(`  ${ok ? '✅' : '❌'} ${name} → ${JSON.stringify(got)}${ok ? '' : ' (esperado ' + JSON.stringify(exp) + ')'}`)
  ok ? pass++ : fail++
}

console.log('\n🌐 lib/locale — resolución de idioma\n')

// Whitelist (seguridad): solo es/en/pt
eq('isLocale("pt")', isLocale('pt'), true)
eq('isLocale("de")', isLocale('de'), false)
eq('isLocale("../../etc")', isLocale('../../etc'), false)
eq('coerceLocale("../../secret")', coerceLocale('../../secret'), 'es')

// País → idioma
eq('country PT → pt', countryToLocale('PT'), 'pt')
eq('country BR → pt', countryToLocale('br'), 'pt')
eq('country ES → es', countryToLocale('ES'), 'es')
eq('country MX → es', countryToLocale('MX'), 'es')
eq('country US → en', countryToLocale('US'), 'en')
eq('country FR → en', countryToLocale('FR'), 'en')
eq('country vacío → null', countryToLocale(''), null)

// Accept-Language
eq('AL "pt-BR,es;q=0.8" → pt', acceptLanguageToLocale('pt-BR,es;q=0.8'), 'pt')
eq('AL "de,en;q=0.5" → en', acceptLanguageToLocale('de-DE,en;q=0.5'), 'en')
eq('AL "fr" → null', acceptLanguageToLocale('fr-FR'), null)

// Prioridad: cookie > país > accept-language > default
eq('cookie gana sobre país', resolveLocale({ cookie: 'es', country: 'PT', acceptLanguage: 'en' }), 'es')
eq('cookie inválida se ignora → país', resolveLocale({ cookie: 'xx', country: 'PT' }), 'pt')
eq('sin cookie → país (BR)', resolveLocale({ country: 'BR', acceptLanguage: 'en-US' }), 'pt')
eq('sin país → accept-language', resolveLocale({ country: null, acceptLanguage: 'pt-PT,es;q=0.9' }), 'pt')
eq('nada → default es', resolveLocale({}), 'es')

// Rutas
eq('localizePath("/about","pt")', localizePath('/about', 'pt'), '/pt/about')
eq('localizePath("/","pt")', localizePath('/', 'pt'), '/pt')
eq('localizePath("/en/about","es")', localizePath('/en/about', 'es'), '/about')
eq('stripLocalePrefix("/pt/contact")', stripLocalePrefix('/pt/contact'), '/contact')
eq('localeFromPath("/pt/x")', localeFromPath('/pt/x'), 'pt')

console.log(`\n──────── ${pass}/${pass + fail} PASS ────────\n`)
process.exit(fail ? 1 : 0)
