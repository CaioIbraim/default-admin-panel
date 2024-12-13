import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname
  const res = NextResponse.next()
  const req = request

  try {
    const supabase = createMiddlewareClient({ req, res })
    const session = await supabase.auth.getSession()
    console.log("Sessão ",session)



    
  // Base URL should be set in environment variable or hardcoded
  const baseUrl = process.env.BASE_URL || '/';  // Replace with your actual base URL
  
  // Get the URL from getUrl function
  const authUrl = getUrl('/auth');
  console.log('getUrl result:', authUrl);  // Log the result of getUrl
  
  // Check if the URL is valid
  try {

    /*

      if (!authUrl || !authUrl.startsWith('/')) {
        throw new Error('Invalid URL returned from getUrl');
      }

      if (pathname === '/auth' && token) {
        return NextResponse.redirect(new URL(authUrl, baseUrl));
      }

   

    if (pathname.includes('/app') && !token) {
      return NextResponse.redirect(new URL(authUrl, baseUrl));
    }
   */
    if (pathname.includes('/inicio') && !token) {
      return NextResponse.redirect(new URL(authUrl, baseUrl));
    }

  } catch (error) {
    console.error("Error creating the redirect URL:", error);
    return res;  // In case of an error, proceed normally without redirection
  }



  } catch (error) {
    console.log("middleware", error)
  }
 

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
