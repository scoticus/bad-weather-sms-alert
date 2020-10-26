# Bad Weather SMS Alert ☔️

This project makes use of the cron triggers for Cloudflare Workers feature, released in Autumn 2020. Cron triggers allow workers to be scheduled to run on a recurring basis which is convenient for tasks that can be left to run in the background.

To take this new feature for a whirl I made this project that uses Open Weather Map to check the weather every morning and if it is cold or wet sends a SMS message via Twilio.

## Tooling

| Service Provider           | Purpose                                        |
| :------------------------- | :--------------------------------------------- |
| Cloudflare Workers         | Scheduling and running the serverless function |
| Open Weather Map           | Retrieving weather data                        |
| Twilio Programmable SMS ⚠️ | API that allows us to send SMS                 |

⚠️ There are fees to send SMS via Twilio.

A account is required with each of the service providers listed.

## Getting up and running

1. Using the Twilio web console, buy ("rent") a telephone number that is capable of sending SMS. Also take a note of your Twilio `Account SID` and `AuthToken` from the console dashboard.
2. Navigate to the API keys section of your Open Weather Map account and generate a free API key.
3. Create a new worker in your Cloudflare account and replace the boilerplate in the quick editor with the contents of [`index.js`](https://github.com/scoticus/bad-weather-sms-alert/blob/main/index.js).
4. Enter your own details into the `CONFIG` section of the script then 'Save and Deploy' the worker.
5. Return to the worker overview page and select the Triggers tab. Click "Add Cron Trigger" and enter the cron expression for when you want the worker to run.

Scheduled workers can be tested from the "Schedule" tab in the quick editor.

## Gotchas

- Even if no SMS are sent, the rental of a telephone nubmer from Twilio still accrues fees. To avoid charges, return any telephone numbers once you have finished using them.

- Cron timings must be entered in a specific format for them to work. [CronTab](https://crontab.guru) is a useful site to make sure your cron format is correct.

- Only three cron triggers can be added to a worker that is on the free plan.
