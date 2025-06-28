'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Head from "next/head";

type Article = {
  articleid: number,
  title: string,
  summary: string,
  image: string,
}

export default function Home() {
  const [popularArticle, setPopularArticle] = useState<Article[]>([]);
  const [highLightArticle, setHighLightArticle] = useState<Article[]>([]);
  const [recentArticle, setRecentArticle] = useState<Article[]>([]);
  const [technical, setTechnical] = useState<Article[]>([]);
  const [lifeStyle, setLifeStyle] = useState<Article[]>([]);
  const [pet, setPet] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const popularResponse = await fetch('/api/articles?type=popular');
      const highlightResponse = await fetch('/api/articles?type=highlight');
      const recentResponse = await fetch('/api/articles?type=recent');
      const technicalResponse = await fetch('/api/articles?category=cong_nghe&limit=4');
      const lifeStyleResponse = await fetch('/api/articles?category=loi_song&limit=4');
      const petResponse = await fetch('/api/articles?category=thu_cung&limit=2');

      const [popularData, highlightData, recentData, technicalData, lifeStyleData, petData] = await Promise.all([
        popularResponse.json(),
        highlightResponse.json(),
        recentResponse.json(),
        technicalResponse.json(),
        lifeStyleResponse.json(),
        petResponse.json(),
      ]);

      // Make sure to access the results array
      setPopularArticle(popularData.results || []);
      setHighLightArticle(highlightData.results || []);
      setRecentArticle(recentData.results || []);
      setTechnical(technicalData.results || []);
      setLifeStyle(lifeStyleData.results || []);
      setPet(petData.results || []);

      setLoading(false)
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <title>Trang chủ</title>
      <Head>
        <title>Trang chủ</title>
        <meta name="description" content='Xem bài viết hay' />
        <meta property="og:title" content='Trang chủ' />
        <meta property="og:description" content='Xem thêm nhiều bài viết' />
        <meta property="og:image" content='https://woforgmedia.wordonfire.org/wp-content/uploads/2022/11/15094938/great-literature-scaled.jpg' />
        <meta property="og:url" content={`https://website-advertisement.vercel.app/`} />
      </Head>
      <main>
        <div className="bg-white container mt-5 w-90 mb-5">
          <div className="row">
            <div className="d-flex py-3 col flex-column setWidth ">
              <h2 className="text-left mb-0 mt-4 ml-5 setPadding">Top bài viết</h2>
              <hr className="horizol" />
              {popularArticle.map((article) => (
                <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="d-flex align-items-center justify-content-center flex-column">
                  <Image
                    alt="test"
                    src={article.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '60%', height: 'auto' }}
                  />
                  <div className="brief d-flex flex-column setPadding">
                    <h4 className="title mt-3 mt-1 ">{article.title}</h4>
                    <p>{article.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="col-6">
              <div className="d-flex flex-column mb-5 mt-5">
                {highLightArticle.map((highLight) => (
                  <Link key={highLight.articleid} href={`/pageDetail/${highLight.articleid}`} className="d-flex flex-column">
                    <Image
                      alt="test"
                      src={highLight.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div className="brief d-flex flex-column ">
                      <h1 className="title mt-3 mt-1 font-weight-bold">{highLight.title}</h1>
                      <p className="middleFontSize">{highLight.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="d-flex py-3 col flex-column setWidth ">
              <h2 className="text-left mb-0 mt-4 ml-5 setPadding">Bài viết gần đây</h2>
              <hr className="horizol" />
              {recentArticle.map((recent) => (
                <Link key={recent.articleid} href={`/pageDetail/${recent.articleid}`} className="d-flex align-items-center justify-content-center flex-column">
                  <Image
                    alt="test"
                    src={recent.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '60%', height: 'auto' }}
                  />
                  <div className="brief d-flex flex-column setPadding">
                    <h4 className="title mt-3 mt-1 ">{recent.title}</h4>
                    <p>{recent.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Mục công nghệ */}
        <h1 className="category-title">Công nghệ</h1>
        <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between">
          <div className="row d-flex align-items-start">
            {technical.map((techArticle) => (
              <Link key={techArticle.articleid} href={`/pageDetail/${techArticle.articleid}`} className="col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0">
                <Image
                  alt="test"
                  src={techArticle.image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '90%', height: 'auto' }}
                />
                <div className="brief d-flex flex-column setPaddingCategory">
                  <h4 className="title mt-3 mt-1 ">{techArticle.title}</h4>
                  <p>{techArticle.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Mục lối sống */}
        <h1 className="category-title">Lối sống</h1>
        <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between">
          <div className="row d-flex align-items-start">
            {lifeStyle.map((article) => (
              <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0">
                <Image
                  alt="test"
                  src={article.image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '90%', height: 'auto' }}
                />
                <div className="brief d-flex flex-column setPaddingCategory">
                  <h4 className="title mt-3 mt-1 ">{article.title}</h4>
                  <p>{article.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Mục Thú cưng */}
        <h1 className="category-title">Thú cưng</h1>
        <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between">
          <div className="row d-flex align-items-start">
            {pet.map((article) => (
              <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="col-6 d-flex justify-content-center flex-column mt-3 p-0">
                <Image
                  alt="test"
                  src={article.image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="paddingPicPet"
                />
                <div className="brief d-flex flex-column setPaddingCategory">
                  <h4 className="title mt-3 mt-1 ">{article.title}</h4>
                  <p>{article.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='row justify-content-center pb-3'>
          <Link href='/category' className='button-custom col-2 text-center pe-auto'>Xem thêm bài khác</Link>
        </div>
      </main>
    </div>
  );
}