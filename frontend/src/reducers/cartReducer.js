import { 
    ADD_TO_CART,
    REMOVE_CART_ITEM
 } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippinInfo : {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => 
                        (i.product === isItemExist.product) ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload), //It'll keep all the products except the removed one
            }

        default:
            return state;
    }
}