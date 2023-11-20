import { userRequest, userResponse } from "../../interfaces/user.interfaces";
import { createUserService } from "./createUser.service";

export const createAdminService = async (): Promise<userResponse> => {
  const adminData: userRequest = {
    number: "774",
    name: "Admin",
    email: "admin@mail.com",
    password: "123456",
    phone: "(99)99999-9999",
    cpf: "99999999955",
    cep: "999999999",
    state: "SP",
    city: "São Paulo",
    street: "Jardim das Flores",
    isAdm: true,
  };

  return createUserService(adminData);
};

async function createAdminUser() {
  try {
    const newAdmin = await createAdminService();
    console.log(
      `Admin user ${newAdmin.name} created successfully with ID: ${newAdmin.uuid}`
    );
  } catch (error) {
    console.error("Error creating Admin user:", error);
  }
}

createAdminUser();
