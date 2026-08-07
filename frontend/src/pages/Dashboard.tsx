import { useArticles } from "../hooks/useArticles";
import ArticleCard from "../components/ArticleCard";
export default function Dashboard() {

  const {
    data,
    isLoading,
    isError
  } = useArticles();


  if (isLoading) {
    return <p>Cargando artículos...</p>;
  }


  if (isError) {
    return <p>Error cargando artículos</p>;
  }


  return (
    <div>
      <h1>Mis artículos</h1>

      {data?.data?.map((article: any) => (
  <ArticleCard
    key={article._id}
    article={article}
  />
))}

    </div>
  );
}