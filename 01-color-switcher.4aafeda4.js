const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let e=null;t.startBtn.addEventListener("click",(function(){e=setInterval((()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.startBtn.setAttribute("disabled",!0),t.stopBtn.removeAttribute("disabled")})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.4aafeda4.js.map
