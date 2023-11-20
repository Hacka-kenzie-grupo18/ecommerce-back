import { createAdminService } from "./createAdmin.service";

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
