$(document).ready(function () {
  const $wrapper = $(".wrapper");
  const $sidebar = $(".sidebarBox");
  const $sections = $(".section");
  const $navLinks = $(".menu li a");

  let lastScrollTop = 0;
  let scrollTimeout;

  $wrapper.on("scroll", function () {
    const scrollTop = $wrapper.scrollTop();
    const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
    lastScrollTop = scrollTop;

    const factor = Math.min(scrollTop / 200, 1);
    const offsets = [6, 12, 18, 24, 30].map((v) => Math.round(v * factor));
    const sign = scrollDirection === "down" ? -1 : 1;

    // --- Dynamic Box Shadow ---

    $sidebar.css("box-shadow", `none`);

    if ($(window).width() > 1023) {
      $sidebar.css(
        "box-shadow",
        `rgba(255, 99, 71, 0.35) 0px ${sign * offsets[0]}px, ` +
          `rgba(255, 136, 105, 0.25) 0px ${sign * offsets[1]}px, ` +
          `rgba(255, 210, 170, 0.15) 0px ${sign * offsets[2]}px, ` +
          `rgba(245, 235, 220, 0.08) 0px ${sign * offsets[3]}px, ` +
          `rgba(255, 255, 255, 0.04) 0px ${sign * offsets[4]}px`,
      );
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      $sidebar.css("box-shadow", "none");
    }, 150);

    // --- ScrollSpy ---
    let currentSectionId = "";

    $sections.each(function () {
      const $section = $(this);
      const sectionTop = $section.position().top - $wrapper.scrollTop();
      const sectionHeight = $section.outerHeight();

      if (sectionTop < 200 && sectionTop + sectionHeight > 100) {
        currentSectionId = $section.attr("id");
      }
    });

    if (currentSectionId) {
      $sections.removeClass("activeSection");
      $("#" + currentSectionId).addClass("activeSection");

      $navLinks.removeClass("activeNav");
      $navLinks.filter(`[href="#${currentSectionId}"]`).addClass("activeNav");
    }
  });

  if ($(window).width() > 768) {
  }

  $(".togglerHeader").on("click", function () {
    const $icon = $(this).find("svg");
    const $boxgeneral = $(this).parent();
    const $content = $(this).next(".togglerClosedPart");

    $content.slideToggle(1000);
    $icon.toggleClass("rotated");
    $boxgeneral.toggleClass("activeBox");
  });
});
