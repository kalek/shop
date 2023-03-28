import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

const API_URL = 'https://naszsklep-api.vercel.app/api/';
const OFFSET = 25;

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="p-12">
      <ul className="grid grid-cols-4 gap-4">
        {data.map((product) => (
          <li
            key={product.id}
            className="bg-white p-4 rounded-lg border border-gray-300"
          >
            <h2>{product.title.substring(0, 20)}</h2>
            <div className="mx-auto my-8 flex items-center justify-center h-[230px] relative">
              <Image
                className="object-contain"
                fill={true}
                src={product.image}
                alt={product.title}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;

export const getStaticPaths = () => {
  const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return {
    paths: [...pages.map((page) => ({ params: { page: page.toString() } }))],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ page: string }>) => {
  if (!params?.page) {
    return {
      notFound: true,
    };
  }
  const page = Number(params.page);
  const res = await fetch(
    `${API_URL}products?take=${OFFSET}&offset=${OFFSET * page}`
  );
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
