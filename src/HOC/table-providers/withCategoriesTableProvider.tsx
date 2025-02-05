import { useCategories } from '@/providers/categories/categories-provider';
import {
  CategoriesTableProvider,
  COLUMNS,
} from '@/providers/categories/categories-table-provider';

const withCategoriesTableProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithCategoriesTableProvider = (props: P) => {
    const {
      params,
      queryResult: { data },
    } = useCategories();

    return (
      <CategoriesTableProvider
        data={data?.data.data || []}
        columns={COLUMNS}
        totalRowCount={data?.data.totlaCount}
        pagination={{
          pageIndex: params.page - 1,
          pageSize: params.limit,
        }}
      >
        <Component {...props} />
      </CategoriesTableProvider>
    );
  };

  return WithCategoriesTableProvider;
};

export default withCategoriesTableProvider;
