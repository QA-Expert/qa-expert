function removeTrailingSlashes(pathname: string) {
  if (pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 *
 * @url https://gist.github.com/tomfa/f925366cd036bb0d4af5bbd8397c84ae
 */
export const matchesPathname = (
  expectedPathname: string,
  actualPathname: string,
) => {
  if (expectedPathname === actualPathname) {
    return true;
  }

  const baseAsPath = removeTrailingSlashes(
    expectedPathname.split('?')[0] as string,
  );
  const basePathname = removeTrailingSlashes(
    actualPathname.split('?')[0] as string,
  );

  if (baseAsPath === basePathname) {
    return true;
  }

  const basePathRegex = new RegExp(
    `^${basePathname.replace(
      /(\[[a-zA-Z0-9-]+\])+/g,
      '[a-zA-Z0-9-]+',
    )}$`.replace(/\[+\.\.\.[a-zA-Z0-9-]+\]+/g, '?.*'),
  );

  if (basePathRegex.test(baseAsPath)) {
    return true;
  }

  return false;
};
