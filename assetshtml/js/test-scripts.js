function setCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function addCss(fileName) {
  var head = document.head,
    link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;
  link.id = "selected_font";

  head.appendChild(link);
}
function changeColorStyle() {
  $("img.svg").each(function () {
    var $img = jQuery(this);
    var attributes = $img.prop("attributes");
    var imgURL = $img.attr("src");
    $.get(imgURL, function (data) {
      var $svg = $(data).find("svg");
      $svg = $svg.removeAttr("xmlns:a");
      $.each(attributes, function () {
        $svg.attr(this.name, this.value);
      });
      $img.replaceWith($svg);
    });
  });
}
function pricetableSettings({
  color: e,
  font: a,
  textDirection: n,
  backgroundcolor: z,
}) {
  (this.color = e || getCookie("color") || e),
    (this.font = a || getCookie("font") || a),
    (this.textDirection = n || getCookie("textDirection") || n),
    (this.backgroundcolor = z || getCookie("backgroundcolor") || z),
    this.manageColor(),
    this.manageFont(),
    this.manageTextDirection(),
    this.manageBackgroundcolor();
}

$(document).ready(function () {
  var hideheadergroup;
  var hideperiodheader;
  $.ajax({
    url: "test.json",
    dataType: "json",
    success: function (data) {
      data.settings.forEach(function (settingselement) {
        hideheadergroup = settingselement.hideheadergroup;
        hideperiodheader = settingselement.hideperiodheader;

        var themecolor = settingselement.themecolor;
        var themefont = settingselement.themefont;

        var optionSettings = {
          backgroundcolor: themecolor + "-bg",
          color: themecolor,
          font: themefont,
          textDirection: "ltr",
        };

        new pricetableSettings(optionSettings);

        if (hideheadergroup == false) {
          $("#headergroup").show();
          $(".anchor-slick-header").show();
          $(".list-location").show();
        } else {
          $("#headergroup").hide();
          $(".anchor-slick-header").hide();
          $(".list-location").hide();
        }
        // To hide & show periodheaders
        if (hideperiodheader == false) {
          $("#periodheader").show();
        } else {
          $("#periodheader").hide();
        }
      });

      // To hide individual periodheader, change the element "visible" at json file
      data.periodheaders.forEach(function (periodheader) {
        var periodheaderselector = "." + periodheader.name;
        if (periodheader.visible == false) {
          $(periodheaderselector).hide();
          return;
        }
        $(periodheaderselector).text(periodheader.value);
      });

      // To hide & show headers
      data.headers.forEach(function (section) {
        var headerSelector = "#" + section.name;
        var headerlabeltab = "." + section.name;
        var headerlabel = headerSelector.replace("header", "headerlabel");
        var headerlabeltabSelector = headerlabeltab.replace(
          "header",
          "headerlabeltab"
        );
        if (section.visible == false) {
          $(headerSelector).hide();
          $(headerlabel).hide();
          $(headerlabeltabSelector).hide();
          return;
        }
        $(headerSelector).text(section.value);
        $(headerlabel).text(section.value);
        $(headerlabeltabSelector).text(section.value);

        var plannum = 1;
        section.plans.forEach(function (pricingplan) {
          if (pricingplan.stockout) {
            var stockoutplan = $(headerSelector + "plan" + plannum);

            if (stockoutplan.length) {
              stockoutplan.find(".top-content").addClass("stockOut");
              $(headerSelector + "-link" + plannum).text("Out of Stock");
            }
          }
          plannum += 1;
          return false;
        });
      });
    },
  });
});

// *****JS for CONFIGSECTION*****

// $(document).ready(function () {
//   $("#configsection").load("configsection.html", function () {
//     $(".downarrow").click(function () {
//       $(".downarrow").toggleClass("rotate");
//       $(".downarrow").toggleClass("rotate-reset");
//       $(".colorbar").animate({
//         height: "toggle",
//       });
//     });
//     $("#checksetting").click(function () {
//       var themecol = $("input[name='themecolor']:checked").val();
//       var themefont = $("input[name='themefont']:checked").val();

//       var optionSettings = {
//         backgroundcolor: themecol + "-bg",
//         color: themecol,
//         font: themefont,
//         textDirection: "ltr",
//       };

//       new pricetableSettings(optionSettings);

//     });
//   });
// });

// *****SLICK STARTS HERE*****
// $(".slider").slick({
//   infinite: true,
//   centerMode: !0,
//   centerPadding: "200px",
//   slidesToShow: 4,
//   slidesToScroll: !0

// });

