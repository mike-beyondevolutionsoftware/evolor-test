# Laravel version 12

# Follow instructions below to build

1. Rename the env.example file to .env
2. Modify the env file to your local settings including database and mail variables
3. Run composer install
4. Run php artisan key:generate
5. Run php artisan migrate
6. Run php artisan migrate:fresh --seed
7. Run npm install
8. Run npm run dev
9. Run php artisan serve
10. Visit the front end home page, e.g. http://localhost:8000

# Test Front End
You can either login with the new users that were created via the db:seed or create a new one via the registration
page of the front end. See Test user details below:

Email: test@example.com Password: Test1234!

Email: test2@example.com Password: Test1234!

Once logged in, try adding products to the cart and going through the checkout process. After checkout is complete, you
should see the order history page with your order.

# Test API endpoints
Import the Evolor_Test.postman_collection.json file (found in the root folder of the repo) in to your postman to try all
the included endpoints
