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

export function proxy(request) {
  const { pathname } = request.nextUrl
  /**
   * 1️⃣ 排除不該處理的路徑
   */
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    /\.(png|jpg|jpeg|svg|gif|webp|ico)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }

  /**
   * 2️⃣ 如果路徑已包含語系，直接放行
   */
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  /**
   * 3️⃣ 判斷語系並 redirect
   */
  const locale = getLocale(request)

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(url)
}

