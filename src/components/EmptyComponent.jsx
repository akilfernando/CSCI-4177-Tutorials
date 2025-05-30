import Image from "react-bootstrap/Image";

const EmptyComponent = ({ message }) => {
  return (
    <div>
      <div>
        <Image
          src="https://cdn-icons-png.flaticon.com/512/5164/5164018.png"
          height={234}
          width={350}
          alt="404"
        />
      </div>
      <div className="text-center">{message}</div>
    </div>
  );
};

export default EmptyComponent;