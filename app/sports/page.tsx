import { SPORTS } from "@/common/constants/DB";
import { getDBClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Countries() {
	const { data } = await (await getDBClient()).from(SPORTS).select();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-4xl font-bold mb-6 text-center">Sports</h1>
			<div className="grid grid-cols-5">
				{data?.map((sport) => (
					<Link
						key={sport.id}
						href={`/sports/${sport.name}`}
						className="block p-2 text-blue-600 capitalize  text-center"
					>
						{sport.name}
					</Link>
				))}
			</div>
		</div>
	);
}
