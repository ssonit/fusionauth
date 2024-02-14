import { useSearchParams } from 'next/navigation';
import { LIMIT_PRODUCT, omitByUndefined } from '@/constants/utils';

export default function useQueryConfig() {
  const searchParams = useSearchParams();

  const queryParams = Object.fromEntries(searchParams.entries());
  const queryConfig = omitByUndefined({
    page: queryParams.page || '1',
    limit: queryParams.limit || LIMIT_PRODUCT,
    search: queryParams.search
  });
  return queryConfig;
}
