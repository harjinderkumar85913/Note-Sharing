import axios  from "axios"
import * as qs from "qs"

const BASE_URL = "http://localhost:4001/api/"
 export const BASE_IMAGE_URL = "http://localhost:4001/"

class apiServices{
  getToken(){
    let obj={
        authorization:sessionStorage.getItem("token")
    }
    console.log(obj)
    return obj

} 

    login(data){
        return axios.post(BASE_URL + "user/login",data)
    }

    changePassword(data){
      return axios.post(BASE_URL + "user/changepassword",data,{headers:this.getToken()})
    }

    register(data){
        return axios.post(BASE_URL + "customer/register",data,{
            Headers:{
              "Content-Type":"multipart/form-data"
            }
          })
    }

    //course
    addCourse(data){
      return axios.post(BASE_URL + "course/add",data,{headers:this.getToken()})
    }

    getallCourse(data){
      return axios.post(BASE_URL + "course/getall",qs.stringify(data))
    }

    deleteCourseData(data){
      return axios.post(BASE_URL + "course/delete",qs.stringify(data))
    }
    getsingleCourseData(data){
      return axios.post(BASE_URL + "course/getsingle",qs.stringify(data))
    }
    updateCourseData(data){
      return axios.post(BASE_URL + "course/update",data,{headers:this.getToken()})
    }

    updateStatusCourseData(data){
      return axios.post(BASE_URL + "course/updatestatus",data,{headers:this.getToken()})
    }

    //subject

    addsubjectData(data){
      return axios.post(BASE_URL + "subject/add",data,{headers:this.getToken()})
    }
    getallSubjectData(data){
      return axios.post(BASE_URL + "subject/getall",qs.stringify(data))
    }

    deleteSubjectData(data){
      return axios.post(BASE_URL + "subject/delete",qs.stringify(data))
    }

    getsingleSubjectData(data){
      return axios.post(BASE_URL + "subject/getsingle",qs.stringify(data))
    }
    updatesubjectData(data){
      return axios.post(BASE_URL + "subject/update",data,{headers:this.getToken()})
    }
    updatesubjectStatus(data){
      return axios.post(BASE_URL + "subject/updatestatus",data,{headers:this.getToken()})
    }

    //material
    addmaterialData(data){
      return axios.post(BASE_URL + "material/add",data,{headers:this.getToken()})
    }

    getallMaterialData(data){
      return axios.post(BASE_URL + "material/getall",qs.stringify(data))
    }
    deleteMaterialData(data){
      return axios.post(BASE_URL + "material/delete",qs.stringify(data),{headers:this.getToken()})
    }

    getsingleMaterialData(data){
      return axios.post(BASE_URL + "material/getsingle",qs.stringify(data))
    }

    updatematerialData(data){
      return axios.post(BASE_URL + "material/update",data,{headers:this.getToken()})
    }

    updateMaterialStatus(data){
      return axios.post(BASE_URL + "material/updatestatus",data,{headers:this.getToken()}) 
    }

    updateMaterialRequestStatus(data){
      return axios.post(BASE_URL + "material/updaterequest",data,{headers:this.getToken()}) 
    }


    //playlist
    addPlaylistData(data){
      return axios.post(BASE_URL + "playlist/add",data,{headers:this.getToken()})
    }

    getallPlaylistData(data){
      return axios.post(BASE_URL + "playlist/getall",qs.stringify(data))
    }
  deletePlaylistData(data){
      return axios.post(BASE_URL + "playlist/delete",qs.stringify(data),{headers:this.getToken()})
    }
    getsinglePlaylistData(data){
      return axios.post(BASE_URL + "playlist/getsingle",qs.stringify(data))
    }
    updatePlaylistData(data){
      return axios.post(BASE_URL + "playlist/update",data,{headers:this.getToken()})
    }

    updatePlaylistStatus(data){
      return axios.post(BASE_URL + "playlist/updatestatus",data,{headers:this.getToken()}) 
    }

    //customer

    getsinglecustomerProfile(data){
      return axios.post(BASE_URL + "customer/getsingle",qs.stringify(data))
    }

    updateCustomerProfile(data){
      return axios.post(BASE_URL + "customer/update",data,{headers:this.getToken()})
    }
    getallCustomers(data){
      return axios.post(BASE_URL + "customer/getall",qs.stringify(data))
    }

    updateCustomerStatus(data){
      return axios.post(BASE_URL + "customer/updatestatus",{headers:this.getToken()})
    }

    //user

    userUpdateStatus(data){
      return axios.post(BASE_URL + "user/updatestatus",data,{headers:this.getToken()})
    }


    //request

    addRequestData(data){
      return axios.post(BASE_URL + "request/add",data,{headers:this.getToken()})
    }

    getallRequestData(data){
      return axios.post(BASE_URL + "request/getall",qs.stringify(data))
    }
    deleteRequestData(data){
      return axios.post(BASE_URL + "request/delete",qs.stringify(data),{headers:this.getToken()})
    }
    getsingleRequestData(data){
      return axios.post(BASE_URL + "request/getsingle",qs.stringify(data))
    }

    updateRequestData(data){
      return axios.post(BASE_URL + "request/update",data,{headers:this.getToken()})
    }
    updateRequestStatus(data){
      return axios.post(BASE_URL + "request/updatestatus",data,{headers:this.getToken()})
    }

    //query

    addQuery(data){
      return axios.post(BASE_URL + "query/add",data)
    
    }
    getallQuery(data){
      return axios.post(BASE_URL + "query/getall",data)
    
    }

    //rating

    addratingData(data){
      return axios.post(BASE_URL + "rating/add",data,{headers:this.getToken()})
    }

    getallRatingData(data){
      return axios.post(BASE_URL + "rating/getall",qs.stringify(data))
    }

    //flashcard

    addFlashCard(data){
      return axios.post(BASE_URL + "flashcard/add",data,{headers:this.getToken()})
    }
    getallFlashCard(data){
      return axios.post(BASE_URL + "flashcard/getall",qs.stringify(data))
    }

    deleteFlashCardData(data){
      return axios.post(BASE_URL + "flashcard/delete",qs.stringify(data),{headers:this.getToken()})
    }
    getsingleFlashCard(data){
      return axios.post(BASE_URL + "flashcard/getsingle",qs.stringify(data))
    }

    updateFlashCard(data){
      return axios.post(BASE_URL + "flashcard/update",data,{headers:this.getToken()})
    }

}

export default new apiServices;