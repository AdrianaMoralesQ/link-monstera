// import {linkmonstera} from "linkmonstera.jpg";
import Image from "next/image";

const thumbnail = () => {
	return (
		<Image
			src={"/linkmonstera.jpg"}
			alt="linkmonstera thumbnail"
			width={500}
			height={500}
		/>
	);
};
export default thumbnail;
