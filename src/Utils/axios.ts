import axios from "axios";

const codeigniter = axios.create({
    
    'baseURL': 'http://localhost/index.php/api/v1',
    //'baseURL': 'http://localhost/backend-proyecto/index.php/api/v1',
    'headers' : { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
        'Access-Control-Allow-Methods' :'GET, POST PUT, DELETE,OPTIONS',
    },
});

export default codeigniter;