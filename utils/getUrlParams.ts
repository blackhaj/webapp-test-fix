import type { NextRequest } from 'next/server';

export const getUrlParams = (req: NextRequest) => {
  const urlSearchParams = new URLSearchParams(req.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};

export default getUrlParams;
