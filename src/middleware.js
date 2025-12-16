// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'zh-TW']
const defaultLocale = 'zh-TW'

function getLocale(request) {
  // 1️⃣ cookie 優先
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2️⃣ Accept-Language
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const lang = acceptLanguage.split(',')[0].split('-')[0]
  return locales.includes(lang) ? lang : defaultLocale
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // 已經有語系在路徑中就放行
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getLocale(request)

  // 導向 /zh /en
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // 排除 API、靜態資源
    '/((?!api|_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)',
  ],
}
