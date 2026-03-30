import db from "../config/db.js";

export const findUserByEmail = (email) => {
  return db("users").where({ email });
};

