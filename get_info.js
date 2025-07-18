import { querry } from "./db.js";


// {
//   "customer_id": "cust_9aXz21Klm7q8Uf4ve",
//   "total_orders": 90,
//   "returns": 40,
//   "return_ratio": 40,
//   "product_category_risk_score": 0.75,
//   "vague_reason_count": 2,
//   "average_return_window": 7,
//   "customer_rating_behavior_score": 2.8,
//   "mismatch_flag_history": 1,
//   "total_monetary_value_of_returns": 1520.45,
//   "average_order_value": 635.00,
//   "return_frequency_per_month": 1.25,
//   "time_since_last_return": 18,
//   "customer_tenure_days": 420,
//   "number_of_different_categories_returned": 4
// }

const send_resp= async (req, res) => {
  const sql = 'SELECT * FROM customer_return_profile';

const results=await querry(sql);
  try {
      const scores = await Promise.all(
        results.map(async (customer) => {
          let ret=await fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(customer)
})
  .then((resp) => {
   
    
    return resp.json()
  })
  .then(data => {
    console.log(data.risk_score);
    
    return data.risk_score
  })
  .catch(err => console.error('❌ Error:', err))

  if (!(typeof ret === 'number' && !Number.isInteger(ret))) {
    ret =-1;
    
  }
  console.log();
  
          return {
          customer_id: customer.customer_id,
          number_of_different_categories_returned: customer.number_of_different_categories_returned,
          customer_tenure_days: customer.customer_tenure_days,
          time_since_last_return: customer.time_since_last_return,
          average_return_window: customer.average_return_window,
          vague_reason_count: customer.vague_reason_count,
          returns: customer.returns,
          total_orders: customer.total_orders,
          return_frequency_per_month: customer.return_frequency_per_month,
          average_order_value: customer.average_order_value,
          total_monetary_value_of_returns: customer.total_monetary_value_of_returns,
          customer_rating_behavior_score: customer.customer_rating_behavior_score,
          product_category_risk_score: customer.product_category_risk_score,
          return_ratio: customer.return_ratio,
          score: ret

        }})
      );

      res.json(scores);
    } catch (error) {
      console.error('❌ Score calculation error:', error);
      res.status(500).json({ error: 'Score calculation failed' });
    }
};
export{
    send_resp
}
