"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useQueryData } from "@/hooks/useQueryData";

type Props = {};

const page = (props: Props) => {
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

export default page;
