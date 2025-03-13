import Login from "../_components/Logins";

const SignIn = () => {
  console.log(import.meta.env.VITE_PUBLIC_BASE_URL as string);
  return (
    <div className="w-full h-screen">
      <Login look={"signin"} />
    </div>
  );
  // return (
  //   <div className="bg-black">
  //     Hello world <div>Nice to Meet Your</div>
  //   </div>
  // );
};

export default SignIn;
