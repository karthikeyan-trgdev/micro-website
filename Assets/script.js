document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const options = { month: "long", year: "numeric" };
    const currentMonthYear = now.toLocaleDateString("en-US", options);

    const mainVideo = document.querySelector(".main-video .item");
    const videoRow = document.querySelector(".all-videos .row");
    let allVideos = Array.from(document.querySelectorAll(".all-videos .col-6"));
    let found = false;

    // Always enforce correct sizing for main
    function setMainVideoContent(html) {
      mainVideo.innerHTML = html;
      const iframe = mainVideo.querySelector("iframe");
      if (iframe) {
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "188");
      }
    }

    // Always enforce correct sizing for small
    function setSmallVideoContent(item, html) {
      item.innerHTML = html;
      const iframe = item.querySelector("iframe");
      if (iframe) {
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "80");
      }
    }

    // Convert "Month Year" → Date
    function parseMonthYear(text) {
      return new Date(text);
    }

    // Sort videos in DESCENDING order (latest first)
    allVideos.sort((a, b) => {
      const aDate = parseMonthYear(
        a.querySelector(".date h6").innerText.trim()
      );
      const bDate = parseMonthYear(
        b.querySelector(".date h6").innerText.trim()
      );
      return bDate - aDate; // 👈 descending
    });

    // Re-append sorted videos
    allVideos.forEach((col) => videoRow.appendChild(col));

    // Pick current month as main (if exists)
    allVideos.forEach((col) => {
      const item = col.querySelector(".item");
      const dateText = item.querySelector(".date h6").innerText.trim();

      if (dateText === currentMonthYear && !found) {
        setMainVideoContent(item.innerHTML);
        col.remove();
        found = true;
      }
    });

    // Fallback → latest (first after sorting)
    if (!found && allVideos.length > 0) {
      const firstCol = allVideos[0];
      const item = firstCol.querySelector(".item");
      setMainVideoContent(item.innerHTML);
      firstCol.remove();
    }

    // Click-to-swap logic
    function attachClickEvents() {
      const videoItems = document.querySelectorAll(".all-videos .col-6 .item");
      videoItems.forEach((item) => {
        item.addEventListener("click", function () {
          const currentMainHTML = mainVideo.innerHTML;
          const clickedHTML = item.innerHTML;

          setMainVideoContent(clickedHTML); 
          setSmallVideoContent(item, currentMainHTML);
        });
      });
    }

    attachClickEvents();
  });





   $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
          0: {
            items: 2,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 2,
          },
        },
      });