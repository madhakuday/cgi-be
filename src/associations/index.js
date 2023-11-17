import User from "../models/User";
import Certificate from "../models/Certificate";

Certificate.belongsTo(User, { as: "User", foreignKey: "user_id" });
User.hasMany(Certificate, { foreignKey: "user_id" });
