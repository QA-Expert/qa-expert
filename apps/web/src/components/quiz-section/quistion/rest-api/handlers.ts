import { RestApiRequestData } from './rest-api';

export const getFullUrl = (data: RestApiRequestData) => {
  const { host, protocol, params } = data;
  const newUrl = new window.URL(`${protocol}://${host}`);

  params.forEach((param) => {
    newUrl.searchParams.append(param.name, param.value);
  });

  return newUrl.toString();
};
