"use client";
import AddNewUserComponent from "@/component/addNewUser/AddNewUserComponent";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// add new user page(to create new user)
function AddNewUser(props: any) {

  const [fieldValues, setFieldValues] = useState("");
  const {searchParams} = props;
  const dealersList = useSelector(
    (state: any) => state?.attendanceSystem?.listview
  );

  useEffect(() => {
    if(searchParams.id) {
      const filteredElement: any = dealersList?.users?.filter((item: any) => item.id === parseInt(searchParams.id));
      setFieldValues(filteredElement);
    }
  }, [searchParams.id])

  console.log(dealersList,searchParams, fieldValues,  "dealersList searchParams" );
  

  return (
    <>
      {/* calling add user component to the page component */}
      <AddNewUserComponent {...{fieldValues}} />
      {/* calling add user component to the page component */}
    </>
  );
}

export default AddNewUser;
