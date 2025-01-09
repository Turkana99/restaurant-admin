const apiUrl = 'https://api.lezizrestoran.az/api/v1';

export const environment = {
  production: false,
  loginUrl: `${apiUrl}/Auth/Login`,
  resetPass: `${apiUrl}/Auth/ResetPassword`,
  
  cart: `${apiUrl}/Carts`,
  category: `${apiUrl}/Categories`,
  diningTables: `${apiUrl}/DiningTables`,
  languages: `${apiUrl}/Languages`,
  order: `${apiUrl}/Orders`,
  product: `${apiUrl}/Products`,
  subCategory: `${apiUrl}/SubCategories`,
  users: `${apiUrl}/Users`,
  OperationClaims:`${apiUrl}/OperationClaims/list-operation-claims`,
};
