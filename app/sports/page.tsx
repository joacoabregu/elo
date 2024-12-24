import { SPORTS } from '@/common/constants/DB';
import { getDBClient } from '@/utils/supabase/server';

export default async function Countries() {
const {data} = await (await getDBClient()).from(SPORTS).select();

  return <div>
    <ul>
        {data?.map((sport) => (
            <li key={sport.id}>{sport.name}</li>
        ))}
    </ul>
  </div>
}