module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  testTimeout: 30000, // Augmenter le délai d'attente à 30 secondes
  setupFilesAfterEnv: ["<rootDir>/src/config/jest.setup.ts"], // Ajouter cette ligne pour inclure jest.setup.ts
};
