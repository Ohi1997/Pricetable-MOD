jQuery(document).ready(function () {
  setTimeout(function () {
    $(".redb").removeClass("active");
  }, 1000);

  // Update pricing for periods
  function updatePricing(selectedHeader, period) {
    var price = period + "price";
    var link = period + "link";
  
    $.ajax({
      url: "new-js4/newconfigsection4.json",
      dataType: "json",
      success: function (data) {
        var headerMatched = false;
  
        data.headers.forEach(function (section) {
          if (section.name === selectedHeader) {
            for (var i = 0; i < section.plans.length; i++) {
              $(".columns").eq(i).find(".grey-price").html(
                "<sup>$</sup>" + section.plans[i][price] + '<span class="period">/mo</span>'
              );
              $(".columns").eq(i).find(".button").attr("href", section.plans[i][link]);
            }
            headerMatched = true;
          }
        });
  
        if (headerMatched) {
          $("#" + period).addClass("active").siblings().removeClass("active");
        }
      },
    });
  }  

  // Trigger updatePricing with default values when the DOM is ready
  $.ajax({
    url: "new-js4/newconfigsection4.json",
    dataType: "json",
    success: function (data) {
      var selectedheader = $("#headergroup li.active")[0].id;
      var defaultPeriod = getDefaultPeriodVisibility(data);
      updatePricing(selectedheader, defaultPeriod);
    },
  });

  // Handle click events on button click
  $("#monthly, #quarterly, #halfyearly, #yearly").click(function () {
    var selectedheader = $("#headergroup li.active")[0].id;
    var period = this.id;

    updatePricing(selectedheader, period);
  });

  // Function to get the default period based on visibility status from json
  function getDefaultPeriodVisibility(data) {
    var defaultPeriods = ["monthly", "quarterly", "halfyearly", "yearly"];

    for (var i = 0; i < defaultPeriods.length; i++) {
      var period = defaultPeriods[i];
      if (data.periodheaders[i].visible) {
        return period;
      }
    }

    return "monthly";
  }

  // var hideheadergroup;
  // var hideperiodheader;
  // $.ajax({
  //   url: "new-js4/newconfigsection4.json",
  //   dataType: "json",
  //   success: function (data) {
  //     // To hide & show
  //     // data.settings.forEach(function (settingselement) {
  //     //   hideheadergroup = settingselement.hideheadergroup;
  //     //   hideperiodheader = settingselement.hideperiodheader;

  //     //   var themecolor = settingselement.themecolor;
  //     //   var themefont = settingselement.themefont;

  //     //   var optionSettings = {
  //     //     backgroundcolor: themecolor + "-bg",
  //     //     color: themecolor,
  //     //     font: themefont,
  //     //     textDirection: "ltr",
  //     //   };

  //     //   new pricetableSettings(optionSettings);

  //     //   if (hideheadergroup == false) {
  //     //     $("#headergroup").show();
  //     //     $(".anchor-slick-header").show();
  //     //     $(".list-location").show();
  //     //   } else {
  //     //     $("#headergroup").hide();
  //     //     $(".anchor-slick-header").hide();
  //     //     $(".list-location").hide();
  //     //   }
  //     //   // To hide & show periodheaders
  //     //   if (hideperiodheader == false) {
  //     //     $("#periodheader").show();
  //     //   } else {
  //     //     $("#periodheader").hide();
  //     //   }
  //     // });

  //     // To hide/show individual periodheader, change the element "visible" to 'false/true' at json file
  //     data.periodheaders.forEach(function (periodheader) {
  //       var periodheaderselector = "." + periodheader.name;
  //       if (periodheader.visible == false) {
  //         $(periodheaderselector).hide();
  //         return;
  //       }
  //       $(periodheaderselector).text(periodheader.value); //takes value from json and updates periodheaders at the DOM
  //     });

  //     // To hide/show individual header, change the element "visible" to 'false/true' at json file
  //     data.headers.forEach(function (section) {
  //       var headerSelector = "#" + section.name;
  //       var headerlabeltab = "." + section.name;
  //       var headerlabel = headerSelector.replace("header", "headerlabel");
  //       var headerlabeltabSelector = headerlabeltab.replace(
  //         "header",
  //         "headerlabeltab"
  //       );
  //       if (section.visible == false) {
  //         $(headerSelector).hide();
  //         $(headerlabel).hide();
  //         $(headerlabeltabSelector).hide();
  //         return;
  //       }
  //       //takes value from json and updates headers at the DOM
  //       $(headerSelector).text(section.value);
  //       $(headerlabel).text(section.value);
  //       $(headerlabeltabSelector).text(section.value);

  //       // Checks individual pricing plans to trigger stockout plans from json
  //       var plannum = 1;
  //       section.plans.forEach(function (pricingplan) {
  //         if (pricingplan.stockout) {
  //           var stockoutplan = $(headerSelector + "plan" + plannum);

  //           if (stockoutplan.length) {
  //             stockoutplan.find(".top-content").addClass("stockOut");
  //             $(headerSelector + "-link" + plannum).text("Out of Stock");
  //           }
  //         }
  //         plannum += 1;
  //         return false;
  //       });
  //     });
  //   },
  // });

  //Function to load header-tabs
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

  //Set cookie & get cookie
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

  //addCss
  function addCss(fileName) {
    var head = document.head,
      link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
    link.id = "selected_font";

    head.appendChild(link);
  }

  document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    slick(); //Call slick
  });

  // Slick
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
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            centerMode: true,
            centerPadding: "50px",
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 590,
          settings: "unslick",
        },
      ],
    });
  }

  loadTabs(); // Call LoadTabs

  initializeSlick(); // Slick initialization

  // Reinitialize Slick on window resize

  function refreshPage() {
    location.reload();
  }

  $(window).resize(function () {
    clearTimeout(this.resizeTimeout); //Timeout

    this.resizeTimeout = setTimeout(refreshPage, 500);
    var windowWidth = $(window).width();

    // Initialize the slick slider if it's not initialized and the window width is 590 or more
    if (windowWidth >= 590 && !$(".my-slider").hasClass("slick-initialized")) {
      initializeSlick();
    }
  });

  // Declare PricetableSettings

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

  // declaring section variable
  var section = $("#radioplans");

  pricetableSettings.prototype.manageTextDirection = function () {
    switch (this.textDirection) {
      case "ltr":
        setCookie("textDirection", "ltr", 365),
          section.attr("data-textDirection", "ltr");
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
          section.attr("data-textDirection", "rtl");
    }
  };
  pricetableSettings.prototype.manageBackgroundcolor = function () {
    switch (this.backgroundcolor) {
      case "black-bg":
        section.attr("data-backgroundcolor", "black-bg");
        setCookie("backgroundcolor", "black-bg", 365);
        break;
      case "pink-bg":
        section.attr("data-backgroundcolor", "pink-bg");
        setCookie("backgroundcolor", "pink-bg", 365);
        break;
      case "green-bg":
        section.attr("data-backgroundcolor", "green-bg");
        setCookie("backgroundcolor", "green-bg", 365);
        break;
      case "blue-bg":
        section.attr("data-backgroundcolor", "blue-bg");
        setCookie("backgroundcolor", "blue-bg", 365);
        break;
      case "red-bg":
        section.attr("data-backgroundcolor", "red-bg");
        setCookie("backgroundcolor", "red-bg", 365);
        break;
      case "purple-bg":
        section.attr("data-backgroundcolor", "purple-bg");
        setCookie("backgroundcolor", "purple-bg", 365);
        break;
      case "orange-bg":
        section.attr("data-backgroundcolor", "orange-bg");
        setCookie("backgroundcolor", "orange-bg", 365);
        break;
      case "teal-bg":
        section.attr("data-backgroundcolor", "teal-bg");
        setCookie("backgroundcolor", "teal-bg", 365);
        break;
      case "cyan-bg":
        section.attr("data-backgroundcolor", "cyan-bg");
        setCookie("backgroundcolor", "cyan-bg", 365);
        break;
      case "brown-bg":
        section.attr("data-backgroundcolor", "brown-bg");
        setCookie("backgroundcolor", "brown-bg", 365);
    }
  };
  pricetableSettings.prototype.manageColor = function () {
    switch (this.color) {
      case "pink":
      default:
        section.attr("data-color", "pink"), setCookie("color", "pink", 365);
        break;
      case "green":
        section.attr("data-color", "green"), setCookie("color", "green", 365);
        break;
      case "blue":
        section.attr("data-color", "blue"), setCookie("color", "blue", 365);
        break;
      case "black":
        section.attr("data-color", "black"), setCookie("color", "black", 365);
        break;
      case "red":
        section.attr("data-color", "red"), setCookie("color", "red", 365);
        break;
      case "purple":
        section.attr("data-color", "purple"), setCookie("color", "purple", 365);
        break;
      case "orange":
        section.attr("data-color", "orange"), setCookie("color", "orange", 365);
        break;
      case "teal":
        section.attr("data-color", "teal"), setCookie("color", "teal", 365);
        break;
      case "cyan":
        section.attr("data-color", "cyan"), setCookie("color", "cyan", 365);
        break;
      case "brown":
        section.attr("data-color", "brown"), setCookie("color", "brown", 365);
    }
  };
  pricetableSettings.prototype.manageFont = function () {
    switch (this.font) {
      case "opensans":
      default:
        section.attr("data-font", "opensans"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "opensans", 365);
        break;
      case "poppins":
        section.attr("data-font", "poppins"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "poppins", 365);
        break;
      case "nunito":
        section.attr("data-font", "nunito"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "nunito", 365);
        break;

      case "alexandria":
        section.attr("data-font", "alexandria"),
          addCss(
            "https://fonts.googleapis.com/css?family=Alexandria:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "alexandria", 365);
        break;

      case "commissioner":
        section.attr("data-font", "commissioner"),
          addCss(
            "https://fonts.googleapis.com/css?family=Commissioner:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "commissioner", 365);
        break;

      case "farro":
        section.attr("data-font", "farro"),
          addCss(
            "https://fonts.googleapis.com/css?family=Farro:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "farro", 365);
        break;

      case "geologica":
        section.attr("data-font", "geologica"),
          addCss(
            "https://fonts.googleapis.com/css?family=Geologica:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "geologica", 365);
        break;

      case "dmsans":
        section.attr("data-font", "dmsans"),
          addCss(
            "https://fonts.googleapis.com/css?family=DM Sans:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "dmsans", 365);
        break;

      case "quicksand":
        section.attr("data-font", "quicksand"),
          addCss(
            "https://fonts.googleapis.com/css?family=Quicksand:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "quicksand", 365);
        break;

      case "raleway":
        section.attr("data-font", "raleway"),
          addCss(
            "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,700;0,800;1,300;1,400&display=swap"
          );
        setCookie("font", "raleway", 365);
    }
  };
});
