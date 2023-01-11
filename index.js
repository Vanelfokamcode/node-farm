const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const remplaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

// FILE
//Blocking, Asynchronous way

// const text = fs.readFileSync('./txt/start.txt', 'utf-8');
// console.log(text);

// //Non-Blocking, Asynchronous way
// fs.readFile('./txt/start.txt','utf-8', (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) =>{
//     console.log(data2);
//      fs.readFile(`./txt/append.txt`,'utf-8', (err, data3) =>{
//         console.log(data3);
//     fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=> {
//         console.log('Your file have been written');
//     });
//      });
// });
// });

// SERVER
// create simple server

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const temProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
// 1

const server = http.createServer((req, res) => {
  // the query is '?id=0' and the pathname is /product
  // what we are doing here is to create two variable
  // with the query and pathname so that for each of those (query , pathname)
  // we parse different thing
  // and example query = {id: 0}
  // pathname = '/product'

  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // because the code below return an array but we want
    // a string the reason wht '.join('')' is here

    const cardHtml = dataObj
      .map((el) => remplaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardHtml);
    res.end(output);
  }

  // PRODUCT
  else if (pathname === '/product') {
    // query can be for our example '?id=number'
    // and the number is the id so for each product we've a specific
    // query+id.

    const product = dataObj[0];

    // the output is basically saying take the template product page
    // and replace each placeholder with the actual specification
    // for each product

    const output = remplaceTemplate(temProduct, product);
    res.end(output);
  }

  // API
  else if (pathname === '/api') {
    //fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8', (err, data)=> {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  }

  // Not found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not Found!</h1>');
  }
});

// listen to the requests

// 2

server.listen(8000, '127.0.0.1', () => {
  console.log('Listen to requests on port 8000');
});
