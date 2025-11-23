import serviceIcon from "../../assets/service.png";

function ServiceCard({ title, content }) {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-8 rounded-2xl gap-4 bg-white hover:bg-primary h-[400px]">
      <img src={serviceIcon} />
      <h1 className="text-center  text-2xl font-bold text-secondary">
        {title}
      </h1>
      <p className="font-medium text-center text-primary-content ">{content}</p>
    </div>
  );
}

export default ServiceCard;
