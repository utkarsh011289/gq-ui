import React, { lazy, Suspense } from 'react'
import { Link, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

const Home = lazy(() => import("./Home"))
const Register = lazy(() => import("./Register"))
const Students = lazy(() => import("./Students"))

export const Menu = () => {
  return (
    <BrowserRouter>
      <Link to="home" >Home</Link>
      <Link to="register" >Register</Link>
      <Link to="students" >Students</Link>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/students" element={<Students />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