// function slick() {
//   $(".my-slider").slick({
//     // centerMode: !0,
//     centerPadding: "200px",
//     slidesToShow:4,
//     infinite: !0,
//     arrows: !0,
//     rtl: !1,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           arrows: !0,
//           // centerMode: !0,
//           centerPadding: "100px",
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 991,
//         settings: {
//           arrows: !0,
//           centerMode: !0,
//           centerPadding: "100px",
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           arrows: !0,
//           // centerMode: !0,
//           centerPadding: "150px",
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 590,
//         settings: "unslick",
//       },
//     ],
//   })
// }

function initializeSlick() {
  $(".my-slider").slick({
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "100px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          centerMode: true,
          centerPadding: "50px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "150px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 590,
        settings: "unslick",
      },
    ],
  });
}

//Slick initialization
initializeSlick();

// Reinitialize Slick on window resize
function refreshPage() {
  location.reload();
}
$(window).resize(function () {
  clearTimeout(this.resizeTimeout);

  this.resizeTimeout = setTimeout(refreshPage, 100);
  var windowWidth = $(window).width();

  // If width is less than 590, the slider will stop working
  if (windowWidth < 590 && $(".my-slider").hasClass("slick-initialized")) {
    $(".my-slider").slick("unslick");
  }
  // Initialize the slick slider if it's not initialized and the window width is 590 or more
  else if (
    windowWidth >= 590 &&
    !$(".my-slider").hasClass("slick-initialized")
  ) {
    initializeSlick();
  }
});

// ******SLICK ENDS HERE******

