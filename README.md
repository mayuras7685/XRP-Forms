# Rippleforms

## Rippleforms is a plugin that lets you accept XRP payments within a Google Form for free!

## Important links

- [Video Demo](https://youtu.be/YIvn_5wuJl8)

## Demos

## Test as a Customer

**A customer is someone who fills out the form created by the merchant**

1.  Fill the form in the [link](https://forms.gle/pEQc4voG2EZNXEBh7) (This form shows an example of how a lawyer can use Rippleforms to get bookings for a consultation call )
2.  After filling and submitting the form you should see a "You can pay using the following link" with a link. Click on the link
3.  You will be taken to a checkout page where you will have to connect your [Gem wallet](https://gemwallet.app/) and make the payment. If your payment goes through you should see "Tx Confirmed"
4.  After paying go to this [spreadsheet](https://docs.google.com/spreadsheets/d/1-VKBKjVPnGRVzJmhxQSug7tYSFxtZt4Nx6bUUygo8/edit?resourcekey#gid=985907363) to verify your payment and form entry

## Test as a Merchant (Needs GCP account)

**A merchant is someone who creates the form and circulates it to their customers**

1. Go to 'forms.new' to create a new form and name it. Lets say 'Tee Store'
2. Create a field 'Name' and set it to 'Short Answer' in the drop down next to it.
3. Do the same for the field "Email"

4. To charge for an item have {item} - {price} {XRP} For Ex : Red Tshirt - 1 XRP
5. You can have two to three options. For example:

   - Red Tshirt - 1 XRP
   - Blue Tshirt - 2 XRP
   - Green Tshirt - 1 XRP

6. Set all the questions to "Required" to make sure you get replies to all questions

7. Now click on the three dots at the top right corner of the page and click on Script Editor.
8. In the file named "Code .gs" copy and paste the code in Google Forms > code .gs from the repo
9. Replace "Your Service email" in code.gs with your own service email that you created while setting up Sheets API.
10. Create a new HTML file by clicking on the "+" button next to Files section and name it sidebar.html
11. Copy the code from sidebar.html in Google Forms > sidebar.html from the repo and paste it
12. Click save and run code .gs
13. Now go back to your form page and you should see an icon that looks like a piece of a puzzle. When you hover over it, it says 'Add-ons'. Click on it
14. Click configure. In the pop-up that appears, paste the Gem Wallet address you want to accept the payments with and click save
15. That's it. You have a store now. But the the very first submission will not have the payment link. Fill it out yourself and if you see 'You can now accept XRP payments' that means you can send the forms link to anyone and get paid with XRP.

16. Click on the Add-ons icon again and click on "Get Sheets link". Open the link to see all your submissions

### Checkout page

Before we begin you need to setup the Google Sheets API and save the credentials somewhere safe

```sh
https://github.com/mayuras7685/XRP-Forms.git
```

Paste your credentials in credentials.json and install all necessary packages

```sh
npm install <all necessary packages>
```

```sh
node script.js
```

You should see 'Server is running on port 8000'

You now have a store. Follow the previous steps to test it out.

## Made with:

- [Google Apps Script](https://developers.google.com/apps-script)
- [Node JS](https://nodejs.org/en)
- [Ripple](https://xrpl.org/)

## How it works

- The link at the end of each form submission will have row number, column number, sheet id and wallet address passed as URL params
- When the webpage is visited the URL params are read with gviz to find the form submission details of that user using the row and column number
- Once all the details are read, the regex will find the cell values with XRP and add up the price values
- This value is passed onto payment handling. The customer will be promted to pay the total using the wallet they connect
- Once payment is confirmed, Sheets api will write 'confirmed' into the row and column that was read from the URL params

## Known Issues

- Can only accept XRP
- Not secure. Currently you need to copy paste your wallet address to make the form payable. Working on this. Will make the user sign and connect wallet
- Apps script makes the sheet visible to everyone with link. Will make this secure by making only Google Sheets API read the sheet
- Buggy sometimes. While reading the total XRP, sometimes it doesn't take in the whole amount. Working on this.
