'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Head from "next/head";
import banner1 from '../assest/img/5.png';

type Article = {
  articleid: number,
  title: string,
  summary: string,
  image: string,
  price?: number,
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const images = [
    banner1,
    "https://images.samsung.com/is/image/samsung/assets/vn/2407/pcd/watches/PCD_WatchUltra_KV_1440x640_pc.jpg?imwidth=1366",
    "https://i.pinimg.com/736x/26/a6/bf/26a6bf5b167a360f2ef0dbed1f3773c0.jpg",];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Optional: Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/articles?all=true&page=${page}&limit=12`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      console.log(data);
      setArticles(data.results || []);
      setTotalPages(data.totalPages || 1); // Ensure your API returns `totalPages`.
    } catch (error: unknown) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  if (error) {
    return <div className="d-flex w-85 mr-auto w-100">Error: {error}</div>;
  }

  return (
    <div className="container mt-2">
      {/* SlideShow */}
      <div className="position-relative mb-4 rounded overflow-hidden">
        <div className="position-relative" style={{ height: '60vh' }}>
          <div className="position-relative overflow-hidden" style={{ height: '60vh', borderRadius: '20px' }}>
            {images.map((src, index) => (
              <img
                key={index}
                src={typeof src === 'string' ? src : src.src}
                alt={`Slide ${index + 1}`}
                className={`position-absolute top-0 start-0 w-100 h-100 object-fit-cover transition-opacity`}
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            ))}
          </div>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex mb-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`btn btn-sm rounded-circle mx-1  ${index === currentIndex ? 'btn-light' : 'btn-secondary'}`}
              style={{ width: '10px', height: '10px', padding: 0 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slogan */}
      <div className="text-start mb-4">
        <h1 className="fw-bold display-5">
          <span className="text-danger">Best</span> Deals,
        </h1>
        <h1 className="fw-bold display-5">
          <span className="text-muted">Zero</span> Stress
        </h1>
        <p className="fw-semibold text-dark mt-2">
          Bạn chỉ cần mua sắm – việc tìm deal đã có chúng tôi lo
        </p>
        <hr className="w-50" />
      </div>

      {/* Article Grid */}
      <div className="row d-flex align-items-start">
        {articles.map((article) => {
          return (
            <Link
              key={article.articleid}
              href={`/pageDetail/${article.articleid}`}
              className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 d-flex align-items-center justify-content-center flex-column mt-3 p-0  border p-3"
            >
              <Image
                alt={article.title}
                src={article.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                priority
              />
              <div className="brief d-flex flex-column text-center block w-100 setPaddingCategory">
                <h4 className="line-clamp-1 mt-3 fw-bold">
                  {article.title}
                </h4>
                <p className="line-clamp-1 text-muted">
                  {article.summary}
                </p>
                <p className="article-price mt-2">
                  Giá tiền: {article.price !== undefined
                    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(article.price)
                    : 'Liên hệ'}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="d-flex mt-4 button-group align-items-center">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="d-flex mx-1">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1; // Page numbers start at 1
            return (
              <button
                key={page}
                className={`btn btn-number page-item ${currentPage === page ? 'btn-secondary' : 'btn-outline-primary'
                  }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    // <div>
    //   <title>Trang chủ</title>
    //   <Head>
    //     <title>Trang chủ</title>
    //     <meta name="description" content='Xem bài viết hay' />
    //     <meta property="og:title" content='Trang chủ' />
    //     <meta property="og:description" content='Xem thêm nhiều bài viết' />
    //     <meta property="og:image" content='https://woforgmedia.wordonfire.org/wp-content/uploads/2022/11/15094938/great-literature-scaled.jpg' />
    //     <meta property="og:url" content={`https://website-advertisement.vercel.app/`} />
    //   </Head>
    //   <main>
    //     <div className="bg-white container mt-5 w-90 mb-5">
    //       <div className="row">
    //         <div className="d-flex py-3 col flex-column setWidth ">
    //           <h2 className="text-left mb-0 mt-4 ml-5 setPadding">Top bài viết</h2>
    //           <hr className="horizol" />
    //           {popularArticle.map((article) => (
    //             <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="d-flex align-items-center justify-content-center flex-column">
    //               <Image
    //                 alt="test"
    //                 src={article.image}
    //                 width={0}
    //                 height={0}
    //                 sizes="100vw"
    //                 style={{ width: '60%', height: 'auto' }}
    //               />
    //               <div className="brief d-flex flex-column setPadding">
    //                 <h4 className="title mt-3 mt-1 ">{article.title}</h4>
    //                 <p>{article.summary}</p>
    //               </div>
    //             </Link>
    //           ))}
    //         </div>
    //         <div className="col-6">
    //           <div className="d-flex flex-column mb-5 mt-5">
    //             {highLightArticle.map((highLight) => (
    //               <Link key={highLight.articleid} href={`/pageDetail/${highLight.articleid}`} className="d-flex flex-column">
    //                 <Image
    //                   alt="test"
    //                   src={highLight.image}
    //                   width={0}
    //                   height={0}
    //                   sizes="100vw"
    //                   style={{ width: '100%', height: 'auto' }}
    //                 />
    //                 <div className="brief d-flex flex-column ">
    //                   <h1 className="title mt-3 mt-1 font-weight-bold">{highLight.title}</h1>
    //                   <p className="middleFontSize">{highLight.summary}</p>
    //                 </div>
    //               </Link>
    //             ))}
    //           </div>
    //         </div>
    //         <div className="d-flex py-3 col flex-column setWidth ">
    //           <h2 className="text-left mb-0 mt-4 ml-5 setPadding">Bài viết gần đây</h2>
    //           <hr className="horizol" />
    //           {recentArticle.map((recent) => (
    //             <Link key={recent.articleid} href={`/pageDetail/${recent.articleid}`} className="d-flex align-items-center justify-content-center flex-column">
    //               <Image
    //                 alt="test"
    //                 src={recent.image}
    //                 width={0}
    //                 height={0}
    //                 sizes="100vw"
    //                 style={{ width: '60%', height: 'auto' }}
    //               />
    //               <div className="brief d-flex flex-column setPadding">
    //                 <h4 className="title mt-3 mt-1 ">{recent.title}</h4>
    //                 <p>{recent.summary}</p>
    //               </div>
    //             </Link>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //     {/* Mục công nghệ */}
    //     <h1 className="category-title">Công nghệ</h1>
    //     <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between">
    //       <div className="row d-flex align-items-start">
    //         {technical.map((techArticle) => (
    //           <Link key={techArticle.articleid} href={`/pageDetail/${techArticle.articleid}`} className="col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0">
    //             <Image
    //               alt="test"
    //               src={techArticle.image}
    //               width={0}
    //               height={0}
    //               sizes="100vw"
    //               style={{ width: '90%', height: 'auto' }}
    //             />
    //             <div className="brief d-flex flex-column setPaddingCategory">
    //               <h4 className="title mt-3 mt-1 ">{techArticle.title}</h4>
    //               <p>{techArticle.summary}</p>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //     {/* Mục lối sống */}
    //     <h1 className="category-title">Lối sống</h1>
    //     <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between">
    //       <div className="row d-flex align-items-start">
    //         {lifeStyle.map((article) => (
    //           <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="col-3 d-flex align-items-center justify-content-center flex-column mt-3 p-0">
    //             <Image
    //               alt="test"
    //               src={article.image}
    //               width={0}
    //               height={0}
    //               sizes="100vw"
    //               style={{ width: '90%', height: 'auto' }}
    //             />
    //             <div className="brief d-flex flex-column setPaddingCategory">
    //               <h4 className="title mt-3 mt-1 ">{article.title}</h4>
    //               <p>{article.summary}</p>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //     {/* Mục Thú cưng */}
    //     <h1 className="category-title">Thú cưng</h1>
    //     <div className="bg-white container w-90 mt-2 mb-5 d-flex justify-content-between">
    //       <div className="row d-flex align-items-start">
    //         {pet.map((article) => (
    //           <Link key={article.articleid} href={`/pageDetail/${article.articleid}`} className="col-6 d-flex justify-content-center flex-column mt-3 p-0">
    //             <Image
    //               alt="test"
    //               src={article.image}
    //               width={0}
    //               height={0}
    //               sizes="100vw"
    //               style={{ width: '100%', height: 'auto' }}
    //               className="paddingPicPet"
    //             />
    //             <div className="brief d-flex flex-column setPaddingCategory">
    //               <h4 className="title mt-3 mt-1 ">{article.title}</h4>
    //               <p>{article.summary}</p>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //     <div className='row justify-content-center pb-3'>
    //       <Link href='/category' className='button-custom col-2 text-center pe-auto'>Xem thêm bài khác</Link>
    //     </div>
    //   </main>
    // </div>
  );
}