document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  loadTabs(); //, slick();
}),
  (body = $("body")),
  (pricetableSettings.prototype.manageTextDirection = function () {
    switch (this.textDirection) {
      case "ltr":
        setCookie("textDirection", "ltr", 365),
          body.attr("data-textDirection", "ltr");
        break;
      case "rtl":
        $("html").attr("dir", "rtl"),
          $(function () {
            $("link.rtl").attr("disabled", !1);
          }),
          $(function () {
            $("link.ltr").attr("disabled", !0);
          }),
          setCookie("textDirection", "rtl", 365),
          body.attr("data-textDirection", "rtl");
    }
  }),
  (pricetableSettings.prototype.manageBackgroundcolor = function () {
    switch (this.backgroundcolor) {
      case "black-bg":
        body.attr("data-backgroundcolor", "black-bg");
        setCookie("backgroundcolor", "black-bg", 365);
        break;
      case "pink-bg":
        body.attr("data-backgroundcolor", "pink-bg");
        setCookie("backgroundcolor", "pink-bg", 365);
        break;
      case "green-bg":
        body.attr("data-backgroundcolor", "green-bg");
        setCookie("backgroundcolor", "green-bg", 365);
        break;
      case "blue-bg":
        body.attr("data-backgroundcolor", "blue-bg");
        setCookie("backgroundcolor", "blue-bg", 365);
        break;
      case "red-bg":
        body.attr("data-backgroundcolor", "red-bg");
        setCookie("backgroundcolor", "red-bg", 365);
        break;
      case "purple-bg":
        body.attr("data-backgroundcolor", "purple-bg");
        setCookie("backgroundcolor", "purple-bg", 365);
        break;
      case "orange-bg":
        body.attr("data-backgroundcolor", "orange-bg");
        setCookie("backgroundcolor", "orange-bg", 365);
        break;
      case "teal-bg":
        body.attr("data-backgroundcolor", "teal-bg");
        setCookie("backgroundcolor", "teal-bg", 365);
        break;
      case "cyan-bg":
        body.attr("data-backgroundcolor", "cyan-bg");
        setCookie("backgroundcolor", "cyan-bg", 365);
        break;
      case "brown-bg":
        body.attr("data-backgroundcolor", "brown-bg");
        setCookie("backgroundcolor", "brown-bg", 365);
    }
  }),
  (pricetableSettings.prototype.manageColor = function () {
    switch (this.color) {
      case "pink":
      default:
        body.attr("data-color", "pink"), setCookie("color", "pink", 365);
        break;
      case "green":
        body.attr("data-color", "green"), setCookie("color", "green", 365);
        break;
      case "blue":
        body.attr("data-color", "blue"), setCookie("color", "blue", 365);
        break;
      case "black":
        body.attr("data-color", "black"), setCookie("color", "black", 365);
        break;
      case "red":
        body.attr("data-color", "red"), setCookie("color", "red", 365);
        break;
      case "purple":
        body.attr("data-color", "purple"), setCookie("color", "purple", 365);
        break;
      case "orange":
        body.attr("data-color", "orange"), setCookie("color", "orange", 365);
        break;
      case "teal":
        body.attr("data-color", "teal"), setCookie("color", "teal", 365);
        break;
      case "cyan":
        body.attr("data-color", "cyan"), setCookie("color", "cyan", 365);
        break;
      case "brown":
        body.attr("data-color", "brown"), setCookie("color", "brown", 365);
    }
  }),
  (pricetableSettings.prototype.manageFont = function () {
    switch (this.font) {
      case "opensans":
      default:
        body.attr("data-font", "opensans"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "opensans", 365);
        break;
      case "poppins":
        body.attr("data-font", "poppins"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "poppins", 365);
        break;
      case "nunito":
        body.attr("data-font", "nunito"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "nunito", 365);
        break;

      case "alexandria":
        body.attr("data-font", "alexandria"),
          addCss(
            "https://fonts.googleapis.com/css?family=Alexandria:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "alexandria", 365);
        break;

      case "commissioner":
        body.attr("data-font", "commissioner"),
          addCss(
            "https://fonts.googleapis.com/css?family=Commissioner:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "commissioner", 365);
        break;

      case "farro":
        body.attr("data-font", "farro"),
          addCss(
            "https://fonts.googleapis.com/css?family=Farro:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "farro", 365);
        break;

      case "geologica":
        body.attr("data-font", "geologica"),
          addCss(
            "https://fonts.googleapis.com/css?family=Geologica:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "geologica", 365);
        break;

      case "dmsans":
        body.attr("data-font", "dmsans"),
          addCss(
            "https://fonts.googleapis.com/css?family=DM Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "dmsans", 365);
        break;

      case "quicksand":
        body.attr("data-font", "quicksand"),
          addCss(
            "https://fonts.googleapis.com/css?family=Quicksand:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "quicksand", 365);
        break;

      case "raleway":
        body.attr("data-font", "raleway"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          ),
          setCookie("font", "raleway", 365);
    }
  }),
  $(document).ready(function () {});
// var $,
//   mySwiper = new Swiper(".swiper-container", {
//     direction: "horizontal",
//     loop: !0,
//     autoHeight: !0,
//     grabCursor: !0,
//     centeredSlides: !0,
//     autoplay: {
//       delay: 5e3,
//       speed: 1e3,
//       disableOnInteraction: !1,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     scrollbar: {
//       el: ".swiper-scrollbar",
//     },
//   });
function loadTabs() {
  $(".tabs-header").on("click", "li:not(.active)", function () {
    var t = $(this).index();
    $(this).addClass("active").siblings().removeClass("active"),
      $(this)
        .closest(".tabs")
        .find(".tabs-item")
        .removeClass("active")
        .eq(t)
        .addClass("active");
  });
}

// $(document).ready(function () {

//     var hideperiodheader;
//     $.ajax({
//       url: "test.json",
//       dataType: "json",
//       success: function (data) {
//         data.settings.forEach(function (settingselement) {
//           hideheadergroup = settingselement.hideheadergroup;
//           hideperiodheader = settingselement.hideperiodheader;

//           var themecolor = settingselement.themecolor;
//           var themefont = settingselement.themecolor;

//           var optionSettings = {
//             backgroundcolor: themecolor + "-bg",
//             color: themecolor,
//             font: themefont,
//             textDirection: "ltr",
//           };

//           new pricetableSettings(optionSettings);

//           if (hideheadergroup == false) {
//             $("#headergroup").show();
//           } else {
//             $("#headergroup").hide();
//           }

//           if (hideperiodheader == false) {
//             $("#periodheader").show();
//           } else {
//             $("#periodheader").hide();
//           }
//         });
//         data.headers.forEach(function (section) {
//           var headerSelector = "#" + section.name;
//           var headerlabeltab = "." + section.name;
//           var headerlabel = headerSelector.replace("header", "headerlabel");
//           var headerlabeltabSelector = headerlabeltab.replace(
//             "header",
//             "headerlabeltab"
//           );
//           if (section.visible == false) {
//             $(headerSelector).hide();
//             $(headerlabel).hide();
//             $(headerlabeltabSelector).hide();
//             return;
//           }
//           $(headerSelector).text(section.value);
//           $(headerlabel).text(section.value);
//           $(headerlabeltabSelector).text(section.value);

//           var plannum = 1;
//           section.plans.forEach(function (pricingplan) {
//             if (pricingplan.stockout) {
//               var stockoutplan = $(headerSelector + "plan" + plannum);

//               if (stockoutplan.length) {

//                 stockoutplan.find(".top-content").addClass("stockOut");
//                 $(headerSelector + "-link" + plannum).text("Out of Stock");
//               }
//             }
//             plannum += 1;
//             return false;
//           });
//         });
//       },
//     });
// });
