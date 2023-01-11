    module.exports = (temp, product) => {

    // product is an array with different spec 
    // temp stand for template take the template and the real 
    // product in the JSON file and replace from the temp each
    // placeholder with the actual thing 

   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);

    // if the product is not organic meaning the booleen is false
    // replace the placeholder NOTORGANIC which is a classname 
    // so that the CSS can be applied with the '.not-organic' basically


    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }
    return output;
}