const apiKey = "c932a473524f4541a348d15d39896b61";
const pageSize = 100;

async function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=${pageSize}`;
  const req = await fetch(url);
  const data = await req.json();
  return data.articles;
}

async function displayNews() {
  const articles = await fetchNews();
  let news = "";

  articles.forEach((article) => {
    let description = article.description;
    description = description
      ? description.slice(0, 100) + "....."
      : "No description available.";
    let title = article.title;
    title = title ? title.slice(0, 40) + "....." : "No title available.";
    const date = article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown Date";
    news += `
      <div class="">
        <div class="new bg-white py-5 px-4 rounded shadow-lg text-white border border-primary">
          <div class="info">
            <div class="author d-flex justify-content-between flex-wrap align-items-center">
              <span class="fw-bold text-dark">Author</span>
              <span  class="text-muted text-decoration-none"">
                ${article.author || "Unknown Author"}
              </span>
            </div>
            <div class="published-at d-flex justify-content-between flex-wrap align-items-center py-3">
              <span class="fw-bold text-dark">Published</span>
              <span class="text-muted">${date || ""}</span>
            </div>
          </div>
          <img class="img-fluid d-block object-fit-cover rounded" src="${
            article.urlToImage || "https://via.placeholder.com/300"
          }" alt="${article.title || ""}"  style ='height:300px'  />
          <a class="title d-block py-3 text-secondary text-decoration-none fw-bold"
             href="${article.url || "#"}"
             title="${article.title || ""}"
             target="_blank">
            
            ${title || "No Title Available"}
          </a>
          <p class="description text-muted" style ='min-height:100px' >
            ${description || "No description available."}
          </p>
          <div class="source d-flex justify-content-between flex-wrap py-3 align-items-center">
            <span class="text-dark fw-bold">Source</span>
            <span class="text-muted">${
              article.source?.name || "Unknown Source"
            }</span>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".row").innerHTML = news;
}

displayNews();
