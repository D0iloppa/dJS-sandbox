import http from "http";
import https from "https";

import express from "express";


const d_Conf = {
  // @ do-zoom's Protocol
  "protocol" : "http",
  // @ do-zoom's domain
  "domain" : "127.0.0.1",
  // @ do-zoom's http port
  "port" : 3939,
  // @ do-zoom's https port (secure)
  "ssl_Port" : 443,
  // @ do-zoom's cert directory
  "cert_Path" : "/ssl/"
};


const d_Server = express();
/**
 * [view,static resources] set-up
 */
d_Server.set('view engine', "pug");
d_Server.set("views",__dirname + "/views");
d_Server.use("/public",express.static(__dirname + "/public"));

/**

                                                                                                                 
8 888888888o.       ,o888888o.     8 8888      88 8888888 8888888888  8 8888 b.             8      ,o888888o.    
8 8888    `88.   . 8888     `88.   8 8888      88       8 8888        8 8888 888o.          8     8888     `88.  
8 8888     `88  ,8 8888       `8b  8 8888      88       8 8888        8 8888 Y88888o.       8  ,8 8888       `8. 
8 8888     ,88  88 8888        `8b 8 8888      88       8 8888        8 8888 .`Y888888o.    8  88 8888           
8 8888.   ,88'  88 8888         88 8 8888      88       8 8888        8 8888 8o. `Y888888o. 8  88 8888           
8 888888888P'   88 8888         88 8 8888      88       8 8888        8 8888 8`Y8o. `Y88888o8  88 8888           
8 8888`8b       88 8888        ,8P 8 8888      88       8 8888        8 8888 8   `Y8o. `Y8888  88 8888   8888888 
8 8888 `8b.     `8 8888       ,8P  ` 8888     ,8P       8 8888        8 8888 8      `Y8o. `Y8  `8 8888       .8' 
8 8888   `8b.    ` 8888     ,88'     8888   ,d8P        8 8888        8 8888 8         `Y8o.`     8888     ,88'  
8 8888     `88.     `8888888P'        `Y88888P'         8 8888        8 8888 8            `Yo      `8888888P'    



                                                                                                               
   d888888o.   8 8888888888       ,o888888o.    8888888 8888888888  8 8888     ,o888888o.     b.             8 
 .`8888:' `88. 8 8888            8888     `88.        8 8888        8 8888  . 8888     `88.   888o.          8 
 8.`8888.   Y8 8 8888         ,8 8888       `8.       8 8888        8 8888 ,8 8888       `8b  Y88888o.       8 
 `8.`8888.     8 8888         88 8888                 8 8888        8 8888 88 8888        `8b .`Y888888o.    8 
  `8.`8888.    8 888888888888 88 8888                 8 8888        8 8888 88 8888         88 8o. `Y888888o. 8 
   `8.`8888.   8 8888         88 8888                 8 8888        8 8888 88 8888         88 8`Y8o. `Y88888o8 
    `8.`8888.  8 8888         88 8888                 8 8888        8 8888 88 8888        ,8P 8   `Y8o. `Y8888 
8b   `8.`8888. 8 8888         `8 8888       .8'       8 8888        8 8888 `8 8888       ,8P  8      `Y8o. `Y8 
`8b.  ;8.`8888 8 8888            8888     ,88'        8 8888        8 8888  ` 8888     ,88'   8         `Y8o.` 
 `Y8888P ,88P' 8 888888888888     `8888888P'          8 8888        8 8888     `8888888P'     8            `Yo 

 

 */

d_Server.get("/", (req,res)=>{
  res.render("index");
});
// catchall
d_Server.get("/*", (req,res) => res.redirect("/"));

// listen handler
const handleListen = () =>{
  switch(d_Conf["protocol"]){
    case "https":
      break;
    case "http":
      console.log(`
      ##########################################################
        😎 Wellcome to DOIL's dev SERVER (by express) 😎
        🐳 Server listening on port ${d_Conf.port}
        site : http://${d_Conf.domain}:${d_Conf.port}/
      ##########################################################
      `);
      default:
        break;
  }
}




server.listen(d_Conf["port"] , handleListen);