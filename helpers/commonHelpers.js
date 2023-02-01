import { storeData } from "./secureStore"

export const markUserOnboarded = () => {
    storeData('onboarded', 'TRUE')
}