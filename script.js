const numberOfCheckouts = 3;
const queues = Array.from({ length: numberOfCheckouts }, (_, i) => {
  if (i < 2) {
    return { queue: [], isVipCounter: true }
  } else {
    return { queue: [], isVipCounter: false }
  }
});

// let sample = [{ queue: [{itemCount:1, isVipCustomer:true},{itemCount:2, isVipCustomer:false}], isVipCounter: true },{ queue: [], isVipCounter: true },{ queue: [], isVipCounter: false }]

function renderQueues() {
  const container = document.getElementById('queuesContainer');
  container.innerHTML = '';

  let minTotal = Math.min(...queues.map(q => q.queue.reduce((a, b) => a + b.itemCount, 0)));

  queues.forEach((subQueue, index) => {
    const total = subQueue.queue.reduce((sum, item) => sum + item.itemCount, 0);
    const customerCount = subQueue.queue.length;

    const col = document.createElement('div');
    col.className = 'col-md-4 d-flex';

    const card = document.createElement('div');
    card.className = `checkout-card h-100 w-100 d-flex flex-column justify-content-between ${total === minTotal ? 'active' : ''}`;

    card.innerHTML = `
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="cart-head">Counter ${index + 1} ${subQueue.isVipCounter ? "(VIP)*" : ""}</span>
        <span class="checkout-summary"><i class="bi bi-people"></i> ${customerCount} customers</span>
      </div>
      <ul class="queue-list mb-3">${subQueue.queue.map((item, i) => `<li class="d-flex justify-content-between align-items-center"><span><i class="bi bi-cart2"></i> ${item.itemCount}items  ${item.isVipCustomer?"(vip)":""}</span> ${i === 0 ? '<span class="text-danger">—</span>' : ''}</li>`).join('')}</ul>
      <p class="checkout-summary2 mt-auto pt-2 border-top">Total Items: ${total}</p>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });
}


function assignCustomer() {
  const input = document.getElementById('itemInput');
  const isVip = document.getElementById('isVip').checked;
  // console.log(isVip);
  const itemCount = parseInt(input.value);

  if (!itemCount || itemCount < 1) {
    alert("Please enter a valid number of items.");
    return;
  }
  let minIndex = 0;
  if (isVip) {
    const vipQueue = queues.filter(el => el.isVipCounter);
    let minTotal = vipQueue[0].queue.reduce((sum, val) => sum + (val.isVipCustomer ? val.itemCount : 0), 0);

    for (let i = 1; i < vipQueue.length; i++) {
      const total = vipQueue[i].queue.reduce((sum, val) => sum + (val.isVipCustomer ? val.itemCount : 0), 0);
      if (total < minTotal) {
        minTotal = total;
        minIndex = i;
      }
    }
    // Find the last VIP customer inside that queue
    let insertIndex = 0;
    for (let j = queues[minIndex].queue.length - 1; j >= 0; j--) {
      if (queues[minIndex].queue[j].isVipCustomer) {
        insertIndex = j+1; 
        break;
      }
    }
    queues[minIndex].queue.splice(insertIndex, 0, { itemCount, isVipCustomer: isVip });
    input.value = '';
    document.getElementById('isVip').checked = false;
    renderQueues();
    return;
  }

  let minTotal = queues[0].queue.reduce((sum, val) => sum + val.itemCount, 0);

  for (let i = 1; i < queues.length; i++) {
    const total = queues[i].queue.reduce((sum, val) => sum + val.itemCount, 0);
    if (total < minTotal) {
      minTotal = total;
      minIndex = i;
    }
  }
  queues[minIndex].queue.push({ itemCount, isVipCounter: isVip });
  input.value = '';
  document.getElementById('isVip').checked = false;
  renderQueues();
}

renderQueues(); 
