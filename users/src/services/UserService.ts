import bcrypt from "bcryptjs";

// Fonction pour hacher les mots de passe
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Générer le sel
  return await bcrypt.hash(password, salt); // Hacher le mot de passe
};
console.log("hello");
// Fonction pour comparer un mot de passe avec un haché
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
