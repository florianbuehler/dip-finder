import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token');

  console.log('middleware')
  console.log(token)

  // user is logged in
  // TODO validate token
  if (token) {
    return NextResponse.next();
  }


  // user is not logged in
  // if the user want to visit a different page than the login register page
  // or requests a resource not needed for the login flow, we should let him through
  // otherwise we need to redirect him to the login page
  if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname.includes('/_next/static') ||
    pathname.includes('/api/auth')
  ) {
    return NextResponse.next();
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/login';

  return NextResponse.redirect(redirectUrl);
};
