export const accessTokenPactumKey = 'accessToken';
export const bearerAuth = {
  Authorization: `Bearer $S{${accessTokenPactumKey}}`,
};
export const responseBodyPactumKey = 'res.body';
