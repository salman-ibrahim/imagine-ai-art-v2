// In-App Purchases Helper

import Purchases from "react-native-purchases";
import Constants from 'expo-constants';

export const getProducts = async () => {
    try {
        Purchases.configure({apiKey: Constants.expoConfig.extra.PUBLIC_GOOGLE_SDK_KEY});
        const products = await Purchases.getOfferings();
        return products?.current?.availablePackages;
    }
    catch (e) {
        console.log(JSON.stringify(e));
        // console.log(e);
    }
    
}

export const purchaseBrushes = async (product) => {
    try {
        const {customerInfo, productIdentifier} = await Purchases.purchasePackage(product);

        return productIdentifier;
        
      } catch (e) {
        if (!e.userCancelled) {
          showError(e);
        }
      }
}

export const purchaseProduct = async (product) => {
    const purchases = await Purchases.purchaseProduct(product);
    return purchases;
}

export const restorePurchases = async () => {
    const purchases = await Purchases.restoreTransactions();
    return purchases;
}

export const getPurchaseHistory = async () => {
    const purchases = await Purchases.getPurchaserInfo();
    return purchases;
}

export const getActiveSubscriptions = async () => {
    const purchases = await Purchases.getPurchaserInfo();
    return purchases;
}

// Path: helpers/IAPHelper.js