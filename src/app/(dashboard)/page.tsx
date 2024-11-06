import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const Home = async () => {
	const user = await getCurrent();
	if (!user) redirect("/sign-in");

	return <div>This is a Home page</div>;
};

export default Home;
