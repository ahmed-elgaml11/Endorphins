
const router = express.Router();
import { makeOrder } from "../controllers/order.controller.js";





router.post('/checkout', makeOrder)
    


export default router