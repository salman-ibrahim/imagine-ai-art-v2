import store from "../store"
import { setUserWalletAction } from "../store/actions/userActions"
import { storeData } from "./secureStore"

export const deductArtworkPriceFromWallet = () => {
    const { wallet } = store.getState().userReducer
    const price  = defaults.artCost
    const remainingAmount = wallet - price
    syncWallet(remainingAmount)
}

export const refundArtworkPriceToWallet = () => {
    const { wallet } = store.getState().userReducer
    const price  = defaults.artCost
    const reimbursedAmount = wallet + price
    syncWallet(reimbursedAmount)
}

export const completePurchase = (purchaseAmount) => {
    const { wallet } = store.getState().userReducer
    const newBalance = wallet + purchaseAmount
    syncWallet(newBalance)
}

const syncWallet = ( amount ) => {
    storeData('wallet', amount.toString())
    store.dispatch(setUserWalletAction(amount))
}