const numberOfCheckouts = 3;
const queues = Array.from({ length: numberOfCheckouts }, () => []);

function renderQueues() {
  const container = document.getElementById('queuesContainer');
  container.innerHTML = '';

  let minTotal = Math.min(...queues.map(q => q.reduce((a, b) => a + b, 0)));

  queues.forEach((queue, index) => {
    const total = queue.reduce((sum, item) => sum + item, 0);
    const customerCount = queue.length;

    const col = document.createElement('div');
    col.className = 'col-md-4 d-flex';

    const card = document.createElement('div');
    card.className = `checkout-card h-100 w-100 d-flex flex-column justify-content-between ${total === minTotal ? 'active' : ''}`;

    card.innerHTML = `
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="cart-head">Counter ${index + 1}</span>
        <span class="checkout-summary"><i class="bi bi-people"></i> ${customerCount} customers</span>
      </div>
      <ul class="queue-list mb-3">${queue.map((item,i) => `<li class="d-flex justify-content-between align-items-center"><span><i class="bi bi-cart2"></i> ${item} items</span> ${i === 0 ? '<span class="text-danger">—</span>' : ''}</li>`).join('')}</ul>
      <p class="checkout-summary2 mt-auto pt-2 border-top">Total Items: ${total}</p>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });
}


function assignCustomer() {
  const input = document.getElementById('itemInput');
  const itemCount = parseInt(input.value);

  if (!itemCount || itemCount < 1) {
    alert("Please enter a valid number of items.");
    return;
  }


  let minIndex = 0;
  let minTotal = queues[0].reduce((sum, val) => sum + val, 0);

  for (let i = 1; i < queues.length; i++) {
    const total = queues[i].reduce((sum, val) => sum + val, 0);
    if (total < minTotal) {
      minTotal = total;
      minIndex = i;
    }
  }

  queues[minIndex].push(itemCount);
  input.value = '';
  renderQueues();
}

renderQueues(); 
