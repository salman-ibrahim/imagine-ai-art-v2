import store from "../store";
import { setUserWalletAction } from "../store/actions/userActions";
import { defaults } from "../values/defaults";
import { getData, storeData } from "./secureStore"
import * as StoreReview from 'expo-store-review';
import * as Device from 'expo-device';
import { strings } from "../values/strings";

export const markUserOnboarded = () => {
    storeData('onboarded', 'TRUE')
}

export const convertStringToSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
    // return max 50 characters
    return str.substring(0, 50);
}

export const fetchCurrentTimeOnline = async () => {
    try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/GMT');
    const json = await response.json();
    return Promise.resolve(json.datetime);
  } catch (error) {
    return console.error(error);
  }
}

export const verifyIfTwentyFourHoursHavePassed = async (lastTime) => {
  const currentTime = await fetchCurrentTimeOnline()

  const currentTimeDate = new Date(currentTime)
  const lastTimeDate = new Date(lastTime)

  const timeDifference = currentTimeDate - lastTimeDate
  console.log(timeDifference);
  const twentyFourHours = 86400000
  if (timeDifference > twentyFourHours) {
    return true
  }
  return false
}

export const getTimeForTomorrowStartOfDayOnline = () => {
  const currentTime = fetchCurrentTimeOnline()
  const currentTimeDate = new Date(currentTime)
  const tomorrow = new Date(currentTimeDate)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0,0,0,0)
  return tomorrow
}

export const addOneDayToExistingDate = (date) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 1)
  return newDate
}

export const calculateTimeLeftInSeconds = async (lastClaimTime) => {
  const twentyFourHours = 86400000
  const currentTime = await fetchCurrentTimeOnline()
  const currentTimeDate = new Date(currentTime)

  // const lastClaimTime = await getData('lastClaimTime')
  const lastClaimTimeDate = new Date(lastClaimTime)

  if(lastClaimTime != undefined) {
    const difference = currentTimeDate - lastClaimTimeDate;
    let timeLeft = 0;
    
    if (difference > 0) {
      timeLeft = difference
      return twentyFourHours - timeLeft;
    }
    else {
      return 0;
    }
  }
  return 0;
}

export const requestInAppReview = async () => {
  if(await StoreReview.hasAction()) {
    StoreReview.requestReview();
  }
  else{
    console.log("Review Action Unavailable");
    return;
  }
  return;
}

export const prepareSupportEmailBody = () => {
  const device = Device.manufacturer
  const model = Device.modelName
  const version = Device.osVersion

  console.log(device, model, version);
  
  let bodyText = strings.supportBody

  bodyText = bodyText.replace("{{device}}", device).replace("{{model}}", model).replace("{{version}}", version)
  return bodyText
}