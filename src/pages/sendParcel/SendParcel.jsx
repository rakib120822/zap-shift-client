import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSEcure from "../../hooks/useAxiosSEcure";
import useAuth from "../../hooks/useAuth";

function SendParcel() {
  const { register, handleSubmit, watch, control } = useForm();

  const axiosSecure = useAxiosSEcure();
  const { user } = useAuth();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = watch("senderRegion");
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegions = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };
  console.log(user);

  const handleSendParcel = (data) => {
    console.log(data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      const parcelWeight = parseFloat(data.parcelWeight);
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 60 : 80;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }

    console.log(cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree with the Cost",
      text: `You have to pay! ${cost}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info into the database
        axiosSecure
          .post("/parcels", data)
          .then((res) => console.log("after save in database : ", res));
        // Swal.fire({
        //   title: "Thanks to use Zap Shift!",
        //   text: "You will get your parcel soon.",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div>
      <h3 className="text-5xl font-bold">Send a Parcel</h3>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black"
      >
        {/* document */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              value={"document"}
              {...register("parcelType")}
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              value={"non-document"}
              {...register("parcelType")}
              className="radio"
              defaultChecked
            />
            Non-Document
          </label>
        </div>

        {/* parcel_info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Parcel Name"
              {...register("parcelName")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Parcel Weight"
              {...register("parcelWeight")}
            />
          </fieldset>
        </div>

        {/* tow_column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender_info */}
          <div>
            <h4 className="text-2xl font-bold">Sender Info</h4>
            <fieldset className="fieldset">
              <label className="label">Sender Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Sender Name"
                defaultValue={user?.displayName}
                {...register("senderName")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Sender Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender email"
                {...register("senderEmail")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true} value={"Pick a district"}>
                  Pick a District
                </option>
                {districtsByRegions(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Sender Address</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Sender Address"
                {...register("senderAddress")}
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Sender Number</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Sender Number"
                {...register("senderNumber")}
              />
            </fieldset>
          </div>
          {/* receiver_info */}
          <div>
            <h4 className="text-2xl font-bold">Receiver Info</h4>
            <fieldset className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver Name"
                {...register("receiverName")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Receiver Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Receiver email"
                {...register("receiverEmail")}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true} value={"Pick a district"}>
                  Pick a District
                </option>
                {districtsByRegions(receiverRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="label">Optional</span>
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Receiver Address</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Receiver Address"
                {...register("receiverAddress")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Receiver Number</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Receiver Number"
                {...register("receiverNumber")}
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          value={"send parcel"}
          className="btn btn-primary "
        />
      </form>
    </div>
  );
}

export default SendParcel;
