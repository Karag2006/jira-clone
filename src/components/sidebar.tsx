import Image from "next/image";
import Link from "next/link";
import { DottetSeperator } from "./dottet-seperator";
import { Navigation } from "./navigation";

export const Siedebar = () => {
	return (
		<aside className='h-full bg-neutral-100 p-4 w-full'>
			<Link href='/'>
				<Image src='/logo.svg' alt='Logo' width={84} height={84} />
			</Link>
			<DottetSeperator className='my-4' />
			<Navigation />
		</aside>
	);
};
