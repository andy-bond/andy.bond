module.exports = (value, text) => {
  return `<div class="circular-chart">
  <svg viewBox="0 0 36 36" style="--value: ${value}">
    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
    <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
  </svg>
  <div class="percentage">${text}</div>
</div>`;
}
