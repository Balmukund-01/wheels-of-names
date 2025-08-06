// const canvas = document.getElementById("wheelCanvas");
//     const ctx = canvas.getContext("2d");
//     const width = canvas.width;
//     const height = canvas.height;

//     const centerX = width / 2;
//     const centerY = height / 2;
//     const radius = width / 2;

//     let items = ["cat", "dog", "cow", "duck", "sheep", "goat", "bird", "neko", "chicken"];
//     let colors = [];
//     let currentDeg = 0;
//     let step = 360 / items.length;
//     let itemDegs = {};

//     function randomColor() {
//         return {
//             r: Math.floor(Math.random() * 255),
//             g: Math.floor(Math.random() * 255),
//             b: Math.floor(Math.random() * 255),
//         };
//     }

//     for (let i = 0; i < items.length; i++) {
//         colors.push(randomColor());
//     }

//     function toRad(deg) {
//         return deg * Math.PI / 180;
//     }

//     function draw() {
//         ctx.clearRect(0, 0, width, height);

//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//         ctx.fillStyle = "#222";
//         ctx.fill();

//         let startDeg = currentDeg;

//         for (let i = 0; i < items.length; i++) {
//             let endDeg = startDeg + step;
//             const color = colors[i];
//             const colorStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;

//             ctx.beginPath();
//             ctx.moveTo(centerX, centerY);
//             ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
//             ctx.fillStyle = colorStyle;
//             ctx.fill();

//             // Text
//             ctx.save();
//             ctx.translate(centerX, centerY);
//             ctx.rotate(toRad((startDeg + endDeg) / 2));
//             ctx.textAlign = "center";
//             ctx.fillStyle = "#fff";
//             ctx.font = "bold 18px Roboto";
//             ctx.fillText(items[i], 130, 10);
//             ctx.restore();

//             itemDegs[items[i]] = { startDeg, endDeg };
//             startDeg += step;
//         }
//     }

//     draw();

//     function easeOutSine(x) {
//         return Math.sin((x * Math.PI) / 2);
//     }

//     function getPercent(input, min, max) {
//         return (((input - min) * 100) / (max - min)) / 100;
//     }

//     function randomRange(min, max) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }

//     let speed = 0;
//     let maxRotation = randomRange(360 * 3, 360 * 6);
//     let pause = false;

//     function animate() {
//         if (pause) return;

//         speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
//         if (speed < 0.1) {
//             speed = 0;
//             pause = true;
//         }

//         currentDeg += speed;
//         draw();
//         requestAnimationFrame(animate);
//     }

//     function spin() {
//         if (speed !== 0) return;

//         maxRotation = randomRange(360 * 5, 360 * 8);
//         currentDeg = 0;
//         pause = false;
//         draw();
//         requestAnimationFrame(animate);
//     }

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

let items = [
  "Abhishek",
  "Sagar",
  "Amar",
  "Nitesh",
  "Sonu",
  "Ibrar",
  "Avinash",
  "Ravi",
];

// Fixed color sequence
const fixedColors = ["#E52020", "#FFB200", "#399918", "#1B56FD"];
// let colors = [];
function assignColorsWithoutRepeats(items, colorPalette) {
  const assignedColors = [];
  let colorIndex = 0;

  for (let i = 0; i < items.length; i++) {
    let nextColor = colorPalette[colorIndex % colorPalette.length];

    // Check if next color is same as previous
    if (i > 0 && nextColor === assignedColors[i - 1]) {
      colorIndex++; // Skip to next color to avoid repeat
      nextColor = colorPalette[colorIndex % colorPalette.length];
    }

    assignedColors.push(nextColor);
    colorIndex++;
  }

  // Last and first shouldn't be same either (wheel is circular)
  if (
    assignedColors.length > 1 &&
    assignedColors[0] === assignedColors[assignedColors.length - 1]
  ) {
    const temp = assignedColors[assignedColors.length - 2];
    assignedColors[assignedColors.length - 2] =
      assignedColors[assignedColors.length - 1];
    assignedColors[assignedColors.length - 1] = temp;
  }

  return assignedColors;
}

// Replace this line:
// let colors = [];

// With this:
let colors = assignColorsWithoutRepeats(items, fixedColors);

for (let i = 0; i < items.length; i++) {
  colors.push(fixedColors[i % fixedColors.length]);
}

let currentDeg = 0;
let step = 360 / items.length;
let itemDegs = {};

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  // ctx.font = "bold 30px Roboto";

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#222";
  ctx.fill();

  let startDeg = currentDeg;

  for (let i = 0; i < items.length; i++) {
    let endDeg = startDeg + step;
    const color = colors[i];

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
    ctx.fillStyle = color;
    ctx.fill();

    // Text
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(toRad((startDeg + endDeg) / 2));
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    // ctx.font = "bold 30px Roboto";
    // ctx.fillText(items[i], 130, 10);
    // ctx.fillText(items[i], radius - 60, 10);

    // Set maximum width for each label (adjust as needed)
    const maxTextWidth = 100;

    // Start with large font and reduce if needed
    let fontSize = 40;
    ctx.font = ` ${fontSize}px Roboto`;

    // Reduce font size if text too wide
    while (ctx.measureText(items[i]).width > maxTextWidth && fontSize > 10) {
      fontSize -= 1;
      ctx.font = ` ${fontSize}px Roboto`;
    }

    // Draw the text near the edge
    ctx.fillText(items[i], radius - 55, 10);

    ctx.restore();

    itemDegs[items[i]] = { startDeg, endDeg };
    startDeg += step;
  }
}

