import mysql2 from "mysql2/promise";


const call_db = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'returns',
  connectionLimit:10
});
const querry=async (qrr,values) => {
   try {
   const [ans]= await call_db.query(qrr,values)
   return ans;
   } catch (error) {
    console.log(error);
    
    throw error;
    
   }
}
const close_db=async () => {
   try {
     await call_db.end();
     return {msg:"db closed successfully",ok:1}
   } catch (error) {
    return error
   }
   
}

export {querry,close_db}




