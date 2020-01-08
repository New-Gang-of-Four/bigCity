import state from './state'
export default (prevState=state,actions)=>{
    let newData=JSON.parse(JSON.stringify(prevState) ) 
    let {type,pramas}=actions
    switch (type) {
        case 'CHANGESTATE':
            newData.tokenModal=pramas
            break;
    
        default:
            break;
    }
    return newData
}