import { querry } from "./db.js"
const return_info = async (req, res) => {
const {
  customer_id
  // other string fields...
} = req.body;

// Integers
const total_orders  = parseInt(req.body.total_orders, 10);
const returns       = parseInt(req.body.returns, 10);
const vague_reason_count = parseInt(req.body.vague_reason_count, 10);
const average_return_window = parseInt(req.body.average_return_window, 10);
const time_since_last_return = parseInt(req.body.time_since_last_return, 10);
const customer_tenure_days = parseInt(req.body.customer_tenure_days, 10);
const number_of_different_categories_returned = parseInt(req.body.number_of_different_categories_returned, 10);

// Floats
const return_ratio  = parseFloat(req.body.return_ratio);
const product_category_risk_score = parseFloat(req.body.product_category_risk_score);
const customer_rating_behavior_score = parseFloat(req.body.customer_rating_behavior_score);
const total_monetary_value_of_returns = parseFloat(req.body.total_monetary_value_of_returns);
const average_order_value = parseFloat(req.body.average_order_value);
const return_frequency_per_month = parseFloat(req.body.return_frequency_per_month);

// TINYINT field
const mismatch_flag_history = parseInt(req.body.mismatch_flag_history, 10); 

  // Basic validation
  if (
    !customer_id || total_orders == null || returns == null || return_ratio == null ||
    product_category_risk_score == null || vague_reason_count == null ||
    average_return_window == null || customer_rating_behavior_score == null ||
    mismatch_flag_history == null || total_monetary_value_of_returns == null ||
    average_order_value == null || return_frequency_per_month == null ||
    time_since_last_return == null || customer_tenure_days == null ||
    number_of_different_categories_returned == null
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `
    INSERT INTO customer_return_profile (
      customer_id, total_orders, returns, return_ratio,
      product_category_risk_score, vague_reason_count, average_return_window,
      customer_rating_behavior_score, mismatch_flag_history,
      total_monetary_value_of_returns, average_order_value,
      return_frequency_per_month, time_since_last_return,
      customer_tenure_days, number_of_different_categories_returned
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    customer_id, total_orders, returns, return_ratio,
    product_category_risk_score, vague_reason_count, average_return_window,
    customer_rating_behavior_score, mismatch_flag_history,
    total_monetary_value_of_returns, average_order_value,
    return_frequency_per_month, time_since_last_return,
    customer_tenure_days, number_of_different_categories_returned
  ];
   await querry(sql,values).then(()=>{
    res
    .status(200)
    .json({
        status:200,
        msg:"database updated"
    })
   }).catch(()=>{
    res
    .status(400)
    .json({
        status:400,
        msg:"something went wrong"
    })
   });
  
}
export {
    return_info
}