"use client";
import { useNavigate } from "react-router";
import { getUserInfo } from "../../api/user";
import { useQueryData } from "../../hooks/useQueryData";

type Props = {};

const Dashboard = (props: Props) => {
  const redirect = useNavigate();
  const { data, isLoading, error } = useQueryData(["user"], getUserInfo);

  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data && data.statusCode === 401) {
    redirect("/login");
  }
  if (data && data.statusCode === 200) {
    redirect(`/dashboard/${data.payload.workspaces[0]._id as string}`);
  }

  return (
    <div className="bg-slate-800">
      <h1>Dashboard</h1>

      <div>Authenticated</div>
      <button
        onClick={() => {
          redirect("/dashboard/example");
        }}
      >
        navigation
      </button>
    </div>
  );
};

export default Dashboard;
