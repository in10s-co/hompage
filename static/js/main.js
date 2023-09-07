document.write('<script async src="https://tally.so/widgets/embed.js"></script>');
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js"></script>');

window.onload = function () {
    const toggleBtn = document.querySelector(".buttonIcon");
    const header = document.querySelector(".header");

    toggleBtn.addEventListener("click", () => {
      header.classList.toggle("headerOpen");
      toggleBtn.classList.toggle("buttonIconNav");
      toggleBtn.classList.toggle("buttonIconClose");
    });
  };

  function openTally(tag, mode, link) {
    const url_pathname = window.location.pathname + "";
    var device = new MobileDetect(navigator.userAgent);
    const pcOs = 'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(navigator.platform.toLowerCase()) >= 0;

    Tally.openPopup("3NlXpN", {
      layout: "modal",
      width: 400,
      hideTitle: false,
      hiddenFields: {
          from: url_pathname,
          tag: "{tag: " + tag + ",\n" +"mobile: " + device.mobile() + ",\nphone: " + device.phone() + ",\ntablet: " + device.tablet() + ",\nuserAgent: " + device.userAgent() + ",\nmobileOs: " + device.os() + ",\npcOs: " + pcOs +"\n}",
      },
      onOpen: () => {
        // The popup was opened, mark the form as seen
        const tally_popup = document.querySelector(".tally-popup iframe");
        if (link && mode == "page") {
          tally_popup.src = "https://www.in10s.co/service/acceptancerate/" + link;
          setTimeout(() => {
              var popup_display = setInterval(() => {
              if (tally_popup.readyState == "complete") {
                tally_popup.style.display = 'flex';
                clearInterval(popup_display);
              }
            }, 100);
          }, 300);
        }else {tally_popup.style.display = 'flex';}
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