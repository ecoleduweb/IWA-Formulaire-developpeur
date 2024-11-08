import { test, expect } from '@playwright/test';

test('validation du formulaire - champ Name', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.locator('input[name="age"]').fill('18');
  await page.locator('input[name="salary"]').fill('18');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Le nom est requis');

  await page.locator('input[name="name"]').fill('test');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(0);
});

test('validation du formulaire - champ Age', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.locator('input[name="name"]').fill('test');
  await page.locator('input[name="salary"]').fill('18');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe("L'âge est requise");

  await page.locator('input[name="age"]').fill('17');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Tu dois avoir 18 ans et plus');

  await page.locator('input[name="age"]').fill('test');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe("L'âge doit être un nombre");

  await page.locator('input[name="age"]').fill('18');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(0);
});

test('validation du formulaire - champ salaire', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.locator('input[name="name"]').fill('test');
  await page.locator('input[name="age"]').fill('18');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Le salaire est requis');

  await page.locator('input[name="salary"]').fill('-1');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Le salaire doit être positif');

  await page.locator('input[name="salary"]').fill('1000001');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Le salaire doit être inférieur à 1000000');

  await page.locator('input[name="salary"]').fill('1000000');
  await page.locator('#submit').click();
  expect(await page.locator('.error-message').count()).toBe(0);
});

