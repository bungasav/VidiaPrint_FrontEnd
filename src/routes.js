import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}


const Upload = Loadable({
  loader: () => import('./views/Upload'),
  loading: Loading,
});
 

const verif = Loadable({
  loader: () => import('./views/Verification'),
  loading: Loading,
});

const trans = Loadable({
  loader: () => import('./views/Transaction'),
  loading: Loading,
});

const routes = [
  { path: '/upload', name: 'Upload', component: Upload },
  { path: '/verification', name: 'Verification', component: verif },
  { path: '/transaction', name: 'Transaction', component: trans },
];

export default routes;
