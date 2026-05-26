import { test } from "../../fixtures/base-test";
import { users } from "../../data/ui/user";
import * as allure from 'allure-js-commons';


test.describe('Login Tests', () => {

    test('@smoke @regression User should login successfully with valid credentials', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('Valid user can log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded;
        });
        await test.step('When — User logs in with valid credentials', async () => {
            await loginPageLoaded.login(users.standard.username, users.standard.password);
        });
        await test.step('Then — User should be logged in successfully', async () => {
            await loginPageLoaded.verifyLoginSuccessful();
        });
    });

    test('@smoke @regression should show error message with invalid credentials', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('Invalid user cannot log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with invalid credentials', async () => {
            await loginPageLoaded.login(users.invalid.username, users.invalid.password);
        });
        await test.step('And — Error message is visible', async () => {
            await loginPageLoaded.verifyErrorIsVisible();
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Username and password do not match any user in this service');
        });
    });

    test('@smoke @regression should show error message when username is empty', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('empty username user cannot log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with empty username', async () => {
            await loginPageLoaded.login(users.empty.username, users.empty.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Username is required');
        });
    });

    test('@smoke @regression should show error message when password is empty', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('empty password user cannot log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with empty password', async () => {
            await loginPageLoaded.login(users.standard.username, users.empty.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Password is required');
        });
    });

    test('@smoke @regression should show error message when username is invalid', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('invalid username user cannot log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with incorrect username', async () => {
            await loginPageLoaded.login(users.invalid.username, users.invalid.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Username and password do not match any user in this service');
        });
    });

    test('@smoke @regression should show error message when password is incorrect', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('incorrect password user cannot log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with incorrect password', async () => {
            await loginPageLoaded.login(users.standard.username, users.invalid.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Username and password do not match any user in this service');
        });
    });

    test('@regression case sensitive username', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('case sensitive username');
        allure.severity('minor');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with case-sensitive username', async () => {
            await loginPageLoaded.login(users.standard.username.toUpperCase(), users.standard.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Username and password do not match any user in this service');
        });
    });

    test('@regression whitespace handling in username and password', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('whitespace handling in username and password');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with leading/trailing whitespace', async () => {
            await loginPageLoaded.login(users.whitespace.username, users.whitespace.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Username and password do not match any user in this service');
        });
    });

    test('@regression should show error message when user is locked out', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('locked out user cannot log in successfully');
        allure.severity('critical');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User attempts login with locked out user credentials', async () => {
            await loginPageLoaded.login(users.locked.username, users.locked.password);
        });
        await test.step('Then — Correct error message is displayed', async () => {
            await loginPageLoaded.verifyLoginFailed('Epic sadface: Sorry, this user has been locked out.');
        });
    });

    test('@smoke @regression password field should mask input', async ({ loginPageLoaded }) => {
        allure.epic('Sauce Demo');
        allure.feature('Authentication');
        allure.story('password field should mask input');
        allure.severity('normal');
        await test.step('Given — User is on the login page', async () => {
            await loginPageLoaded.navigateToLogin();
        });
        await test.step('When — User enters password', async () => {
            await loginPageLoaded.enterPassword('secret_sauce');
        });
        await test.step('Then — Password field masks input', async () => {
            await loginPageLoaded.verifyPasswordIsMasked();
        });
    });


});

