import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import React from "react";

const Interview = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview Genration</h3>

      <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </>
  );
};

export default Interview;
