import axios from 'axios'

class ApiService
{

    getRestaurant()
    {
        return axios.get('http://localhost:9191/restaurants')
    }

    checkIsAdmin(data){
        
        return axios.post('http://localhost:9191/checkAdmin',data)
    }

    addRestaurant(data)
    {
        
        return axios.post('http://localhost:9191/addRestaurant',data)

    }

    getRestaurantById(id)
    {
        console.log(id)
        return axios.get('http://localhost:9191/restaurantById/'+id)
    }

    deleteRestaurantById(id)
    {
        return axios.delete('http://localhost:9191/delete/'+id)
    }
    updateRestaurantById(data)
    {
        return axios.put('http://localhost:9191/update',data)
    }
    uploadImage(formData)
    {
        console.log(formData)
        return axios.post(' http://localhost:9191/upload',formData)
        
    }

}

export default new ApiService;