import { Routes } from '@angular/router';

import { Home } from './app/pages/home/home';
import { LoginComponent } from './app/pages/login/login';
import { RegisterComponent } from './app/pages/register/register';
import { NotFound } from './app/pages/not-found/not-found';

import { Dashboard } from './app/pages/dashboard/dashboard';
import { BetList } from './app/pages/dashboard/bet-list/bet-list';
import { BetForm } from './app/pages/dashboard/bet-form/bet-form';
import { BetDetail } from './app/pages/dashboard/bet-detail/bet-detail';
import { RoundList } from './app/pages/dashboard/round-list/round-list';
import { RoundForm } from './app/pages/dashboard/round-form/round-form';
import { RoundDetail } from './app/pages/dashboard/round-detail/round-detail';
import { RoundResult } from './app/pages/dashboard/round-result/round-result';
import { Profile } from './app/pages/dashboard/profile/profile';
import { AddBalance } from './app/pages/dashboard/add-balance/add-balance';
import { UserList } from './app/pages/dashboard/admin/user-list/user-list';
import { UserDetail } from './app/pages/dashboard/admin/user-detail/user-detail';
import { RoundSpin } from './app/pages/dashboard/admin/round-spin/round-spin';

import { authGuard } from './app/core/guards/auth-guard';
import { roleGuard } from './app/core/guards/role-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', component: BetList },                         // /dashboard
      { path: 'bets/new', component: BetForm },                 // /dashboard/bets/new
      { path: 'bets/:id', component: BetDetail },               // /dashboard/bets/:id
      { path: 'rounds', component: RoundList },                 // /dashboard/rounds
      { path: 'rounds/new', component: RoundForm, canActivate: [roleGuard] }, // admin
      { path: 'rounds/:id', component: RoundDetail },           // /dashboard/rounds/:id
      { path: 'rounds/:id/result', component: RoundResult },    // /dashboard/rounds/:id/result
      { path: 'profile', component: Profile },                  // /dashboard/profile
      { path: 'balance/add', component: AddBalance },           // /dashboard/balance/add

      // admin
      { path: 'admin/users', component: UserList, canActivate: [roleGuard] },
      { path: 'admin/users/:id', component: UserDetail, canActivate: [roleGuard] },
      { path: 'users/:id/spin', component: RoundSpin, canActivate: [roleGuard] },
    ],
  },

  { path: '**', component: NotFound },
];
