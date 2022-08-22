// @ts-check
const { test, expect } = require('@playwright/test');

//credentials
const userEmail = 'Haroldas.Bartusevicius@sourceryacademy.com';
const userPassword = 'nera_svarbus39';
const adminEmail = 'admin9@sourceryacademy.com';
const adminPassword = 'nera_svarbus64';

//login constants
const loginPage = 'https://lunch.devbstaging.com/login-password';
const emailField = 'input[name=email]';
const passwordField = 'input[name=password]';
const loginButton = 'xpath=//button';
const pageAfterLogin = new RegExp("https://lunch.devbstaging.com/dishes/[\s\S]*");
const logoutButton = 'text=Atsijungti';

//admin functions
const editMeals = 'text=Patiekalų Redagavimas';
const addProvider = 'button:has-text("buildclose")';
const addNewProvider = 'button:has-text("add")';
const provider = "TestasYellow";
const providerField = 'text=Tiekėjo Pavadinimasarrow_drop_down >> [aria-label="Tiekėjo Pavadinimas"]';
const color = "Yellow";
const colorField = '[aria-label="Spalva"]';
const soup = 'text=Sriubos (Soups)';
const price = "1";
const priceFieldSoup = 'text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Kaina"]';
const quantity = "150";
const quantityFieldSoup = 'text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Kiekis"]';
const mealName = "Yellow Meal";
const mealNameFieldSoup = 'text=Sriubos (Soups)more_vertkeyboard_arrow_down delete KainaKiekisPatiekalo pavadini >> [aria-label="Patiekalo pavadinimas"]';
const mainMeal = 'text=Pagrindiniai Patiekalai (Main Dishes)restaurant';
const priceFieldMain = 'text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Kaina"]';
const quantityFieldMain = 'text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Kiekis"]';
const mealNameFieldMain = 'text=Pagrindiniai Patiekalai (Main Dishes)restaurantmore_vertkeyboard_arrow_down dele >> [aria-label="Patiekalo pavadinimas"]';
const save = 'button:has-text("Išsaugoti")';
const pageAfterAddingProvider = new RegExp("https://lunch.devbstaging.com/edit/[\s\S]*");

//user functions
const providerForUser = 'text=TestasYellow >> nth=0';
const mealForUser = 'text=Yellow Meal >> nth=0';
const buy = 'button:has-text("0.00 €send")';
const drop = 'button:has-text("0.00 €send")';






test.describe('ADMIN : ', () => {

  test('Should be able to log in with correct crediantials and logout', async ({ page }) => {

    await login(page, adminEmail, adminPassword);

    await expect(page).toHaveURL(pageAfterLogin);
    
    await logout(page);
  });

  test('Should be not able to log in with incorrect crediantials', async ({ page }) => {

    await login(page, '-1', '-1');

    await expect(page).toHaveURL(loginPage);
  });

  test('Should be able to add new provider', async ({ page }) => {

    if (await login(page, adminEmail, adminPassword)) {
      await page.locator(editMeals).click();

      await page.locator(addProvider).hover();

      await page.locator(addNewProvider).click();

      await page.locator(providerField).type(provider);

      await page.locator(colorField).type(color);

      await page.locator(priceFieldSoup).type(price);

      await page.locator(quantityFieldSoup).type(quantity);

      await page.locator(mealNameFieldSoup).type(mealName);

      await page.locator(mainMeal).click();

      await page.locator(priceFieldMain).type(price);

      await page.locator(quantityFieldMain).type(quantity);

      await page.locator(mealNameFieldMain).type(mealName);

      await page.locator(save).first().click();

      expect(page).toHaveURL(pageAfterAddingProvider);

      await logout(page);
    } 
    else {
      throw "Not able to login";
    }
  });

  
  

});  
test.describe('USER : ', () => {

  test('Should be able to log in with correct crediantials and logout', async ({ page }) => {

    await login(page, userEmail, userPassword);

    await expect(page).toHaveURL(pageAfterLogin);
    
    await logout(page);
  });

  test('Should be not able to log in with incorrect crediantials', async ({ page }) => {

    await login(page, '-1', '-1');

    await expect(page).toHaveURL(loginPage);
  });

  test('Should be be able to order a meal', async ({ page }) => {    

    await login(page, userEmail, userPassword);

    await page.locator(providerForUser).click();

    await page.locator(mealForUser).click();

    await page.locator(buy).click();

    await page.locator('text=clear').click();

    expect(true).toBe(true);
  });
  






});  

