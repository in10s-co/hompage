document.write(
  '<script async src="https://tally.so/widgets/embed.js"></script>'
);
document.write(
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js"></script>'
);

window.addEventListener("load", function () {
    const host = window.location.host;
    alert(host == "in10s.co" || host == "www.in10s.co");
  if (host == "in10s.co" || host == "www.in10s.co") {
    alert(window.location.host);
    const toggleBtn = document.querySelector(".buttonIcon");
    const header = document.querySelector(".notion_header");

    toggleBtn.addEventListener("click", () => {
      header.classList.toggle("headerOpen");
      toggleBtn.classList.toggle("buttonIconNav");
      toggleBtn.classList.toggle("buttonIconClose");
    });
  }
});

function openTally(tag, mode, link) {
  const url_pathname = window.location.pathname + "";
  const device = new MobileDetect(navigator.userAgent);

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
        "}"
    },
    onOpen: () => {
      // The popup was opened, mark the form as seen
      const tally_popup = document.querySelector(".tally-popup iframe");
      if (link && mode == "page") {
        tally_popup.src = "https://www.in10s.co/service/acceptancerate/" + link;
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
