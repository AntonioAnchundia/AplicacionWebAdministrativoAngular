import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



 export const routes: Routes = [
  // ESTO ESTABA AL PRINCIPIO
  // { path: '' , pathMatch: 'full', redirectTo: 'admin/home'},
  // { path: "signed-in-redirect", pathMatch: "full", redirectTo: "admin/home" },

  { path: '' , pathMatch: 'full', redirectTo: 'auth/login'},

  // { 
  //   path: 'admin/home', 
  //   loadChildren: ()=> import('src/app/modules/home/home.module').then((m)=> m.HomeModule)
  //   // path: "signed-in-redirect", pathMatch: "full", redirectTo: "admin/home"
  //   , ...canActivate(() => redirectUnauthorizedTo('auth/login'))
  // },

  { path: 'auth',
    loadChildren: ()=>
      import('src/app/modules/auth/auth.module').then((m)=> m.AuthModule)
  },


  //RUTAS DE ADMIN
  {
    path: 'admin',

    ...canActivate(() => redirectUnauthorizedTo('auth/login')),

    children: [
      {
        path:'home',
        loadChildren: ()=> import('src/app/modules/home/home.module').then((m)=> m.HomeModule)
      },
      {
        path: 'admin',
        loadChildren: ()=> import('src/app/modules/admin/admin.module').then((m)=>m.AdminModule)
      },
      {
        path: 'department',
        loadChildren: ()=> import('src/app/modules/department/department.module').then((m)=>m.DepartmentModule)
      },
      {
        path: 'human-resources',
        loadChildren: ()=> import('src/app/modules/human-resources/human-resources.module').then((m)=>m.HumanResourcesModule)
      },
      {
        path: 'university',
        loadChildren: ()=> import('src/app/modules/university/university.module').then((m)=>m.UniversityModule)
      },
      {
        path: 'technological',
        loadChildren: ()=> import('src/app/modules/technological/technological.module').then((m)=>m.TechnologicalModule)
      }
    ]
  }
];


