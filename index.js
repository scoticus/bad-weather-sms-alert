addEventListener('scheduled', (event) => {
  event.waitUntil(handleSchedule(event.scheduledTime))
})

/**
 * Respond to the request
 * @param {Request} request
 */

async function handleSchedule() {
  /* --- CONFIG --- */
  const owmApiKey = '<Find in Open Weather Map account>'
  const city = 'London'
  const recipientTel = '<Whoever the message should be sent to>' // E.164 format
  const senderTel = '<Phone number leased from Twilio>' // E.164 format
  const twilioAccountSid = '<Find in Twilio account>'
  const twilioAuthToken = '<Find in Twilio account>'
  /* -------------- */

  // GET WEATHER FROM OPEN WEATHER MAP
  const weatherEndpoint =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&units=metric&appid=' +
    owmApiKey
  let weather = await fetch(weatherEndpoint)
  weather = await weather.json()

  // CHECK RESULTS FOR BAD WEATHER
  const raining = weather.weather[0].main === 'Rain'
  const cold = weather.main.temp < 10
  var messageText
  if (raining && cold) {
    messageText = "It's wet and cold today!"
  } else if (raining) {
    messageText = "It's a bit wet, a brolly might be handy"
  } else if (cold) {
    messageText = "It's quite chilly, you might want a jacket"
  } else {
    return new Response('Good weather. Not sending message')
  }

  // SEND SMS USING TWILIO
  const endpoint =
    'https://api.twilio.com/2010-04-01/Accounts/' +
    twilioAccountSid +
    '/Messages.json'

  let encoded = new URLSearchParams()
  encoded.append('To', recipientTel)
  encoded.append('From', senderTel)
  encoded.append('Body', messageText)

  let token = btoa(twilioAccountSid + ':' + twilioAuthToken)
  const request = {
    body: encoded,
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  let result = await fetch(endpoint, request)
  result = await result.json()

  return new Response(JSON.stringify(result), request)
}
