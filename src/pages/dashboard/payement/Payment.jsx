import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSEcure from "../../../hooks/useAxiosSEcure";

function Payment() {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSEcure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return <div>{parcel.parcelName}</div>;
}

export default Payment;
