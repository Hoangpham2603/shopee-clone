const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchases: '/user/purchases',
  login: '/login',
  logout: '/logout',
  register: 'register',
  productDetail: ':nameId',
  cart: '/cart'
} as const
// to make it as a constance so we cant change the value of each key

export default path
