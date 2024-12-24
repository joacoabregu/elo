import { getDBClient } from '@/utils/supabase/server';

export default async function Countries() {
const {data} = await (await getDBClient()).from("Sports").select();

  return <div>
    <ul>
        {data?.map((sport) => (
            <li key={sport.id}>{sport.name}</li>
        ))}
    </ul>
  </div>
}