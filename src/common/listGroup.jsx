const ListGroup = (props) => {
    const {items, textProperty, valueProperty, selectedItem, onItemSelect } = props;
    return <ul className="list-group">
        {items.map(item => <li 
        onClick = {()=> onItemSelect(item)}
        key ={item[valueProperty]} 
        className={item === selectedItem ? "list-group-item active": "list-group-item"}> 
        {item[textProperty]}</li>
            )}
        
    </ul>
    
    ;
}

//setting the default value, it an object does not have these values, we can override these values
ListGroup.defaultProps={
    textProperty:'name',
    valueProperty:'_id'
}
 
export default ListGroup;