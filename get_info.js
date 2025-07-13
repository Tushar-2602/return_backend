import { querry } from "./db.js";

// async function calculateScore(customer) {
//   // Simulated async logic (e.g., lookup, ML model, external API, etc.)
//   return new Promise((resolve) => {
//     const score =
//       (customer.return_ratio * 20) +
//       (customer.product_category_risk_score * 15) +
//       (customer.vague_reason_count * 10) +
//       (customer.average_return_window * 2) +
//       (customer.customer_rating_behavior_score * 10) +
//       (customer.mismatch_flag_history ? 25 : 0) +
//       (customer.total_monetary_value_of_returns / 1000);

//     resolve(Math.round(score * 100) / 100);
//   });
// }
const send_resp= async (req, res) => {
  const sql = 'SELECT * FROM customer_return_profile';

const results=await querry(sql);
  try {
      const scores = await Promise.all(
        results.map(async (customer) => ({
          customer_id: customer.customer_id,
          score: await fetch('https://customer-return-risk-model.onrender.com/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(customer)
})
  .then((res) => {
   
    
    return res.json()})
  .then(data => data.risk_score)
  .catch(err => console.error('❌ Error:', err))

        }))
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
