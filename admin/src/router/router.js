import React,{Component,Fragment} from 'react'
import {HashRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Login from '../pages/Login/Login'
import Admin from '../pages/Admin/Admin'
import Chart from '../pages/Chart/Chart'
import Home from '../pages/Home/Home'
class AppRouter extends Component{
    render(){
        return(
            <HashRouter>
            <NavLink to='/login'></NavLink>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/admin'render={()=>{
                    return(
                      <Admin>
                         <Switch>
                             <Route path='/admin/students' component={Chart}></Route>
                             <Route path='/admin/home' component={Home}></Route>
                         </Switch>
                      </Admin>  
                    )
                }}></Route>
            </Switch>
            
        </HashRouter>
        )
       
    }
}
export default AppRouter