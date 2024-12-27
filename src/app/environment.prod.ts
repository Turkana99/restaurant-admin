const apiUrl = 'http://188.245.226.20:8080/api/v1'; 

export const environment = {
  production: true,
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
};
