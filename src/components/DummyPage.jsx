// src/components/DummyPage.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectCurrentUser } from "../slice/authSlice";

const DummyPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  // This hook runs once when the component loads, triggering the API call
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome Dummy!</h1>
      <p>This page fetches protected user data upon loading.</p>
      <p>
        <strong>Status:</strong>{" "}
        {user ? `User "${user.name}" loaded.` : "Loading..."}
      </p>
    </div>
  );
};

export default DummyPage;
