# Hypermart Checkout System

This project is a solution to the checkout assignment problem where customers are directed to the checkout counter with the fewest total items.

## Technologies
- Use HTML for structure, CSS for styling, and JavaScript for implementing the logic and dynamically updating the queues.

## Problem Statement
- Each checkout machine in the hypermart starts with an empty queue (i.e., total items = 0).
- When a new customer arrives, they must be assigned to the checkout machine with the least total number of items in the queue.
- If two or more checkout machines have the same total, assign the customer to the leftmost machine (i.e., the one with the smallest index).


## Features
- Dynamically assign new customers to the least busy checkout.
- Real-time visual update of queues.
- Scalable, clean, and responsive UI.

## Algorithm
- Maintain arrays of queues. (i.e. Checkout Queues = [[Checkout item queue 1],[Checkout item queue 2],[Checkout item queue 3]])
- For each new customer:
  - Calculate total items in each queue.
  - Assign to the queue with the minimum total (leftmost if tied).

## Time Complexity
- Each customer assignment: **O(n)** where n = number of checkouts.

## Assumptions
- All customers have at least 1 item.
- System assumes a fixed number of checkouts (can be configured).
