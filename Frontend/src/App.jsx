import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Master from './Layout/Master'
import Home from './User/Home'
import WebDevelopment from './User/WebDevelopment'
import UserResearch from './User/UserResearch'
import Contact from './User/Contact'
import Login from './User/Login'
import Register from './User/Register'
import Courses from './User/Courses'
import AdminMaster from './Layout/AdminMaster'
import Dashboard from './Admin/Dashboard'
import AddCategories from './Admin/AddCategories'
import ManageCategories from './Admin/ManageCategories'
import { ToastContainer } from 'react-toastify'
import AddCourse from './Admin/AddCourse'
import ManageCourse from './Admin/ManageCourse'
import UpdateCourse from './Admin/UpdateCourse'
import AddSubject from './Admin/AddSubject'
import ManageSubject from './Admin/ManageSubject'
import UpdateSubject from './Admin/UpdateSubject'
import AddMaterial from './User/AddMaterial'
import ManageMaterial from './User/ManageMaterial'
import UpdateMaterial from './User/UpdateMaterial'
import AddPlaylist from './User/AddPlaylist'
import ManagePlaylist from './User/ManagePlaylist'
import UpdatePlaylist from './User/UpdatePlaylist'
import Profile from './User/Profile'
import UpdateProfile from './User/UpdateProfile'
import ViewMaterial from './User/ViewMaterial'
import ViewPlaylist from './User/viewPlaylist'
import AdminManageMaterial from './Admin/AdminManageMaterial'
import AdminManagePlaylist from './Admin/AdminManagePlaylist'
import ManageUsers from './Admin/ManageUser'
import UserDashboard from './User/UserDashboard'
import AddRequest from './User/AddRequest'
import ManageRequest from './User/ManageRequest'
import UpdateRequest from './User/UpdateRequest'
import AdminManageRequest from './Admin/AdminManageRequest'
import ViewSubjects from './User/ViewSubjects'
import ManageQuery from './Admin/ManageQuery'
import AddRating from './User/AddRating'
import MyRatings from './User/MyRatings'
import ViewRatings from './User/ViewRating'
import AddFlashCard from './User/AddFlashCard'
import ViewFlashCard from './User/ViewFlashCard'
import ManageFlashCard from './User/ManageFlashCards'
import UpdateFlashCard from './User/UpdateFlashCardData'
import ViewMaterialDetails from './User/ViewMaterialDetail'
import ChangePassword from './User/ChangePassword'
import ViewPublicFlashCard from './User/ViewPublicFlashCard'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Master />}>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/web-development' element={<WebDevelopment />} />
            <Route path='/user-research' element={<UserResearch />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addmaterial' element={<AddMaterial />} />
            <Route path='/managematerial' element={<ManageMaterial />} />
            <Route path='/updatematerial/:id' element={<UpdateMaterial />} />
            <Route path='/addplaylist' element={<AddPlaylist />} />
            <Route path='/manageplaylist' element={<ManagePlaylist />} />
            <Route path='/updateplaylist/:id' element={<UpdatePlaylist />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/updateprofile/:id' element={<UpdateProfile />} />
            <Route path='/viewmaterial/:id' element={<ViewMaterial />} />
            <Route path='/viewmaterialdetails/:id' element={<ViewMaterialDetails />} />
            <Route path='/viewplalist/:id' element={<ViewPlaylist />} />
            <Route path='/userdashboard' element={<UserDashboard />} />
            <Route path='/addrequest/:id' element={<AddRequest />} />
            <Route path='/managerequest' element={<ManageRequest />} />
            <Route path='/updaterequest/:id' element={<UpdateRequest />} />
            <Route path='/viewsubject/:id' element={<ViewSubjects />} />
            <Route path='/addrating/:id' element={<AddRating />} />
            <Route path='/myratings' element={<MyRatings />} />
            <Route path='/viewratings' element={<ViewRatings />} />
            <Route path='/addflashcard' element={<AddFlashCard />} />
            <Route path='/viewflashcard' element={<ViewFlashCard/>} />
            <Route path='/manageflashcard' element={<ManageFlashCard/>} />
            <Route path='/updateflashcard/:id' element={<UpdateFlashCard/>} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/viewpublicflashcard' element={<ViewPublicFlashCard />} />
          
          </Route>

          <Route path='/admin' element={<AdminMaster/>}>
          <Route path='/admin' element={<Dashboard/>}/>
          <Route path='/admin/addcourse' element={<AddCourse/>}/>
          <Route path='/admin/managecourse' element={<ManageCourse/>}/>
          <Route path='/admin/updatecourse/:id' element={<UpdateCourse/>} />
          <Route path='/admin/addsubject' element={<AddSubject/>}/>
          <Route path='/admin/managesubject' element={<ManageSubject/>}/>
          <Route path='/admin/updatesubject/:id' element={<UpdateSubject/>}/>
          <Route path='/admin/addCategories' element={<AddCategories/>}/>
          <Route path='/admin/manageCategories' element={<ManageCategories/>}/>
          <Route path='/admin/manageCategories' element={<ManageCategories/>}/>
          <Route path='/admin/managematerial' element={<AdminManageMaterial/>}/>
          <Route path='/admin/manageplaylist' element={<AdminManagePlaylist/>}/>
          <Route path='/admin/manageuser' element={<ManageUsers/>}/>
          <Route path='/admin/managerequest' element={<AdminManageRequest/>}/>
          <Route path='/admin/managequery' element={<ManageQuery/>}/>

          
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