async function login(page, email, password) {
  await page.goto(loginPage);

  if (await isFieldAvailableAndVisible(emailField, page))
  {
    await page.locator(emailField).fill(email);
  }
  else {
    throw "Unable to input email";
  }

  if (await isFieldAvailableAndVisible(passwordField, page))
  {
    await page.locator(passwordField).fill(password);
  }
  else {
    throw "Unable to input password";
  }

  if (await isFieldAvailableAndVisible(passwordField, page))
  {
    await page.locator(loginButton).click();
  }
  else {
    throw "Unable to press login button";
  }

  return true;
}

async function isFieldAvailableAndVisible(fieldId, page) {
  if(!await page.locator(fieldId).isVisible()) return false;

  else if(!await page.locator(fieldId).isEnabled()) return false;

  else return true;
}

async function logout(page) {
  if (await isFieldAvailableAndVisible(logoutButton, page))
  {
    await page.locator(logoutButton).click();
  }
  else {
    throw "Unable to press logout button";
  }
}

  /*

    test('Should be able to see and input second number', async ({ page }) => {

      await page.selectOption(build, { label: version});

      expect(await isFieldAvailableAndVisible(secondNumber, page)).toBe(true);
      
    });  

    test('Should be able to see and input operation', async ({ page }) => {

      await page.selectOption(build, { label: version});

      expect(await isFieldAvailableAndVisible(selectOperation, page)).toBe(true);
      
    });  

    test('Should be able to see and click button "Calculate"', async ({ page }) => {

      await page.selectOption(build, { label: version});

      expect(await isFieldAvailableAndVisible(calculate, page)).toBe(true);
      
    });  

    test('Should be able to see answer', async ({ page }) => {

      await page.selectOption(build, { label: version});

      expect(await page.locator(answer).isVisible()).toBe(true);
      
    });  

    test('Should be able to see and click checkbox "Integer only"', async ({ page }) => {

      await page.selectOption(build, { label: version});

      expect(await isFieldAvailableAndVisible(integerOnly, page)).toBe(true);
      
    });  

    test('Should be able to see and click button "Clear"', async ({ page }) => {

      await page.selectOption(build, { label: version});

      expect(await isFieldAvailableAndVisible(clear, page)).toBe(true);
      
    });  
  });
 
  test.describe(version + ': Add', () => {

    test('Should be able to add two integers 2 + 3 = 5', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3', 0, page);
  
      await expect(page.locator(answer)).toHaveValue('5');
    });

    test('Should be able to add two floats 2.7 + 3.4 = 6.1', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2.7', '3.4', 0, page);
  
      await expect(page.locator(answer)).toHaveValue('6.1');
    });

    test('Should throw error "Number 1 is not a number" if first number is "a" and second not provided', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('a', '', 0, page);
  
      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 1 is not a number');
    });

    test('Should throw error "Number 2 is not a number" if second number is "a" and first not provided', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('', 'a', 0, page);

      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 2 is not a number');
    });
  
  });

  test.describe(version + ': Subtract', () => {

    test('Should be able to subtract two integers 2 - 3 = -1', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3', 1, page);

      await expect(page.locator(answer)).toHaveValue('-1');
    });

    test('Should be able to subtract two floats 2.7 - 3.4 = -0.7', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2.7', '3.4', 1, page);

      await expect(page.locator(answer)).toHaveValue('-0.7');
    });

    test('Should throw error "Number 1 is not a number" if first number is "a" and second not provided', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('a', '', 1, page);
  
      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 1 is not a number');
    });

    test('Should throw error "Number 2 is not a number" if second number is "a" and first not provided', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('', 'a', 1, page);

      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 2 is not a number');
    });
  
  });

  test.describe(version + ': Multiply', () => {

    test('Should be able to multiply two positive integers 2 * 3 = 6', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3', 2, page);

      await expect(page.locator(answer)).toHaveValue('6');
    });

    test('Should be able to multiply two positive floats 2.7 * 3.4 = 9.18', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2.7', '3.4', 2, page);

      await expect(page.locator(answer)).toHaveValue('9.18');
    });

    test('Should throw error "Number 1 is not a number" if first number is "a" and second not provided', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('a', '', 2, page);
  
      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 1 is not a number');
    });

    test('Should throw error "Number 2 is not a number" if second number is "a" and first not provided', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('', 'a', 2, page);
  
      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 2 is not a number');
    });
  
  });

  test.describe(version + ': Divide', () => {

    test('Should be able to divide two positive integers 2 / 3 = 0.6666666666666666', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3', 3, page);

      await expect(page.locator(answer)).toHaveValue('0.6666666666666666');
    });

    test('Should be able to divide two positive floats 8.5 / 0.5 = 17', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('8.5', '0.5', 3, page);

      await expect(page.locator(answer)).toHaveValue('17');
    });

    test('Should give error "Divide by zero error!" if second number is 0', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '0', 3, page);
  
      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Divide by zero error!');
    });

    test('Should throw error "Number 1 is not a number" if first number is "a" and second is 2', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('a', '2', 3, page);
  
      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 1 is not a number');
    });

    test('Should throw error "Number 2 is not a number" if second number is "a" and first is 2', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', 'a', 3, page);

      await expect(page.locator(error)).toBeVisible();
      await expect(page.locator(error)).toHaveText('Number 2 is not a number');
    });
  
  }); 

  test.describe(version + ': Concatenate', () => {

    test('Should be able to concatenate two positive integers 2 + 3 = 23', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3', 4, page);
  
      await expect(page.locator(answer)).toHaveValue('23');
    });

    test('Should be able to concatenate two positive floats 8.5 and 0.5 = 8.50.5', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('8.5', '0.5', 4, page);
  
      await expect(page.locator(answer)).toHaveValue('8.50.5');
    });

    test('Should be able to concatenate two strings made of english alphabet "aaa" + "BBB" = "aaaBBB"', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('aaa', 'BBB', 4, page);

      await expect(page.locator(answer)).toHaveValue('aaaBBB');
    });

    test('Should be able to concatenate two strings made of special symbols "!#@$" + "*&^*" = "!#@$*&^*"', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('!#@$', '*&^*', 4, page);

      await expect(page.locator(answer)).toHaveValue('!#@$*&^*');
    });

    test('Should be able to concatenate two strings made of complex special symbols "γεØÆ" + "败敗" = "γεØÆ败敗"', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('γεØÆ', '败敗', 4, page);

      await expect(page.locator(answer)).toHaveValue('γεØÆ败敗');
    });

    test('Should be able to concatenate two strings that contain escape symbols "\\n\\t\"" + "\\r\'" = "\\n\\t\"\\r\'"', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('\\n\\t\"', '\\r\'', 4, page);

      await expect(page.locator(answer)).toHaveValue('\\n\\t\"\\r\'');
    });

    test('Should only accept 10 characters when first number input is longer "0123456789aa" and "bbb" = "0123456789bbb"', async ({ page }) => {
      await page.selectOption(build, { label: version});

      await doOperation('0123456789aa', 'bbb', 4, page);

      await expect(page.locator(answer)).toHaveValue('0123456789bbb');
    });

    test('Should only accept 10 characters when second number input is longer "bbb" and "0123456789aaa" = "bbb0123456789"', async ({ page }) => {
      await page.selectOption(build, { label: version});

      await doOperation('bbb', '0123456789aaa', 4, page);

      await expect(page.locator(answer)).toHaveValue('bbb0123456789');
    });
  
  }); 

  test.describe(version + ': Extra Funcionality', () => {

    test('Checkbox "Integers only" should be hidden when "Concatenate" operation is chosen', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      if (await isFieldAvailableAndVisible(selectOperation, page))
      {
        page.selectOption(selectOperation, {label: ops[4]});
      }
      else
      {
        throw "Operation selection is disabled or invisible";
      }
  
      expect(await page.locator(integerOnly).isVisible()).not.toBe(true);      
    });

    test('Checkbox "Integers only" should be visible when "Add" operation is chosen', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      if (await isFieldAvailableAndVisible(selectOperation, page))
      {
        page.selectOption(selectOperation, {label: ops[0]});
      }
      else
      {
        throw "Operation selection is disabled or invisible";
      }
  
      expect(await page.locator(integerOnly).isVisible()).toBe(true);      
    });

    test('Should be able to hide/unhide fractional part of positive answer with checkbox "Intergers only', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3.5', 0, page);

      //Sometimes calculations take some time and checkbox is not loaded in time
      await page.waitForTimeout(1000);
      //-------------------------------------------------------------------------

      await expect(page.locator(answer), "Calculation failed").toHaveValue('5.5');

      if (await isFieldAvailableAndVisible(integerOnly, page))
      {
        await page.locator(integerOnly).click();
      }
      else{
        throw "Checkbox is invisible or disabled"
      }

      await expect(page.locator(answer), "Checking 'Integers only' did not remove fractorial part").toHaveValue('5');

      if (await isFieldAvailableAndVisible(integerOnly, page))
      {
        await page.locator(integerOnly).click();
      }
      else{
        throw "Checkbox is invisible or disabled"
      }
  
      await expect(page.locator(answer)).toHaveValue('5.5');   
    });

    test('Should be able to empty answer field with button "Clear', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      await doOperation('2', '3', 0, page);

      //Sometimes calculations take some time and checkbox is not loaded in time
      await page.waitForTimeout(1000);
      //-------------------------------------------------------------------------

      await expect(page.locator(answer), "Calculation failed").toHaveValue('5');

      if (await isFieldAvailableAndVisible(clear, page))
      {
        await page.locator(clear).click();
      }
      else{
        throw "Button 'Clear' is invisible or disabled"
      }
  
      await expect(page.locator(answer)).toHaveValue(''); 
    });

    test('Clicking "Clear" button should uncheck "Integer only" checkbox', async ({ page }) => {
      
      await page.selectOption(build, { label: version});

      if (!await page.locator(integerOnly).isChecked())
      {      
        if (await isFieldAvailableAndVisible(integerOnly, page))
        {
          await page.locator(integerOnly).click();
        }
        else{
          throw "Checkbox 'Integer only' is invisible or disabled"
        }
      }

      if (await isFieldAvailableAndVisible(clear, page))
      {
        await page.locator(clear).click();
      }
      else{
        throw "Button 'Clear'is invisible or disabled"
      }
  
      await expect(page.locator(integerOnly)).not.toBeChecked;     
    });   
  });
});

async function isFieldAvailableAndVisible(fieldId, page) {
  if(!await page.locator(fieldId).isVisible()) return false;

  else if(!await page.locator(fieldId).isEnabled()) return false;

  else return true;
}

async function doOperation (input1, input2, operation, page) {
  if (await isFieldAvailableAndVisible(firstNumber, page))
  {
    await page.locator(firstNumber).type(input1);
  }
  else{
    throw "First number field is disabled or invisible";
  }

  if (await isFieldAvailableAndVisible(secondNumber, page))
  {
    await page.locator(secondNumber).type(input2);
  }
  else{
    throw "Second number field is disabled or invisible";
  }

  if (await isFieldAvailableAndVisible(selectOperation, page))
  {
    await page.selectOption(selectOperation, {label: ops[operation]});
  }
  else{
    throw "Select operation field is disabled or invisible";
  }

  if (await isFieldAvailableAndVisible(calculate, page))
  {
    
  }
  else{
    throw "Calculate button is disabled or invisible";
  }
}


*/
