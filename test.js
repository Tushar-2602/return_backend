import { json } from "express";

export const fun=(req,res)=>{
    res.send("hellos");
} 

// fetch('https://customer-return-risk-model.onrender.com/predict', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     customer_id: "420",
//     total_orders: 25,
//     returns: 5,
//     return_ratio: 0.2,
//     product_category_risk_score: 0.75,
//     vague_reason_count: 2,
//     average_return_window: 7,
//     customer_rating_behavior_score: 2.8,
//     mismatch_flag_history: 1,
//     total_monetary_value_of_returns: 1520.45,
//     average_order_value: 65.00,
//     return_frequency_per_month: 1.25,
//     time_since_last_return: 1,
//     customer_tenure_days: 42,
//     number_of_different_categories_returned: 4
//   })
// })
//   .then((res) => {
   
    
//     return res.json()})
//   .then(data => console.log('✅ Server Response:', data))
//   .catch(err => console.error('❌ Error:', err));
// import { close_db, querry } from "./db.js";
// console.log(await querry(`truncate customer_return_profile`));
// close_db();
