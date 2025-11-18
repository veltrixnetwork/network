import { settings } from './settings';
import { NextResponse } from 'next/server';

export default function middleware(request) {
  if (!settings.translation_system.enabled) {
    return;
  }

  // Only allow requests to proceed, do not rewrite or redirect for locale
  // The locale will be determined from the cookie in the app logic
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};