import store from "../store";
import { setUserWalletAction } from "../store/actions/userActions";
import { defaults } from "../values/defaults";
import { storeData } from "./secureStore"

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

export const verifyIfTwentyFourHoursHavePassed = (lastTime) => {
  const currentTime = fetchCurrentTimeOnline()
  const timeDifference = currentTime - lastTime
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

export const calculateTimeLeftInSeconds = (startTime, endTime) => {
  // Calculate the total time left in seconds
  const difference = endTime - startTime;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}