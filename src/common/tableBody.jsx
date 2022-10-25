import React, { Component } from 'react';
import _ from 'lodash';
/* comment on <td>: bracket notation only works for simple properties
        If we are dealing with nests of properties the bracket-notations does not work
        in this app one of the proeprties are genre.name therefor we can't use bracket-notation
        instead we use lodash.get, where we pass oure object and target that can be nested  */

class TableBody extends Component {
    renderCell = (item,column)=>{
        if(column.content) return column.content(item);

        return _.get(item, column.path);
    };

    createKey = (item, column) =>{
        return item._ + (column.path || column.key);

    };
    render() { 
        const {data, columns} = this.props;
        return ( <tbody>
            {data.map(item => (
                  <tr key ={item._id}>
                      {columns.map(column => (
                      <td key ={this.createKey(item, column)}>
                          {this.renderCell(item, column)}
                          </td>
                          ))} 
                          </tr>
                  ))}
             </tbody>
             );
    };
}
 
export default TableBody;


