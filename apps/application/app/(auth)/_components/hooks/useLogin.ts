import useZodForm from "@/hooks/useZodForm";
import { formSchema } from "../Logins/schema";
import { useMutationData } from "@/hooks/useMutation";
import { UserAction } from "@/actions/user/user";

interface formData {
  name: string;
  email: string;
  password: string;
}

// Get User Sign-ed Up
export const useLogin = () => {
  const { mutate } = UserAction.login();

  const { register, watch, reset, onFormSubmit, errors } = useZodForm(
    formSchema,
    mutate
    // Form Data must be present in mutate if validation Schema Done
  );

  console.log(errors);
  console.log(register);

  return { register, watch, reset, onFormSubmit, errors };
  // Return says You handle onFormSubmit and Register and I will handle the mutate and i only do after schema validation
};
