import _ from 'lodash';

export function pagination (items, pageNumber, pageSize){
    const startIndex = (pageNumber-1)*pageSize;
    /* _.slice(items, startIndex): This method will slice oure array starting from the startIndex 
    now we have the a new array, we go to this arrray, aand pick items for the current page
    and lodash has a method for that, which is _.take()
    we give it an array and the total numberof items we want to take from that array
    */

    //the _(items) will return a lodash object and with that we can chain all the lodash methods
    //the .value converts it to a regular array
    return _(items).slice(startIndex).take(pageSize).value();
    
}
