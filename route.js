import { Router } from "express";
import { fun } from "./test.js";
import { return_info } from "./handle_api.js";
import { send_resp } from "./get_info.js";
const api_router=Router();
api_router.route('/test').get(fun)
api_router.route('/return').post(return_info)
api_router.route('/get_data').get(send_resp)
export{
    api_router
}