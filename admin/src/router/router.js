import React,{Component,Fragment} from 'react'
import {getItem} from '../Utils/webStorages'
import {HashRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Login from '../pages/Login/Login'
import Admin from '../pages/Admin/Admin'

import Home from '../pages/Home/Home'
import GoodsList from '../pages/Goods/List/List'
import GoodsAdd from '../pages/Goods/Add/Add'
import GoodsDel from '../pages/Goods/Del/Del'
import GoodsUpdate from '../pages/Goods/Update/Update'
import CharsBin from '../Chars/bin'
import CharsZhu from '../Chars/zhu'
class AppRouter extends Component{
    render(){
        return(
            <HashRouter>
            <NavLink to='/login'></NavLink>
            <Switch>
                {getItem('token')?<Redirect exact from ='/' to='/admin/home'></Redirect>:<Redirect exact from ='/' to='/login'></Redirect>}
                <Route path='/login' component={Login}></Route>
                <Route path='/admin'render={()=>{
                    return(
                      <Admin>
                         <Switch>
                             <Route path='/admin/home' component={Home}></Route>
                             <Route path='/admin/chars/bin' component={CharsBin}></Route>
                             <Route path='/admin/goods/list' component={GoodsList}></Route>
                            <Route path='/admin/goods/add' component={GoodsAdd}></Route>
                            <Route path='/admin/goods/del' component={GoodsDel}></Route>
                            <Route path='/admin/goods/update' component={GoodsUpdate}></Route>
                            <Route path='/admin/chars/bin' component={CharsBin}></Route>
                            <Route path='/admin/chars/zhu' component={CharsZhu}></Route>
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