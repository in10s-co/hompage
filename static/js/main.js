document.write(
  '<script async src="https://tally.so/widgets/embed.js"></script>' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js"></script>' +
    '<script SameSite="None; Secure" src="https://static.landbot.io/landbot-3/landbot-3.0.0.js"></script>'
);

window.addEventListener("load", function () {
  const host = window.location.host;
  if (host == "in10s.co" || host == "www.in10s.co") {
    const toggleBtn = document.querySelector(".buttonIcon");
    const header = document.querySelector(".header");

    toggleBtn.addEventListener("click", () => {
      header.classList.toggle("headerOpen");
      toggleBtn.classList.toggle("buttonIconNav");
      toggleBtn.classList.toggle("buttonIconClose");
    });
  }
});
function goPage(link) {
  const url_pathname = window.location.pathname + "";
  if (link.substring(0, 1) == "/") {
    link = "https://www.in10s.co" + link;
  }

  gtag("event", "go_page", {
    "event_ category": url_pathname,
    event_label: link.replace("https://www.in10s.co", ""),
  });

  location.href = link;
}

function clickBtn(tag) {
  const url_pathname = window.location.pathname + "";

  gtag("event", "btn_click", {
    "event_ category": url_pathname,
    event_label: tag,
  });
}

function openTally(tag, mode, link) {
  const url_pathname = window.location.pathname + "";
  const device = new MobileDetect(navigator.userAgent);
  gtag("event", "regist_openTally", {
    "event_ category": url_pathname,
    event_label: tag,
  });

  Tally.openPopup("3NlXpN", {
    layout: "modal",
    width: 400,
    hideTitle: false,
    hiddenFields: {
      from: url_pathname,
      tag:
        "{tag: " +
        tag +
        "," +
        "mobile: " +
        device.mobile() +
        ",phone: " +
        device.phone() +
        ",tablet: " +
        device.tablet() +
        ",userAgent: " +
        device.userAgent() +
        ",mobileOs: " +
        device.os() +
        ",pcOs: " +
        navigator.platform +
        "}",
    },
    onOpen: () => {
      // The popup was opened, mark the form as seen
      const tally_popup = document.querySelector(".tally-popup iframe");
      if (link && mode == "page") {
        tally_popup.src =
          "javascript:goPage(https://www.in10s.co/service/acceptancerate/" +
          link +
          "')";
        setTimeout(() => {
          var popup_display = setInterval(() => {
            if (tally_popup.readyState == "complete") {
              tally_popup.style.display = "flex";
              clearInterval(popup_display);
            }
          }, 100);
        }, 300);
      } else {
        tally_popup.style.display = "flex";
      }
    },
    onClose: () => {
      // The popup was closed
      // document.querySelector(".cta").style.display = 'flex';
    },
    onSubmit: (payload) => {
      // Form was submitted, use the answers payload in your application
      //window.open("https://bit.ly/purchase_15000", "", "_blank");
      if (link && mode == "pay") {
        window.open("https://qr.kakaopay.com/" + link, "", "_blank");
      }
    },
  });
}

// Microsoft Clarity
(function (c, l, a, r, i, t, y) {
  c[a] =
    c[a] ||
    function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "iusk7x1q7r");

// landbot 시작
var setLandbot = function () {
  return new Landbot.Popup({
    configUrl:
      "https://storage.googleapis.com/landbot.online/v3/H-1718087-YI3HSK1S39RCZ1L1/index.json",
  });
};

var openLandbot = function (bot) {
  var popup_modal = document.querySelector(".LandbotPopup");
  if (popup_modal == null) {
    popup_modal = document.querySelector(".LandbotPopup");
  }
  bot.open();
  popup_modal.style.display = "flex";
  popup_modal.style.animation = "fadeIn 1.5s";
  popup_modal.style.opacity = 1;

  var timeout = setInterval(() => {
    if (!popup_modal.classList.contains("is-open")) {
      bot.close();
      popup_modal.style.display = "none";
      popup_modal.style.animation = "fadeOut 1.5s";
      popup_modal.style.opacity = 0;
      clearInterval(timeout);
    }
  }, 500);
};

window.addEventListener("load", function () {
  const notion_cta = document.querySelector(
    ".cta"
  );
  if(notion_cta == null){
    const try_tooltip = document.querySelector(
      ".PCBubblePopupLayer__PCBubbleWrapper-ch-front__sc-qr66bs2-0"
    );
    var landbot = setLandbot();
    setTimeout(() => {
      try_tooltip.style.opacity = 1;
      try_tooltip.style.display = "flex";
      try_tooltip.addEventListener("click", function () {
        openLandbot(landbot);
      });
    }, 1500);
  }
});
// landbot 종료
