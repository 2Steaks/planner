# Meal planner

To get up and running you'll need to setup accounts and API keys for the following services:

* [FaunaDB](https://fauna.com)
* [Cloudinary](https://cloudinary.com)
* [Sendgrid](https://sendgrid.com)
* [Spoonacular](https://spoonacular.com/food-api)

---

## ENV

* Create .env file
* Copy contents of default.env

---

## Graphql

Visit your FaunaDB admin panel and create a new database

* Go to GraphQL and import the schema.sql
* Go to Security 
  * Click MANAGE ROLES
  * Click new role
  * Add all Collections and give Read|Write|Create|Delete access
  * Add all indexes and give Read access
  * Save
* Go back to Security
  * Click NEW KEY
  * Associate it with your new role
  * Save
  * Add API key to .env variable FAUNA_API_KEY

---

## Images

Visit your Cloudinary admin panel

* Copy your cloud name
* Add Cloud name to .env variable CLOUDINARY_CLOUD_NAME

---

## Email

Visit your Sendgrid admin panel

* API key
  * Create API key with restricted access
  * Add API key to .env variable SENDGRID_API_KEY
* Email template
  * Go to Email API
  * Create dynamic template
  * Add version
  * Choose blank template
  * Choose code editor
  * Copy contents of email-template.html
  * Add dynamic template ID to .env variable SENDGRID_TEMPLATE_ID
* Email Address
  * Add an email address to .env variable SENDGRID_EMAIL

---

## Nutrition Metadata

Visit your Spoonacular admin panel
  * Go to Profile
  * Create API key
  * Add API key to .env variable SPOONACULAR_API_KEY