# CommonCents

CommonCents is a web application that is intended to be used by individuals who are visually impaired. After researching, my team members and I realized that there isn't many resources for people with visual disabilities, especially when it relates to their finances. We decided to create this application to help these individuals be able to differentiate between the USD currency.

For right now, the application is only able to differentiate between a $50 dollar bill and a $100 dollar bill. We are hoping to incorporate other USD, such as $1, $5, $10 and $20 dollar bills.

## Requirements:

1. React (https://reactjs.org/)
2. Express (https://expressjs.com/)
3. Python (https://www.python.org/)
4. Pipenv (https://pipenv.pypa.io/en/latest/)
5. Teachable machine (https://teachablemachine.withgoogle.com/)

## Installation:

1. Clone the project.
2. While inside of the `cbpro-bot` folder, run `pipenv install`.
3. `cd` into the `src/client` folder and run `npm install`.
4. `cd` into the `src/trading_script` folder and create a `config.py` file.
5. `config.py` is where you will store import, and sensitive data. This is why the file is not tracked.

Inside of `config.py` place the following variables:

- cbpro_public_key (string) - Your Coinbase Pro public API key.
- cbpro_secret_key (string) - Your Coinbase Pro secret API key.
- cbpro_key_passphrase (string) - Your Coinbase Pro API passphrase.
- fee_percent (decimal) - The fee percent you expect to pay per trade. On Coinbase Pro this will usually be 0.5.
- ticker (string) - The product ID to trade. For example, 'BTC-USD'.
- shares (decimal) - The amount of shares to trade per trade.
- base_url (string) - The URL for the Django API to record trades. This will usually be 'http://127.0.0.1:8000/api/v1'.
- paper_trade (bool) - True if bot should trade in paper trades, False to place real trades.

## Running the bot:

The bot uses a django API to log trades, and a trading script that runs on a loop to execute trades. Note that the django API and the script have to be running at the same time.

To run the django API:

1. `cd` into the `src/api` folder.
2. Run `python manage.py migrate`
3. Run `python manage.py createsuperuser` and follow the instructions to make an admin user.
4. Run `python manage.py runserver` to start the server.

To run the trading script:

1. `cd` into `src/trading_script`.
2. Run `python script.py`.

## How to change trading strategy:

The bot ships with a MACD crossover strategy by default. To change the strategy used a few methods inside of `src/trading_script/helpers` needs to be changes.

### calculate_techincal_indicators:

If you want to use any new technical indicators such as the RSI, you will need to add the to the dataframe within this method.

### buy_signal and sell_signal:

These 2 methods return a boolean value when their respecitive signals are hit. You can change what indicators are used here so long as they exist in the dataframe.

## How to view logged trades:

The bot uses a Django API to log trades. You can view these trades by logging into the Django admin page.
