import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("@/views/home/Home")
const Classify = () => import("@/views/category/Classify")
const Profile = () => import("@/views/profile/Profile")
const ShoppingCart = () => import("@/views/cart/ShoppingCart")

Vue.use(Router)

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/category',
    component: Classify
  },
  {
    path: '/shop',
    component: ShoppingCart
  },
  {
    path: '/profile',
    component: Profile
  }

]
const router = new Router({
  mode: "history",
  routes: routes,
})

export default router

