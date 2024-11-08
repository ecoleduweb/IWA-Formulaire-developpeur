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

  // complète la mise en place du test pour le champ salaire lorsque le champ est vide.
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Le salaire est requis');

  // change la valeur du champ salaire pour une valeur négative.
  expect(await page.locator('.error-message').count()).toBe(1);
  expect(await page.locator('.error-message').first().textContent()).toBe('Le salaire doit être positif');

  // Complète le test qui perment de valider l'affichage de ce message d'erreur
  // 'Le salaire doit être inférieur à 1000000';

  // Finalise le test avec une valeur valide.
});

