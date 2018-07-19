
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'home', component: () => import('pages/index') },
      { path: 'set-user', name: 'setuser', component: () => import('pages/SetUser') },
      { path: 'logout', name: 'logout', component: () => import('pages/LogOut') }
    ]
  },

  {
    path: '/get-mynim',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'getnim', component: () => import('pages/GetNIM') }
    ]
  },
  
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
