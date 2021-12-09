import Vue from 'vue'
import Router from 'vue-router'
import Whoops from "../views/Whoops";
import Home from "../views/Home";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import {store} from "../store";
import Practice from "../views/Practice";
import Student from "../views/Student";
import Homework from "../views/Homework";
import EducationalPortfolio from "../views/EducationalPortfolio";
import ExtracurricularPortfolio from "../views/ExtracurricularPortfolio";
import ProjectWork from "../views/ProjectWork";
import Questionnaire from "../views/Questionnaire";
import Docs from "../views/Docs";
import Reference from "../views/Reference";
import Holiday from "../views/Holiday";
import Libraries from "../views/Libraries";
import Support from "../views/Support";
import Profile from "../views/Profile";
import Files from "../views/Files";
import HomeworkView from "../views/HomeworkView";
import test from "../views/test";
import AdminPanel from "../views/AdminPanel";
import NewsCreate from "../views/NewsCreate";
import HomeworkCreate from "../views/HomeworkCreate";
import NewsView from "../views/NewsView"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/view-news',
      name: 'NewsView',
      component: NewsView,
      beforeEnter: AuthGuard
    },
    {
      path: '/practice',
      name: 'Practice',
      component: Practice,
      beforeEnter: AuthGuard
    },
    {
      path: '/student',
      name: 'Student',
      component: Student,
      beforeEnter: AuthGuard
    },
    {
      path: '/homework',
      name: 'Homework',
      component: Homework,
      children: [
        // {
        //   path: 'create',
        //   name: 'CreateHomework',
        //   component: CreateHomework,
        // },
      ],
      beforeEnter: AuthGuard
    },
    {
      path: '/homework/create',
      name: 'HomeworkCreate',
      component: HomeworkCreate,
      beforeEnter: AuthGuard
    },
    {
      path: '/homework/view/:id',
      name: 'HomeworkView',
      component: HomeworkView,
      beforeEnter: AuthGuard
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      children: [
        {
          path: 'educational',
          name: 'EducationalPortfolio',
          component: EducationalPortfolio,
        },
        {
          path: 'extracurricular',
          name: 'ExtracurricularPortfolio',
          component: ExtracurricularPortfolio,
        },
      ],
      beforeEnter: AuthGuard
    },
    {
      path: '/project_work',
      name: 'ProjectWork',
      component: ProjectWork,
      beforeEnter: AuthGuard
    },
    {
      path: '/requests',
      name: 'Requests',
      children: [
        {
          path: 'questionnaire',
          name: 'Questionnaire',
          component: Questionnaire,
        },
        {
          path: 'docs',
          name: 'Docs',
          component: Docs,
        },
        {
          path: 'reference',
          name: 'Reference',
          component: Reference,
        },
        {
          path: 'holiday',
          name: 'Holiday',
          component: Holiday,
        },
      ],
      beforeEnter: AuthGuard
    },
    {
      path: '/libraries',
      name: 'Libraries',
      component: Libraries,
      beforeEnter: AuthGuard
    },
    {
      path: '/support',
      name: 'Support',
      component: Support,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/files',
      name: 'Files',
      component: Files,
      beforeEnter: AuthGuard
    },
    {
      path: '/test',
      component: test,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin-panel',
      name: 'Admin',
      component: AdminPanel,
      children: [
        {
          path: 'news-create',
          name: 'NewsCreate',
          component: NewsCreate,
        }
      ]
    },
    {
      path: '*',
      component: Whoops
    },
  ]
})
function AuthGuard(from,to,next) {
  if (store.getters.isUserAuthenticated) next()
  else next('/signin')
}
// function AdminGuard(from,to,next) {
//   if (store.getters.user.status === 'Administrator') next()
//   else from();
// }
