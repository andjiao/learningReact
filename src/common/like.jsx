
const Like = (props) => {
    //to move code together mark all and then press option + up-arrow
    let classes = "fa fa-heart";
if(!props.liked) classes+="-o";

return (
   /*When setting it to this.onClick we are raising it to another 
   custom event called onClick, we could also call it something else like likeToggleHandler */
    <i onClick ={props.onClick} style ={{cursor:'pointer'}} className = {classes} aria-hidden ="true"></i>
    ); 
};
 
export default Like;