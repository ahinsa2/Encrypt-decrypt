// Toggle dark/light mode
document.getElementById("mode-toggle").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  document.getElementById("mode-toggle").textContent =
    newTheme === "dark" ? "☀️ Day Watch" : "🌙 Night Camp";
});

// Toggle between encryption and decryption sections
document.getElementById("encrypt-choice").addEventListener("click", () => {
  showSection("encrypt");
});
document.getElementById("decrypt-choice").addEventListener("click", () => {
  showSection("decrypt");
});

function showSection(type) {
  const encryptBtn = document.getElementById("encrypt-choice");
  const decryptBtn = document.getElementById("decrypt-choice");
  const encryptSec = document.getElementById("encrypt-section");
  const decryptSec = document.getElementById("decrypt-section");

  if (type === "encrypt") {
    encryptBtn.classList.add("active");
    decryptBtn.classList.remove("active");
    encryptSec.classList.remove("hidden");
    decryptSec.classList.add("hidden");
  } else {
    decryptBtn.classList.add("active");
    encryptBtn.classList.remove("active");
    decryptSec.classList.remove("hidden");
    encryptSec.classList.add("hidden");
  }
}

// Caesar Cipher Logic
function caesarCipher(text, shift, encrypt = true) {
  let result = "";
  shift = encrypt ? shift : (26 - shift % 26);
  for (let char of text) {
    if (char.match(/[a-z]/i)) {
      let base = char === char.toUpperCase() ? 65 : 97;
      let code = ((char.charCodeAt(0) - base + shift) % 26) + base;
      result += String.fromCharCode(code);
    } else {
      result += char;
    }
  }
  return result;
}

// Typing Animation
function typeOutput(element, text) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 25);
    }
  }
  type();
}

// Encrypt Handler
function encrypt() {
  const message = document.getElementById("encrypt-message").value;
  let shift = parseInt(document.getElementById("encrypt-shift").value) || 0;
  const result = caesarCipher(message, shift, true);
  const output = document.getElementById("encrypt-result");
  typeOutput(output, result);
}

// Decrypt Handler
function decrypt() {
  const message = document.getElementById("decrypt-message").value;
  let shift = parseInt(document.getElementById("decrypt-shift").value) || 0;
  const result = caesarCipher(message, shift, false);
  const output = document.getElementById("decrypt-result");
  typeOutput(output, result);
}

