<<<<<<< HEAD
=======
import { Product_Request } from "./Product-Request";
>>>>>>> 4b01bd4 (rebase: from this branch)
import { User } from "./User";

export interface Offer {
  id: string;
  product_request_id: string;
<<<<<<< HEAD
=======
  product_request?: Product_Request;
>>>>>>> 4b01bd4 (rebase: from this branch)
  user_id: string;
  user?: User;
  offer_date: string;
    
}