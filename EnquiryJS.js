document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enquiryForm');
    const enquiryType = document.getElementById('enquiryType');
    const responseArea = document.getElementById('responseArea');
    const responseText = document.getElementById('responseText');

    enquiryType.addEventListener('change', function() {
        document.getElementById('product-details').classList.add('hidden');
        document.getElementById('service-details').classList.add('hidden');
        document.getElementById('opportunity-details').classList.add('hidden');
        
        const selectedValue = this.value;
        if (selectedValue === 'products') {
            document.getElementById('product-details').classList.remove('hidden');
            document.getElementById('productItem').required = true;
            document.getElementById('productQuantity').required = true;
            document.getElementById('productDate').required = true;
        } else if (selectedValue === 'services') {
            document.getElementById('service-details').classList.remove('hidden');
            document.getElementById('serviceDuration').required = true;
        } else if (selectedValue === 'opportunity') {
            document.getElementById('opportunity-details').classList.remove('hidden');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        responseArea.classList.add('hidden');

        if (validateForm()) {

            const response = processEnquiry();
            

            setTimeout(() => {
                responseText.innerHTML = response;
                responseArea.classList.remove('hidden');
                
                form.reset();
                document.querySelectorAll('.conditional-section').forEach(el => el.classList.add('hidden'));

            }, 500); 
        }
    });
});

function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const typeInput = document.getElementById('enquiryType');
    

    if (nameInput.value.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required.';
        isValid = false;
    }
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (typeInput.value === '') {
        document.getElementById('type-error').textContent = 'Please select an enquiry category.';
        isValid = false;
    }

    return isValid;
}


function processEnquiry() {
    const type = document.getElementById('enquiryType').value;
    let message = 'Thank you for your enquiry. We will contact you within 24 hours to confirm the details.';
    

    if (type === 'products') {
        const item = document.getElementById('productItem').value;
        const quantity = parseInt(document.getElementById('productQuantity').value);
        const date = document.getElementById('productDate').value;


        const basePrice = (item.toLowerCase().includes('cannoli')) ? 45 : 35; 
        
        if (quantity >= 50) {
            const quote = (quantity * basePrice) * 0.9; // 10% bulk discount
            message = `
                <h4>Custom Order Quote & Confirmation</h4>
                <p>Your large order for **${quantity}x ${item}** on **${date}** has been successfully logged.</p>
                <p>Based on volume, you qualify for a **10% bulk discount**.</p>
                <p>Estimated Cost (ZAR): **R ${quote.toFixed(2)}**</p>
                <p>A pastry chef will contact you shortly to confirm ingredient availability and finalize your payment.</p>
            `;
        } else {
            const quote = (quantity * basePrice).toFixed(2);
            message = `
                <h4>Order Quote & Confirmation</h4>
                <p>Your order for **${quantity}x ${item}** on **${date}** has been logged.</p>
                <p>Estimated Cost (ZAR): **R ${quote}**</p>
                <p>We will contact you shortly to confirm date availability and payment details.</p>
            `;
        }
    } 
    

    else if (type === 'services') {
        const duration = document.getElementById('serviceDuration').value;
        const serviceType = document.getElementById('serviceType').value;
        const baseFee = (serviceType === 'small') ? 1200 : 2500; // ZAR base fee
        const totalFee = baseFee + (duration * 250); // Add hourly fee
        
        message = `
            <h4>Catering Service Quote</h4>
            <p>Thank you for requesting a **${serviceType} event** quote for **${duration} hours**.</p>
            <p>Estimated Service Fee (ZAR): **R ${totalFee.toFixed(2)}** (Excluding cost of pastries)</p>
            <p>A member of our events team will call you within one business day to discuss menu options and confirm the date.</p>
        `;
    } 

    else if (type === 'opportunity') {
        const opportunity = document.getElementById('opportunityType').value;
        message = `
            <h4>Opportunity Submission Received</h4>
            <p>Thank you for your interest in a **${opportunity}** opportunity.</p>
            <p>We are currently reviewing all applications and will notify you within two weeks regarding next steps and availability.</p>
        `;
    }

    return message;
}