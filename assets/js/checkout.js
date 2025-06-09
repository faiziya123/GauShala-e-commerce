/**
 * Enhanced Checkout System
 * Amazon-style multi-step checkout process
 */

class CheckoutSystem {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 4;
    this.shippingMethods = [
      { id: 'standard', name: 'Standard Delivery', price: 40, days: '3-5' },
      { id: 'express', name: 'Express Delivery', price: 100, days: '1-2' },
      { id: 'free', name: 'Free Delivery', price: 0, days: '5-7', minOrder: 500 }
    ];
    this.paymentMethods = [
<<<<<<< HEAD
      { id: 'cod', name: 'Cash on Delivery', icon: 'bi-cash', fields: [] },
      { id: 'upi', name: 'UPI Payment', icon: 'bi-phone', fields: [
        { name: 'upiId', label: 'UPI ID', type: 'text', placeholder: 'username@bank', required: true }
      ] },
      { id: 'card', name: 'Credit/Debit Card', icon: 'bi-credit-card', fields: [
        { name: 'cardNumber', label: 'Card Number', type: 'text', placeholder: '1234 5678 9012 3456', required: true },
        { name: 'cardName', label: 'Name on Card', type: 'text', placeholder: 'John Doe', required: true },
        { name: 'expiryDate', label: 'Expiry Date', type: 'text', placeholder: 'MM/YY', required: true },
        { name: 'cvv', label: 'CVV', type: 'password', placeholder: '123', required: true }
      ] }
=======
      { id: 'cod', name: 'Cash on Delivery', icon: 'bi-cash' },
      { id: 'upi', name: 'UPI Payment', icon: 'bi-phone' },
      { id: 'card', name: 'Credit/Debit Card', icon: 'bi-credit-card' }
>>>>>>> 5ba752ec70e5bf635be34a52fd5c90363060ba46
    ];
    this.selectedShipping = 'standard';
    this.selectedPayment = 'cod';
    this.init();
  }

  init() {
    // Create checkout modal if it doesn't exist
    this.createCheckoutModal();
    this.bindEvents();
  }

  createCheckoutModal() {
    // Remove existing modal if present
    $('#enhanced-checkout-modal').remove();

    // Create new modal structure
    const modalHTML = `
      <div id="enhanced-checkout-modal" class="custom-modal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Checkout</h5>
              <button type="button" class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <!-- Progress Bar -->
              <div class="checkout-progress mb-4">
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="step-indicators">
                  <div class="step active" data-step="1">
                    <div class="step-number">1</div>
                    <div class="step-label">Review Cart</div>
                  </div>
                  <div class="step" data-step="2">
                    <div class="step-number">2</div>
                    <div class="step-label">Shipping</div>
                  </div>
                  <div class="step" data-step="3">
                    <div class="step-number">3</div>
                    <div class="step-label">Payment</div>
                  </div>
                  <div class="step" data-step="4">
                    <div class="step-number">4</div>
                    <div class="step-label">Confirm</div>
                  </div>
                </div>
              </div>

              <!-- Step Content Container -->
              <div class="step-content">
                <!-- Step 1: Review Cart -->
                <div class="step-pane" id="step-1">
                  <h4>Review Your Cart</h4>
                  <div class="cart-review-items"></div>
                  <div class="cart-summary mt-3">
                    <div class="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span class="subtotal-amount">₹0.00</span>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Shipping -->
                <div class="step-pane" id="step-2" style="display: none;">
                  <h4>Shipping Information</h4>
                  <form id="shipping-form" class="needs-validation" novalidate>
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" name="fullName" required>
                        <div class="invalid-feedback">Please enter your name</div>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">Phone</label>
                        <input type="tel" class="form-control" name="phone" pattern="[0-9]{10}" required>
                        <div class="invalid-feedback">Please enter a valid 10-digit phone number</div>
                      </div>
                      <div class="col-12">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" name="email" required>
                        <div class="invalid-feedback">Please enter a valid email address</div>
                      </div>
                      <div class="col-12">
                        <label class="form-label">Street Address</label>
                        <input type="text" class="form-control" name="address" required>
                        <div class="invalid-feedback">Please enter your address</div>
                      </div>
                      <div class="col-md-5">
                        <label class="form-label">City</label>
                        <input type="text" class="form-control" name="city" required>
                        <div class="invalid-feedback">Please enter your city</div>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">State</label>
                        <select class="form-select" name="state" required>
                          <option value="">Choose...</option>
                          <option>Himachal Pradesh</option>
                          <option>Punjab</option>
                          <option>Haryana</option>
                          <option>Uttarakhand</option>
                          <option>Uttar Pradesh</option>
                          <option>Delhi</option>
                        </select>
                        <div class="invalid-feedback">Please select a state</div>
                      </div>
                      <div class="col-md-3">
                        <label class="form-label">PIN Code</label>
                        <input type="text" class="form-control" name="pincode" pattern="[0-9]{6}" required>
                        <div class="invalid-feedback">Please enter a valid 6-digit PIN code</div>
                      </div>
                    </div>

                    <h5 class="mt-4">Shipping Method</h5>
                    <div class="shipping-methods">
                      <!-- Shipping methods will be inserted here -->
                    </div>
                  </form>
                </div>

                <!-- Step 3: Payment -->
                <div class="step-pane" id="step-3" style="display: none;">
                  <h4>Payment Method</h4>
                  <div class="payment-methods">
                    <!-- Payment methods will be inserted here -->
                  </div>
                </div>

                <!-- Step 4: Confirmation -->
                <div class="step-pane" id="step-4" style="display: none;">
                  <div class="text-center mb-4">
                    <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                    <h4 class="mt-3">Order Summary</h4>
                  </div>
                  <div class="order-summary">
                    <div class="summary-section">
                      <h5>Shipping Address</h5>
                      <div class="address-summary"></div>
                    </div>
                    <div class="summary-section">
                      <h5>Payment Method</h5>
                      <div class="payment-summary"></div>
                    </div>
                    <div class="summary-section">
                      <h5>Order Details</h5>
                      <div class="items-summary"></div>
                      <div class="price-summary mt-3">
                        <div class="d-flex justify-content-between">
                          <span>Subtotal:</span>
                          <span class="final-subtotal">₹0.00</span>
                        </div>
                        <div class="d-flex justify-content-between">
                          <span>Shipping:</span>
                          <span class="final-shipping">₹0.00</span>
                        </div>
                        <div class="d-flex justify-content-between fw-bold mt-2">
                          <span>Total:</span>
                          <span class="final-total">₹0.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="prevStepBtn" style="display: none;">Previous</button>
              <button type="button" class="btn btn-primary" id="nextStepBtn">Next</button>
              <button type="button" class="btn btn-success" id="placeOrderBtn" style="display: none;">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    `;

    $('body').append(modalHTML);

    // Add CSS for the checkout modal
    const modalCSS = `
      <style>
        #enhanced-checkout-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 2000;
          overflow-y: auto;
        }
        
        #enhanced-checkout-modal .modal-dialog {
          max-width: 800px;
          margin: 2rem auto;
        }
        
        #enhanced-checkout-modal .modal-content {
          border-radius: 8px;
          border: none;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        #enhanced-checkout-modal .modal-header {
          background: #232f3e;
          color: white;
          border-radius: 8px 8px 0 0;
        }
        
        #enhanced-checkout-modal .close-modal {
          color: white;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        
        .checkout-progress {
          position: relative;
          padding: 0 10px;
        }
        
        .progress {
          height: 4px;
          margin-bottom: 30px;
        }
        
        .progress-bar {
          background-color: #1d863a;
        }
        
        .step-indicators {
          display: flex;
          justify-content: space-between;
          position: absolute;
          top: -10px;
          width: 100%;
          left: 0;
          padding: 0 10px;
        }
        
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .step-number {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 8px;
          z-index: 1;
          transition: all 0.3s;
        }
        
        .step.active .step-number {
          background: #1d863a;
          color: white;
        }
        
        .step.completed .step-number {
          background: #1d863a;
          color: white;
        }
        
        .step-label {
          font-size: 12px;
          color: #6c757d;
          transition: all 0.3s;
        }
        
        .step.active .step-label {
          color: #1d863a;
          font-weight: 600;
        }
        
        .cart-review-items {
          max-height: 300px;
          overflow-y: auto;
        }
        
        .review-item {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: 15px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        
        .review-item img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .shipping-methods, .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }
        
        .shipping-option, .payment-option {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .shipping-option:hover, .payment-option:hover {
          border-color: #adb5bd;
        }
        
        .shipping-option.selected, .payment-option.selected {
          border-color: #1d863a;
          background: rgba(29, 134, 58, 0.05);
        }
        
        .shipping-option-header, .payment-option-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .shipping-option-price {
          font-weight: bold;
        }
        
        .shipping-option-days {
          color: #6c757d;
          font-size: 14px;
          margin-top: 5px;
        }
        
        .summary-section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .summary-section:last-child {
          border-bottom: none;
        }
        
        .summary-item {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .summary-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .summary-item-details h6 {
          margin: 0;
          font-size: 14px;
        }
        
        .summary-item-details p {
          margin: 0;
          font-size: 12px;
          color: #6c757d;
        }
        
        @media (max-width: 768px) {
          .step-label {
            display: none;
          }
          
          #enhanced-checkout-modal .modal-dialog {
            margin: 1rem;
            width: auto;
          }
          
          .review-item {
            grid-template-columns: 40px 1fr auto;
          }
          
          .review-item img {
            width: 40px;
            height: 40px;
          }
        }
      </style>
    `;
    
    $('head').append(modalCSS);
  }

  bindEvents() {
    // Open checkout modal
    $(document).on('click', '.checkout-btn', () => {
      this.openCheckout();
    });

    // Close modal
    $(document).on('click', '#enhanced-checkout-modal .close-modal', () => {
      this.closeCheckout();
    });

    // Next step button
    $(document).on('click', '#nextStepBtn', () => {
      this.nextStep();
    });

    // Previous step button
    $(document).on('click', '#prevStepBtn', () => {
      this.prevStep();
    });

    // Place order button
    $(document).on('click', '#placeOrderBtn', () => {
      this.placeOrder();
    });

    // Shipping method selection
    $(document).on('click', '.shipping-option', (e) => {
      const methodId = $(e.currentTarget).data('id');
      this.selectShippingMethod(methodId);
    });

    // Payment method selection
    $(document).on('click', '.payment-option', (e) => {
      const methodId = $(e.currentTarget).data('id');
      this.selectPaymentMethod(methodId);
    });

    // Close on backdrop click
    $(document).on('click', '#enhanced-checkout-modal', (e) => {
      if ($(e.target).is('#enhanced-checkout-modal')) {
        this.closeCheckout();
      }
    });
  }

  openCheckout() {
    // Reset to first step
    this.goToStep(1);
    
    // Load cart items
    this.loadCartItems();
    
    // Render shipping methods
    this.renderShippingMethods();
    
    // Render payment methods
    this.renderPaymentMethods();
    
    // Show modal
    $('#enhanced-checkout-modal').fadeIn();
  }

  closeCheckout() {
    $('#enhanced-checkout-modal').fadeOut();
  }

  loadCartItems() {
    // Get cart items from localStorage
    let cartItems = [];
    try {
      const savedCart = localStorage.getItem('cart');
      cartItems = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      cartItems = [];
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Update subtotal display
    $('.subtotal-amount, .final-subtotal').text(`₹${subtotal.toFixed(2)}`);

    // Render cart items for review
    const cartItemsHTML = cartItems.map(item => `
      <div class="review-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h6>${item.name}</h6>
          <p>₹${item.price.toFixed(2)} × ${item.quantity}</p>
        </div>
        <div class="item-total">₹${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');

    $('.cart-review-items').html(cartItems.length ? cartItemsHTML : '<p class="text-center py-3">Your cart is empty</p>');

    // Disable next button if cart is empty
    if (cartItems.length === 0) {
      $('#nextStepBtn').prop('disabled', true);
    } else {
      $('#nextStepBtn').prop('disabled', false);
    }

    // Store cart items for later use
    this.cartItems = cartItems;
    this.subtotal = subtotal;

    // Update order summary in step 4
    this.updateOrderSummary();
  }

  renderShippingMethods() {
    const subtotal = this.subtotal || 0;
    
    const shippingMethodsHTML = this.shippingMethods.map(method => {
      // Check if free shipping is available based on order minimum
      let isDisabled = false;
      let disabledText = '';
      
      if (method.id === 'free' && method.minOrder && subtotal < method.minOrder) {
        isDisabled = true;
        disabledText = `<p class="text-muted mb-0">Available on orders above ₹${method.minOrder.toFixed(2)}</p>`;
      }
      
      return `
        <div class="shipping-option ${method.id === this.selectedShipping ? 'selected' : ''}${isDisabled ? ' disabled' : ''}" 
             data-id="${method.id}"${isDisabled ? ' style="opacity: 0.6; cursor: not-allowed;"' : ''}>
          <div class="shipping-option-header">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="shipping" 
                     id="shipping-${method.id}" ${method.id === this.selectedShipping ? 'checked' : ''}
                     ${isDisabled ? 'disabled' : ''}>
              <label class="form-check-label" for="shipping-${method.id}">
                ${method.name}
              </label>
            </div>
            <div class="shipping-option-price">
              ${method.price === 0 ? 'FREE' : `₹${method.price.toFixed(2)}`}
            </div>
          </div>
          <div class="shipping-option-days">
            Estimated delivery: ${method.days} business days
          </div>
          ${disabledText}
        </div>
      `;
    }).join('');

    $('.shipping-methods').html(shippingMethodsHTML);
  }

  renderPaymentMethods() {
    const paymentMethodsHTML = this.paymentMethods.map(method => `
      <div class="payment-option ${method.id === this.selectedPayment ? 'selected' : ''}" data-id="${method.id}">
        <div class="payment-option-header">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="payment" 
                   id="payment-${method.id}" ${method.id === this.selectedPayment ? 'checked' : ''}>
            <label class="form-check-label" for="payment-${method.id}">
              <i class="bi ${method.icon} me-2"></i> ${method.name}
            </label>
          </div>
        </div>
<<<<<<< HEAD
        <div class="payment-option-form mt-3" id="${method.id}-form" style="display: ${method.id === this.selectedPayment ? 'block' : 'none'}">
          ${method.fields.map(field => `
            <div class="mb-3">
              <label class="form-label" for="${method.id}-${field.name}">${field.label}</label>
              <input type="${field.type}" class="form-control" id="${method.id}-${field.name}"
                     name="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
              <div class="invalid-feedback">Please enter valid ${field.label.toLowerCase()}</div>
            </div>
          `).join('')}
        </div>
=======
>>>>>>> 5ba752ec70e5bf635be34a52fd5c90363060ba46
      </div>
    `).join('');

    $('.payment-methods').html(paymentMethodsHTML);
  }

  selectShippingMethod(methodId) {
    // Check if method is disabled (free shipping with insufficient order total)
    const method = this.shippingMethods.find(m => m.id === methodId);
    if (method.id === 'free' && method.minOrder && this.subtotal < method.minOrder) {
      return; // Don't select disabled methods
    }
    
    this.selectedShipping = methodId;
    $('.shipping-option').removeClass('selected');
    $(`.shipping-option[data-id="${methodId}"]`).addClass('selected');
    $(`#shipping-${methodId}`).prop('checked', true);
    
    // Update order summary
    this.updateOrderSummary();
  }

  selectPaymentMethod(methodId) {
    this.selectedPayment = methodId;
    $('.payment-option').removeClass('selected');
    $(`.payment-option[data-id="${methodId}"]`).addClass('selected');
    $(`#payment-${methodId}`).prop('checked', true);
    
<<<<<<< HEAD
    // Hide all payment forms first
    $('.payment-option-form').hide();
    // Show the selected payment method's form
    $(`#${methodId}-form`).show();
    
=======
>>>>>>> 5ba752ec70e5bf635be34a52fd5c90363060ba46
    // Update order summary
    this.updateOrderSummary();
  }

  updateOrderSummary() {
    // Get selected shipping method
    const shippingMethod = this.shippingMethods.find(m => m.id === this.selectedShipping) || this.shippingMethods[0];
    const shippingCost = shippingMethod.price;
    
    // Get selected payment method
    const paymentMethod = this.paymentMethods.find(m => m.id === this.selectedPayment) || this.paymentMethods[0];
    
    // Calculate total
    const subtotal = this.subtotal || 0;
    const total = subtotal + shippingCost;
    
    // Update price summary
    $('.final-shipping').text(`₹${shippingCost.toFixed(2)}`);
    $('.final-total').text(`₹${total.toFixed(2)}`);
    
    // Update shipping address summary
    const addressHTML = this.getAddressSummary();
    $('.address-summary').html(addressHTML);
    
    // Update payment method summary
    $('.payment-summary').html(`
      <div class="d-flex align-items-center">
        <i class="bi ${paymentMethod.icon} me-2"></i>
        <span>${paymentMethod.name}</span>
      </div>
    `);
    
    // Update items summary
    const itemsHTML = (this.cartItems || []).map(item => `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="summary-item-details">
          <h6>${item.name}</h6>
          <p>Quantity: ${item.quantity}</p>
        </div>
        <div class="summary-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
    
    $('.items-summary').html(itemsHTML);
  }

  getAddressSummary() {
    // Get form values
    const form = document.getElementById('shipping-form');
    if (!form) return '<p>No address information</p>';
    
    const formData = new FormData(form);
    const fullName = formData.get('fullName') || '';
    const address = formData.get('address') || '';
    const city = formData.get('city') || '';
    const state = formData.get('state') || '';
    const pincode = formData.get('pincode') || '';
    const phone = formData.get('phone') || '';
    
    if (!fullName && !address) {
      return '<p>Please fill in your shipping information</p>';
    }
    
    return `
      <p class="mb-1">${fullName}</p>
      <p class="mb-1">${address}</p>
      <p class="mb-1">${city}, ${state} ${pincode}</p>
      <p class="mb-1">Phone: ${phone}</p>
    `;
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      // Validate cart has items
      return (this.cartItems || []).length > 0;
    } else if (this.currentStep === 2) {
      // Validate shipping form
      const form = document.getElementById('shipping-form');
<<<<<<< HEAD
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
      }
      return true;
    } else if (this.currentStep === 3) {
      // Validate payment selection and form
      const method = this.paymentMethods.find(m => m.id === this.selectedPayment);
      if (!method) {
        alert('Please select a payment method');
        return false;
      }
      
      // If method has fields, validate them
      if (method.fields.length > 0) {
        let allValid = true;
        method.fields.forEach(field => {
          const input = document.getElementById(`${method.id}-${field.name}`);
          if (!input.checkValidity()) {
            allValid = false;
            input.classList.add('is-invalid');
          } else {
            input.classList.remove('is-invalid');
          }
        });
        
        if (!allValid) {
          const form = document.querySelector(`#${method.id}-form`);
          form.classList.add('was-validated');
          return false;
        }
      }
      return true;
=======
      return form.checkValidity();
    } else if (this.currentStep === 3) {
      // Validate payment selection
      return true; // Payment method is pre-selected
>>>>>>> 5ba752ec70e5bf635be34a52fd5c90363060ba46
    }
    return true;
  }

  nextStep() {
    if (!this.validateCurrentStep()) {
      // If step 2, trigger form validation UI
      if (this.currentStep === 2) {
        const form = document.getElementById('shipping-form');
        form.classList.add('was-validated');
      }
      return;
    }
    
    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  goToStep(step) {
    // Hide all steps
    $('.step-pane').hide();
    
    // Show the target step
    $(`#step-${step}`).show();
    
    // Update progress bar
    const progress = (step / this.totalSteps) * 100;
    $('.progress-bar').css('width', `${progress}%`);
    
    // Update step indicators
    $('.step').removeClass('active completed');
    for (let i = 1; i <= this.totalSteps; i++) {
      if (i < step) {
        $(`.step[data-step="${i}"]`).addClass('completed');
      } else if (i === step) {
        $(`.step[data-step="${i}"]`).addClass('active');
      }
    }
    
    // Update buttons
    if (step === 1) {
      $('#prevStepBtn').hide();
      $('#nextStepBtn').show();
      $('#placeOrderBtn').hide();
    } else if (step === this.totalSteps) {
      $('#prevStepBtn').show();
      $('#nextStepBtn').hide();
      $('#placeOrderBtn').show();
      
      // Update order summary one last time
      this.updateOrderSummary();
    } else {
      $('#prevStepBtn').show();
      $('#nextStepBtn').show();
      $('#placeOrderBtn').hide();
    }
    
    // Update current step
    this.currentStep = step;
  }

  placeOrder() {
<<<<<<< HEAD
    // Get shipping form
    const shippingForm = document.getElementById('shipping-form');
    
    // Validate shipping form
    if (!shippingForm.checkValidity()) {
      shippingForm.classList.add('was-validated');
      return;
    }

    // Show payment options only after form validation
    $('#step-3').show();
    $('.step-pane').not('#step-3').hide();
    
    // Update progress and buttons
    $('.progress-bar').css('width', '75%');
    $('.step').removeClass('active completed');
    $('.step[data-step="3"]').addClass('active');
    $('.step[data-step="1"], .step[data-step="2"]').addClass('completed');
    
    $('#prevStepBtn').show();
    $('#nextStepBtn').show();
    $('#placeOrderBtn').hide();
    
    // Update current step
    this.currentStep = 3;
    
    // Render payment methods
    this.renderPaymentMethods();
    
    // Update order summary with validated shipping info
    this.updateOrderSummary();
  }
}
=======
    // Show loading state
    $('#placeOrderBtn').prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...');
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem('cart');
      
      // Show success message
      this.showNotification('Your order has been placed successfully!');
      
      // Close checkout
      this.closeCheckout();
      
      // Reset cart UI
      if (typeof Cart !== 'undefined' && Cart.updateUI) {
        Cart.updateUI();
      }
>>>>>>> 5ba752ec70e5bf635be34a52fd5c90363060ba46