draw();

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}

function getPercent(input, min, max) {
  return ((input - min) * 100) / (max - min) / 100;
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;

// function animate() {
//     if (pause) return;

//     speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
//     if (speed < 0.1) {
//         speed = 0;
//         pause = true;
//     }

//     currentDeg += speed;
//     draw();
//     requestAnimationFrame(animate);
// }

function animate() {
  if (pause) return;

  speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;

  if (speed < 0.1) {
    speed = 0;
    pause = true;

    // Normalize angle (0 - 360)
    const finalAngle = currentDeg % 360;

    // Find winning item
    let winningItem = null;
    for (let name in itemDegs) {
      const start = itemDegs[name].startDeg % 360;
      const end = itemDegs[name].endDeg % 360;

      // Handle standard case
      if (start < end) {
        if (finalAngle >= start && finalAngle < end) {
          winningItem = name;
          break;
        }
      } else {
        // Handle wrap-around case (e.g., 350 to 10)
        if (finalAngle >= start || finalAngle < end) {
          winningItem = name;
          break;
        }
      }
    }

    // Log the winner correctly
    if (winningItem) {
      console.log("🎉 Winner:", winningItem);
    } else {
      console.log("Could not determine winner. Angle:", finalAngle);
    }

    return; // Stop further animation once winner is found
  }

  currentDeg += speed;
  draw();
  requestAnimationFrame(animate); // Continue animation
}

document.addEventListener("DOMContentLoaded", function () {
  const wheelCanvas = document.getElementById("wheelCanvas");

  // Directly use the global spin() function here:
  wheelCanvas.addEventListener("click", spin);

  wheelCanvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    spin();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      spin();
    }
  });
});

function spin() {
  if (speed !== 0) return;

  maxRotation = randomRange(360 * 5, 360 * 8);
  currentDeg = 0;
  pause = false;
  draw();
  requestAnimationFrame(animate);
}

function closeModal() {
  document.getElementById("winnerModal").classList.add("hidden");
}

function removeWinner() {
  const nameToRemove = document.getElementById("winnerName").innerText;
  items = items.filter((name) => name !== nameToRemove);
  draw();
  closeModal();
}

//
// Inside document.ready or global

// const inputPanel = document.getElementById("inputPanel");
// const nameInput = document.getElementById("nameInput");
// const loadNamesBtn = document.getElementById("loadNamesBtn");
// const countEl = document.getElementById("count");

// loadNamesBtn.addEventListener("click", () => {
//   const raw = nameInput.value;
//   const lines = raw
//     .split(/\r?\n|,/)
//     .map((s) => s.trim())
//     .filter((s) => s.length > 0);

//   if (lines.length === 0) {
//     alert("Please enter at least one name.");
//     return;
//   }

//   items = [...new Set(lines)]; // remove duplicates
//   step = 360 / items.length;
//   colors = assignColorsWithoutRepeats(items, fixedColors);

//   countEl.textContent = items.length;

//   currentDeg = 0;
//   pause = false;
//   draw();
// });

// Tabs and counts
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const entriesCount = document.getElementById("entriesCount");
const resultsCount = document.getElementById("resultsCount");
const hideToggle = document.getElementById("hideToggle");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.add("hidden"));
    tab.classList.add("active");
    document
      .getElementById(tab.dataset.tab + "Panel")
      .classList.remove("hidden");
  });
});

// Hide toggle
hideToggle.addEventListener("change", () => {
  const container = hideToggle.closest(".tab-container");

  const ui = container.querySelector(".tab-ui");
  const content = container.querySelector(".tab-content");

  if (hideToggle.checked) {
    ui.style.display = "none";
    content.style.display = "none";
  } else {
    ui.style.display = "";
    content.style.display = "";
  }
});

// Buttons
document.getElementById("shuffleBtn").addEventListener("click", () => {
  const editor = document.getElementById("nameEditor");
  const items = Array.from(editor.children).map((d) => d.textContent.trim());
  items.sort(() => Math.random() - 0.5);
  editor.innerHTML = items.map((n) => `<div>${n}</div>`).join("");
  updateCount();
});

document.getElementById("sortBtn").addEventListener("click", () => {
  const editor = document.getElementById("nameEditor");
  const items = Array.from(editor.children)
    .map((d) => d.textContent.trim())
    .sort();
  editor.innerHTML = items.map((n) => `<div>${n}</div>`).join("");
  updateCount();
});

function updateCount() {
  const count = document.getElementById("nameEditor").children.length;
  entriesCount.textContent = count;
}
updateCount();
